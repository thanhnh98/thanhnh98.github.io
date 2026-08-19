#!/usr/bin/env node

const fs = require("fs");

const MOBILE_CATEGORY_MAP = {
  "phone-tablet": "tech",
  "smart-wearables": "tech",
  "phone-accessories": "tech",
  "phone-cases": "oplung",
  "electronics-gadgets": "tech",
  apparel: "clothes",
  "shoes-bags": "clothes",
  "personal-accessories": "clothes",
  "beauty-personal-care": "clothes",
  "home-appliances": "assets",
  "kitchen-dining": "bachhoa",
  "home-essentials": "bachhoa",
  "home-comfort": "assets",
  "snacks-sweets": "banhkeo",
  drinks: "thucphamkho",
  "pantry-food": "thucpham",
  "gift-sets": "quatet",
  decorations: "decor",
  "lucky-money": "lixi",
  "games-toys": "assets",
  stationery: "assets",
  "learning-tools": "assets",
  misc: "assets",
};

function parseArgs(argv) {
  const args = { dryRun: false, syncMobile: false };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--sync-mobile") args.syncMobile = true;
    else if (arg === "--records") args.records = argv[++i];
    else if (arg === "--products") args.products = argv[++i];
    else if (arg === "--mobile-products") args.mobileProducts = argv[++i];
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!args.records && !args.syncMobile) throw new Error("Missing --records");
  if (!args.products) throw new Error("Missing --products");
  if (args.syncMobile && !args.mobileProducts) {
    throw new Error("--sync-mobile requires --mobile-products");
  }
  return args;
}

function requiredString(record, field) {
  return typeof record[field] === "string" && record[field].trim() !== "";
}

function categoryArray(record) {
  const value = Array.isArray(record.category) ? record.category : record.categories;
  const arr = Array.isArray(value) ? value : [record.category];
  return [...new Set(arr.map((category) => String(category || "").trim()).filter(Boolean))];
}

function normalizeImageUrl(value) {
  return String(value || "")
    .trim()
    .replace(
      "https://down-zl-vn.img.susercontent.com/",
      "https://down-vn.img.susercontent.com/file/"
    )
    .replace(/\.webp$/, "")
    .replace(/_tn(?=$|\?)/, "")
    .replace(/@resize_[^?]+/, "");
}

function normalizeRecord(record, catalog) {
  const categories = categoryArray(record);
  const categoryMeta = new Map(
    (catalog.data.categories || []).map((item) => [item.category, item])
  );
  const groupIds = new Set((catalog.data.groups || []).map((item) => item.group));
  const inferredGroup = categories.map((category) => categoryMeta.get(category)?.group).find(Boolean);
  const group = String(record.group || inferredGroup || "").trim();

  return {
    record: {
      ...record,
      id: String(record.id || "").trim(),
      shopId: String(record.shopId || "").trim(),
      thumbnail: normalizeImageUrl(record.thumbnail),
      images: Array.isArray(record.images)
        ? [...new Set(record.images.map(normalizeImageUrl).filter(Boolean))]
        : record.images,
      name: String(record.name || "").trim(),
      description: String(record.description || "").trim(),
      type: "shopee",
      group,
      category: categories,
      coinBonus: 10,
      buyText: "Xem sản phẩm",
      url: String(record.url || "").trim(),
    },
    invalidCategories: categories.filter((category) => !categoryMeta.has(category)),
    invalidGroup: group && groupIds.size > 0 && !groupIds.has(group) ? group : "",
  };
}

function validateRecord(normalized) {
  const { record, invalidCategories, invalidGroup } = normalized;
  const required = [
    "id",
    "shopId",
    "thumbnail",
    "name",
    "description",
    "type",
    "group",
    "buyText",
    "url",
  ];
  const missing = required.filter((field) => !requiredString(record, field));
  if (missing.length) return `missing ${missing.join(", ")}`;
  if (!record.category.length) return "missing category";
  if (invalidCategories.length) return `unknown category ${invalidCategories.join(", ")}`;
  if (invalidGroup) return `unknown group ${invalidGroup}`;
  if (!Array.isArray(record.images)) return "images must be an array";
  if (!record.url.startsWith("https://s.shopee.vn/")) return "url must be a Shopee shortlink";
  if (!record.thumbnail.includes("down-vn.img.susercontent.com/file/")) {
    return "thumbnail must be a Shopee image URL";
  }
  return null;
}

function prepareWebsite(productsPath, records) {
  const data = JSON.parse(fs.readFileSync(productsPath, "utf8"));
  if (!data.data || !Array.isArray(data.data.products)) {
    throw new Error("products file must contain data.products array");
  }

  const existingIds = new Set(data.data.products.map((product) => String(product.id || "")));
  const existingPairs = new Set(
    data.data.products.map((product) => `${product.shopId || ""}/${product.id || ""}`)
  );
  const existingUrls = new Set(data.data.products.map((product) => product.url).filter(Boolean));
  const inserted = [];
  const skipped = [];
  const seenIds = new Set();
  const seenPairs = new Set();
  const seenUrls = new Set();

  for (const rawRecord of records) {
    const normalized = normalizeRecord(rawRecord, data);
    const record = normalized.record;
    const reason = validateRecord(normalized);
    const pair = `${record.shopId}/${record.id}`;
    if (reason) {
      skipped.push({ id: record.id, pair, reason });
      continue;
    }
    if (
      existingIds.has(record.id) ||
      existingPairs.has(pair) ||
      existingUrls.has(record.url) ||
      seenIds.has(record.id) ||
      seenPairs.has(pair) ||
      seenUrls.has(record.url)
    ) {
      skipped.push({ id: record.id, pair, reason: "duplicate id, shopId/id, or url" });
      continue;
    }
    seenIds.add(record.id);
    seenPairs.add(pair);
    seenUrls.add(record.url);
    inserted.push(record);
  }

  data.data.products.push(...inserted);
  return { data, inserted, skipped };
}

function toMobileRecord(record) {
  const primaryCategory = record.category[0];
  const category = MOBILE_CATEGORY_MAP[primaryCategory];
  if (!category) throw new Error(`No mobile category mapping for ${primaryCategory}`);
  const { group, category: ignoredCategories, ...mobileRecord } = record;
  return { ...mobileRecord, category };
}

function prepareMobile(mobilePath, websiteRecords) {
  const data = JSON.parse(fs.readFileSync(mobilePath, "utf8"));
  if (!data.data || !Array.isArray(data.data.products)) {
    throw new Error("mobile products file must contain data.products array");
  }
  const existingIds = new Set(data.data.products.map((product) => String(product.id || "")));
  const existingUrls = new Set(data.data.products.map((product) => product.url).filter(Boolean));
  const inserted = websiteRecords
    .filter((record) => !existingIds.has(record.id) && !existingUrls.has(record.url))
    .map(toMobileRecord);
  data.data.products.push(...inserted);
  return { data, inserted };
}

function writeJson(path, data) {
  fs.writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
  JSON.parse(fs.readFileSync(path, "utf8"));
}

function mobileRecordBlock(product) {
  const lines = ["         {"];
  lines.push(`            "id":${JSON.stringify(product.id)},`);
  if (product.shopId != null) lines.push(`            "shopId":${JSON.stringify(product.shopId)},`);
  lines.push(`            "thumbnail":${JSON.stringify(product.thumbnail)},`);
  lines.push('            "images":[');
  product.images.forEach((image, index) => {
    lines.push(`               ${JSON.stringify(image)}${index < product.images.length - 1 ? "," : ""}`);
  });
  lines.push("            ],");
  lines.push(`            "name":${JSON.stringify(product.name)},`);
  lines.push(`            "description":${JSON.stringify(product.description)},`);
  lines.push(`            "type":${JSON.stringify(product.type)},`);
  lines.push(`            "category":${JSON.stringify(product.category)},`);
  lines.push(`            "coinBonus":${JSON.stringify(product.coinBonus)},`);
  lines.push(`            "buyText":${JSON.stringify(product.buyText)},`);
  lines.push(`            "url":${JSON.stringify(product.url)}`);
  lines.push("         }");
  return lines.join("\n");
}

function appendMobileRecords(path, records) {
  if (!records.length) return;
  const text = fs.readFileSync(path, "utf8");
  const marker = "\n      ]\n   }\n}";
  const index = text.lastIndexOf(marker);
  if (index === -1) throw new Error("mobile products closing marker not found");
  const prefix = text.slice(0, index).trimEnd();
  const output = `${prefix},\n${records.map(mobileRecordBlock).join(",\n")}${text.slice(index)}`;
  JSON.parse(output);
  fs.writeFileSync(path, output);
}

function main() {
  try {
    const args = parseArgs(process.argv);
    if (args.syncMobile) {
      const catalog = JSON.parse(fs.readFileSync(args.products, "utf8"));
      const websiteRecords = catalog.data.products.map((record) => normalizeRecord(record, catalog).record);
      const mobile = prepareMobile(args.mobileProducts, websiteRecords);
      if (!args.dryRun) appendMobileRecords(args.mobileProducts, mobile.inserted);
      console.log(
        JSON.stringify(
          {
            dryRun: args.dryRun,
            syncMobile: true,
            websiteCount: websiteRecords.length,
            mobileInserted: mobile.inserted.map(({ id, category, name }) => ({ id, category, name })),
          },
          null,
          2
        )
      );
      return;
    }

    const records = JSON.parse(fs.readFileSync(args.records, "utf8"));
    if (!Array.isArray(records)) throw new Error("--records must point to a JSON array");

    const website = prepareWebsite(args.products, records);
    const mobile = args.mobileProducts
      ? prepareMobile(args.mobileProducts, website.inserted)
      : { data: null, inserted: [] };

    if (!args.dryRun && website.inserted.length) {
      writeJson(args.products, website.data);
      if (args.mobileProducts) appendMobileRecords(args.mobileProducts, mobile.inserted);
    }

    console.log(
      JSON.stringify(
        {
          dryRun: args.dryRun,
          websiteInserted: website.inserted.map(({ id, shopId, name }) => ({ id, shopId, name })),
          mobileInserted: mobile.inserted.map(({ id, category, name }) => ({ id, category, name })),
          skipped: website.skipped,
        },
        null,
        2
      )
    );
  } catch (error) {
    console.error(error && error.message ? error.message : String(error));
    process.exit(1);
  }
}

if (require.main === module) main();

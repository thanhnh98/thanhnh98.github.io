#!/usr/bin/env node

const fs = require("fs");

function parseArgs(argv) {
  const args = { dryRun: false };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry-run") {
      args.dryRun = true;
    } else if (arg === "--records") {
      args.records = argv[++i];
    } else if (arg === "--products") {
      args.products = argv[++i];
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (!args.records) throw new Error("Missing --records");
  if (!args.products) throw new Error("Missing --products");
  return args;
}

function requiredString(record, field) {
  return typeof record[field] === "string" && record[field].trim() !== "";
}

function validateRecord(record) {
  const required = [
    "id",
    "shopId",
    "thumbnail",
    "name",
    "description",
    "type",
    "category",
    "buyText",
    "url",
  ];
  const missing = required.filter((field) => !requiredString(record, field));
  if (missing.length) return `missing ${missing.join(", ")}`;
  if (record.type !== "shopee") return "type must be shopee";
  if (!Array.isArray(record.images)) return "images must be an array";
  if (!record.url.startsWith("https://s.shopee.vn/")) return "url must be a Shopee shortlink";
  if (!record.thumbnail.includes("down-vn.img.susercontent.com/file/")) return "thumbnail must be a Shopee image URL";
  return null;
}

function q(value) {
  return JSON.stringify(String(value));
}

function recordBlock(record, isLast) {
  const lines = [];
  lines.push("         {");
  lines.push(`            "id":${q(record.id)},`);
  lines.push(`            "shopId":${q(record.shopId)},`);
  lines.push(`            "thumbnail":${q(record.thumbnail)},`);
  lines.push('            "images":[');
  record.images.forEach((image, index) => {
    lines.push(`               ${q(image)}${index < record.images.length - 1 ? "," : ""}`);
  });
  lines.push("            ],");
  lines.push(`            "name":${q(record.name)},`);
  lines.push(`            "description":${q(record.description)},`);
  lines.push('            "type":"shopee",');
  lines.push(`            "category":${q(record.category)},`);
  lines.push('            "coinBonus":10,');
  lines.push('            "buyText":"Xem sản phẩm",');
  lines.push(`            "url":${q(record.url)}`);
  lines.push(`         }${isLast ? "" : ","}`);
  return lines.join("\n");
}

function appendRecords(productsPath, records, dryRun) {
  const text = fs.readFileSync(productsPath, "utf8");
  const data = JSON.parse(text);
  if (!data.data || !Array.isArray(data.data.products)) {
    throw new Error("products file must contain data.products array");
  }

  const existingIds = new Set(data.data.products.map((product) => String(product.id || "")));
  const existingPairs = new Set(
    data.data.products.map((product) => `${product.shopId || ""}/${product.id || ""}`)
  );

  const inserted = [];
  const skipped = [];
  const seenPairs = new Set();

  for (const record of records) {
    const reason = validateRecord(record);
    const pair = `${record.shopId || ""}/${record.id || ""}`;
    if (reason) {
      skipped.push({ id: record.id || "", pair, reason });
      continue;
    }
    if (existingIds.has(String(record.id)) || existingPairs.has(pair) || seenPairs.has(pair)) {
      skipped.push({ id: record.id, pair, reason: "duplicate" });
      continue;
    }
    seenPairs.add(pair);
    inserted.push({
      ...record,
      coinBonus: 10,
      buyText: "Xem sản phẩm",
      type: "shopee",
    });
  }

  if (!dryRun && inserted.length) {
    const tail = "\n         }\n      ]\n   }\n}\n";
    if (!text.endsWith(tail)) {
      throw new Error("Unexpected products file tail; append manually after inspecting format");
    }
    const block = inserted.map((record, index) => recordBlock(record, index === inserted.length - 1)).join("\n");
    const updated = text.slice(0, -tail.length) + "\n         },\n" + block + "\n      ]\n   }\n}\n";
    fs.writeFileSync(productsPath, updated);
    JSON.parse(fs.readFileSync(productsPath, "utf8"));
  }

  return {
    dryRun,
    inserted: inserted.map((record) => ({ id: record.id, shopId: record.shopId, name: record.name })),
    skipped,
  };
}

try {
  const args = parseArgs(process.argv);
  const records = JSON.parse(fs.readFileSync(args.records, "utf8"));
  if (!Array.isArray(records)) throw new Error("--records must point to a JSON array");
  const result = appendRecords(args.products, records, args.dryRun);
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error(error && error.message ? error.message : String(error));
  process.exit(1);
}

/** Recheck every curated shortlink and thumbnail before an occasion approaches. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const products = JSON.parse(fs.readFileSync(path.join(root, 'data/aff/products'), 'utf8')).data.products
  .filter(product => product.editorialId);
const collections = JSON.parse(fs.readFileSync(path.join(root, 'data/occasion-gifts.json'), 'utf8')).collections;
const failures = [];
const destinationById = new Map();
let next = 0;

async function check(product) {
  try {
    const response = await fetch(product.url, { redirect: 'manual', signal: AbortSignal.timeout(10000) });
    const destination = response.headers.get('location') || '';
    if (![301, 302, 303, 307, 308].includes(response.status) ||
        !/^https:\/\/shopee\.vn\/(?:opaanlp\/\d+\/\d+|[^?#]+-i\.\d+\.\d+)/.test(destination)) {
      failures.push(`${product.editorialId}: shortlink does not redirect to a Shopee product (${response.status})`);
    } else {
      const match = destination.match(/opaanlp\/(\d+)\/(\d+)/) || destination.match(/-i\.(\d+)\.(\d+)/);
      if (match) destinationById.set(product.editorialId, `${match[1]}.${match[2]}`);
    }
  } catch (error) {
    failures.push(`${product.editorialId}: shortlink request failed (${error.message})`);
  }
  try {
    const response = await fetch(product.thumbnail, { method: 'HEAD', signal: AbortSignal.timeout(10000) });
    if (!response.ok || !/^image\//.test(response.headers.get('content-type') || '')) {
      failures.push(`${product.editorialId}: image unavailable or not an image (${response.status})`);
    }
  } catch (error) {
    failures.push(`${product.editorialId}: image request failed (${error.message})`);
  }
}

async function worker() {
  while (next < products.length) await check(products[next++]);
}

Promise.all(Array.from({ length: 8 }, worker)).then(() => {
  for (const [eventId, collection] of Object.entries(collections)) {
    if (!collection.productIds) continue;
    const destinations = collection.productIds.map(id => destinationById.get(id));
    if (destinations.every(Boolean) && new Set(destinations).size !== 10) {
      failures.push(`${eventId}: two shortlinks resolve to the same product`);
    }
  }
  if (failures.length) {
    console.error(failures.join('\n'));
    process.exitCode = 1;
  } else {
    console.log(`Checked ${products.length} curated product redirects and images.`);
    console.log('Price, stock and variant availability still need confirmation on Shopee.');
  }
});

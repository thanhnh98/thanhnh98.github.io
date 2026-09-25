const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { buildRecipeSchema, parseVnDuration } = require('../js/recipe-schema');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const foodsDir = path.join(root, 'data', 'foods');
const dishIds = fs.readdirSync(foodsDir).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
const loadDish = (id) => JSON.parse(fs.readFileSync(path.join(foodsDir, `${id}.json`), 'utf8'));

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
}

test('Vietnamese durations convert to ISO 8601', () => {
  assert.equal(parseVnDuration('2 giờ'), 'PT2H');
  assert.equal(parseVnDuration('12-14 giờ'), 'PT12H');
  assert.equal(parseVnDuration('1 giờ 30 phút'), 'PT1H30M');
  assert.equal(parseVnDuration('1.5 tiếng'), 'PT1H30M');
  assert.equal(parseVnDuration('90 phút'), 'PT1H30M');
  assert.equal(parseVnDuration('Không cần nấu'), null);
  assert.equal(parseVnDuration(undefined), null);
});

test('every dish with steps gets a complete Recipe; dishes without steps get none', () => {
  for (const id of dishIds) {
    const dish = loadDish(id);
    const schema = buildRecipeSchema(dish, id);
    const hasSteps = Array.isArray(dish.instructions) && dish.instructions.length > 0
      && Array.isArray(dish.ingredients) && dish.ingredients.length > 0;

    if (!hasSteps) {
      assert.equal(schema, null, `${id} has no steps and should not emit a Recipe`);
      continue;
    }

    assert.equal(schema['@type'], 'Recipe');
    assert.ok(schema.name, id);
    assert.ok(schema.image?.[0]?.startsWith('https://'), `${id} needs an absolute image`);
    assert.ok(schema.recipeIngredient.length > 0, id);
    assert.ok(schema.recipeInstructions.every((step) => step['@type'] === 'HowToStep' && step.text), id);
    assert.equal(schema.author['@type'], 'Organization');
    assert.ok(!('datePublished' in schema), `${id} should not carry a made-up datePublished`);
  }
});

test('food listing no longer emits name-only Recipe items', () => {
  const blocks = jsonLdBlocks(read('mon-an-tet.html'));
  const list = blocks.find((block) => block['@type'] === 'ItemList');

  assert.ok(list);
  assert.equal(list.numberOfItems, list.itemListElement.length);
  for (const item of list.itemListElement) {
    assert.equal(item.item, undefined, 'summary list items carry only a url');
    const id = new URL(item.url).searchParams.get('id');
    assert.ok(buildRecipeSchema(loadDish(id), id), `${id} detail page must have Recipe markup`);
  }
  assert.doesNotMatch(read('mon-an-tet.html'), /"@type": "Recipe"/);
});

test('food detail page has no placeholder Recipe and no missing image paths', () => {
  const html = read('chi-tiet-mon-an.html');
  assert.doesNotMatch(html, /assets\/images\/foods\/default\.jpg/);
  assert.doesNotMatch(html, /"datePublished": "2024-01-15"/);
  assert.match(html, /<script src="js\/recipe-schema\.js"><\/script>/);
  assert.deepEqual(jsonLdBlocks(html).filter((block) => block['@type'] === 'Recipe'), []);
});

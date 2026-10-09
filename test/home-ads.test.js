const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '../js/home-ads.js'), 'utf8');
function setup(hostname = 'saptet.vn', mode = 'on', status = null) {
  const controls = {};
  const moved = [];
  const ad = { dataset: {}, getAttribute: () => status };
  const context = vm.createContext({
    document: {
      body: { dataset: { homeManualAds: mode } },
      getElementById: () => controls,
      querySelector: selector => selector.includes('home-share-strip')
        ? { appendChild: element => moved.push(element) } : ad,
    },
    location: { hostname },
    window: {},
  });
  return { context, moved, controls, ad, run: () => vm.runInContext(source, context) };
}
test('production homepage requests the manual unit once', () => {
  for (const host of ['saptet.vn', 'www.saptet.vn']) {
    const state = setup(host);
    state.run();
    state.run();
    assert.equal(state.context.window.adsbygoogle.length, 1);
    assert.equal(state.moved[0], state.controls);
  }
});
test('local previews and disabled manual mode do not request ads', () => {
  for (const [host, mode] of [['127.0.0.1', 'on'], ['localhost', 'on'], ['saptet.vn', 'off']]) {
    const state = setup(host, mode);
    state.run();
    assert.equal(state.context.window.adsbygoogle, undefined);
    assert.equal(state.moved[0], state.controls);
  }
});
test('already initialized units are not queued again', () => {
  const state = setup('saptet.vn', 'on', 'done');
  state.run();
  assert.equal(state.context.window.adsbygoogle, undefined);
});

test('homepage defaults to Auto-only without a reserved manual gap', () => {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  const css = fs.readFileSync(path.join(__dirname, '../css/home-retention.css'), 'utf8');
  assert.match(html, /<body data-home-manual-ads="off">/);
  assert.match(css, /body\[data-home-manual-ads="off"\] \.home-countdown-ad \{ display: none; \}/);
  assert.match(css, /\.home-share-strip \.home-hero-actions \{ display: none; \}/);
});

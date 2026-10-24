const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const test = require('node:test');

const modulePath = path.resolve(__dirname, '../js/vietnam-date.js');

function vietnamDateAt(instant, timezone) {
  const source = `const { getVietnamToday } = require(${JSON.stringify(modulePath)});
    const date = getVietnamToday(new Date(${JSON.stringify(instant)}));
    process.stdout.write([date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'));`;
  const result = spawnSync(process.execPath, ['-e', source], {
    env: { ...process.env, TZ: timezone }, encoding: 'utf8'
  });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout;
}

test('today changes at midnight in Vietnam regardless of the visitor timezone', () => {
  for (const timezone of ['Asia/Ho_Chi_Minh', 'America/Los_Angeles', 'Pacific/Auckland']) {
    assert.equal(vietnamDateAt('2026-10-24T16:59:00Z', timezone), '2026-10-24');
    assert.equal(vietnamDateAt('2026-10-24T17:01:00Z', timezone), '2026-10-25');
  }
});

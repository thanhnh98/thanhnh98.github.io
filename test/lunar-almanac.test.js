const assert = require('node:assert/strict');
const test = require('node:test');

const almanac = require('../js/lunar-almanac.js');

// Fixtures đối chiếu ngày 2026-09-19 với licham.com.vn (ngày Bính Thân, tháng Đinh Dậu,
// năm Bính Ngọ, âm lịch 9/8, trực Bế, sao Bạch Hổ hắc đạo, tiết Bạch Lộ) và bảng giờ
// hoàng đạo / 12 trực theo thuật toán Hồ Ngọc Đức. Bảng hướng Hỷ Thần / Tài Thần theo
// kimvan.com.vn và lich365.net (hai nguồn trùng nhau). Tuổi xung theo quy tắc
// "thiên khắc địa xung": chi lục xung với ngày, can khắc/bị khắc bởi can ngày.
const TODAY = new Date(2026, 8, 19);
const TET_2027 = new Date(2027, 1, 6);
const Y2K = new Date(2000, 0, 1);
const LEAP_MONTH_DAY = new Date(2025, 6, 25); // mùng 1 tháng 6 nhuận Ất Tỵ

test('getCanChi returns day, month and year stems/branches', () => {
  assert.deepEqual(almanac.getCanChi(TODAY), {
    day: { can: 'Bính', chi: 'Thân' },
    month: { can: 'Đinh', chi: 'Dậu' },
    year: { can: 'Bính', chi: 'Ngọ' }
  });
  assert.deepEqual(almanac.getCanChi(TET_2027), {
    day: { can: 'Bính', chi: 'Thìn' },
    month: { can: 'Nhâm', chi: 'Dần' },
    year: { can: 'Đinh', chi: 'Mùi' }
  });
  assert.deepEqual(almanac.getCanChi(Y2K).day, { can: 'Mậu', chi: 'Ngọ' });
});

test('getCanChi keeps the branch of a leap month equal to the regular month', () => {
  const result = almanac.getCanChi(LEAP_MONTH_DAY);
  assert.equal(result.month.chi, 'Mùi');
});

test('getLuckyHours follows the six-pair table keyed by day branch', () => {
  const than = almanac.getLuckyHours('Thân');
  assert.deepEqual(than.good.map((h) => h.chi), ['Tý', 'Sửu', 'Thìn', 'Tỵ', 'Mùi', 'Tuất']);
  assert.deepEqual(than.bad.map((h) => h.chi), ['Dần', 'Mão', 'Ngọ', 'Thân', 'Dậu', 'Hợi']);
  assert.equal(than.good[0].range, '23h-1h');

  assert.deepEqual(almanac.getLuckyHours('Thìn').good.map((h) => h.chi), ['Dần', 'Thìn', 'Tỵ', 'Thân', 'Dậu', 'Hợi']);
  assert.deepEqual(almanac.getLuckyHours('Ngọ').good.map((h) => h.chi), ['Tý', 'Sửu', 'Mão', 'Ngọ', 'Thân', 'Dậu']);
});

test('every day branch has exactly six lucky hours disjoint from the unlucky ones', () => {
  for (const chi of almanac.CHIS) {
    const hours = almanac.getLuckyHours(chi);
    assert.equal(hours.good.length, 6, chi);
    assert.equal(hours.bad.length, 6, chi);
    const overlap = hours.good.filter((g) => hours.bad.some((b) => b.chi === g.chi));
    assert.equal(overlap.length, 0, chi);
  }
});

test('getDayStar names the star and hoang dao / hac dao status', () => {
  assert.deepEqual(almanac.getDayStar('Dậu', 'Thân'), { star: 'Bạch Hổ', status: 'hac-dao' });
  assert.deepEqual(almanac.getDayStar('Dần', 'Thìn'), { star: 'Kim Quỹ', status: 'hoang-dao' });
  assert.deepEqual(almanac.getDayStar('Dần', 'Tý'), { star: 'Thanh Long', status: 'hoang-dao' });
});

test('each month has six hoang dao branches', () => {
  for (const monthChi of almanac.CHIS) {
    const good = almanac.CHIS.filter((dayChi) => almanac.getDayStar(monthChi, dayChi).status === 'hoang-dao');
    assert.equal(good.length, 6, monthChi);
  }
});

test('getTruc walks the twelve truc starting at Kien on the month branch', () => {
  assert.equal(almanac.getTruc('Dậu', 'Thân').name, 'Bế');
  assert.equal(almanac.getTruc('Dần', 'Thìn').name, 'Mãn');
  assert.equal(almanac.getTruc('Dần', 'Dần').name, 'Kiến');
  assert.equal(almanac.getTruc('Dần', 'Sửu').name, 'Bế');
});

test('every truc carries non-empty nen and kieng lists', () => {
  for (const dayChi of almanac.CHIS) {
    const truc = almanac.getTruc('Dần', dayChi);
    assert.ok(Array.isArray(truc.nen) && truc.nen.length > 0, truc.name);
    assert.ok(Array.isArray(truc.kieng) && truc.kieng.length > 0, truc.name);
  }
});

test('getNapAm uses the sixty hoa giap table', () => {
  assert.deepEqual(almanac.getNapAm('Bính', 'Thân'), { name: 'Sơn Hạ Hỏa', element: 'Hỏa' });
  assert.deepEqual(almanac.getNapAm('Bính', 'Thìn'), { name: 'Sa Trung Thổ', element: 'Thổ' });
  assert.deepEqual(almanac.getNapAm('Mậu', 'Ngọ'), { name: 'Thiên Thượng Hỏa', element: 'Hỏa' });
  assert.deepEqual(almanac.getNapAm('Giáp', 'Tý'), { name: 'Hải Trung Kim', element: 'Kim' });
  assert.deepEqual(almanac.getNapAm('Quý', 'Hợi'), { name: 'Đại Hải Thủy', element: 'Thủy' });
});

test('the sixty valid can-chi pairs all resolve to a nap am and invalid pairs do not', () => {
  const names = new Set();
  let valid = 0;
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 12; j += 1) {
      const result = almanac.getNapAm(almanac.CANS[i], almanac.CHIS[j]);
      if ((i % 2) === (j % 2)) {
        valid += 1;
        assert.ok(result && result.name, `${almanac.CANS[i]} ${almanac.CHIS[j]}`);
        names.add(result.name);
      } else {
        assert.equal(result, null);
      }
    }
  }
  assert.equal(valid, 60);
  assert.equal(names.size, 30);
});

test('getDirections maps the day stem to Hy Than and Tai Than', () => {
  assert.deepEqual(almanac.getDirections('Bính'), { hyThan: 'Tây Nam', taiThan: 'Chính Đông' });
  assert.deepEqual(almanac.getDirections('Mậu'), { hyThan: 'Đông Nam', taiThan: 'Chính Bắc' });
  assert.deepEqual(almanac.getDirections('Canh'), { hyThan: 'Tây Bắc', taiThan: 'Tây Nam' });
  assert.deepEqual(almanac.getDirections('Quý'), { hyThan: 'Đông Nam', taiThan: 'Tây Bắc' });
});

test('getConflictAges returns the two thien khac dia xung ages', () => {
  assert.deepEqual(almanac.getConflictAges('Bính', 'Thân'), ['Canh Dần', 'Nhâm Dần']);
  assert.deepEqual(almanac.getConflictAges('Giáp', 'Tý'), ['Mậu Ngọ', 'Canh Ngọ']);
  assert.deepEqual(almanac.getConflictAges('Ất', 'Sửu'), ['Kỷ Mùi', 'Tân Mùi']);
});

test('getSolarTerm returns the tiet khi for a date', () => {
  assert.equal(almanac.getSolarTerm(TODAY), 'Bạch Lộ');
  assert.equal(almanac.getSolarTerm(new Date(2026, 0, 10)), 'Tiểu Hàn');
});

test('getAlmanac aggregates everything for a date', () => {
  const result = almanac.getAlmanac(TODAY);
  assert.deepEqual(result.lunar, { day: 9, month: 8, year: 2026, isLeapMonth: false });
  assert.equal(result.canChi.day.chi, 'Thân');
  assert.equal(result.star.star, 'Bạch Hổ');
  assert.equal(result.truc.name, 'Bế');
  assert.equal(result.napAm.name, 'Sơn Hạ Hỏa');
  assert.equal(result.solarTerm, 'Bạch Lộ');
  assert.deepEqual(result.directions, { hyThan: 'Tây Nam', taiThan: 'Chính Đông' });
  assert.deepEqual(result.conflictAges, ['Canh Dần', 'Nhâm Dần']);
  assert.equal(result.luckyHours.good.length, 6);
  assert.equal(result.weekday, 'Thứ Bảy');
});

test('DISCLAIMER_TEXT is a folk-reference disclaimer, not advice', () => {
  assert.equal(typeof almanac.DISCLAIMER_TEXT, 'string');
  assert.match(almanac.DISCLAIMER_TEXT, /tham khảo/);
  assert.match(almanac.DISCLAIMER_TEXT, /dân gian/);
  assert.doesNotMatch(almanac.DISCLAIMER_TEXT, /chính xác nhất/);
});

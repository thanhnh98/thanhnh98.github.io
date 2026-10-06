/**
 * Lịch dân gian dùng chung (can chi, giờ hoàng đạo, 12 trực, sao, nạp âm, hướng, tuổi xung).
 * Phụ thuộc js/lunar-calendar.js (calculateLunarDate, jdFromDate).
 *
 * Nguồn bảng: giờ hoàng đạo + 12 trực + 12 sao theo thuật toán lịch âm Hồ Ngọc Đức;
 * hướng Hỷ Thần / Tài Thần theo kimvan.com.vn và lich365.net; nạp âm theo bảng 60 hoa giáp;
 * tuổi xung theo quy tắc "thiên khắc địa xung". Tất cả chỉ mang tính tham khảo dân gian.
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('./lunar-calendar.js'));
  } else {
    root.LunarAlmanac = factory({
      calculateLunarDate: root.calculateLunarDate,
      jdFromDate: root.jdFromDate
    });
  }
})(typeof window !== 'undefined' ? window : globalThis, function (lunarCalendar) {
  'use strict';

  var CANS = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  var CHIS = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  var HOUR_RANGES = ['23h-1h', '1h-3h', '3h-5h', '5h-7h', '7h-9h', '9h-11h', '11h-13h', '13h-15h', '15h-17h', '17h-19h', '19h-21h', '21h-23h'];
  var WEEKDAYS = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  var LUNAR_MONTH_NAMES = ['Giêng', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười', 'Mười một', 'Chạp'];

  // Giờ hoàng đạo theo địa chi ngày; mỗi chuỗi là 12 bit Tý..Hợi cho cặp chi (Tý/Ngọ, Sửu/Mùi, ...).
  var LUCKY_HOUR_MASKS = ['110100101100', '001101001011', '110011010010', '101100110100', '001011001101', '010010110011'];

  // 12 sao theo chu kỳ Thanh Long; các sao ở vị trí HOANG_DAO_STAR_INDEX là ngày hoàng đạo.
  var STARS = ['Thanh Long', 'Minh Đường', 'Thiên Hình', 'Chu Tước', 'Kim Quỹ', 'Thiên Đức', 'Bạch Hổ', 'Ngọc Đường', 'Thiên Lao', 'Nguyên Vũ', 'Tư Mệnh', 'Câu Trần'];
  var HOANG_DAO_STAR_INDEX = [0, 1, 4, 5, 7, 10];

  var TRUCS = [
    { name: 'Kiến', nen: ['Xuất hành', 'Cầu tài', 'Nhậm chức', 'Trồng cây', 'Cưới hỏi'], kieng: ['Động thổ', 'Đào giếng', 'Chôn cất', 'Lợp nhà'] },
    { name: 'Trừ', nen: ['Dọn dẹp, bỏ cái cũ', 'Chữa bệnh', 'Cúng tế', 'Tẩy uế'], kieng: ['Cưới hỏi', 'Khai trương', 'Nhậm chức', 'Xuất hành xa'] },
    { name: 'Mãn', nen: ['Cúng tế', 'Cầu phúc', 'Sửa kho', 'Đặt móng bếp'], kieng: ['Nhậm chức', 'Cưới hỏi', 'Kiện tụng', 'Chuyển nhà'] },
    { name: 'Bình', nen: ['Cưới hỏi', 'Sửa đường', 'Dọn nhà', 'Giao dịch'], kieng: ['Đào giếng', 'Khơi mương'] },
    { name: 'Định', nen: ['Cưới hỏi', 'Ký kết', 'Khai trương', 'Mua gia súc'], kieng: ['Kiện tụng', 'Xuất hành xa', 'Chữa bệnh'] },
    { name: 'Chấp', nen: ['Sửa chữa', 'Xây dựng', 'Cấy trồng', 'Săn bắt'], kieng: ['Chuyển nhà', 'Xuất hành', 'Khai trương', 'Xuất tiền'] },
    { name: 'Phá', nen: ['Phá dỡ nhà cũ', 'Dọn dẹp', 'Chữa bệnh'], kieng: ['Cưới hỏi', 'Khai trương', 'Ký kết', 'Động thổ'] },
    { name: 'Nguy', nen: ['Nghỉ ngơi', 'Cúng tế', 'Tĩnh tâm'], kieng: ['Việc lớn', 'Xuất hành', 'Cưới hỏi', 'Động thổ'] },
    { name: 'Thành', nen: ['Khai trương', 'Cưới hỏi', 'Nhậm chức', 'Nhập trạch', 'Nhập học'], kieng: ['Kiện tụng', 'Tranh chấp'] },
    { name: 'Thu', nen: ['Thu hoạch', 'Cất giữ', 'Mở kho', 'Nhập học'], kieng: ['An táng', 'Xuất hành', 'Cưới hỏi'] },
    { name: 'Khai', nen: ['Khai trương', 'Khởi công', 'Nhập học', 'Cưới hỏi', 'Xuất hành'], kieng: ['An táng', 'Động thổ'] },
    { name: 'Bế', nen: ['Đắp đê', 'Lấp hố', 'Xây tường', 'Nghỉ ngơi'], kieng: ['Khai trương', 'Xuất hành', 'Cưới hỏi', 'Chữa mắt'] }
  ];

  // Bảng 60 hoa giáp: mỗi tên dùng cho 2 can chi liên tiếp (Giáp Tý/Ất Sửu, Bính Dần/Đinh Mão, ...).
  var NAP_AM = [
    'Hải Trung Kim', 'Lư Trung Hỏa', 'Đại Lâm Mộc', 'Lộ Bàng Thổ', 'Kiếm Phong Kim',
    'Sơn Đầu Hỏa', 'Giản Hạ Thủy', 'Thành Đầu Thổ', 'Bạch Lạp Kim', 'Dương Liễu Mộc',
    'Tuyền Trung Thủy', 'Ốc Thượng Thổ', 'Tích Lịch Hỏa', 'Tùng Bách Mộc', 'Trường Lưu Thủy',
    'Sa Trung Kim', 'Sơn Hạ Hỏa', 'Bình Địa Mộc', 'Bích Thượng Thổ', 'Kim Bạch Kim',
    'Phú Đăng Hỏa', 'Thiên Hà Thủy', 'Đại Trạch Thổ', 'Thoa Xuyến Kim', 'Tang Đố Mộc',
    'Đại Khê Thủy', 'Sa Trung Thổ', 'Thiên Thượng Hỏa', 'Thạch Lựu Mộc', 'Đại Hải Thủy'
  ];

  var HY_THAN = { 'Giáp': 'Đông Bắc', 'Kỷ': 'Đông Bắc', 'Ất': 'Tây Bắc', 'Canh': 'Tây Bắc', 'Bính': 'Tây Nam', 'Tân': 'Tây Nam', 'Đinh': 'Chính Nam', 'Nhâm': 'Chính Nam', 'Mậu': 'Đông Nam', 'Quý': 'Đông Nam' };
  var TAI_THAN = { 'Giáp': 'Đông Nam', 'Ất': 'Đông Nam', 'Bính': 'Chính Đông', 'Đinh': 'Chính Đông', 'Mậu': 'Chính Bắc', 'Kỷ': 'Chính Nam', 'Canh': 'Tây Nam', 'Tân': 'Tây Nam', 'Nhâm': 'Chính Tây', 'Quý': 'Tây Bắc' };

  // Ngũ hành của can theo cặp: Giáp/Ất Mộc, Bính/Đinh Hỏa, Mậu/Kỷ Thổ, Canh/Tân Kim, Nhâm/Quý Thủy.
  // Thứ tự Mộc → Hỏa → Thổ → Kim → Thủy: hành i khắc hành (i + 2) % 5.
  var SOLAR_TERMS = [
    'Xuân Phân', 'Thanh Minh', 'Cốc Vũ', 'Lập Hạ', 'Tiểu Mãn', 'Mang Chủng',
    'Hạ Chí', 'Tiểu Thử', 'Đại Thử', 'Lập Thu', 'Xử Thử', 'Bạch Lộ',
    'Thu Phân', 'Hàn Lộ', 'Sương Giáng', 'Lập Đông', 'Tiểu Tuyết', 'Đại Tuyết',
    'Đông Chí', 'Tiểu Hàn', 'Đại Hàn', 'Lập Xuân', 'Vũ Thủy', 'Kinh Trập'
  ];

  var DISCLAIMER_TEXT = 'Thông tin giờ hoàng đạo, ngày tốt xấu, hướng xuất hành, tuổi xung và việc nên làm/kiêng kỵ được tổng hợp theo quan niệm dân gian và lịch can chi truyền thống, chỉ mang tính tham khảo, không phải lời khuyên. Bạn tự cân nhắc khi đưa ra quyết định.';

  function indexOfChi(chi) { return CHIS.indexOf(chi); }
  function indexOfCan(can) { return CANS.indexOf(can); }

  function getCanChi(date) {
    var lunar = lunarCalendar.calculateLunarDate(date);
    var jd = lunarCalendar.jdFromDate(date.getDate(), date.getMonth() + 1, date.getFullYear());
    var yearCanIndex = ((lunar.year - 4) % 10 + 10) % 10;
    var month1CanIndex = (yearCanIndex * 2 + 2) % 10;
    return {
      day: { can: CANS[(jd + 9) % 10], chi: CHIS[(jd + 1) % 12] },
      month: { can: CANS[(month1CanIndex + lunar.month - 1) % 10], chi: CHIS[(lunar.month + 1) % 12] },
      year: { can: CANS[yearCanIndex], chi: CHIS[((lunar.year - 4) % 12 + 12) % 12] }
    };
  }

  function getLuckyHours(dayChi) {
    var mask = LUCKY_HOUR_MASKS[indexOfChi(dayChi) % 6];
    var good = [];
    var bad = [];
    for (var i = 0; i < 12; i += 1) {
      (mask.charAt(i) === '1' ? good : bad).push({ chi: CHIS[i], range: HOUR_RANGES[i] });
    }
    return { good: good, bad: bad };
  }

  function getDayStar(monthChi, dayChi) {
    var start = (((indexOfChi(monthChi) - 2) % 6 + 6) % 6) * 2; // vị trí Thanh Long theo tháng
    var index = ((indexOfChi(dayChi) - start) % 12 + 12) % 12;
    return {
      star: STARS[index],
      status: HOANG_DAO_STAR_INDEX.indexOf(index) !== -1 ? 'hoang-dao' : 'hac-dao'
    };
  }

  function getTruc(monthChi, dayChi) {
    var index = ((indexOfChi(dayChi) - indexOfChi(monthChi)) % 12 + 12) % 12;
    var truc = TRUCS[index];
    return { name: truc.name, nen: truc.nen.slice(), kieng: truc.kieng.slice() };
  }

  function getNapAm(can, chi) {
    var c = indexOfCan(can);
    var j = indexOfChi(chi);
    if (c < 0 || j < 0 || (c % 2) !== (j % 2)) return null;
    var d = ((j - c) % 12 + 12) % 12;
    var t = (5 * (d / 2)) % 6;
    var sexagenary = c + 10 * t;
    var name = NAP_AM[Math.floor(sexagenary / 2)];
    return { name: name, element: name.split(' ').pop() };
  }

  function getDirections(dayCan) {
    return { hyThan: HY_THAN[dayCan], taiThan: TAI_THAN[dayCan] };
  }

  function getConflictAges(dayCan, dayChi) {
    var c = indexOfCan(dayCan);
    var parity = c % 2;
    var element = Math.floor(c / 2);
    var xungChi = CHIS[(indexOfChi(dayChi) + 6) % 12];
    var khac = ((element + 2) % 5) * 2 + parity;      // can bị can ngày khắc
    var biKhac = ((element + 3) % 5) * 2 + parity;    // can khắc can ngày
    return [khac, biKhac].sort(function (a, b) { return a - b; }).map(function (index) {
      return CANS[index] + ' ' + xungChi;
    });
  }

  function sunLongitudeDegrees(jd) {
    var t = (jd - 2451545.0) / 36525;
    var t2 = t * t;
    var dr = Math.PI / 180;
    var m = 357.52910 + 35999.05030 * t - 0.0001559 * t2 - 0.00000048 * t * t2;
    var l0 = 280.46645 + 36000.76983 * t + 0.0003032 * t2;
    var dl = (1.914600 - 0.004817 * t - 0.000014 * t2) * Math.sin(dr * m);
    dl += (0.019993 - 0.000101 * t) * Math.sin(dr * 2 * m) + 0.000290 * Math.sin(dr * 3 * m);
    var l = (l0 + dl) % 360;
    return l < 0 ? l + 360 : l;
  }

  function getSolarTerm(date) {
    // 12h trưa giờ Việt Nam = 05:00 UTC; jdFromDate trả JDN tại 12h UTC.
    var jd = lunarCalendar.jdFromDate(date.getDate(), date.getMonth() + 1, date.getFullYear()) - 7 / 24;
    return SOLAR_TERMS[Math.floor(sunLongitudeDegrees(jd) / 15) % 24];
  }

  function getAlmanac(date) {
    var lunarRaw = lunarCalendar.calculateLunarDate(date);
    var canChi = getCanChi(date);
    return {
      solar: { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() },
      weekday: WEEKDAYS[date.getDay()],
      lunar: { day: lunarRaw.day, month: lunarRaw.month, year: lunarRaw.year, isLeapMonth: lunarRaw.isLeapMonth },
      lunarMonthName: LUNAR_MONTH_NAMES[lunarRaw.month - 1],
      canChi: canChi,
      luckyHours: getLuckyHours(canChi.day.chi),
      star: getDayStar(canChi.month.chi, canChi.day.chi),
      truc: getTruc(canChi.month.chi, canChi.day.chi),
      napAm: getNapAm(canChi.day.can, canChi.day.chi),
      directions: getDirections(canChi.day.can),
      conflictAges: getConflictAges(canChi.day.can, canChi.day.chi),
      solarTerm: getSolarTerm(date)
    };
  }

  return {
    CANS: CANS,
    CHIS: CHIS,
    WEEKDAYS: WEEKDAYS,
    LUNAR_MONTH_NAMES: LUNAR_MONTH_NAMES,
    DISCLAIMER_TEXT: DISCLAIMER_TEXT,
    getCanChi: getCanChi,
    getLuckyHours: getLuckyHours,
    getDayStar: getDayStar,
    getTruc: getTruc,
    getNapAm: getNapAm,
    getDirections: getDirections,
    getConflictAges: getConflictAges,
    getSolarTerm: getSolarTerm,
    getAlmanac: getAlmanac
  };
});

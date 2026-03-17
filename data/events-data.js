/**
 * Dữ liệu các sự kiện quan trọng trong năm
 * I. Theo âm lịch | II. Theo dương lịch
 * Dùng cho trang "Các sự kiện quan trọng" và tích hợp lịch vạn niên.
 */

(function (global) {
  /** Sự kiện theo ÂM LỊCH (key: "lunarMonth-lunarDay" để tra cứu theo ngày âm) */
  var LUNAR_EVENTS = [
    { lunarMonth: 1, lunarDay: 1, name: 'Tết Nguyên Đán', lunarLabel: 'Mùng 1 Tết', description: 'Ngày Tết cổ truyền lớn nhất năm. Tết Nguyên Đán là dịp sum họp gia đình, cúng ông bà tổ tiên và đón năm mới theo lịch âm.', type: 'major', isMainTet: true },
    { lunarMonth: 1, lunarDay: 10, name: 'Ngày vía Thần Tài', lunarLabel: 'Mùng 10 tháng Giêng (10/1)', description: 'Ngày vía Thần Tài theo tín ngưỡng dân gian. Nhiều gia đình, cửa hàng làm lễ cầu tài lộc, may mắn đầu năm.', type: 'major' },
    { lunarMonth: 1, lunarDay: 15, name: 'Tết Nguyên Tiêu (Rằm tháng Giêng)', lunarLabel: 'Rằm tháng Giêng (15/1)', description: 'Tết Nguyên Tiêu. Câu nói dân gian: "Lễ Phật quanh năm không bằng Rằm tháng Giêng". Ngày lễ Phật, cầu an, thắp đèn lồng.', type: 'major' },
    { lunarMonth: 3, lunarDay: 3, name: 'Tết Hàn Thực', lunarLabel: '3/3 âm lịch', description: 'Tết Hàn Thực – ăn đồ nguội. Truyền thống làm bánh trôi, bánh chay để tưởng nhớ.', type: 'major' },
    { lunarMonth: 3, lunarDay: 10, name: 'Giỗ Tổ Hùng Vương', lunarLabel: '10/3 âm lịch', description: 'Quốc lễ – nghỉ lễ chính thức. Ngày giỗ các Vua Hùng, tưởng nhớ công ơn dựng nước.', type: 'major', isNationalHoliday: true },
    { lunarMonth: 5, lunarDay: 5, name: 'Tết Đoan Ngọ', lunarLabel: '5/5 âm lịch', description: 'Tết Đoan Ngọ – "Diệt sâu bọ". Dân gian ăn rượu nếp, trái cây, tắm nước lá vào giờ Ngọ để trừ bệnh.', type: 'major' },
    { lunarMonth: 7, lunarDay: 15, name: 'Rằm tháng Bảy – Vu Lan', lunarLabel: 'Rằm tháng Bảy (15/7)', description: 'Vu Lan – Xá tội vong nhân. Ngày báo hiếu cha mẹ, cúng cô hồn, tưởng nhớ người đã khuất.', type: 'major' },
    { lunarMonth: 8, lunarDay: 15, name: 'Tết Trung Thu', lunarLabel: 'Rằm tháng Tám (15/8)', description: 'Tết thiếu nhi truyền thống. Rước đèn, phá cỗ, bày mâm ngũ quả, múa lân.', type: 'major' },
    { lunarMonth: 9, lunarDay: 9, name: 'Tết Trùng Cửu', lunarLabel: '9/9 âm lịch', description: 'Tết Trùng Cửu – ngày dưỡng sinh, trường thọ. Truyền thống leo cao, uống trà cúc, cầu bình an.', type: 'major' },
    { lunarMonth: 10, lunarDay: 15, name: 'Tết Hạ Nguyên', lunarLabel: 'Rằm tháng Mười (15/10)', description: 'Tết Hạ Nguyên – lễ tạ ơn cuối vụ mùa. Cúng tổ tiên, cảm tạ trời đất.', type: 'major' },
    { lunarMonth: 12, lunarDay: 23, name: 'Ông Công Ông Táo', lunarLabel: '23 tháng Chạp (23/12)', description: 'Tiễn Táo Quân về trời. Lễ cúng ông Công ông Táo, phóng sinh cá chép, dọn bếp.', type: 'major' }
  ];

  /** Sự kiện theo DƯƠNG LỊCH – Ngày lễ, kỷ niệm lớn Việt Nam (month, day – cố định hàng năm) */
  var SOLAR_EVENTS_VIETNAM = [
    { month: 1, day: 1, name: 'Tết Dương lịch', description: 'Ngày đầu năm mới theo dương lịch. Nghỉ lễ chính thức.', type: 'national', isHoliday: true },
    { month: 2, day: 3, name: 'Ngày thành lập Đảng Cộng sản Việt Nam', description: 'Kỷ niệm ngày thành lập Đảng Cộng sản Việt Nam (3/2/1930).', type: 'national' },
    { month: 2, day: 27, name: 'Ngày Thầy thuốc Việt Nam', description: 'Ngày tôn vinh các thầy thuốc và ngành y tế Việt Nam.', type: 'national' },
    { month: 3, day: 8, name: 'Quốc tế Phụ nữ', description: 'Ngày Quốc tế Phụ nữ 8/3.', type: 'national' },
    { month: 3, day: 26, name: 'Ngày thành lập Đoàn TNCS Hồ Chí Minh', description: 'Kỷ niệm ngày thành lập Đoàn Thanh niên Cộng sản Hồ Chí Minh.', type: 'national' },
    { month: 4, day: 30, name: 'Ngày Giải phóng miền Nam', description: 'Ngày thống nhất đất nước (30/4/1975). Nghỉ lễ chính thức.', type: 'national', isHoliday: true },
    { month: 5, day: 1, name: 'Quốc tế Lao động', description: 'Ngày Quốc tế Lao động. Nghỉ lễ chính thức.', type: 'national', isHoliday: true },
    { month: 5, day: 7, name: 'Chiến thắng Điện Biên Phủ', description: 'Kỷ niệm Chiến thắng Điện Biên Phủ (7/5/1954).', type: 'national' },
    { month: 5, day: 19, name: 'Ngày sinh Chủ tịch Hồ Chí Minh', description: 'Kỷ niệm ngày sinh Chủ tịch Hồ Chí Minh (19/5/1890).', type: 'national' },
    { month: 6, day: 1, name: 'Quốc tế Thiếu nhi', description: 'Ngày Quốc tế Thiếu nhi 1/6.', type: 'national' },
    { month: 7, day: 27, name: 'Ngày Thương binh – Liệt sĩ', description: 'Ngày tri ân thương binh, liệt sĩ (27/7). Nghỉ lễ không? Theo quy định hiện hành.', type: 'national' },
    { month: 8, day: 19, name: 'Cách mạng Tháng Tám', description: 'Kỷ niệm Cách mạng Tháng Tám (19/8/1945).', type: 'national' },
    { month: 9, day: 2, name: 'Quốc khánh Việt Nam', description: 'Ngày Quốc khánh nước Cộng hòa Xã hội chủ nghĩa Việt Nam (2/9/1945). Nghỉ lễ chính thức.', type: 'national', isHoliday: true },
    { month: 10, day: 10, name: 'Giải phóng Thủ đô', description: 'Kỷ niệm Giải phóng Thủ đô Hà Nội (10/10/1954).', type: 'national' },
    { month: 10, day: 20, name: 'Ngày Phụ nữ Việt Nam', description: 'Ngày Phụ nữ Việt Nam 20/10.', type: 'national' },
    { month: 12, day: 22, name: 'Ngày thành lập Quân đội Nhân dân Việt Nam', description: 'Kỷ niệm Ngày thành lập Quân đội Nhân dân Việt Nam (22/12/1944).', type: 'national' }
  ];

  /** Sự kiện quốc tế / hay dùng làm content, giáo dục */
  var SOLAR_EVENTS_INTERNATIONAL = [
    { month: 2, day: 14, name: 'Valentine', description: 'Ngày Valentine (14/2) – ngày tình nhân.', type: 'international' },
    { month: 3, day: 20, name: 'Quốc tế Hạnh phúc', description: 'Ngày Quốc tế Hạnh phúc (20/3).', type: 'international' },
    { month: 3, day: 22, name: 'Ngày Nước Thế giới', description: 'Ngày Nước Thế giới (22/3).', type: 'international' },
    { month: 4, day: 22, name: 'Ngày Trái Đất', description: 'Ngày Trái Đất (22/4).', type: 'international' },
    { month: 5, day: 1, name: 'Quốc tế Lao động', description: 'Ngày Quốc tế Lao động (toàn cầu).', type: 'international' },
    { month: 6, day: 5, name: 'Ngày Môi trường Thế giới', description: 'Ngày Môi trường Thế giới (5/6).', type: 'international' },
    { month: 6, day: 28, name: 'Ngày Gia đình Việt Nam', description: 'Ngày Gia đình Việt Nam (28/6).', type: 'international' },
    { month: 10, day: 13, name: 'Ngày Doanh nhân Việt Nam', description: 'Ngày Doanh nhân Việt Nam (13/10).', type: 'international' },
    { month: 11, day: 20, name: 'Ngày Nhà giáo Việt Nam', description: 'Ngày Nhà giáo Việt Nam (20/11).', type: 'international' },
    { month: 12, day: 1, name: 'Ngày Thế giới phòng chống AIDS', description: 'Ngày Thế giới phòng chống AIDS (1/12).', type: 'international' },
    { month: 12, day: 25, name: 'Giáng Sinh', description: 'Lễ Giáng Sinh (Christmas) – 25/12.', type: 'international' }
  ];

  /** Map lunar "month-day" -> event (để tra theo ngày âm trên lịch) */
  function getLunarEventMap() {
    var map = {};
    LUNAR_EVENTS.forEach(function (ev) {
      var key = ev.lunarMonth + '-' + ev.lunarDay;
      map[key] = ev;
    });
    return map;
  }

  /** Map solar "month-day" -> events (để tra theo ngày dương, 1 key có thể nhiều sự kiện) */
  function getSolarEventMap() {
    var map = {};
    SOLAR_EVENTS_VIETNAM.concat(SOLAR_EVENTS_INTERNATIONAL).forEach(function (ev) {
      var key = ev.month + '-' + ev.day;
      if (!map[key]) map[key] = [];
      map[key].push(ev);
    });
    return map;
  }

  global.EVENTS_DATA = {
    LUNAR_EVENTS: LUNAR_EVENTS,
    SOLAR_EVENTS_VIETNAM: SOLAR_EVENTS_VIETNAM,
    SOLAR_EVENTS_INTERNATIONAL: SOLAR_EVENTS_INTERNATIONAL,
    getLunarEventMap: getLunarEventMap,
    getSolarEventMap: getSolarEventMap
  };
})(typeof window !== 'undefined' ? window : this);

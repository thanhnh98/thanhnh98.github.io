/**
 * Dữ liệu các sự kiện quan trọng trong năm
 * I. Theo âm lịch | II. Theo dương lịch
 * Dùng cho trang "Các sự kiện quan trọng" và tích hợp lịch vạn niên.
 */

(function (global) {
  /** Sự kiện theo ÂM LỊCH (key: "lunarMonth-lunarDay" để tra cứu theo ngày âm) */
  var LUNAR_EVENTS = [
    { id: 'lunar-tet-nguyen-dan', lunarMonth: 1, lunarDay: 1, name: 'Tết Nguyên Đán', lunarLabel: 'Mùng 1 Tết', description: 'Ngày đầu tiên của Tết cổ truyền Việt Nam, dịp gia đình sum họp, tưởng nhớ tổ tiên và đón năm mới âm lịch.', type: 'major', isMainTet: true, isNationalHoliday: true },
    { id: 'lunar-via-than-tai', lunarMonth: 1, lunarDay: 10, name: 'Ngày vía Thần Tài', lunarLabel: 'Mùng 10 tháng Giêng (10/1)', description: 'Ngày vía Thần Tài theo tín ngưỡng dân gian. Nhiều gia đình và cơ sở kinh doanh làm lễ cầu tài lộc, may mắn đầu năm.', type: 'major' },
    { id: 'lunar-tet-nguyen-tieu', lunarMonth: 1, lunarDay: 15, name: 'Tết Nguyên Tiêu (Rằm tháng Giêng)', lunarLabel: 'Rằm tháng Giêng (15/1)', description: 'Ngày Rằm đầu tiên của năm âm lịch. Nhiều gia đình đi lễ chùa, thắp hương và cầu bình an đầu năm.', type: 'major' },
    { id: 'lunar-tet-han-thuc', lunarMonth: 3, lunarDay: 3, name: 'Tết Hàn Thực', lunarLabel: '3/3 âm lịch', description: 'Trong ngày Tết Hàn Thực, người Việt thường làm bánh trôi, bánh chay để dâng cúng tổ tiên và tưởng nhớ nguồn cội.', type: 'major' },
    { id: 'lunar-gio-to-hung-vuong', lunarMonth: 3, lunarDay: 10, name: 'Giỗ Tổ Hùng Vương', lunarLabel: '10/3 âm lịch', description: 'Ngày tưởng niệm các Vua Hùng, những người có công dựng nước. Đây là ngày nghỉ lễ chính thức tại Việt Nam.', type: 'major', isNationalHoliday: true },
    { id: 'lunar-tet-doan-ngo', lunarMonth: 5, lunarDay: 5, name: 'Tết Đoan Ngọ', lunarLabel: '5/5 âm lịch', description: 'Tết Đoan Ngọ, còn được dân gian gọi là Tết diệt sâu bọ. Tùy vùng miền, các gia đình dùng cơm rượu nếp, trái cây và những món ăn truyền thống.', type: 'major' },
    { id: 'lunar-vu-lan', lunarMonth: 7, lunarDay: 15, name: 'Rằm tháng Bảy – Vu Lan', lunarLabel: 'Rằm tháng Bảy (15/7)', description: 'Ngày lễ Vu Lan gắn với truyền thống báo hiếu, tưởng nhớ cha mẹ, tổ tiên và những người đã khuất.', type: 'major' },
    { id: 'lunar-tet-trung-thu', lunarMonth: 8, lunarDay: 15, name: 'Tết Trung Thu', lunarLabel: 'Rằm tháng Tám (15/8)', description: 'Tết thiếu nhi truyền thống với các hoạt động rước đèn, phá cỗ, múa lân và sum họp gia đình.', type: 'major' },
    { id: 'lunar-tet-trung-cuu', lunarMonth: 9, lunarDay: 9, name: 'Tết Trùng Cửu', lunarLabel: '9/9 âm lịch', description: 'Một tiết lễ truyền thống trong văn hóa Á Đông, gắn với ý nghĩa cầu sức khỏe, bình an và trường thọ.', type: 'major' },
    { id: 'lunar-tet-ha-nguyen', lunarMonth: 10, lunarDay: 15, name: 'Tết Hạ Nguyên', lunarLabel: 'Rằm tháng Mười (15/10)', description: 'Một ngày lễ truyền thống cuối vụ mùa, thường gắn với việc tạ ơn và tưởng nhớ tổ tiên.', type: 'major' },
    { id: 'lunar-ong-cong-ong-tao', lunarMonth: 12, lunarDay: 23, name: 'Ông Công Ông Táo', lunarLabel: '23 tháng Chạp (23/12)', description: 'Theo tín ngưỡng dân gian, đây là ngày tiễn Táo Quân về trời. Nhiều gia đình chuẩn bị lễ cúng và dọn dẹp bếp để đón năm mới.', type: 'major' }
  ];

  /** Sự kiện theo DƯƠNG LỊCH – Ngày lễ, kỷ niệm lớn Việt Nam (month, day – cố định hàng năm) */
  var SOLAR_EVENTS_VIETNAM = [
    { id: 'solar-tet-duong-lich', month: 1, day: 1, name: 'Tết Dương lịch', description: 'Ngày đầu năm mới theo dương lịch. Đây là ngày nghỉ lễ chính thức tại Việt Nam.', type: 'national', isHoliday: true },
    { id: 'solar-thanh-lap-dang', month: 2, day: 3, name: 'Ngày thành lập Đảng Cộng sản Việt Nam', description: 'Kỷ niệm ngày thành lập Đảng Cộng sản Việt Nam (3/2/1930).', type: 'national' },
    { id: 'solar-thay-thuoc-viet-nam', month: 2, day: 27, name: 'Ngày Thầy thuốc Việt Nam', description: 'Ngày tôn vinh đội ngũ thầy thuốc và những người làm công tác y tế Việt Nam, được kỷ niệm hằng năm vào ngày 27/2.', type: 'national' },
    { id: 'solar-quoc-te-phu-nu', month: 3, day: 8, name: 'Quốc tế Phụ nữ', description: 'Ngày Quốc tế Phụ nữ 8/3, tôn vinh những đóng góp và thúc đẩy quyền bình đẳng của phụ nữ.', type: 'national' },
    { id: 'solar-thanh-lap-doan', month: 3, day: 26, name: 'Ngày thành lập Đoàn TNCS Hồ Chí Minh', description: 'Kỷ niệm ngày thành lập Đoàn Thanh niên Cộng sản Hồ Chí Minh (26/3/1931).', type: 'national' },
    { id: 'solar-giai-phong-mien-nam', month: 4, day: 30, name: 'Ngày Giải phóng miền Nam', description: 'Ngày Chiến thắng 30/4, kỷ niệm sự kiện thống nhất đất nước năm 1975. Đây là ngày nghỉ lễ chính thức tại Việt Nam.', type: 'national', isHoliday: true },
    { id: 'solar-quoc-te-lao-dong', month: 5, day: 1, name: 'Quốc tế Lao động', description: 'Ngày Quốc tế Lao động 1/5, tôn vinh người lao động trên toàn thế giới. Đây là ngày nghỉ lễ chính thức tại Việt Nam.', type: 'national', isHoliday: true },
    { id: 'solar-dien-bien-phu', month: 5, day: 7, name: 'Chiến thắng Điện Biên Phủ', description: 'Kỷ niệm Chiến thắng Điện Biên Phủ ngày 7/5/1954.', type: 'national' },
    { id: 'solar-sinh-nhat-ho-chi-minh', month: 5, day: 19, name: 'Ngày sinh Chủ tịch Hồ Chí Minh', description: 'Kỷ niệm ngày sinh Chủ tịch Hồ Chí Minh (19/5/1890).', type: 'national' },
    { id: 'solar-quoc-te-thieu-nhi', month: 6, day: 1, name: 'Quốc tế Thiếu nhi', description: 'Ngày Quốc tế Thiếu nhi 1/6, dịp dành sự quan tâm và tổ chức các hoạt động cho trẻ em.', type: 'national' },
    { id: 'solar-gia-dinh-viet-nam', month: 6, day: 28, name: 'Ngày Gia đình Việt Nam', description: 'Ngày Gia đình Việt Nam 28/6, đề cao trách nhiệm xây dựng gia đình no ấm, tiến bộ, hạnh phúc và bền vững.', type: 'national' },
    { id: 'solar-thuong-binh-liet-si', month: 7, day: 27, name: 'Ngày Thương binh – Liệt sĩ', description: 'Ngày tưởng niệm và tri ân thương binh, liệt sĩ, người có công với cách mạng, được kỷ niệm từ năm 1947.', type: 'national' },
    { id: 'solar-cach-mang-thang-tam', month: 8, day: 19, name: 'Cách mạng Tháng Tám', description: 'Kỷ niệm thắng lợi của Cách mạng Tháng Tám ngày 19/8/1945.', type: 'national' },
    { id: 'solar-quoc-khanh-viet-nam', month: 9, day: 2, name: 'Quốc khánh Việt Nam', description: 'Kỷ niệm ngày Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập 2/9/1945. Đây là ngày nghỉ lễ chính thức tại Việt Nam.', type: 'national', isHoliday: true },
    { id: 'solar-giai-phong-thu-do', month: 10, day: 10, name: 'Giải phóng Thủ đô', description: 'Kỷ niệm ngày tiếp quản và giải phóng Thủ đô Hà Nội (10/10/1954).', type: 'national' },
    { id: 'solar-doanh-nhan-viet-nam', month: 10, day: 13, name: 'Ngày Doanh nhân Việt Nam', description: 'Ngày Doanh nhân Việt Nam 13/10, ghi nhận vai trò và những đóng góp của đội ngũ doanh nhân đối với đất nước.', type: 'national' },
    { id: 'solar-phu-nu-viet-nam', month: 10, day: 20, name: 'Ngày Phụ nữ Việt Nam', description: 'Ngày Phụ nữ Việt Nam 20/10, tôn vinh những đóng góp của phụ nữ Việt Nam trong gia đình và xã hội.', type: 'national' },
    { id: 'solar-nha-giao-viet-nam', month: 11, day: 20, name: 'Ngày Nhà giáo Việt Nam', description: 'Ngày Nhà giáo Việt Nam 20/11, dịp tôn vinh các nhà giáo và truyền thống hiếu học.', type: 'national' },
    { id: 'solar-quan-doi-nhan-dan', month: 12, day: 22, name: 'Ngày thành lập Quân đội Nhân dân Việt Nam', description: 'Kỷ niệm ngày thành lập Quân đội Nhân dân Việt Nam (22/12/1944).', type: 'national' }
  ];

  /** Sự kiện quốc tế / hay dùng làm content, giáo dục */
  var SOLAR_EVENTS_INTERNATIONAL = [
    { id: 'solar-valentine', month: 2, day: 14, name: 'Valentine', description: 'Ngày Valentine 14/2, dịp nhiều người bày tỏ tình cảm và sự trân trọng với người mình yêu thương.', type: 'international' },
    { id: 'solar-quoc-te-hanh-phuc', month: 3, day: 20, name: 'Quốc tế Hạnh phúc', description: 'Ngày Quốc tế Hạnh phúc 20/3 do Liên Hợp Quốc công nhận, nhấn mạnh vai trò của hạnh phúc và an sinh trong đời sống con người.', type: 'international' },
    { id: 'solar-nuoc-the-gioi', month: 3, day: 22, name: 'Ngày Nước Thế giới', description: 'Ngày Nước Thế giới 22/3 nhằm nâng cao nhận thức về tài nguyên nước và việc quản lý nước bền vững.', type: 'international' },
    { id: 'solar-trai-dat', month: 4, day: 22, name: 'Ngày Trái Đất', description: 'Ngày Trái Đất 22/4 kêu gọi bảo vệ môi trường và chung tay xây dựng một hành tinh bền vững.', type: 'international' },
    { id: 'solar-moi-truong-the-gioi', month: 6, day: 5, name: 'Ngày Môi trường Thế giới', description: 'Ngày Môi trường Thế giới 5/6 do Liên Hợp Quốc phát động nhằm nâng cao nhận thức và hành động vì môi trường.', type: 'international' },
    { id: 'solar-aids-the-gioi', month: 12, day: 1, name: 'Ngày Thế giới phòng chống AIDS', description: 'Ngày Thế giới phòng chống AIDS 1/12 nhằm nâng cao nhận thức, tưởng nhớ những người đã mất và thúc đẩy phòng ngừa, điều trị HIV/AIDS.', type: 'international' },
    { id: 'solar-giang-sinh', month: 12, day: 25, name: 'Giáng Sinh', description: 'Lễ Giáng Sinh 25/12 là ngày lễ quan trọng của Kitô giáo và cũng là dịp văn hóa được đón nhận tại nhiều nơi trên thế giới.', type: 'international' }
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

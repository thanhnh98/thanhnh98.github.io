/** Nội dung biên tập cho các trang sự kiện độc lập. */
(function (global) {
  function profile(context, activities, tip, keywords) {
    return { context: context, activities: activities, tip: tip, keywords: keywords || [] };
  }

  var CONTENT = {
    'lunar-tet-nguyen-dan': profile(
      'Tết Nguyên Đán mở đầu năm âm lịch và là dịp đoàn viên lớn nhất của người Việt. Những ngày Tết kết nối việc thờ cúng tổ tiên, thăm hỏi họ hàng và gửi gắm mong ước bình an cho năm mới.',
      ['Dọn dẹp, trang hoàng nhà cửa và chuẩn bị mâm cúng gia tiên', 'Chúc Tết ông bà, cha mẹ và trao lì xì đầu năm', 'Du xuân, đi lễ đầu năm và dành thời gian cho gia đình'],
      'Phong tục Tết khác nhau theo vùng miền và gia đình. Nên ưu tiên sự sum họp, lời chúc chân thành và cách tổ chức phù hợp với điều kiện của mình.',
      ['Tết Nguyên Đán', 'Tết âm lịch', 'mùng 1 Tết']
    ),
    'lunar-via-than-tai': profile(
      'Ngày vía Thần Tài phổ biến trong đời sống tín ngưỡng của người kinh doanh, với mong muốn khởi đầu thuận lợi và làm ăn hanh thông. Ý nghĩa chính vẫn là sự thành tâm, chăm chỉ và cách quản lý tài chính có trách nhiệm.',
      ['Lau dọn bàn thờ và chuẩn bị lễ vật gọn gàng', 'Mở hàng hoặc gửi lời chúc may mắn tới đối tác', 'Lập kế hoạch thu chi, tiết kiệm cho năm mới'],
      'Không cần chạy theo việc mua vàng bằng mọi giá. Hãy cân nhắc nhu cầu thực tế, giá thị trường và khả năng tài chính cá nhân.',
      ['vía Thần Tài', 'mùng 10 tháng Giêng', 'cầu tài lộc']
    ),
    'lunar-tet-nguyen-tieu': profile(
      'Tết Nguyên Tiêu là ngày Rằm đầu tiên của năm âm lịch, thường được xem là dịp hoàn tất không khí Tết và hướng tới một năm an lành. Nhiều gia đình thắp hương, đi chùa hoặc dùng bữa quây quần.',
      ['Chuẩn bị mâm cơm gia đình trong ngày Rằm', 'Đi lễ chùa trong không khí trang nghiêm, văn minh', 'Dành thời gian nhìn lại mục tiêu đầu năm'],
      'Khi đi lễ nên giữ trật tự, ăn mặc phù hợp và hạn chế đốt vàng mã để bảo vệ môi trường.',
      ['Rằm tháng Giêng', 'Tết Nguyên Tiêu', '15 tháng Giêng']
    ),
    'lunar-tet-han-thuc': profile(
      'Tết Hàn Thực tại Việt Nam gắn với bánh trôi, bánh chay và việc tưởng nhớ tổ tiên. Phong tục đã được Việt hóa, mang sắc thái gia đình và gìn giữ ký ức ẩm thực truyền thống.',
      ['Cùng người thân làm bánh trôi, bánh chay', 'Dâng một phần bánh lên bàn thờ gia tiên', 'Kể cho trẻ nhỏ nghe về phong tục và món ăn truyền thống'],
      'Bánh nên được làm và bảo quản hợp vệ sinh; gia đình có người cần hạn chế đường có thể điều chỉnh khẩu phần.',
      ['Tết Hàn Thực', '3/3 âm lịch', 'bánh trôi bánh chay']
    ),
    'lunar-gio-to-hung-vuong': profile(
      'Giỗ Tổ Hùng Vương tưởng nhớ các Vua Hùng và nhắc lại đạo lý uống nước nhớ nguồn. Đây là ngày lễ chính thức, được tổ chức trọng thể tại Đền Hùng và nhiều địa phương trên cả nước.',
      ['Tìm hiểu lịch sử thời đại Hùng Vương', 'Tham gia hoạt động tưởng niệm tại địa phương', 'Lên kế hoạch nghỉ lễ và di chuyển sớm nếu về Phú Thọ'],
      'Lịch nghỉ cụ thể có thể thay đổi theo năm và cách hoán đổi ngày làm việc; nên theo dõi thông báo chính thức gần dịp lễ.',
      ['Giỗ Tổ Hùng Vương', '10/3 âm lịch', 'Đền Hùng']
    ),
    'lunar-tet-doan-ngo': profile(
      'Tết Đoan Ngọ còn được gọi dân gian là Tết diệt sâu bọ, diễn ra vào thời điểm giữa năm âm lịch. Mâm lễ và món ăn có sự khác biệt thú vị giữa miền Bắc, miền Trung và miền Nam.',
      ['Chuẩn bị cơm rượu nếp, trái cây hoặc món truyền thống địa phương', 'Cùng gia đình dùng bữa và nhắc lại phong tục quê nhà', 'Ưu tiên thực phẩm theo mùa, nguồn gốc rõ ràng'],
      'Cơm rượu có chứa cồn; trẻ em, phụ nữ mang thai và người cần kiêng cồn nên lựa chọn món phù hợp.',
      ['Tết Đoan Ngọ', '5/5 âm lịch', 'Tết diệt sâu bọ']
    ),
    'lunar-vu-lan': profile(
      'Vu Lan là mùa báo hiếu, nhắc mỗi người quan tâm đến cha mẹ, người thân và tưởng nhớ những người đã khuất. Giá trị của ngày này nằm ở hành động chăm sóc thiết thực trong đời sống hằng ngày.',
      ['Thăm hỏi và dành thời gian bên cha mẹ, ông bà', 'Chuẩn bị bữa cơm gia đình hoặc đi lễ chùa', 'Làm việc thiện phù hợp với khả năng'],
      'Không nên để nghi thức trở thành áp lực chi tiêu. Một cuộc gọi, bữa cơm hoặc sự quan tâm đều có ý nghĩa.',
      ['Vu Lan', 'Rằm tháng Bảy', 'mùa báo hiếu']
    ),
    'lunar-tet-trung-thu': profile(
      'Tết Trung Thu gắn với trăng rằm, đèn lồng và niềm vui trẻ nhỏ. Đây cũng là dịp người lớn trở về bên gia đình, cùng chia bánh và tạo nên ký ức tuổi thơ ấm áp.',
      ['Làm hoặc trang trí đèn lồng an toàn', 'Bày mâm cỗ, chia bánh và ngắm trăng cùng gia đình', 'Tổ chức trò chơi, kể chuyện chị Hằng và chú Cuội'],
      'Chọn đồ chơi, đèn và thực phẩm có nguồn gốc rõ ràng; trẻ nhỏ cần người lớn giám sát khi tham gia rước đèn.',
      ['Tết Trung Thu', 'Rằm tháng Tám', '15/8 âm lịch']
    ),
    'lunar-tet-trung-cuu': profile(
      'Tết Trùng Cửu là một tiết lễ lâu đời trong văn hóa Á Đông, gắn với số chín, sức khỏe và trường thọ. Tại Việt Nam ngày này ít phổ biến hơn nhưng vẫn có giá trị khi tìm hiểu lịch sử văn hóa khu vực.',
      ['Tìm hiểu các tích xưa về ngày Trùng Cửu', 'Thăm hỏi người cao tuổi trong gia đình', 'Tổ chức một buổi dạo bộ hoặc hoạt động ngoài trời nhẹ nhàng'],
      'Có nhiều cách lý giải và thực hành khác nhau; nên xem đây là dịp tìm hiểu văn hóa thay vì áp đặt nghi lễ.',
      ['Tết Trùng Cửu', '9/9 âm lịch', 'Trùng Dương']
    ),
    'lunar-tet-ha-nguyen': profile(
      'Tết Hạ Nguyên diễn ra vào Rằm tháng Mười, gắn với mùa màng, sự biết ơn và tưởng nhớ tổ tiên. Một số vùng còn gọi đây là Tết cơm mới vì diễn ra sau vụ thu hoạch.',
      ['Chuẩn bị bữa cơm mới hoặc món ăn từ nông sản mùa vụ', 'Thắp hương tưởng nhớ tổ tiên', 'Chia sẻ thành quả và lời cảm ơn với người thân'],
      'Tên gọi và tập tục có thể khác nhau theo địa phương, vì vậy nên tôn trọng cách thực hành của từng gia đình.',
      ['Tết Hạ Nguyên', 'Rằm tháng Mười', 'Tết cơm mới']
    ),
    'lunar-ong-cong-ong-tao': profile(
      'Ngày Ông Công Ông Táo đánh dấu thời điểm các gia đình bắt đầu chuẩn bị rõ rệt cho Tết. Nghi lễ tiễn Táo Quân kết hợp với việc dọn bếp, chăm chút không gian sống và mong một năm mới ấm no.',
      ['Dọn dẹp bếp và bàn thờ Táo Quân', 'Chuẩn bị lễ cúng phù hợp với phong tục gia đình', 'Lập danh sách việc cần hoàn tất trước Tết'],
      'Không thả túi nilon, chân hương hoặc đồ lễ xuống sông hồ. Nếu phóng sinh cá, hãy thực hiện nhẹ nhàng và bảo vệ môi trường.',
      ['Ông Công Ông Táo', '23 tháng Chạp', 'Táo Quân']
    ),
    'solar-tet-duong-lich': profile(
      'Tết Dương lịch mở đầu năm theo lịch quốc tế và là ngày nghỉ lễ chính thức tại Việt Nam. Đây là dịp nhìn lại năm cũ, đặt mục tiêu mới và tận hưởng kỳ nghỉ ngắn cùng người thân.',
      ['Viết mục tiêu thực tế cho năm mới', 'Dành thời gian nghỉ ngơi hoặc gặp gỡ bạn bè', 'Kiểm tra lịch làm việc, học tập sau kỳ nghỉ'],
      'Nếu tham gia sự kiện đếm ngược đông người, nên chủ động phương án đi lại và giữ an toàn cá nhân.',
      ['Tết Dương lịch', '1/1', 'năm mới']
    ),
    'solar-thanh-lap-dang': profile('Ngày 3/2 ghi dấu sự ra đời của Đảng Cộng sản Việt Nam năm 1930, là mốc thường xuất hiện trong hoạt động lịch sử và giáo dục công dân.', ['Tìm hiểu bối cảnh lịch sử năm 1930', 'Tham quan bảo tàng hoặc không gian trưng bày lịch sử', 'Theo dõi chương trình kỷ niệm chính thống'], 'Nên tham khảo tài liệu lịch sử và nguồn thông tin chính thống khi tìm hiểu về sự kiện.', ['3/2', 'thành lập Đảng']),
    'solar-thay-thuoc-viet-nam': profile('Ngày Thầy thuốc Việt Nam tôn vinh đội ngũ y, bác sĩ và những người làm công tác chăm sóc sức khỏe. Ngày 27/2 cũng nhắc cộng đồng trân trọng y đức và chủ động bảo vệ sức khỏe.', ['Gửi lời cảm ơn chân thành tới nhân viên y tế', 'Chia sẻ thông tin chăm sóc sức khỏe có nguồn đáng tin cậy', 'Sắp xếp kiểm tra sức khỏe định kỳ'], 'Không tự chẩn đoán hoặc lan truyền lời khuyên y khoa chưa được kiểm chứng.', ['27/2', 'Ngày Thầy thuốc Việt Nam']),
    'solar-quoc-te-phu-nu': profile('Ngày Quốc tế Phụ nữ 8/3 tôn vinh thành tựu của phụ nữ và nhắc tới bình đẳng giới. Một lời chúc ý nghĩa nên đi cùng sự tôn trọng và sẻ chia thiết thực.', ['Gửi lời chúc được cá nhân hóa', 'Chia sẻ việc nhà và dành thời gian cho người phụ nữ mình yêu quý', 'Tìm hiểu câu chuyện của những phụ nữ truyền cảm hứng'], 'Tránh những lời chúc khuôn mẫu về ngoại hình hoặc vai trò giới.', ['8/3', 'Quốc tế Phụ nữ']),
    'solar-thanh-lap-doan': profile('Ngày 26/3 là dịp nhìn lại vai trò của Đoàn Thanh niên trong hoạt động cộng đồng, giáo dục và phát triển kỹ năng cho người trẻ Việt Nam.', ['Tham gia hoạt động tình nguyện', 'Ôn lại lịch sử tổ chức Đoàn', 'Tổ chức sinh hoạt tập thể hoặc hoạt động kỹ năng'], 'Hoạt động đông người cần có kế hoạch an toàn và phân công rõ ràng.', ['26/3', 'thành lập Đoàn']),
    'solar-giai-phong-mien-nam': profile('Ngày 30/4 là mốc lịch sử quan trọng gắn với kết thúc chiến tranh và thống nhất đất nước năm 1975. Đây là ngày nghỉ lễ chính thức và thường liền với kỳ nghỉ 1/5.', ['Tìm hiểu lịch sử qua bảo tàng, sách và phim tư liệu', 'Treo cờ Tổ quốc theo hướng dẫn tại địa phương', 'Lên kế hoạch du lịch, về quê và đặt vé sớm'], 'Lịch nghỉ và phương án giao thông có thể thay đổi theo từng năm; nên kiểm tra thông báo chính thức.', ['30/4', 'Giải phóng miền Nam', 'thống nhất đất nước']),
    'solar-quoc-te-lao-dong': profile('Ngày Quốc tế Lao động 1/5 tôn vinh những đóng góp của người lao động và quyền được làm việc trong điều kiện công bằng, an toàn. Tại Việt Nam đây là ngày nghỉ lễ chính thức.', ['Dành thời gian nghỉ ngơi và tái tạo năng lượng', 'Tìm hiểu quyền, nghĩa vụ của người lao động', 'Ghi nhận đóng góp của đồng nghiệp và cộng sự'], 'Khi ghép kỳ nghỉ 30/4–1/5, nên sắp xếp công việc và kế hoạch di chuyển từ sớm.', ['1/5', 'Quốc tế Lao động']),
    'solar-dien-bien-phu': profile('Ngày 7/5 tưởng niệm Chiến thắng Điện Biên Phủ năm 1954, một dấu mốc có ý nghĩa lớn trong lịch sử Việt Nam và phong trào giải phóng dân tộc trên thế giới.', ['Đọc sách hoặc xem phim tư liệu lịch sử', 'Tham quan Điện Biên và các di tích khi có điều kiện', 'Tham gia hoạt động giáo dục truyền thống'], 'Khi chia sẻ tư liệu lịch sử, nên ghi nguồn và kiểm tra mốc thời gian.', ['7/5', 'Điện Biên Phủ']),
    'solar-sinh-nhat-ho-chi-minh': profile('Ngày 19/5 kỷ niệm ngày sinh Chủ tịch Hồ Chí Minh năm 1890. Nhiều hoạt động văn hóa, lịch sử và giáo dục được tổ chức trong dịp này.', ['Đọc tác phẩm và tư liệu về Chủ tịch Hồ Chí Minh', 'Tham quan bảo tàng hoặc di tích lịch sử', 'Tham gia hoạt động cộng đồng thiết thực'], 'Ưu tiên nguồn tư liệu chính thống và trình bày thông tin trong đúng bối cảnh lịch sử.', ['19/5', 'sinh nhật Hồ Chí Minh']),
    'solar-quoc-te-thieu-nhi': profile('Ngày Quốc tế Thiếu nhi 1/6 là dịp dành sự quan tâm đặc biệt cho trẻ em, đồng thời nhắc người lớn bảo vệ quyền được học tập, vui chơi và phát triển an toàn của các em.', ['Tổ chức một hoạt động vui chơi phù hợp độ tuổi', 'Tặng sách hoặc dành thời gian đọc cùng trẻ', 'Lắng nghe mong muốn và cảm xúc của trẻ'], 'Quà tặng không cần đắt tiền; thời gian, sự đồng hành và môi trường an toàn có giá trị lâu dài.', ['1/6', 'Quốc tế Thiếu nhi']),
    'solar-gia-dinh-viet-nam': profile('Ngày Gia đình Việt Nam 28/6 đề cao sự gắn kết, chia sẻ và trách nhiệm giữa các thành viên. Đây là dịp phù hợp để tạo thêm thời gian chất lượng cho gia đình.', ['Tổ chức bữa cơm có đủ các thành viên', 'Cùng xem lại ảnh và lưu giữ kỷ niệm gia đình', 'Thống nhất một hoạt động chung không dùng thiết bị điện tử'], 'Tôn trọng sự đa dạng của các mô hình gia đình và tránh biến ngày kỷ niệm thành áp lực phải hoàn hảo.', ['28/6', 'Ngày Gia đình Việt Nam']),
    'solar-thuong-binh-liet-si': profile('Ngày 27/7 là dịp tưởng niệm thương binh, liệt sĩ và người có công với cách mạng. Các hoạt động tri ân thể hiện đạo lý uống nước nhớ nguồn.', ['Thăm hỏi gia đình chính sách tại địa phương', 'Dâng hương tại nghĩa trang hoặc đài tưởng niệm', 'Tìm hiểu và gìn giữ câu chuyện lịch sử của gia đình'], 'Các hoạt động tưởng niệm cần trang nghiêm, tôn trọng và tránh hình thức.', ['27/7', 'Thương binh Liệt sĩ']),
    'solar-cach-mang-thang-tam': profile('Ngày 19/8 kỷ niệm thắng lợi của Cách mạng Tháng Tám năm 1945, tạo tiền đề cho sự ra đời của nước Việt Nam Dân chủ Cộng hòa.', ['Ôn lại diễn biến lịch sử tháng Tám năm 1945', 'Tham quan địa điểm lịch sử tại địa phương', 'Xem chương trình và triển lãm chuyên đề'], 'Nên đối chiếu nhiều tư liệu đáng tin cậy để hiểu đầy đủ bối cảnh lịch sử.', ['19/8', 'Cách mạng Tháng Tám']),
    'solar-quoc-khanh-viet-nam': profile('Quốc khánh 2/9 kỷ niệm ngày Tuyên ngôn Độc lập được đọc tại Quảng trường Ba Đình năm 1945. Đây là ngày nghỉ lễ chính thức và có nhiều hoạt động văn hóa trên cả nước.', ['Treo cờ Tổ quốc và theo dõi chương trình kỷ niệm', 'Tham quan địa điểm lịch sử, bảo tàng', 'Lên kế hoạch nghỉ lễ và di chuyển từ sớm'], 'Theo dõi thông báo chính thức về lịch nghỉ, phân luồng giao thông và các khu vực tổ chức sự kiện.', ['2/9', 'Quốc khánh Việt Nam']),
    'solar-giai-phong-thu-do': profile('Ngày 10/10 kỷ niệm thời điểm quân đội tiếp quản Thủ đô Hà Nội năm 1954. Ngày này gắn với ký ức lịch sử và tình yêu dành cho Hà Nội.', ['Tìm hiểu Hà Nội qua tư liệu và triển lãm', 'Đi bộ khám phá di sản đô thị', 'Chia sẻ câu chuyện, hình ảnh đẹp về Thủ đô'], 'Khi tham dự sự kiện công cộng, nên theo dõi thông tin giao thông và giữ gìn không gian chung.', ['10/10', 'Giải phóng Thủ đô']),
    'solar-doanh-nhan-viet-nam': profile('Ngày Doanh nhân Việt Nam 13/10 ghi nhận vai trò của cộng đồng doanh nhân trong phát triển kinh tế, tạo việc làm và đổi mới sáng tạo.', ['Gửi lời cảm ơn tới đối tác và cộng sự', 'Nhìn lại mục tiêu kinh doanh, giá trị phục vụ khách hàng', 'Chia sẻ câu chuyện khởi nghiệp có bài học thực tế'], 'Lời chúc nên chân thành, cụ thể và tránh nội dung quảng cáo quá mức.', ['13/10', 'Ngày Doanh nhân Việt Nam']),
    'solar-phu-nu-viet-nam': profile('Ngày Phụ nữ Việt Nam 20/10 tôn vinh những đóng góp của phụ nữ trong gia đình và xã hội. Đây là dịp bày tỏ sự trân trọng bằng lời nói và hành động.', ['Viết lời chúc riêng cho từng người', 'Dành thời gian lắng nghe và chia sẻ công việc', 'Tôn vinh thành tựu của phụ nữ quanh mình'], 'Tránh dùng những khuôn mẫu giới; sự tôn trọng bình đẳng nên được duy trì mỗi ngày.', ['20/10', 'Ngày Phụ nữ Việt Nam']),
    'solar-nha-giao-viet-nam': profile('Ngày Nhà giáo Việt Nam 20/11 là dịp tri ân thầy cô và truyền thống hiếu học. Một lời hỏi thăm chân thành thường đáng nhớ hơn món quà mang tính hình thức.', ['Gửi lời cảm ơn hoặc kể lại một kỷ niệm đẹp', 'Thăm thầy cô cũ khi điều kiện phù hợp', 'Tôn trọng quy định quà tặng của nhà trường'], 'Giữ lời chúc ngắn gọn, chân thành và không tạo áp lực nhận quà cho giáo viên.', ['20/11', 'Ngày Nhà giáo Việt Nam']),
    'solar-quan-doi-nhan-dan': profile('Ngày 22/12 kỷ niệm thành lập Quân đội Nhân dân Việt Nam năm 1944 và cũng gắn với Ngày hội Quốc phòng toàn dân.', ['Tìm hiểu lịch sử quân đội Việt Nam', 'Thăm hỏi cựu chiến binh và gia đình quân nhân', 'Tham gia hoạt động giáo dục quốc phòng tại địa phương'], 'Các thông tin lịch sử, quân sự nên được tham khảo từ nguồn chính thống.', ['22/12', 'Quân đội Nhân dân Việt Nam']),
    'solar-valentine': profile('Valentine 14/2 là dịp phổ biến để bày tỏ tình cảm với người yêu thương. Ngày này cũng có thể dành cho sự biết ơn, quan tâm và kết nối chân thành.', ['Viết một lời nhắn được cá nhân hóa', 'Cùng nhau làm một hoạt động có kỷ niệm', 'Chuẩn bị món quà phù hợp sở thích và ngân sách'], 'Tôn trọng ranh giới và cảm xúc của đối phương; tình cảm không nên được đo bằng giá trị món quà.', ['Valentine', '14/2', 'Lễ tình nhân']),
    'solar-quoc-te-hanh-phuc': profile('Ngày Quốc tế Hạnh phúc 20/3 do Liên Hợp Quốc công nhận, nhấn mạnh hạnh phúc và an sinh là mục tiêu quan trọng của phát triển.', ['Ghi lại điều khiến mình biết ơn', 'Hỏi thăm một người lâu ngày chưa gặp', 'Dành thời gian cho hoạt động nâng cao sức khỏe tinh thần'], 'Hạnh phúc không phải trạng thái bắt buộc; khi gặp khó khăn kéo dài, hãy tìm sự hỗ trợ phù hợp.', ['20/3', 'Quốc tế Hạnh phúc']),
    'solar-nuoc-the-gioi': profile('Ngày Nước Thế giới 22/3 nâng cao nhận thức về vai trò của nước sạch và quản lý tài nguyên nước bền vững.', ['Kiểm tra và sửa điểm rò rỉ nước trong nhà', 'Giảm lãng phí nước trong sinh hoạt', 'Tìm hiểu nguồn nước và hoạt động bảo vệ sông hồ địa phương'], 'Những thay đổi nhỏ nhưng duy trì đều đặn có tác động thực tế hơn một hoạt động chỉ làm trong ngày kỷ niệm.', ['22/3', 'Ngày Nước Thế giới']),
    'solar-trai-dat': profile('Ngày Trái Đất 22/4 kêu gọi cộng đồng cùng bảo vệ môi trường và nhìn lại tác động của lối sống tới hành tinh.', ['Giảm đồ nhựa dùng một lần', 'Đi bộ, đi xe đạp hoặc dùng phương tiện công cộng', 'Tham gia dọn rác, trồng cây đúng hướng dẫn'], 'Không nên trồng cây theo phong trào ở nơi thiếu kế hoạch chăm sóc; hãy chọn hành động có thể duy trì.', ['22/4', 'Ngày Trái Đất']),
    'solar-moi-truong-the-gioi': profile('Ngày Môi trường Thế giới 5/6 thúc đẩy nhận thức và hành động trước các vấn đề môi trường. Chủ đề cụ thể có thể thay đổi theo từng năm.', ['Theo dõi chủ đề chính thức của năm', 'Phân loại rác và giảm tiêu dùng không cần thiết', 'Tham gia hoạt động môi trường tại địa phương'], 'Kiểm tra đơn vị tổ chức trước khi quyên góp hoặc tham gia chiến dịch trực tuyến.', ['5/6', 'Ngày Môi trường Thế giới']),
    'solar-aids-the-gioi': profile('Ngày Thế giới phòng chống AIDS 1/12 nâng cao nhận thức về HIV/AIDS, khuyến khích xét nghiệm, điều trị và giảm kỳ thị với người sống chung với HIV.', ['Tìm hiểu kiến thức phòng ngừa từ nguồn y tế đáng tin cậy', 'Chia sẻ thông điệp không kỳ thị', 'Khuyến khích xét nghiệm bảo mật khi có nguy cơ'], 'Thông tin sức khỏe cá nhân cần được bảo mật; hãy liên hệ cơ sở y tế để được tư vấn chuyên môn.', ['1/12', 'Ngày Thế giới phòng chống AIDS']),
    'solar-giang-sinh': profile('Giáng Sinh 25/12 là đại lễ của Kitô giáo và cũng trở thành một dịp văn hóa quen thuộc tại nhiều nơi. Không khí lễ hội thường gắn với ánh sáng, âm nhạc, quà tặng và sự sẻ chia.', ['Trang trí không gian bằng vật dụng an toàn', 'Gửi thiệp và lời chúc tới người thân, bạn bè', 'Tham gia hoạt động thiện nguyện hoặc gặp gỡ gia đình'], 'Khi tới cơ sở tôn giáo, cần tôn trọng nghi lễ, trang phục và không gian của cộng đồng.', ['Giáng Sinh', '25/12', 'Noel']
    )
  };

  function getEventContent(id) {
    return CONTENT[id] || profile(
      'Đây là một ngày đáng nhớ trong năm, giúp mọi người kết nối với lịch sử, văn hóa và cộng đồng.',
      ['Tìm hiểu ý nghĩa của ngày này', 'Gửi lời chúc phù hợp tới người liên quan', 'Lưu ngày vào lịch để chủ động kế hoạch'],
      'Thông tin và cách kỷ niệm có thể thay đổi theo địa phương.',
      []
    );
  }

  global.EVENTS_CONTENT = { CONTENT: CONTENT, getEventContent: getEventContent };
})(typeof window !== 'undefined' ? window : this);

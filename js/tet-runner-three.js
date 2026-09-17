import * as THREE from 'three';

const COLORS = {
  cream: 0xffedc2,
  sky: 0x315f70,
  red: 0xc3293a,
  deepRed: 0x63152a,
  gold: 0xffc94f,
  green: 0x286450,
  jade: 0x54bca0,
  brown: 0x7a432f,
  darkBrown: 0x352333,
  orange: 0xd65a38,
  white: 0xfff9e9,
  purple: 0x57436f,
  dusk: 0xea8c65,
};

const VIETNAM_JOURNEY = [
  // Each landmark is its own milestone; provinces follow the north-to-south route.
  { province: 'Cao Bằng', landmark: 'Thác Bản Giốc', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-ban-gioc.webp' },
  { province: 'Cao Bằng', landmark: 'Núi Mắt Thần', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-mat-than.webp' },
  { province: 'Tuyên Quang', landmark: 'Hồ Na Hang', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-na-hang.webp' },
  { province: 'Tuyên Quang', landmark: 'Cao nguyên đá Đồng Văn', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-dong-van.webp' },
  { province: 'Lai Châu', landmark: 'Đèo Ô Quy Hồ', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-o-quy-ho.webp' },
  { province: 'Lai Châu', landmark: 'Pu Ta Leng', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-pu-ta-leng.webp' },
  { province: 'Lào Cai', landmark: 'Fansipan', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-sapa.webp' },
  { province: 'Lào Cai', landmark: 'Mù Cang Chải', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-mu-cang-chai.webp' },
  { province: 'Lạng Sơn', landmark: 'Núi Mẫu Sơn', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-mau-son.webp' },
  { province: 'Lạng Sơn', landmark: 'Ải Chi Lăng', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-chi-lang.webp' },
  { province: 'Thái Nguyên', landmark: 'Hồ Núi Cốc', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-nui-coc.webp' },
  { province: 'Thái Nguyên', landmark: 'Hồ Ba Bể', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-ba-be.webp' },
  { province: 'Điện Biên', landmark: 'Đồi A1', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-doi-a1.webp' },
  { province: 'Điện Biên', landmark: 'Hồ Pá Khoang', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-pa-khoang.webp' },
  { province: 'Phú Thọ', landmark: 'Đền Hùng', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-den-hung.webp' },
  { province: 'Phú Thọ', landmark: 'Thung lũng Mai Châu', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-mai-chau.webp' },
  { province: 'Bắc Ninh', landmark: 'Chùa Dâu', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-chua-dau.webp' },
  { province: 'Bắc Ninh', landmark: 'Tây Yên Tử', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-tay-yen-tu.webp' },
  { province: 'Hà Nội', landmark: 'Hồ Gươm', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-ho-guom.webp' },
  { province: 'Hà Nội', landmark: 'Hoàng thành Thăng Long', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-thang-long.webp' },
  { province: 'Quảng Ninh', landmark: 'Vịnh Hạ Long', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-ha-long.webp' },
  { province: 'Quảng Ninh', landmark: 'Yên Tử', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-yen-tu.webp' },
  { province: 'Sơn La', landmark: 'Cao nguyên Mộc Châu', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-moc-chau.webp' },
  { province: 'Sơn La', landmark: 'Tà Xùa', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-ta-xua.webp' },
  { province: 'Hải Phòng', landmark: 'Quần đảo Cát Bà', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-cat-ba.webp' },
  { province: 'Hải Phòng', landmark: 'Côn Sơn - Kiếp Bạc', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-con-son-kiep-bac.webp' },
  { province: 'Hưng Yên', landmark: 'Phố Hiến', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-pho-hien.webp' },
  { province: 'Hưng Yên', landmark: 'Chùa Keo', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-chua-keo.webp' },
  { province: 'Ninh Bình', landmark: 'Tràng An', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-trang-an.webp' },
  { province: 'Ninh Bình', landmark: 'Chùa Tam Chúc', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-tam-chuc.webp' },
  { province: 'Thanh Hóa', landmark: 'Thành Nhà Hồ', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-thanh-nha-ho.webp' },
  { province: 'Thanh Hóa', landmark: 'Pù Luông', region: 'north', backgroundUrl: '/assets/images/tet-runner/north-pu-luong.webp' },
  { province: 'Nghệ An', landmark: 'Làng Sen', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-lang-sen.webp' },
  { province: 'Nghệ An', landmark: 'Biển Cửa Lò', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-cua-lo.webp' },
  { province: 'Hà Tĩnh', landmark: 'Ngã ba Đồng Lộc', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-dong-loc-v2.webp' },
  { province: 'Hà Tĩnh', landmark: 'Biển Thiên Cầm', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-thien-cam.webp' },
  { province: 'Quảng Trị', landmark: 'Phong Nha - Kẻ Bàng', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-phong-nha.webp' },
  { province: 'Quảng Trị', landmark: 'Cầu Hiền Lương', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-hien-luong.webp' },
  { province: 'Huế', landmark: 'Kinh thành Huế', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-hue.webp' },
  { province: 'Huế', landmark: 'Phá Tam Giang', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-tam-giang.webp' },
  { province: 'Đà Nẵng', landmark: 'Quần đảo Hoàng Sa', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-hoang-sa.webp' },
  { province: 'Đà Nẵng', landmark: 'Cầu Rồng', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-cau-rong.webp' },
  { province: 'Đà Nẵng', landmark: 'Phố cổ Hội An', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-hoi-an.webp' },
  { province: 'Quảng Ngãi', landmark: 'Đảo Lý Sơn', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-ly-son.webp' },
  { province: 'Quảng Ngãi', landmark: 'Măng Đen', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-mang-den.webp' },
  { province: 'Gia Lai', landmark: 'Biển Hồ', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-bien-ho.webp' },
  { province: 'Gia Lai', landmark: 'Kỳ Co', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-ky-co.webp' },
  { province: 'Đắk Lắk', landmark: 'Buôn Đôn', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-buon-don.webp' },
  { province: 'Đắk Lắk', landmark: 'Gành Đá Đĩa', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-ganh-da-dia.webp' },
  { province: 'Khánh Hòa', landmark: 'Vịnh Nha Trang', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-nha-trang.webp' },
  { province: 'Khánh Hòa', landmark: 'Vịnh Vĩnh Hy', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-vinh-hy.webp' },
  { province: 'Khánh Hòa', landmark: 'Quần đảo Trường Sa', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-truong-sa.webp' },
  { province: 'Lâm Đồng', landmark: 'Đà Lạt', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-da-lat.webp' },
  { province: 'Lâm Đồng', landmark: 'Mũi Né', region: 'central', backgroundUrl: '/assets/images/tet-runner/central-mui-ne.webp' },
  { province: 'Đồng Nai', landmark: 'Vườn quốc gia Cát Tiên', region: 'south', backgroundUrl: '/assets/images/tet-runner/south-cat-tien.webp' },
  { province: 'Đồng Nai', landmark: 'Bù Gia Mập', region: 'south', backgroundUrl: '/assets/images/tet-runner/south-bu-gia-map.webp' },
  { province: 'Tây Ninh', landmark: 'Núi Bà Đen', region: 'south', backgroundUrl: '/assets/images/tet-runner/south-nui-ba-den.webp' },
  { province: 'Tây Ninh', landmark: 'Làng nổi Tân Lập', region: 'south', backgroundUrl: '/assets/images/tet-runner/south-tan-lap.webp' },
  { province: 'Thành phố Hồ Chí Minh', landmark: 'Sông Sài Gòn', region: 'south', backgroundUrl: '/assets/images/tet-runner/south-saigon.webp' },
  { province: 'Thành phố Hồ Chí Minh', landmark: 'Côn Đảo', region: 'south', backgroundUrl: '/assets/images/tet-runner/south-con-dao.webp' },
  { province: 'An Giang', landmark: 'Núi Sam', region: 'south', backgroundUrl: '/assets/images/tet-runner/south-nui-sam.webp' },
  { province: 'An Giang', landmark: 'Phú Quốc', region: 'south', backgroundUrl: '/assets/images/tet-runner/south-phu-quoc.webp' },
  { province: 'Đồng Tháp', landmark: 'Vườn quốc gia Tràm Chim', region: 'south', backgroundUrl: '/assets/images/tet-runner/south-tram-chim.webp' },
  { province: 'Đồng Tháp', landmark: 'Chợ nổi Cái Bè', region: 'south', backgroundUrl: '/assets/images/tet-runner/south-cai-be.webp' },
  { province: 'Vĩnh Long', landmark: 'Cồn Phụng', region: 'south', backgroundUrl: '/assets/images/tet-runner/south-con-phung.webp' },
  { province: 'Vĩnh Long', landmark: 'Ao Bà Om', region: 'south', backgroundUrl: '/assets/images/tet-runner/south-ao-ba-om.webp' },
  { province: 'Cần Thơ', landmark: 'Chợ nổi Cái Răng', region: 'south', backgroundUrl: '/assets/images/tet-runner/south-cai-rang.webp' },
  { province: 'Cần Thơ', landmark: 'Chùa Dơi', region: 'south', backgroundUrl: '/assets/images/tet-runner/south-chua-doi.webp' },
  { province: 'Cà Mau', landmark: 'Mũi Cà Mau', region: 'south', backgroundUrl: '/assets/images/tet-runner/south-mui-ca-mau.webp' },
  { province: 'Cà Mau', landmark: 'Điện gió Bạc Liêu', region: 'south', backgroundUrl: '/assets/images/tet-runner/south-dien-gio-bac-lieu.webp' },
];

const LANDMARK_DETAILS = {
  'Thác Bản Giốc': 'Thác nước nhiều tầng trên sông Quây Sơn, nổi bật giữa thung lũng đá vôi và những cánh đồng xanh của vùng biên Cao Bằng.',
  'Núi Mắt Thần': 'Ngọn núi thủng độc đáo ở thung lũng Nặm Trá, được nhận ra bởi vòm đá tròn lớn nhìn xuống hồ và đồng cỏ rộng.',
  'Hồ Na Hang': 'Hồ sinh thái giữa núi đá vôi và rừng nguyên sinh, có mặt nước xanh, đảo nhỏ và những bản làng yên bình của Tuyên Quang.',
  'Cao nguyên đá Đồng Văn': 'Miền cao nguyên đá vôi hùng vĩ, gìn giữ dấu tích địa chất lâu đời cùng văn hóa đặc sắc của các cộng đồng vùng cao.',
  'Đèo Ô Quy Hồ': 'Một trong những cung đèo nổi tiếng của dãy Hoàng Liên Sơn, uốn qua biển mây và mở ra tầm nhìn núi cao ngoạn mục.',
  'Pu Ta Leng': 'Đỉnh núi cao trên 3.000 m của dãy Hoàng Liên Sơn, hấp dẫn bởi rừng nguyên sinh, suối đá và mùa hoa đỗ quyên.',
  Fansipan: 'Nóc nhà Đông Dương cao 3.143 m, biểu tượng của dãy Hoàng Liên Sơn với biển mây và quần thể tâm linh trên đỉnh.',
  'Mù Cang Chải': 'Vùng ruộng bậc thang ôm theo sườn núi, rực rỡ nhất vào mùa nước đổ và mùa lúa chín của miền Tây Bắc.',
  'Núi Mẫu Sơn': 'Vùng núi cao khí hậu mát lạnh, thường phủ sương và còn lưu dấu những biệt thự đá cổ giữa rừng núi Lạng Sơn.',
  'Ải Chi Lăng': 'Thung lũng hiểm yếu gắn với nhiều chiến công giữ nước, được bao bọc bởi các dãy núi đá và dòng sông Thương.',
  'Hồ Núi Cốc': 'Hồ nước rộng với nhiều đảo xanh, gắn với huyền thoại nàng Công chàng Cốc và cảnh quan trung du Thái Nguyên.',
  'Hồ Ba Bể': 'Hồ nước ngọt tự nhiên giữa Vườn quốc gia Ba Bể, được bao quanh bởi núi đá vôi, hang động và rừng già.',
  'Đồi A1': 'Di tích trọng điểm của Chiến dịch Điện Biên Phủ, nơi còn lưu giữ hệ thống giao thông hào và dấu tích trận địa lịch sử.',
  'Hồ Pá Khoang': 'Hồ nước trong vùng Mường Phăng, nổi bật với những bán đảo nhỏ, rừng xanh và màn sương đặc trưng của Điện Biên.',
  'Đền Hùng': 'Quần thể đền trên núi Nghĩa Lĩnh, nơi người Việt tưởng nhớ các Vua Hùng và cội nguồn dựng nước.',
  'Thung lũng Mai Châu': 'Thung lũng ruộng lúa dưới chân núi, nổi tiếng với nhà sàn, nghề dệt và đời sống văn hóa của người Thái.',
  'Chùa Dâu': 'Trung tâm Phật giáo cổ của vùng Luy Lâu, nổi bật với tháp Hòa Phong bằng gạch và kiến trúc chùa Bắc Bộ.',
  'Tây Yên Tử': 'Sườn phía tây của dãy Yên Tử, nơi con đường hành hương kết nối những ngôi chùa giữa rừng núi và biển mây.',
  'Hồ Gươm': 'Trái tim lịch sử của Hà Nội, gắn với truyền thuyết trả gươm và những biểu tượng quen thuộc như Tháp Rùa, cầu Thê Húc.',
  'Hoàng thành Thăng Long': 'Di sản ghi dấu hơn một thiên niên kỷ lịch sử kinh đô, với Đoan Môn, nền điện Kính Thiên và nhiều tầng khảo cổ.',
  'Vịnh Hạ Long': 'Di sản thiên nhiên thế giới với hàng nghìn đảo đá vôi, hang động và mặt vịnh xanh tạo nên cảnh quan đặc hữu.',
  'Yên Tử': 'Trung tâm Phật giáo Trúc Lâm trên dãy núi linh thiêng, có hệ thống chùa tháp trải từ chân núi tới đỉnh Đồng.',
  'Cao nguyên Mộc Châu': 'Cao nguyên mát lành nổi tiếng với đồi chè, đồng cỏ cùng mùa hoa mận và hoa cải phủ khắp thung lũng.',
  'Tà Xùa': 'Vùng núi săn mây nổi tiếng với sống lưng khủng long, nơi những dãy núi hẹp vươn lên giữa biển mây Tây Bắc.',
  'Quần đảo Cát Bà': 'Quần đảo đá vôi xanh giữa vịnh Lan Hạ, hội tụ bãi tắm, rừng quốc gia và hệ sinh thái biển phong phú.',
  'Côn Sơn - Kiếp Bạc': 'Quần thể di tích gắn với Nguyễn Trãi và Trần Hưng Đạo, nằm giữa núi rừng, suối đá và những mái đền cổ.',
  'Phố Hiến': 'Thương cảng cổ từng hưng thịnh bên sông Hồng, còn lưu lại đình, đền, chùa và dấu ấn giao thương nhiều nền văn hóa.',
  'Chùa Keo': 'Ngôi chùa cổ nổi bật bởi nghệ thuật chạm khắc gỗ và gác chuông nhiều tầng, một dấu ấn kiến trúc đồng bằng Bắc Bộ.',
  'Tràng An': 'Quần thể danh thắng nơi thuyền đi qua sông, hang xuyên thủy và thung lũng đá vôi, thuộc Di sản thế giới Tràng An.',
  'Chùa Tam Chúc': 'Quần thể chùa bên hồ rộng và núi đá vôi, tạo nên không gian tâm linh khoáng đạt giữa cảnh quan Hà Nam.',
  'Thành Nhà Hồ': 'Tòa thành đá thế kỷ XIV với những cổng vòm ghép từ khối đá lớn, được UNESCO công nhận là Di sản thế giới.',
  'Pù Luông': 'Khu bảo tồn thiên nhiên nổi tiếng với ruộng bậc thang, núi đá vôi và những bản nhà sàn của người Thái, người Mường.',
  'Làng Sen': 'Quê nội Chủ tịch Hồ Chí Minh, lưu giữ mái nhà tranh, hàng tre, ao sen và không gian làng quê xứ Nghệ.',
  'Biển Cửa Lò': 'Bãi biển dài, cát mịn và thoải, nhìn ra đảo Hòn Ngư và là điểm nghỉ biển quen thuộc của vùng Bắc Trung Bộ.',
  'Ngã ba Đồng Lộc': 'Di tích tưởng niệm mười nữ thanh niên xung phong, biểu tượng của lòng quả cảm trên tuyến đường Trường Sơn.',
  'Biển Thiên Cầm': 'Bãi biển hình cánh cung với nước trong, cát sáng và núi Thiên Cầm tạo nên đường bờ biển yên bình.',
  'Phong Nha - Kẻ Bàng': 'Di sản thiên nhiên thế giới nổi tiếng với địa hình karst cổ, sông ngầm và hệ thống hang động quy mô lớn.',
  'Cầu Hiền Lương': 'Cây cầu lịch sử bắc qua sông Bến Hải, gắn với giới tuyến quân sự tạm thời và khát vọng thống nhất đất nước.',
  'Kinh thành Huế': 'Trung tâm của Quần thể di tích Cố đô Huế, quy tụ Hoàng thành, cung điện, cổng thành và kiến trúc triều Nguyễn.',
  'Phá Tam Giang': 'Đầm phá rộng lớn với làng chài, nò sáo và mặt nước đổi màu theo ánh sáng, tiêu biểu cho vẻ đẹp sông nước xứ Huế.',
  'Quần đảo Hoàng Sa': 'Quần đảo san hô của Việt Nam giữa Biển Đông, hiện là đặc khu hành chính thuộc thành phố Đà Nẵng.',
  'Cầu Rồng': 'Cây cầu mang hình rồng bắc qua sông Hàn, nổi bật với màn phun lửa, phun nước và ánh sáng về đêm.',
  'Phố cổ Hội An': 'Đô thị thương cảng cổ bên sông Hoài, nổi tiếng với nhà mái ngói, hội quán, Chùa Cầu và đèn lồng.',
  'Đảo Lý Sơn': 'Đảo tiền tiêu hình thành từ núi lửa, có vách đá, miệng núi cổ, ruộng tỏi và làn nước trong xanh.',
  'Măng Đen': 'Cao nguyên mát mẻ giữa rừng thông, hồ và thác nước, mang vẻ yên tĩnh đặc trưng của vùng núi Kon Tum.',
  'Biển Hồ': 'Hồ T’Nưng nằm trong miệng núi lửa cổ, có mặt nước xanh sâu và rừng thông bao quanh giữa cao nguyên Pleiku.',
  'Kỳ Co': 'Vịnh nhỏ tựa lưng vào núi đá, nổi bật với bãi cát cong và làn nước chuyển nhiều sắc xanh.',
  'Buôn Đôn': 'Vùng đất bên sông Sêrêpốk nổi tiếng với cầu treo, nhà sàn và văn hóa lâu đời của các cộng đồng Tây Nguyên.',
  'Gành Đá Đĩa': 'Bờ biển với hàng nghìn cột đá bazan xếp khít như chồng đĩa, hình thành từ hoạt động núi lửa cổ.',
  'Vịnh Nha Trang': 'Vịnh biển ôm lấy thành phố Nha Trang, có bãi cát dài, nhiều đảo và hệ sinh thái san hô phong phú.',
  'Vịnh Vĩnh Hy': 'Vịnh nhỏ được núi đá che chắn, nổi bật với nước xanh trong, rạn san hô và cung đường ven biển ngoạn mục.',
  'Quần đảo Trường Sa': 'Quần đảo của Việt Nam giữa Biển Đông, là đặc khu hành chính thuộc tỉnh Khánh Hòa với nhiều đảo và rạn san hô.',
  'Đà Lạt': 'Thành phố cao nguyên của rừng thông, hồ nước và kiến trúc nghỉ dưỡng, nổi tiếng với khí hậu mát cùng nhiều mùa hoa.',
  'Mũi Né': 'Vùng biển nổi bật với đồi cát đỏ, đồi cát trắng, làng chài và đường bờ đầy nắng gió của Bình Thuận.',
  'Vườn quốc gia Cát Tiên': 'Khu rừng nhiệt đới và vùng đất ngập nước giàu đa dạng sinh học, nơi cư trú của nhiều loài động thực vật quý.',
  'Bù Gia Mập': 'Vườn quốc gia bảo tồn rừng thường xanh, suối thác và hệ sinh thái đặc trưng ở khu vực chuyển tiếp Tây Nguyên–Đông Nam Bộ.',
  'Núi Bà Đen': 'Ngọn núi cao nổi bật giữa đồng bằng Tây Ninh, gắn với hệ thống chùa, hành hương và tầm nhìn rộng khắp Nam Bộ.',
  'Làng nổi Tân Lập': 'Không gian rừng tràm ngập nước với con đường xuyên rừng và kênh rạch đan xen, tiêu biểu cho vùng Đồng Tháp Mười.',
  'Sông Sài Gòn': 'Dòng sông gắn với lịch sử và nhịp sống Thành phố Hồ Chí Minh, phản chiếu bến cảng cùng đường chân trời hiện đại.',
  'Côn Đảo': 'Quần đảo kết hợp di tích lịch sử với rừng, bãi biển và hệ sinh thái biển, là nơi rùa biển về làm tổ.',
  'Núi Sam': 'Ngọn núi tâm linh của vùng Châu Đốc, tập trung nhiều đền chùa và nhìn ra cánh đồng rộng sát biên giới.',
  'Phú Quốc': 'Đảo lớn nổi tiếng với bãi biển, rừng quốc gia, làng chài và mặt nước trong xanh của vịnh Thái Lan.',
  'Vườn quốc gia Tràm Chim': 'Vùng đất ngập nước Ramsar bảo tồn hệ sinh thái Đồng Tháp Mười, đặc biệt nổi tiếng với loài sếu đầu đỏ.',
  'Chợ nổi Cái Bè': 'Không gian giao thương trên sông Tiền, nơi ghe thuyền chở trái cây và nông sản tạo nên nhịp sống miền Tây.',
  'Cồn Phụng': 'Cù lao xanh giữa sông Tiền với vườn dừa, kênh rạch, nghề thủ công và không gian miệt vườn Bến Tre.',
  'Ao Bà Om': 'Hồ cổ của cộng đồng Khmer, được bao quanh bởi những cây dầu cổ thụ có bộ rễ nổi và quần thể chùa Âng.',
  'Chợ nổi Cái Răng': 'Chợ đầu mối trên sông Cần Thơ, nơi ghe lớn treo nông sản trên cây bẹo và họp nhộn nhịp từ sáng sớm.',
  'Chùa Dơi': 'Ngôi chùa Khmer đặc sắc ở Sóc Trăng, nổi bật với mái chạm trổ rực rỡ và đàn dơi quạ sống trong khuôn viên.',
  'Mũi Cà Mau': 'Điểm cực Nam trên đất liền Việt Nam, nơi rừng ngập mặn vươn ra biển và phù sa tiếp tục bồi đắp bờ cõi.',
  'Điện gió Bạc Liêu': 'Cánh đồng tua-bin ngoài bãi bồi ven biển, tạo nên nét giao thoa giữa năng lượng sạch và cảnh quan Nam Bộ.',
};

// Concise, reader-friendly notes distilled from Vietnamese public authorities,
// heritage agencies and official tourism portals. The original source remains
// linked in the viewer so visitors can verify and continue reading.
const LANDMARK_CONTEXT = {
  'Thác Bản Giốc': { significance: 'Cảnh quan thác nhiều tầng giữa địa hình karst và đồng ruộng tạo nên một biểu tượng du lịch vùng biên Đông Bắc.', history: 'Dòng Quây Sơn và không gian biên giới khiến Bản Giốc vừa có giá trị cảnh quan, vừa gắn với đời sống lâu đời của cộng đồng Tày, Nùng.', sourceLabel: 'Cổng du lịch quốc gia Việt Nam', sourceUrl: 'https://vietnamtourism.gov.vn/' },
  'Núi Mắt Thần': { significance: 'Lỗ thủng tự nhiên xuyên qua khối núi đá vôi là dạng địa mạo hiếm, nằm trong Công viên địa chất toàn cầu UNESCO Non nước Cao Bằng.', history: 'Địa danh còn được gọi là núi Thủng; cảnh quan Nặm Trá xung quanh gắn với sinh hoạt nông nghiệp và văn hóa bản địa.', sourceLabel: 'Cục Du lịch Quốc gia Việt Nam', sourceUrl: 'https://dantoc.vietnamtourism.gov.vn/nui-mat-than-cao-bang-ve-dep-dieu-ky-cua-tao-hoa/' },
  'Hồ Na Hang': { significance: 'Mặt hồ, núi đá vôi và rừng nguyên sinh tạo thành không gian sinh thái tiêu biểu của vùng thượng nguồn sông Gâm.', history: 'Khu vực Na Hang – Lâm Bình lưu giữ nhiều truyền thuyết, lễ hội và bản sắc của các dân tộc Tày, Dao, Mông.', sourceLabel: 'Cổng thông tin đối ngoại Tuyên Quang', sourceUrl: 'https://doingoai.tuyenquang.gov.vn/vi/post/suc-song-tu-du-lich-xanh?id=209752&type=NEWS' },
  'Cao nguyên đá Đồng Văn': { significance: 'Công viên địa chất toàn cầu UNESCO ghi lại lịch sử tiến hóa địa chất hàng trăm triệu năm và có đa dạng sinh học, văn hóa nổi bật.', history: 'Những thị trấn, dinh thự, chợ phiên và nếp sống trên đá phản ánh quá trình cư trú bền bỉ của nhiều cộng đồng vùng cao.', sourceLabel: 'Cổng thông tin đối ngoại Tuyên Quang', sourceUrl: 'https://doingoai.tuyenquang.gov.vn/vi/post/suc-song-tu-du-lich-xanh?id=209752&type=NEWS' },
  'Đèo Ô Quy Hồ': { significance: 'Cung đèo vượt dãy Hoàng Liên Sơn mở ra cảnh quan núi cao, thung lũng và biển mây đặc trưng của Tây Bắc.', history: 'Tên Ô Quy Hồ gắn với truyền thuyết dân gian địa phương; con đèo lâu nay là tuyến kết nối quan trọng giữa Lai Châu và Lào Cai.', sourceLabel: 'Sở Văn hóa, Thể thao và Du lịch Lai Châu', sourceUrl: 'https://svhttdl.laichau.gov.vn/du-lich/lay-y-kien-cong-dong-dan-cu-xa-ta-leng-hoan-thien-do-an-quy-hoach-chung-khu-du-lich-quoc-gia-o-quy-ho2.html' },
  'Pu Ta Leng': { significance: 'Đỉnh núi cao 3.049 m cùng rừng nguyên sinh và quần thể đỗ quyên là tài nguyên nổi bật của dãy Hoàng Liên Sơn.', history: '', sourceLabel: 'Cổng thông tin du lịch Lai Châu', sourceUrl: 'https://dulich.laichau.gov.vn/vi/blog/details/ve-lai-chau-du-le-hoi-then-kin-pang-2026-trai-nghiem-van-hoa-kham-pha-ve-dep-nui-rung-tay-bac-1303' },
  Fansipan: { significance: 'Đỉnh cao 3.143 m được gọi là “nóc nhà Đông Dương”, có giá trị đặc biệt về cảnh quan núi cao và hệ sinh thái Hoàng Liên.', history: 'Các cộng đồng quanh Hoàng Liên Sơn coi núi rừng là một phần không gian văn hóa; hành trình chinh phục Fansipan đã trở thành biểu tượng khám phá Việt Nam.', sourceLabel: 'Cục Du lịch Quốc gia Việt Nam', sourceUrl: 'https://vietnamtourism.gov.vn/' },
  'Mù Cang Chải': { significance: 'Ruộng bậc thang là kết quả của lao động thích nghi với địa hình dốc, đồng thời là sản phẩm du lịch sinh thái – văn hóa đặc trưng của người Mông.', history: 'Các khu ruộng La Pán Tẩn, Chế Cu Nha và Dế Xu Phình đã được xếp hạng danh thắng quốc gia.', sourceLabel: 'Cục Du lịch Quốc gia Việt Nam', sourceUrl: 'https://vietnamtourism.gov.vn/post/33699' },
  'Núi Mẫu Sơn': { significance: 'Độ cao, khí hậu mát lạnh và hệ sinh thái núi tạo cho Mẫu Sơn cảnh sắc khác biệt của vùng Đông Bắc.', history: 'Dấu tích biệt thự nghỉ dưỡng xây từ đầu thế kỷ XX cùng văn hóa Dao bản địa tạo nên lớp ký ức riêng cho vùng núi.', sourceLabel: 'Bộ Văn hóa, Thể thao và Du lịch', sourceUrl: 'https://bvhttdl.gov.vn/Pages/chi-tiet.aspx?url=%2Flang-son-danh-thuc-tiem-nang-khu-du-lich-mau-son-20241003083820222.htm' },
  'Ải Chi Lăng': { significance: 'Địa thế thung lũng hẹp giữa núi đá từng tạo nên một cửa ải chiến lược trên con đường từ biên giới vào đồng bằng Bắc Bộ.', history: 'Chi Lăng gắn với nhiều chiến thắng chống ngoại xâm, nổi bật là trận năm 1427 góp phần kết thúc cuộc kháng chiến chống quân Minh.', sourceLabel: 'Cổng du lịch Lạng Sơn', sourceUrl: 'https://lspa.langson.gov.vn/diem-den-du-lich/ai-chi-lang-341489' },
  'Hồ Núi Cốc': { significance: 'Hồ và hệ thống đảo tạo nên cảnh quan trung du, đồng thời cung cấp nguồn nước và không gian phát triển du lịch cho Thái Nguyên.', history: 'Tên hồ được kể cùng truyền thuyết nàng Công – chàng Cốc, một câu chuyện dân gian về tình yêu đã trở thành dấu ấn văn hóa địa phương.', sourceLabel: 'Cục Du lịch Quốc gia Việt Nam', sourceUrl: 'https://vietnamtourism.gov.vn/printer/67595?type=1' },
  'Hồ Ba Bể': { significance: 'Hồ nước ngọt tự nhiên nằm trong Vườn quốc gia Ba Bể, kết nối với sông, hang động và rừng trên núi đá vôi.', history: 'Không gian quanh hồ là nơi sinh sống lâu đời của người Tày; truyền thuyết hồ Ba Bể được lưu truyền như cách cộng đồng lý giải nguồn gốc cảnh quan.', sourceLabel: 'Cơ sở dữ liệu du lịch Việt Nam', sourceUrl: 'https://csdl.vietnamtourism.gov.vn/dest/?item=176' },
  'Đồi A1': { significance: 'Đồi giữ vị trí then chốt ở phía đông tập đoàn cứ điểm Điện Biên Phủ và nay là điểm giáo dục lịch sử quan trọng.', history: 'Trận đánh kéo dài tại A1 kết thúc rạng sáng 7/5/1954, tạo điều kiện cho quân ta tiến vào sở chỉ huy đối phương trong ngày chiến thắng.', sourceLabel: 'Cổng du lịch Điện Biên', sourceUrl: 'https://dulichdienbien.vn/' },
  'Hồ Pá Khoang': { significance: 'Hồ nằm giữa địa hình núi rừng Mường Phăng, có nhiều nhánh nước, bán đảo và thảm thực vật phong phú.', history: 'Pá Khoang nằm gần không gian di tích Sở Chỉ huy Chiến dịch Điện Biên Phủ tại Mường Phăng, thuận lợi cho hành trình kết hợp sinh thái và lịch sử.', sourceLabel: 'Cổng du lịch Điện Biên', sourceUrl: 'https://dulichdienbien.vn/' },
  'Đền Hùng': { significance: 'Quần thể trên núi Nghĩa Lĩnh là trung tâm thực hành tín ngưỡng thờ cúng Hùng Vương, biểu đạt ý thức về cội nguồn chung của người Việt.', history: 'Tín ngưỡng thờ cúng Hùng Vương được UNESCO ghi danh là di sản văn hóa phi vật thể đại diện của nhân loại năm 2012.', sourceLabel: 'Cổng du lịch Phú Thọ', sourceUrl: 'https://dulichphutho.gov.vn/tour-du-lich/den-hung-long-coc-thanh-thuy-ho-hoa-binh-mai-chau' },
  'Thung lũng Mai Châu': { significance: 'Thung lũng lúa và các bản nhà sàn là không gian tiêu biểu để tìm hiểu nghề dệt, ẩm thực và văn hóa Thái.', history: 'Du lịch cộng đồng tại các bản như Lác, Pom Coọng phát triển trên nền nếp sống và kiến trúc truyền thống của cư dân địa phương.', sourceLabel: 'Cổng du lịch Phú Thọ', sourceUrl: 'https://dulichphutho.gov.vn/diemden/thung-lung-mai-chau' },
  'Chùa Dâu': { significance: 'Chùa là một trong những trung tâm Phật giáo sớm nhất ở Việt Nam, nơi Phật giáo giao thoa với tín ngưỡng Tứ Pháp bản địa.', history: 'Chùa gắn với trung tâm Luy Lâu từ những thế kỷ đầu Công nguyên; bộ mộc bản chùa Dâu được công nhận là bảo vật quốc gia.', sourceLabel: 'Sở Dân tộc và Tôn giáo Bắc Ninh', sourceUrl: 'https://sdttg.bacninh.gov.vn/news/-/details/194272/le-hoi-truyen-thong-vung-dau-trung-tam-phat-giao-co-xua-nhat-viet-nam-116341415' },
  'Tây Yên Tử': { significance: 'Sườn tây dãy Yên Tử kết nối cảnh quan rừng núi với hệ thống chùa, am, tháp của không gian Phật giáo Trúc Lâm.', history: 'Con đường hành hương gắn với dấu chân Phật hoàng Trần Nhân Tông và quá trình hình thành Thiền phái Trúc Lâm Yên Tử.', sourceLabel: 'Khu du lịch Tây Yên Tử', sourceUrl: 'https://tayyentu.bacninh.gov.vn/gioi-thieu-chung' },
  'Hồ Gươm': { significance: 'Hồ là không gian công cộng, cảnh quan và biểu tượng văn hóa ở trung tâm Thủ đô.', history: 'Tên Hồ Hoàn Kiếm gắn với truyền thuyết vua Lê Lợi trả gươm báu sau cuộc khởi nghĩa Lam Sơn; quanh hồ tập trung nhiều di tích của Thăng Long – Hà Nội.', sourceLabel: 'Cổng thông tin Hà Nội', sourceUrl: 'https://hanoi.gov.vn/van-hien-thang-long/thang-long-ha-noi-hanh-trinh-nghin-nam-doi-thay-phat-trien-42813733.htm' },
  'Hoàng thành Thăng Long': { significance: 'Các tầng kiến trúc và khảo cổ phản ánh trung tâm quyền lực liên tục của quốc gia qua nhiều triều đại.', history: 'Khu trung tâm Hoàng thành được UNESCO ghi danh Di sản văn hóa thế giới năm 2010, với chiều dài lịch sử từ thời tiền Thăng Long đến hiện đại.', sourceLabel: 'Cổng thông tin Hà Nội', sourceUrl: 'https://hanoi.gov.vn/dia-ly-dia-hinh/vi-tri-hoang-thanh-thang-long-4241009115110957.htm' },
  'Vịnh Hạ Long': { significance: 'Quần thể đảo tháp đá vôi trên biển có giá trị thẩm mỹ, địa chất – địa mạo nổi bật toàn cầu và hệ sinh thái đa dạng.', history: 'Vịnh Hạ Long nhiều lần được UNESCO ghi danh, hiện cùng quần đảo Cát Bà tạo thành di sản thiên nhiên thế giới liên tỉnh.', sourceLabel: 'Cổng du lịch Quảng Ninh', sourceUrl: 'https://dulich.quangninh.gov.vn/' },
  'Yên Tử': { significance: 'Hệ thống chùa, am và tháp giữa rừng núi tạo nên trung tâm văn hóa – tâm linh đặc biệt của Phật giáo Trúc Lâm.', history: 'Vua Trần Nhân Tông tu hành và sáng lập Thiền phái Trúc Lâm tại Yên Tử; quần thể Yên Tử – Vĩnh Nghiêm – Côn Sơn, Kiếp Bạc được UNESCO ghi danh năm 2025.', sourceLabel: 'Cổng du lịch Quảng Ninh', sourceUrl: 'https://dulich.quangninh.gov.vn/' },
  'Cao nguyên Mộc Châu': { significance: 'Khí hậu cao nguyên, đồng cỏ, đồi chè và mùa hoa tạo nên vùng du lịch nông nghiệp – sinh thái đặc trưng.', history: 'Mộc Châu là không gian cư trú, giao thoa văn hóa của nhiều dân tộc, trong đó nổi bật cộng đồng Thái và Mông.', sourceLabel: 'Cổng thông tin Sơn La', sourceUrl: 'https://sonla.gov.vn/4/469/61708/630360/cac-huyen-thanh-pho/huyen-moc-chau' },
  'Tà Xùa': { significance: 'Địa hình núi cao, sống núi hẹp và điều kiện khí tượng tạo nên cảnh biển mây nổi tiếng ở Bắc Yên.', history: 'Bên cạnh cảnh quan, Tà Xùa còn gắn với các bản người Mông và vùng chè Shan tuyết cổ thụ.', sourceLabel: 'Cục Du lịch Quốc gia Việt Nam', sourceUrl: 'https://vietnamtourism.gov.vn/post/31427' },
  'Quần đảo Cát Bà': { significance: 'Rừng mưa nhiệt đới trên đảo đá vôi, hệ sinh thái biển và địa hình karst ngập nước tạo nên giá trị đa dạng sinh học đặc biệt.', history: 'Cát Bà thuộc Di sản thiên nhiên thế giới Vịnh Hạ Long – Quần đảo Cát Bà và Khu dự trữ sinh quyển thế giới.', sourceLabel: 'Cổng thông tin Cát Hải – Hải Phòng', sourceUrl: 'https://cathai.haiphong.gov.vn/dang-uy-dac-khu/dac-khu-cat-hai-ban-hanh-nghi-quyet-chuyen-doi-xanh-tren-dao-cat-ba-giai-doan-2026-2030-tam-nhin-897523' },
  'Côn Sơn - Kiếp Bạc': { significance: 'Cảnh quan núi, rừng, suối và hệ thống đền chùa hợp thành không gian văn hóa – tâm linh quan trọng của xứ Đông.', history: 'Côn Sơn gắn với Nguyễn Trãi; Kiếp Bạc gắn với Hưng Đạo Đại vương Trần Quốc Tuấn và các cuộc kháng chiến thời Trần.', sourceLabel: 'Cổng thông tin Hải Phòng', sourceUrl: 'https://www.haiphong.gov.vn/di-tich-danh-thang/thang-canh-con-son-852317' },
  'Phố Hiến': { significance: 'Hệ thống đền, chùa, đình, phố cổ phản ánh một đô thị giao thương từng quy tụ nhiều cộng đồng và tín ngưỡng.', history: 'Phố Hiến phát triển thịnh đạt từ thế kỷ XVI–XVII bên sông Hồng, từng được nhắc trong câu “Thứ nhất Kinh Kỳ, thứ nhì Phố Hiến”.', sourceLabel: 'Cổng thông tin Hưng Yên', sourceUrl: 'https://thuvu.hungyen.gov.vn/phat-huy-gia-tri-van-hoa-cua-manh-dat-hung-yen-c2161.html' },
  'Chùa Keo': { significance: 'Kiến trúc gỗ, chạm khắc và gác chuông tạo nên một mẫu mực nghệ thuật của đồng bằng Bắc Bộ.', history: 'Ngôi chùa hiện còn mang đậm phong cách kiến trúc thời Lê Trung Hưng và gắn với việc thờ Thiền sư Không Lộ.', sourceLabel: 'Cổng thông tin Hưng Yên', sourceUrl: 'https://thuvu.hungyen.gov.vn/phat-huy-gia-tri-van-hoa-cua-manh-dat-hung-yen-c2161.html' },
  'Tràng An': { significance: 'Cảnh quan karst nhiệt đới ngập nước kết hợp di chỉ khảo cổ cho thấy mối quan hệ lâu dài giữa con người và môi trường.', history: 'Quần thể danh thắng Tràng An được UNESCO ghi danh là Di sản văn hóa và thiên nhiên thế giới năm 2014.', sourceLabel: 'Cơ sở dữ liệu du lịch Việt Nam', sourceUrl: 'https://csdl.vietnamtourism.gov.vn/dest/?item=236' },
  'Chùa Tam Chúc': { significance: 'Hồ, núi đá vôi, thung lũng và các công trình tôn giáo tạo thành một không gian cảnh quan – tâm linh quy mô lớn.', history: 'Khu vực Tam Chúc còn có dấu tích khảo cổ, danh thắng và các truyền thuyết dân gian được bảo tồn cùng quần thể chùa.', sourceLabel: 'Cục Di sản văn hóa', sourceUrl: 'https://dsvh.gov.vn/danh-lam-thang-canh-va-khao-co-quan-the-tam-chuc-phuong-tam-chuc-tinh-ninh-binh-22335' },
  'Thành Nhà Hồ': { significance: 'Kỹ thuật xây thành bằng những khối đá lớn và quy hoạch theo nguyên tắc phong thủy thể hiện bước phát triển nổi bật của kiến trúc cuối thế kỷ XIV.', history: 'Hồ Quý Ly cho xây thành năm 1397; di tích được UNESCO ghi danh Di sản văn hóa thế giới năm 2011.', sourceLabel: 'Cục Di sản văn hóa', sourceUrl: 'https://dsvh.gov.vn/' },
  'Pù Luông': { significance: 'Khu bảo tồn rộng 17.662 ha bảo vệ rừng, núi đá vôi, nguồn nước và đa dạng sinh học của miền tây Thanh Hóa.', history: 'Tên Pù Luông trong tiếng Thái chỉ ngọn núi cao nhất; cảnh quan gắn chặt với các bản và canh tác ruộng bậc thang của người Thái, Mường.', sourceLabel: 'Cục Bảo tồn thiên nhiên và Đa dạng sinh học', sourceUrl: 'https://nbca.gov.vn/khu-du-tru-thien-nhien-pu-luong-thanh-hoa/' },
  'Làng Sen': { significance: 'Không gian làng quê với nhà tranh, vườn, ao sen và hiện vật giúp người xem hiểu tuổi thơ, gia đình của Chủ tịch Hồ Chí Minh.', history: 'Làng Sen là quê nội của Chủ tịch Hồ Chí Minh và là một bộ phận quan trọng của Khu di tích quốc gia đặc biệt Kim Liên.', sourceLabel: 'Cổng du lịch Nam Đàn – Nghệ An', sourceUrl: 'https://dulichnamdan.nghean.gov.vn/vi/dinhlangsen' },
  'Biển Cửa Lò': { significance: 'Bãi cát dài, độ dốc thoải và cụm đảo ven bờ tạo nên trung tâm nghỉ dưỡng biển lâu đời của Bắc Trung Bộ.', history: 'Cửa Lò phát triển từ vùng cửa biển – làng chài thành đô thị du lịch, với lễ hội du lịch biển được tổ chức thường niên.', sourceLabel: 'Cổng thông tin Nghệ An', sourceUrl: 'https://nghean.gov.vn/tin-tuc-su-kien-73053/khai-mac-le-hoi-du-lich-bien-cua-lo-nam-2025-723384' },
  'Ngã ba Đồng Lộc': { significance: 'Vị trí trên tuyến giao thông chiến lược từng là “yết hầu” vận chuyển chi viện cho chiến trường miền Nam.', history: 'Ngày 24/7/1968, mười nữ thanh niên xung phong hy sinh khi làm nhiệm vụ bảo đảm giao thông; nơi đây nay là di tích quốc gia đặc biệt và địa chỉ tri ân.', sourceLabel: 'Cổng thông tin Hà Tĩnh', sourceUrl: 'https://hatinh.gov.vn/vi/bai-viet/dong-loc-trong-trai-tim-ca-nuoc' },
  'Biển Thiên Cầm': { significance: 'Bờ biển hình cánh cung, cát sáng và núi sát biển tạo nên không gian nghỉ dưỡng đặc trưng của Hà Tĩnh.', history: 'Tên Thiên Cầm thường được giải nghĩa là “đàn trời”, gắn với âm thanh sóng và gió trong truyền thuyết dân gian địa phương.', sourceLabel: 'Cổng thông tin Thiên Cầm – Hà Tĩnh', sourceUrl: 'https://thiencam.hatinh.gov.vn/vi/chuyen-muc/gioi-thieu-chung' },
  'Phong Nha - Kẻ Bàng': { significance: 'Khối karst cổ, sông ngầm, hang động và rừng nhiệt đới tạo nên giá trị địa chất, địa mạo và đa dạng sinh học nổi bật toàn cầu.', history: 'Phong Nha – Kẻ Bàng được UNESCO ghi danh Di sản thiên nhiên thế giới năm 2003 và mở rộng tiêu chí đa dạng sinh học năm 2015.', sourceLabel: 'Cổng thông tin Quảng Trị', sourceUrl: 'https://www.quangtri.gov.vn/tin-tuc/ve-phong-nha-noi-nguoi-dan-lam-du-lich-2' },
  'Cầu Hiền Lương': { significance: 'Cầu bắc qua sông Bến Hải là chứng tích trực quan về giới tuyến quân sự tạm thời và khát vọng hòa bình, thống nhất.', history: 'Sau Hiệp định Genève 1954, khu vực vĩ tuyến 17 tạm thời chia cắt đất nước cho đến năm 1975; đôi bờ từng diễn ra cuộc đấu tranh biểu tượng bằng cờ, loa và màu sơn cầu.', sourceLabel: 'Sở Khoa học và Công nghệ Quảng Trị', sourceUrl: 'https://skhcn.quangtri.gov.vn/documents/45562/0/DS_2024_02.pdf' },
  'Kinh thành Huế': { significance: 'Kinh thành, Hoàng thành và Tử Cấm Thành thể hiện quy hoạch kinh đô, nghệ thuật kiến trúc và cảnh quan triều Nguyễn.', history: 'Huế là kinh đô của Việt Nam dưới triều Nguyễn từ 1802 đến 1945; Quần thể di tích Cố đô Huế được UNESCO ghi danh năm 1993.', sourceLabel: 'Trung tâm Bảo tồn Di tích Cố đô Huế', sourceUrl: 'https://www.hueworldheritage.org.vn/' },
  'Phá Tam Giang': { significance: 'Đầm phá nước lợ kéo dài ven biển tạo sinh cảnh phong phú, nguồn sinh kế thủy sản và cảnh quan đặc trưng của Huế.', history: 'Làng chài, nò sáo và phương thức khai thác thủy sản truyền thống phản ánh quá trình cộng đồng thích nghi với môi trường đầm phá.', sourceLabel: 'Cổng du lịch thông minh Huế', sourceUrl: 'https://huetripo.hue.gov.vn/diem-tham-quan' },
  'Quần đảo Hoàng Sa': { significance: 'Quần đảo gồm các đảo, đá, bãi cạn và bãi ngầm giữa Biển Đông, có vị trí đặc biệt về chủ quyền, hàng hải và môi trường biển.', history: 'Tư liệu Việt Nam ghi Hoàng Sa với tên Bãi Cát Vàng; Nhà nước Việt Nam đã xác lập, thực thi chủ quyền liên tục từ lâu đời. Hoàng Sa hiện thuộc đặc khu Hoàng Sa, thành phố Đà Nẵng.', sourceLabel: 'Cổng thông tin thành phố Đà Nẵng', sourceUrl: 'https://duynghia.danang.gov.vn/vi/web/dng-old/w/ubnd-huy%E1%BB%87n-ho%C3%A0ng-sa' },
  'Cầu Rồng': { significance: 'Thiết kế hình rồng vươn ra biển vừa giải quyết kết nối đông – tây, vừa trở thành biểu tượng kiến trúc của Đà Nẵng hiện đại.', history: 'Cầu khởi công năm 2009 và thông xe ngày 29/3/2013, đúng dịp kỷ niệm ngày giải phóng thành phố.', sourceLabel: 'Cổng thông tin thành phố Đà Nẵng', sourceUrl: 'https://50nam.danang.gov.vn/thanh-pho-hom-nay/khi-giac-mo-hoa-thanh-bieu-tuong-40421.html' },
  'Phố cổ Hội An': { significance: 'Cấu trúc phố, nhà ở, hội quán và tín ngưỡng còn được bảo tồn tốt, phản ánh sự giao lưu văn hóa Việt – Hoa – Nhật và phương Tây.', history: 'Hội An từng là thương cảng quốc tế thịnh đạt từ thế kỷ XVI–XVII và được UNESCO ghi danh Di sản văn hóa thế giới năm 1999.', sourceLabel: 'Trung tâm Quản lý Bảo tồn Di sản Văn hóa Hội An', sourceUrl: 'https://www.hoianworldheritage.org.vn/vi/news/print/Tong-quan-Hoi-An/Gioi-thieu-63.hwh' },
  'Đảo Lý Sơn': { significance: 'Dấu tích núi lửa, vách biển, ruộng tỏi và văn hóa cư dân biển tạo nên nhận diện riêng của đảo tiền tiêu.', history: 'Lý Sơn gắn với đội Hoàng Sa kiêm quản Bắc Hải; lễ khao lề thế lính Hoàng Sa tưởng nhớ những người từng ra biển thực thi nhiệm vụ chủ quyền.', sourceLabel: 'Sở Văn hóa, Thể thao và Du lịch Quảng Ngãi', sourceUrl: 'https://sovhttdl.quangngai.gov.vn/danh-muc-cot-phai/tin-tuc/hoat-dong-du-lich/dinh-hinh-tam-giac-du-lich-ly-son-mang-den-van-hoa-sa-huynh.html' },
  'Măng Đen': { significance: 'Cao nguyên có rừng nguyên sinh, khí hậu mát, hệ thống hồ – thác và bản sắc các dân tộc Tây Nguyên, phù hợp du lịch sinh thái.', history: 'Không gian Măng Đen gắn với truyền thuyết “bảy hồ, ba thác” và đời sống văn hóa của các cộng đồng bản địa.', sourceLabel: 'Cổng thông tin xã Măng Đen', sourceUrl: 'https://mangden.quangngai.gov.vn/tin-tuc/thong-tin-chi-dao-dieu-hanh-cua-ubnd-tinh-chu-tich-ubnd-tinh/hoat-dong-cua-lanh-dao/xa-mang-den-va-dac-khu-ly-son-ky-ket-hop-tac-phat-trien-kinh-te-xa-hoi.html' },
  'Biển Hồ': { significance: 'Hồ T’Nưng rộng khoảng 240 ha, là nguồn nước sinh hoạt quan trọng và một cảnh quan tiêu biểu của cao nguyên Pleiku.', history: 'Tên gọi Ia Nueng của người Jrai và Tum Tơnueng của người Bahnar cho thấy địa danh hiện diện lâu dài trong không gian văn hóa bản địa.', sourceLabel: 'Cổng thông tin xã Biển Hồ – Gia Lai', sourceUrl: 'https://bienho.gialai.gov.vn/thong-bao-van-ban-moi/gioi-thieu-diem-van-hoa-du-lich-tren-dia-ban-xa-bien-ho.html' },
  'Kỳ Co': { significance: 'Vịnh nhỏ có bãi cát hình lưỡi liềm, nước đổi sắc theo độ sâu và các vách đá bao bọc, tiêu biểu cho cảnh quan biển Quy Nhơn.', history: 'Kỳ Co nằm trong không gian văn hóa – biển đảo của bán đảo Phương Mai, gắn với sinh kế ngư nghiệp của cộng đồng ven biển.', sourceLabel: 'Cổng thông tin phường Quy Nhơn Đông', sourceUrl: 'https://quynhondong.gialai.gov.vn/du-lich/du-lich-ky-co.html' },
  'Buôn Đôn': { significance: 'Sông Sêrêpốk, rừng khộp, buôn làng và kỹ nghệ săn bắt – thuần dưỡng voi tạo nên một không gian văn hóa Tây Nguyên đặc sắc.', history: 'Tên Bản Đôn có nghĩa là “làng đảo”; vùng đất nổi tiếng qua câu chuyện các vua săn voi, nhà sàn cổ và giao lưu của nhiều dân tộc.', sourceLabel: 'Cổng thông tin Buôn Đôn – Đắk Lắk', sourceUrl: 'https://buondon.daklak.gov.vn/tong-quan-du-lich' },
  'Gành Đá Đĩa': { significance: 'Các cột bazan có tiết diện đa giác hình thành khi dung nham nguội và co rút, tạo một cấu trúc địa chất hiếm bên bờ biển.', history: 'Danh thắng được xếp hạng quốc gia năm 1998 và là một điểm cốt lõi trong định hướng bảo tồn di sản địa chất khu vực.', sourceLabel: 'Cổng thông tin tỉnh Đắk Lắk', sourceUrl: 'https://songhinh.daklak.gov.vn/upload/103900/20221005/Bao_cao_TH_cuoi_ky_QHT_Phu_Yen_68733.pdf' },
  'Vịnh Nha Trang': { significance: 'Vịnh kín gió với hệ thống đảo, bãi biển và rạn san hô tạo nên trung tâm du lịch biển và nghiên cứu hải dương quan trọng.', history: 'Không gian vịnh gắn với quá trình hình thành đô thị Nha Trang và các cộng đồng làng biển, cảng biển lâu đời.', sourceLabel: 'Cổng du lịch số Khánh Hòa', sourceUrl: 'https://dulichso.khanhhoa.gov.vn/' },
  'Vịnh Vĩnh Hy': { significance: 'Vịnh được núi thuộc Vườn quốc gia Núi Chúa che chắn, có nước trong và hệ sinh thái san hô giàu giá trị.', history: 'Làng biển Vĩnh Hy lưu giữ sinh kế đánh bắt và văn hóa cư dân duyên hải Nam Trung Bộ.', sourceLabel: 'Cổng du lịch số Khánh Hòa', sourceUrl: 'https://dulichso.khanhhoa.gov.vn/article/vinh-vinh-hy-8ea' },
  'Quần đảo Trường Sa': { significance: 'Hơn 100 đảo, đá, bãi cạn và rạn san hô trải trên vùng biển rộng ở phía nam Biển Đông, có vị trí chiến lược về quốc phòng, hàng hải và kinh tế biển.', history: 'Tư liệu và bản đồ qua nhiều thế kỷ ghi nhận quá trình xác lập chủ quyền của Việt Nam; bia chủ quyền tại Song Tử Tây và Nam Yết được xếp hạng di tích lịch sử quốc gia năm 2014.', sourceLabel: 'Sở Văn hóa, Thể thao và Du lịch Khánh Hòa', sourceUrl: 'https://svhttdl.khanhhoa.gov.vn/vi/di-tichdi-san-cap-quoc-gia/bia-chu-quyen-quan-dao-truong-sa-tai-dao-song-tu-tay-va-dao-nam-yet' },
  'Đà Lạt': { significance: 'Độ cao khoảng 1.500 m, khí hậu ôn hòa, rừng thông, hồ và quỹ kiến trúc nghỉ dưỡng tạo nên bản sắc đô thị cao nguyên.', history: 'Đà Lạt được hình thành từ cuối thế kỷ XIX và phát triển thành đô thị nghỉ dưỡng; văn hóa K’Ho bản địa cùng nhiều lớp cư dân góp phần làm nên tính cách thành phố.', sourceLabel: 'Địa chí Đà Lạt – Cổng thông tin Lâm Đồng', sourceUrl: 'https://lamdong.gov.vn/sites/book/diachidalat/Phan2/chuong1.htm' },
  'Mũi Né': { significance: 'Bờ biển, đồi cát đỏ – trắng, địa hình “cát” và điều kiện gió tạo thế mạnh cho nghỉ dưỡng cùng thể thao biển.', history: 'Từ một làng chài, Mũi Né phát triển thành khu du lịch quốc gia nhưng vẫn lưu giữ sinh hoạt nghề biển và lễ hội cộng đồng ven biển.', sourceLabel: 'Sở Văn hóa, Thể thao và Du lịch Lâm Đồng', sourceUrl: 'https://lamdong.gov.vn/sites/svhttdl/hoatdongdulich/quyhoachdautu/Shared%20Documents/Quy%E1%BA%BFt%20%C4%91%E1%BB%8Bnh%20ph%C3%AA%20duy%E1%BB%87t%20%28k%C3%BD%20s%E1%BB%91%20ph%C3%A1t%20h%C3%A0nh%29.signed.signed.pdf' },
  'Vườn quốc gia Cát Tiên': { significance: 'Rừng nhiệt đới, sông Đồng Nai và vùng đất ngập nước Bàu Sấu bảo tồn nhiều loài quý hiếm cùng các quá trình sinh thái quan trọng.', history: 'Bàu Sấu được công nhận là vùng đất ngập nước Ramsar năm 2005; Cát Tiên còn lưu giữ di chỉ khảo cổ của các cộng đồng cổ.', sourceLabel: 'Cổng thông tin tỉnh Đồng Nai', sourceUrl: 'https://hvhnt.dongnai.gov.vn/Pages/newsdetail.aspx?CatId=100&NewsId=4535' },
  'Bù Gia Mập': { significance: 'Vườn quốc gia nằm ở vùng chuyển tiếp Đông Nam Bộ – Tây Nguyên, bảo vệ rừng thường xanh, đầu nguồn và hành lang đa dạng sinh học.', history: 'Khu vực từng là địa bàn căn cứ trong kháng chiến; ngày nay giá trị rừng và văn hóa cộng đồng S’tiêng, M’nông là nền tảng cho giáo dục, du lịch sinh thái.', sourceLabel: 'Cổng thông tin tỉnh Đồng Nai', sourceUrl: 'https://dongnai.gov.vn/' },
  'Núi Bà Đen': { significance: 'Đỉnh cao 986 m là “nóc nhà Nam Bộ”, nổi bật giữa đồng bằng và kết hợp giá trị cảnh quan, tâm linh, sinh thái.', history: 'Núi gắn với truyền thuyết Linh Sơn Thánh Mẫu, hệ thống chùa hang và nhiều căn cứ cách mạng; lễ vía Bà được ghi danh di sản văn hóa phi vật thể quốc gia.', sourceLabel: 'Ban quản lý Khu du lịch quốc gia Núi Bà Đen', sourceUrl: 'https://khudulichnuibaden.tayninh.gov.vn/gioi-thieu-nui-ba-den' },
  'Làng nổi Tân Lập': { significance: 'Rừng tràm, kênh rạch và vùng ngập nước tái hiện hệ sinh thái đặc trưng của Đồng Tháp Mười.', history: 'Không gian này gợi lại quá trình khai phá, thích nghi với mùa nước của cư dân vùng trũng Nam Bộ.', sourceLabel: 'Cổng du lịch Tây Ninh', sourceUrl: 'https://dulich.tayninh.gov.vn/tin-tuc/lang-noi-tan-lap-67' },
  'Sông Sài Gòn': { significance: 'Là phụ lưu của sông Đồng Nai, dòng sông kết nối nội địa với cửa Cần Giờ và giữ vai trò lớn trong giao thông, cảnh quan, kinh tế đô thị.', history: 'Dọc sông hình thành bến cảng và mạng lưới giao thương giúp Sài Gòn sớm phát triển thành đô thị quốc tế.', sourceLabel: 'Sở Quy hoạch – Kiến trúc TP.HCM', sourceUrl: 'https://qhkt.hochiminhcity.gov.vn/Media/Uploads/H%C3%ACnh%20H%E1%BB%99i%20th%E1%BA%A3o%20-%20H%E1%BB%99i%20ngh%E1%BB%8B/2019%20-%20b%E1%BB%9D%20s%C3%B4ng%20SG%20den%202015/kiyeu_hoithao_bsong%20SG-%C4%91%C3%A3%20n%C3%A9n.pdf' },
  'Côn Đảo': { significance: 'Quần đảo có rừng, rạn san hô, thảm cỏ biển và bãi đẻ của rùa biển, mang giá trị bảo tồn biển – đảo đặc biệt.', history: 'Hệ thống nhà tù Côn Đảo là di tích quốc gia đặc biệt, ghi dấu sự hy sinh và ý chí của nhiều thế hệ chiến sĩ cách mạng.', sourceLabel: 'Cổng thông tin Côn Đảo', sourceUrl: 'https://condao.com.vn/' },
  'Núi Sam': { significance: 'Ngọn núi đá cao 284 m nổi giữa đồng bằng Châu Đốc, tập trung quần thể di tích và thực hành tín ngưỡng quan trọng của Nam Bộ.', history: 'Núi còn có tên Vĩnh Tế Sơn, được vua Minh Mạng đặt để ghi công Thoại Ngọc Hầu; lễ vía Bà Chúa Xứ phản ánh giao thoa văn hóa Kinh, Hoa, Chăm, Khmer.', sourceLabel: 'Cổng thông tin An Giang', sourceUrl: 'https://angiang.gov.vn/vi/thuong-truc-ubnd-tinh-lam-viec-voi-ban-quan-ly-khu-du-lich-quoc-gia-nui-sam' },
  'Phú Quốc': { significance: 'Đảo có bãi biển, rừng quốc gia, suối, rạn san hô và nguồn tài nguyên biển đa dạng của vịnh Thái Lan.', history: 'Làng chài, nghề làm nước mắm, trồng hồ tiêu và các di tích như Nhà tù Phú Quốc tạo nên nhiều lớp văn hóa – lịch sử của đảo.', sourceLabel: 'Cổng thông tin đặc khu Phú Quốc', sourceUrl: 'https://phuquoc.angiang.gov.vn/dinh-huong-quy-hoach-cac-khu-du-lich' },
  'Vườn quốc gia Tràm Chim': { significance: 'Hệ sinh thái đất ngập nước tiêu biểu của Đồng Tháp Mười bảo tồn khoảng 130 loài thực vật và hơn 198 loài chim nước.', history: 'Tràm Chim được công nhận là khu Ramsar thứ tư của Việt Nam, đồng thời lưu giữ cảnh quan từng phổ biến của vùng Đồng Tháp Mười.', sourceLabel: 'Cổng du lịch Đồng Tháp', sourceUrl: 'https://dulich.dongthap.gov.vn/vi/tramchim' },
  'Chợ nổi Cái Bè': { significance: 'Chợ trên sông Tiền thể hiện phương thức phân phối nông sản và nếp sống thương hồ của cư dân đồng bằng sông Cửu Long.', history: 'Chợ hình thành từ nhu cầu trao đổi hàng hóa ở vàm Cái Bè và từng phát triển thành một đầu mối lớn của vùng.', sourceLabel: 'Cổng du lịch Đồng Tháp', sourceUrl: 'https://dulich.dongthap.gov.vn/iv/chonoicaibe' },
  'Cồn Phụng': { significance: 'Cù lao giữa sông Tiền tiêu biểu cho cảnh quan miệt vườn, kênh rạch, cây trái và nghề thủ công xứ dừa.', history: 'Cồn còn gắn với dấu tích Đạo Dừa hình thành trong thế kỷ XX, một hiện tượng tín ngưỡng đặc biệt ở Nam Bộ.', sourceLabel: 'Cổng du lịch Vĩnh Long', sourceUrl: 'https://vinhlong.gov.vn/du-khach/diadanh_test' },
  'Ao Bà Om': { significance: 'Hồ cổ, hàng cây dầu có bộ rễ nổi và quần thể chùa Âng tạo nên trung tâm cảnh quan – văn hóa Khmer đặc sắc.', history: 'Địa danh gắn với nhiều truyền thuyết Khmer về việc đào ao; không gian quanh ao là nơi diễn ra các sinh hoạt lễ hội, cộng đồng lâu đời.', sourceLabel: 'Cổng thông tin Vĩnh Long', sourceUrl: 'https://vinhlong.gov.vn/du-khach/diadanh_test' },
  'Chợ nổi Cái Răng': { significance: 'Chợ đầu mối trên sông Cần Thơ thể hiện mạng lưới thương mại đường thủy và văn hóa “cây bẹo” đặc trưng miền Tây.', history: 'Văn hóa chợ nổi Cái Răng được đưa vào Danh mục di sản văn hóa phi vật thể quốc gia năm 2016.', sourceLabel: 'Cổng du lịch Cần Thơ', sourceUrl: 'https://dulich.cantho.gov.vn/' },
  'Chùa Dơi': { significance: 'Kiến trúc, mỹ thuật Phật giáo Nam tông Khmer và đàn dơi quạ trong khuôn viên tạo nên một không gian văn hóa – sinh thái độc đáo.', history: 'Tên chính Wathsêrâytêchô – Mahatup; di tích phản ánh lịch sử, tín ngưỡng và nghệ thuật của cộng đồng Khmer Sóc Trăng qua nhiều thế kỷ.', sourceLabel: 'Cổng thông tin thành phố Sóc Trăng', sourceUrl: 'https://ubndtp.soctrang.gov.vn/mDefault.aspx?catid=53984&catname=Di+t%C3%ADch%2C+danh+th%E1%BA%AFng&id=366150&pageid=39&sid=1279&sname=tpsoctrang&title=ly-lich-di-tich-kien-truc-nghe-thuat-chua-wathseraytecho-mahatup-chua-ma-toc-chua-doi' },
  'Mũi Cà Mau': { significance: 'Đây là vùng cực Nam trên đất liền, nơi rừng ngập mặn, bãi bồi và hệ sinh thái cửa sông – ven biển liên tục biến đổi theo phù sa.', history: 'Mũi Cà Mau là biểu tượng địa lý và chủ quyền lãnh thổ; cột mốc tọa độ, biểu tượng con tàu và đường Hồ Chí Minh là các điểm ghi dấu hành trình đất nước.', sourceLabel: 'Cổng xúc tiến đầu tư Cà Mau', sourceUrl: 'https://xuctiendautu.camau.gov.vn/ca-mau-diem-den-hap-dan-tap-trung-phat-trien-du-lich-sinh-thai-du-lich-van-hoa-tam-linh-du-lich-trai-nghiem897-2/' },
  'Điện gió Bạc Liêu': { significance: 'Các tua-bin đặt trên vùng bãi bồi ven biển vừa sản xuất năng lượng tái tạo, vừa tạo nên cảnh quan công nghiệp đặc trưng.', history: 'Công trình đánh dấu giai đoạn Bạc Liêu khai thác tiềm năng gió ven biển và trở thành một điểm du lịch được địa phương công nhận.', sourceLabel: 'Sở Văn hóa, Thể thao và Du lịch Cà Mau', sourceUrl: 'https://svhttdl.baclieu.gov.vn/documents/404650/0/1.%2BBao%2Bcao%2Bhoat%2Bdong%2BVHTTDL%2Bnam%2B2023%2Bphuc%2Bvu%2BHN%2Btong%2Bket%2Bcua%2BNganh.pdf/8facfeff-ce09-a556-4cf5-c556173c2b49?t=1703563798854' },
};

const LANDMARK_INTERVAL_KM = 5;
const UNLOCKED_LANDMARKS_STORAGE_KEY = 'sap_tet_runner_v3_landmarks_unlocked';

const VIETNAM_ROUTE = VIETNAM_JOURNEY;

const REGION_BACKGROUNDS = {
  north: [
    '/assets/images/tet-runner/vietnam-north.webp',
  ],
  central: [
    '/assets/images/tet-runner/vietnam-central.webp',
  ],
  south: [
    '/assets/images/tet-runner/vietnam-south.webp',
  ],
};

VIETNAM_ROUTE.forEach((stop) => {
  stop.backgroundUrl ||= REGION_BACKGROUNDS[stop.region][0];
  stop.sceneKey = stop.backgroundUrl;
});

const BACKGROUND_SCENES = [...new Set(VIETNAM_ROUTE.map((stop) => stop.backgroundUrl))]
  .map((url) => ({ key: url, url }));

const SOUND_URLS = {
  background: '/assets/sounds/tet-runner-background.mp3',
  gallop: '/assets/sounds/tet-runner-gallop.mp3?v=20260914b',
  envelope: '/assets/sounds/tet-runner-envelope.mp3',
  crash: '/assets/sounds/tet-runner-crash.mp3',
  failed: '/assets/sounds/tet-runner-failed.mp3',
  action: '/assets/sounds/tet-runner-action.mp3',
  landmark: '/assets/sounds/tet-runner-landmark.mp3',
};
const GALLOP_START_OFFSET_S = 0;

function material(color, extra = {}) {
  return new THREE.MeshStandardMaterial({ color, flatShading: true, roughness: 0.86, metalness: 0.02, ...extra });
}

function mesh(geometry, color, position, scale, extraMaterial) {
  const item = new THREE.Mesh(geometry, material(color, extraMaterial));
  if (position) item.position.set(...position);
  if (scale) item.scale.set(...scale);
  return item;
}

function box(size, color, position) {
  return mesh(new THREE.BoxGeometry(...size), color, position);
}

function lowSphere(radius, color, position, scale, extraMaterial) {
  return mesh(new THREE.SphereGeometry(radius, 8, 6), color, position, scale, extraMaterial);
}

function cylinder(radiusTop, radiusBottom, height, color, position, segments = 7) {
  return mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments), color, position);
}

function addGroundShadow(group, width, opacity = .28) {
  const shadowMaterial = new THREE.MeshBasicMaterial({ color: 0x211526, transparent: true, opacity, depthWrite: false });
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(width, 18), shadowMaterial);
  shadow.position.set(0, .045, .08);
  shadow.rotation.x = -Math.PI / 2;
  shadow.scale.y = .34;
  group.add(shadow);
  return shadow;
}

function createHorse() {
  const horse = new THREE.Group();
  horse.name = 'horse-mascot';

  const body = lowSphere(1, COLORS.orange, [0, 1.45, 0], [1.12, .56, .48]);
  horse.add(body);
  const chest = lowSphere(.55, 0xe46d42, [.62, 1.48, 0], [.78, 1, .88]);
  horse.add(chest);

  const neck = cylinder(.34, .46, 1.16, COLORS.orange, [.62, 1.95, 0]);
  neck.rotation.z = -.43;
  horse.add(neck);
  const head = lowSphere(.52, 0xe46d42, [1.04, 2.48, 0], [1.05, .76, .72]);
  head.rotation.z = -.12;
  horse.add(head);
  const muzzle = lowSphere(.34, 0xf5a45e, [1.43, 2.34, 0], [1.12, .72, .8]);
  horse.add(muzzle);

  const earGeometry = new THREE.ConeGeometry(.15, .48, 5);
  const earA = mesh(earGeometry, COLORS.orange, [.82, 2.96, .2]);
  const earB = mesh(earGeometry, COLORS.orange, [.82, 2.96, -.2]);
  earA.rotation.z = -.2;
  earB.rotation.z = -.2;
  horse.add(earA, earB);

  const eyeWhite = lowSphere(.11, COLORS.white, [1.27, 2.59, .38], [1, 1, .55]);
  const pupil = lowSphere(.06, COLORS.darkBrown, [1.31, 2.6, .44], [1, 1, .45]);
  horse.add(eyeWhite, pupil);

  const maneGeometry = new THREE.ConeGeometry(.18, .46, 5);
  for (let index = 0; index < 5; index += 1) {
    const mane = mesh(maneGeometry, COLORS.deepRed, [.23 + index * .14, 2.18 + index * .15, 0]);
    mane.rotation.z = 1.05;
    horse.add(mane);
  }

  const scarf = cylinder(.38, .38, .18, COLORS.red, [.72, 2.16, 0], 8);
  scarf.rotation.z = -.42;
  horse.add(scarf);
  const scarfTail = box([.62, .14, .08], COLORS.gold, [.2, 2.16, .06]);
  scarfTail.rotation.z = .22;
  horse.add(scarfTail);

  const saddle = lowSphere(.58, COLORS.red, [-.18, 1.77, .03], [1.08, .22, .72]);
  const saddleTrim = box([.82, .08, .55], COLORS.gold, [-.2, 1.68, .03]);
  horse.add(saddle, saddleTrim);

  const tailPivot = new THREE.Group();
  tailPivot.position.set(-1.02, 1.58, 0);
  const tail = cylinder(.05, .14, 1.05, COLORS.deepRed, [-.35, -.32, 0], 6);
  tail.rotation.z = -1.02;
  tailPivot.add(tail);
  horse.add(tailPivot);

  const legPivots = [];
  [[-.65, .15], [-.6, -.2], [.57, .17], [.62, -.2]].forEach(([x, z], index) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, 1.17, z);
    const upper = cylinder(.13, .16, .72, index % 2 ? 0xd85a31 : COLORS.orange, [0, -.34, 0], 6);
    const lower = cylinder(.1, .12, .66, 0xf08b47, [0, -.98, 0], 6);
    const hoof = box([.3, .18, .28], COLORS.darkBrown, [.1, -1.28, 0]);
    pivot.add(upper, lower, hoof);
    horse.add(pivot);
    legPivots.push(pivot);
  });

  horse.userData = { legPivots, tailPivot, body, head, scarfTail, chest };
  horse.scale.setScalar(.88);
  return horse;
}

function addHorseAccessories(horse) {
  const accessories = new THREE.Group();
  accessories.name = 'horse-tet-accessories';
  const medallion = cylinder(.2, .2, .07, COLORS.gold, [.63, 2.05, .4], 10);
  medallion.rotation.x = Math.PI / 2;
  const plume = new THREE.Mesh(new THREE.ConeGeometry(.13, .58, 6), material(COLORS.red));
  plume.position.set(.7, 3.17, 0);
  plume.rotation.z = -.18;
  accessories.add(medallion, plume);
  horse.add(accessories);
  horse.userData.themeAccessories = accessories;
  return accessories;
}

function createEnvelope() {
  const group = new THREE.Group();
  group.add(box([.64, .46, .1], COLORS.red, [0, 0, 0]));
  const seal = cylinder(.1, .1, .04, COLORS.gold, [0, 0, .075], 8);
  seal.rotation.x = Math.PI / 2;
  group.add(seal);
  const fold = new THREE.Mesh(new THREE.ConeGeometry(.32, .26, 3), material(0x8d1020));
  fold.position.set(0, .11, .065);
  fold.rotation.z = Math.PI;
  fold.rotation.x = Math.PI / 2;
  group.add(fold);
  return group;
}

function createBanhChung() {
  const group = new THREE.Group();
  group.add(box([.58, .58, .22], 0x2f7950, [0, 0, 0]));
  group.add(box([.09, .61, .24], COLORS.gold, [0, 0, 0]));
  group.add(box([.61, .09, .24], 0xf6d36d, [0, 0, 0]));
  group.rotation.z = .08;
  return group;
}

function createBanhTet() {
  const group = new THREE.Group();
  const cake = cylinder(.22, .22, .78, 0x3b8755, [0, 0, 0], 9);
  cake.rotation.z = Math.PI / 2;
  group.add(cake);
  [-.24, 0, .24].forEach((x) => {
    const tie = cylinder(.235, .235, .055, COLORS.gold, [x, 0, 0], 9);
    tie.rotation.z = Math.PI / 2;
    group.add(tie);
  });
  group.rotation.z = -.1;
  return group;
}

function createCollectible(type) {
  if (type === 'banh_chung') return createBanhChung();
  if (type === 'banh_tet') return createBanhTet();
  return createEnvelope();
}

function createKumquatPlanter() {
  const group = new THREE.Group();
  addGroundShadow(group, .75);
  group.add(cylinder(.46, .34, .62, COLORS.purple, [0, .31, 0], 7));
  group.add(cylinder(.48, .48, .1, COLORS.gold, [0, .59, 0], 8));
  group.add(cylinder(.09, .11, .62, COLORS.brown, [0, .85, 0], 6));
  for (let index = 0; index < 8; index += 1) {
    const angle = (index / 8) * Math.PI * 2;
    group.add(lowSphere(.26, COLORS.green, [Math.cos(angle) * .34, 1.08 + (index % 2) * .22, Math.sin(angle) * .28]));
    group.add(lowSphere(.085, 0xffa735, [Math.cos(angle) * .42, 1.1 + (index % 3) * .18, Math.sin(angle) * .34]));
  }
  group.scale.setScalar(.83);
  return group;
}

function createFlowerTree(blossomColor) {
  const group = new THREE.Group();
  addGroundShadow(group, .82);
  group.add(cylinder(.43, .32, .48, COLORS.purple, [0, .24, 0], 7));
  group.add(cylinder(.1, .15, 1.22, COLORS.brown, [0, .94, 0], 7));
  const branches = [];
  [[-.34, 1.12, -.72], [.36, 1.2, .72], [-.24, 1.48, -.6], [.28, 1.56, .58]].forEach(([x, y, angle]) => {
    const branch = cylinder(.045, .075, .72, COLORS.brown, [x, y, 0], 6);
    branch.rotation.z = angle;
    branch.userData.baseRotation = angle;
    group.add(branch);
    branches.push(branch);
  });
  for (let index = 0; index < 14; index += 1) {
    const angle = index * 2.18;
    const radius = .28 + (index % 4) * .13;
    const blossom = lowSphere(.12, index % 4 === 0 ? COLORS.white : blossomColor, [Math.cos(angle) * radius, 1.24 + (index % 5) * .16, Math.sin(angle) * .22], [1, .72, 1]);
    group.add(blossom);
  }
  group.userData.swayParts = branches;
  return group;
}

function createBambooFence() {
  const group = new THREE.Group();
  addGroundShadow(group, 1.05);
  for (let index = 0; index < 5; index += 1) {
    const pole = cylinder(.08, .1, 1.35 + (index % 2) * .14, 0xb57b3f, [-.62 + index * .31, .68, 0], 6);
    group.add(pole);
  }
  group.add(box([1.65, .13, .18], COLORS.brown, [0, .42, 0]));
  group.add(box([1.65, .13, .18], COLORS.brown, [0, .98, 0]));
  const knot = lowSphere(.16, COLORS.red, [0, .74, .13], [1.2, .8, .45]);
  group.add(knot);
  const ribbon = box([.58, .13, .07], COLORS.red, [.28, .73, .12]);
  ribbon.rotation.z = -.28;
  group.add(ribbon);
  group.userData.movingParts = [ribbon];
  return group;
}

function createLanternCart() {
  const group = new THREE.Group();
  addGroundShadow(group, 1.08);
  group.add(box([1.48, .5, .72], COLORS.purple, [0, .48, 0]));
  const wheels = [];
  [-.55, .55].forEach((x) => {
    const wheel = cylinder(.27, .27, .12, COLORS.darkBrown, [x, .2, .42], 9);
    wheel.rotation.x = Math.PI / 2;
    group.add(wheel);
    wheels.push(wheel);
  });
  [-.42, .05, .48].forEach((x, index) => {
    const lantern = lowSphere(.27, index === 1 ? COLORS.gold : 0xe33443, [x, .95 + (index % 2) * .08, 0], [.82, 1.12, .82], { emissive: index === 1 ? 0x6b3900 : 0x52050d, emissiveIntensity: .55 });
    group.add(lantern);
  });
  group.userData.wheels = wheels;
  return group;
}

function createTetGifts() {
  const group = new THREE.Group();
  addGroundShadow(group, .9);
  [[-.32, .32, .58, COLORS.red], [.3, .3, .54, COLORS.jade], [.02, .82, .62, COLORS.purple]].forEach(([x, y, size, color]) => {
    group.add(box([size, size, size], color, [x, y, 0]));
    group.add(box([size * .14, size * 1.02, size * 1.02], COLORS.gold, [x, y, 0]));
  });
  return group;
}

function createFirecrackerBundle() {
  const group = new THREE.Group();
  const rope = cylinder(.035, .035, 1.7, COLORS.gold, [0, 1.02, 0], 7);
  rope.rotation.z = Math.PI / 2;
  group.add(rope);
  const firecrackers = [];
  [-.62, -.4, -.18, .04, .26, .48, .68].forEach((x, index) => {
    const cracker = cylinder(.1, .1, .5 + (index % 3) * .12, index % 2 ? 0xe7373f : COLORS.red, [x, .55 - (index % 2) * .09, 0], 8);
    cracker.rotation.z = index % 2 ? -.12 : .12;
    const cap = cylinder(.11, .11, .05, COLORS.gold, [x, .27 - (index % 2) * .09, 0], 8);
    group.add(cracker, cap);
    firecrackers.push(cracker);
  });
  group.add(lowSphere(.13, COLORS.gold, [0, 1.03, .04], [1.35, .8, .6]));
  group.userData.firecrackers = firecrackers;
  return group;
}

function createObstacle(type) {
  let obstacle;
  if (type === 'kumquat_planter') obstacle = createKumquatPlanter();
  else if (type === 'bamboo_fence') obstacle = createBambooFence();
  else if (type === 'lantern_cart') obstacle = createLanternCart();
  else if (type === 'apricot_tree') obstacle = createFlowerTree(0xffd04f);
  else if (type === 'peach_tree') obstacle = createFlowerTree(0xff789d);
  else if (type === 'firecracker_bundle') obstacle = createFirecrackerBundle();
  else obstacle = createTetGifts();
  obstacle.scale.multiplyScalar(1.16);
  return obstacle;
}

function createHouse(x, scale, colors) {
  const group = new THREE.Group();
  group.position.set(x, 0, -6);
  group.scale.setScalar(scale);
  group.add(box([2.2, 1.55, .8], colors[0], [0, .78, 0]));
  const roof = new THREE.Mesh(new THREE.ConeGeometry(1.65, .85, 4), material(colors[1]));
  roof.position.set(0, 1.88, 0);
  roof.rotation.y = Math.PI / 4;
  roof.scale.z = .58;
  group.add(roof);
  group.add(box([.5, .85, .12], COLORS.deepRed, [0, .42, .47]));
  return group;
}

function createBlossomTree(x, z, scale) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  group.scale.setScalar(scale);
  group.add(cylinder(.12, .2, 2.2, COLORS.brown, [0, 1.1, 0], 7));
  for (let index = 0; index < 9; index += 1) {
    const angle = index * 2.4;
    const radius = .42 + (index % 3) * .2;
    const color = index % 3 === 0 ? 0xff7a91 : 0xffb143;
    group.add(lowSphere(.24, color, [Math.cos(angle) * radius, 2.05 + (index % 4) * .22, Math.sin(angle) * radius], [1, .75, 1]));
  }
  return group;
}

function createSkyGradient() {
  const geometry = new THREE.PlaneGeometry(42, 18);
  const sky = new THREE.Mesh(geometry, new THREE.ShaderMaterial({
    depthWrite: false,
    uniforms: {
      topColor: { value: new THREE.Color(0x172f4c) },
      middleColor: { value: new THREE.Color(0x59445f) },
      bottomColor: { value: new THREE.Color(0xb85c51) },
    },
    vertexShader: 'varying float vY; void main(){ vY = uv.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: 'varying float vY; uniform vec3 topColor; uniform vec3 middleColor; uniform vec3 bottomColor; void main(){ vec3 lower = mix(bottomColor, middleColor, smoothstep(0.0, .55, vY)); vec3 color = mix(lower, topColor, smoothstep(.45, 1.0, vY)); gl_FragColor = vec4(color, 1.0); }',
  }));
  sky.position.set(0, 4.2, -22);
  return sky;
}

function createCloud(x, y, scale) {
  const cloud = new THREE.Group();
  cloud.position.set(x, y, -15);
  cloud.scale.setScalar(scale);
  [[-.5, 0, .45], [0, .12, .62], [.58, -.02, .4]].forEach(([cx, cy, size]) => {
    cloud.add(lowSphere(size, 0xffe5c8, [cx, cy, 0], [1.35, .62, .35], { transparent: true, opacity: .55 }));
  });
  return cloud;
}

function createMountain(x, scale, color) {
  const mountain = new THREE.Mesh(new THREE.ConeGeometry(3.2, 4.5, 5), material(color));
  mountain.position.set(x, 1.35, -12);
  mountain.scale.set(scale, .7 * scale, .45);
  mountain.rotation.y = Math.PI / 5;
  return mountain;
}

function createLanternGate(x) {
  const gate = new THREE.Group();
  gate.position.set(x, 0, -4.1);
  gate.add(cylinder(.12, .16, 3.8, COLORS.darkBrown, [-1.6, 1.9, 0], 7));
  gate.add(cylinder(.12, .16, 3.8, COLORS.darkBrown, [1.6, 1.9, 0], 7));
  gate.add(box([3.7, .18, .2], COLORS.gold, [0, 3.55, 0]));
  const lanterns = [];
  [-1.18, -.58, 0, .58, 1.18].forEach((lx, index) => {
    const lantern = lowSphere(.22, index % 2 ? COLORS.gold : COLORS.red, [lx, 3.17, .08], [.82, 1.2, .82], { emissive: index % 2 ? 0x704000 : 0x600812, emissiveIntensity: .7 });
    gate.add(lantern);
    lanterns.push(lantern);
  });
  gate.userData.lanterns = lanterns;
  return gate;
}

function createPetal(color = 0xff9cad) {
  const petal = new THREE.Mesh(new THREE.CircleGeometry(.075, 5), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .88, depthWrite: false }));
  petal.visible = false;
  return petal;
}

function createTetDecor() {
  const group = new THREE.Group();
  group.name = 'runner-tet-decor';
  group.userData.floaters = [];
  [-7.4, 7.5].forEach((x, index) => {
    const lantern = lowSphere(.26, index ? COLORS.gold : COLORS.red, [x, 4.7, -7.4], [.82, 1.18, .82], { emissive: index ? 0x704000 : 0x600812, emissiveIntensity: .7 });
    lantern.userData.baseY = lantern.position.y;
    lantern.userData.phase = index * 1.4;
    group.userData.floaters.push(lantern);
    group.add(lantern);
  });
  return group;
}

function requestReplayAd(_context, onComplete) {
  onComplete();
}

export function initTetRunner({ section, engine, track, showFallback }) {
  const previewAllLandmarks = new URLSearchParams(window.location.search).get('showAllLandmarks') === '1';
  const stage = section.querySelector('#tet-runner-stage');
  const canvasHost = section.querySelector('#tet-runner-canvas');
  const ready = section.querySelector('#tet-runner-ready');
  const paused = section.querySelector('#tet-runner-paused');
  const result = section.querySelector('#tet-runner-result');
  const replayButton = section.querySelector('#tet-runner-replay');
  const viewLandmarksButton = section.querySelector('#tet-runner-view-landmarks');
  const shareScoreButton = section.querySelector('#tet-runner-share-score');
  const sharePreview = section.querySelector('#tet-runner-share-preview');
  const sharePreviewImage = section.querySelector('#tet-runner-share-preview-image');
  const sharePreviewClose = section.querySelector('#tet-runner-share-preview-close');
  const sharePreviewBack = section.querySelector('#tet-runner-share-preview-back');
  const sharePreviewConfirm = section.querySelector('#tet-runner-share-preview-confirm');
  const sharePreviewCopy = section.querySelector('#tet-runner-share-preview-copy');
  const sharePreviewDownload = section.querySelector('#tet-runner-share-preview-download');
  const duckButton = section.querySelector('#tet-runner-duck');
  const soundButton = section.querySelector('#tet-runner-sound');
  const scoreNode = section.querySelector('#tet-runner-score');
  const highScoreNode = section.querySelector('#tet-runner-high-score');
  const pointsNode = section.querySelector('#tet-runner-points');
  const comboNode = section.querySelector('#tet-runner-combo');
  const pointsBurst = section.querySelector('#tet-runner-points-burst');
  const comboBurst = section.querySelector('#tet-runner-combo-burst');
  const landmark = section.querySelector('#tet-runner-landmark');
  const locationCard = section.querySelector('#tet-runner-location');
  const provinceNode = section.querySelector('#tet-runner-province');
  const landmarkNameNode = section.querySelector('#tet-runner-landmark-name');
  const nextLocationNode = section.querySelector('#tet-runner-next-location');
  const finalScoreNode = section.querySelector('#tet-runner-final-score');
  const finalPointsNode = section.querySelector('#tet-runner-final-points');
  const finalComboNode = section.querySelector('#tet-runner-final-combo');
  const finalItemsNode = section.querySelector('#tet-runner-final-items');
  const finalTimeNode = section.querySelector('#tet-runner-final-time');
  const resultCopy = section.querySelector('#tet-runner-result-copy');
  const resultHorse = section.querySelector('#tet-runner-result-horse');
  const resultMilestone = section.querySelector('#tet-runner-result-milestone');
  const resultObstacle = section.querySelector('#tet-runner-result-obstacle');
  const resultJourneyImage = section.querySelector('#tet-runner-result-landmark-image');
  const resultJourneyName = section.querySelector('#tet-runner-result-landmark');
  const resultJourneyProgress = section.querySelector('#tet-runner-result-progress');
  const resultRecord = section.querySelector('#tet-runner-result-record');
  const landmarkLibrary = document.querySelector('#tet-landmark-library');
  const landmarkLibraryGrid = document.querySelector('#tet-landmark-library-grid');
  const unlockedLandmarkCount = document.querySelector('#tet-landmark-unlocked-count');
  const landmarkProgressLabel = document.querySelector('#tet-landmark-progress-label');
  const landmarkViewer = document.querySelector('#tet-landmark-viewer');
  const landmarkViewerClose = document.querySelector('#tet-landmark-viewer-close');
  const landmarkViewerImage = document.querySelector('#tet-landmark-viewer-image');
  const landmarkViewerProvince = document.querySelector('#tet-landmark-viewer-province');
  const landmarkViewerTitle = document.querySelector('#tet-landmark-viewer-title');
  const landmarkViewerGeography = document.querySelector('#tet-landmark-viewer-geography');
  const landmarkViewerSignificance = document.querySelector('#tet-landmark-viewer-significance');
  const landmarkViewerHistorySection = document.querySelector('#tet-landmark-viewer-history-section');
  const landmarkViewerHistory = document.querySelector('#tet-landmark-viewer-history');
  const landmarkViewerSource = document.querySelector('#tet-landmark-viewer-source');
  if (!stage || !canvasHost || !duckButton) throw new Error('runner_dom_missing');

  const lowQuality = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
    || (navigator.deviceMemory && navigator.deviceMemory <= 4);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: !lowQuality, alpha: false, powerPreference: 'high-performance' });
  } catch (_error) {
    showFallback('webgl');
    return Promise.resolve();
  }
  if (!renderer.getContext()) {
    showFallback('webgl');
    return Promise.resolve();
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowQuality ? 1 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  canvasHost.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x172f4c);
  scene.fog = new THREE.Fog(0x51475c, 17, 36);
  const camera = new THREE.OrthographicCamera(-9, 9, 5.8, -1.6, .1, 80);
  camera.position.set(.4, 3.35, 13);
  camera.lookAt(.4, 2.35, 0);

  scene.add(createSkyGradient());
  scene.add(new THREE.HemisphereLight(0xffe3b4, 0x27243f, 2.65));
  const sunlight = new THREE.DirectionalLight(0xffdfae, 2.55);
  sunlight.position.set(-3, 8, 8);
  scene.add(sunlight);

  const sunGlow = new THREE.Mesh(new THREE.CircleGeometry(1.38, 28), new THREE.MeshBasicMaterial({ color: 0xffd878, transparent: true, opacity: .14, depthWrite: false, fog: false }));
  sunGlow.position.set(6.3, 4.35, -18.1);
  scene.add(sunGlow);
  const sun = new THREE.Mesh(new THREE.CircleGeometry(1.05, 28), new THREE.MeshBasicMaterial({ color: 0xffcf68, transparent: true, opacity: .94, depthWrite: false, fog: false }));
  sun.position.set(6.3, 4.35, -18);
  scene.add(sun);

  const world = new THREE.Group();
  scene.add(world);
  const ground = box([48, .65, 7], 0x211c2c, [2, -.33, 0]);
  world.add(ground);
  const road = box([48, .08, 3.2], 0x754554, [2, .02, .3]);
  world.add(road);
  const runwayEdge = box([48, .42, .14], 0x3b2033, [2, .2, -.45]);
  const runwayTrim = box([48, .055, .16], COLORS.gold, [2, .43, -.42]);
  world.add(runwayEdge, runwayTrim);

  const groundMarkers = [];
  for (let index = 0; index < 16; index += 1) {
    const marker = box([.72, .035, .42], index % 2 ? 0xe8a84f : 0xf3c98f, [-8 + index * 1.7, .08, .35]);
    marker.rotation.y = -.12;
    groundMarkers.push(marker);
    world.add(marker);
  }

  const backdrop = new THREE.Group();
  backdrop.add(createHouse(-8, 1.05, [0x735365, 0x8d3043]));
  backdrop.add(createHouse(-2.6, .8, [0x806071, 0x54283e]));
  backdrop.add(createHouse(3.2, 1.15, [0x684e66, 0x963447]));
  backdrop.add(createHouse(9, .88, [0x77566d, 0x4d385b]));
  backdrop.add(createBlossomTree(-4.1, -4.6, 1));
  backdrop.add(createBlossomTree(2.2, -5.2, .8));
  backdrop.add(createBlossomTree(8.2, -5.5, 1.1));
  world.add(backdrop);

  const hills = new THREE.Group();
  [-10, -4, 2, 8, 14].forEach((x, index) => hills.add(createMountain(x, index % 2 ? .85 : 1.08, index % 2 ? 0x53677a : 0x44596f)));
  scene.add(hills);

  const clouds = new THREE.Group();
  clouds.add(createCloud(-7, 4.7, 1.1), createCloud(1, 5.35, .72), createCloud(8, 4.9, .95));
  scene.add(clouds);

  const festivalLayer = new THREE.Group();
  const gates = [createLanternGate(-8), createLanternGate(4), createLanternGate(16)];
  festivalLayer.add(...gates);
  world.add(festivalLayer);

  const travelBackgrounds = new Map();
  let targetBackgroundScene = VIETNAM_ROUTE[0].sceneKey;
  let generatedBackgroundReady = false;
  const proceduralScenery = [backdrop, hills, clouds, sun, sunGlow];
  const textureLoader = new THREE.TextureLoader();
  BACKGROUND_SCENES.forEach(({ key, url }, index) => {
    const backgroundMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, fog: false });
    const backgroundPlane = new THREE.Mesh(new THREE.PlaneGeometry(22, 12.38), backgroundMaterial);
    backgroundPlane.position.set(.4, 3.55, -8.8 - index * .02);
    backgroundPlane.renderOrder = -5 + index;
    scene.add(backgroundPlane);
    travelBackgrounds.set(key, { plane: backgroundPlane, material: backgroundMaterial, loaded: false });
    textureLoader.load(url, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      backgroundMaterial.map = texture;
      backgroundMaterial.needsUpdate = true;
      const entry = travelBackgrounds.get(key);
      entry.loaded = true;
      if (!generatedBackgroundReady && key === VIETNAM_ROUTE[0].sceneKey) {
        generatedBackgroundReady = true;
        backgroundMaterial.opacity = 1;
        proceduralScenery.forEach((object) => { object.visible = false; });
      }
    }, undefined, () => {
      // Procedural scenery remains available if a generated panorama cannot load.
    });
  });

  const tetDecor = createTetDecor();
  scene.add(tetDecor);

  const horseRegistry = engine.createMascotRegistry([{
    year: 2026,
    zodiacKey: 'horse',
    displayName: 'Ngựa',
    theme: 'binh-ngo',
    createModel: createHorse,
  }]);
  const mascotYear = engine.getVietnamYear(new Date());
  const mascot = horseRegistry.resolve(mascotYear);
  const horse = mascot.createModel();
  addHorseAccessories(horse);
  horse.position.x = -4.5;
  horse.scale.setScalar(.8);
  world.add(horse);

  const horseShadow = new THREE.Mesh(new THREE.CircleGeometry(.85, 20), new THREE.MeshBasicMaterial({ color: 0x201425, transparent: true, opacity: .38, depthWrite: false }));
  horseShadow.rotation.x = -Math.PI / 2;
  horseShadow.position.set(-4.45, .055, .18);
  horseShadow.scale.y = .32;
  world.add(horseShadow);

  const particles = Array.from({ length: lowQuality ? 22 : 44 }, (_, index) => {
    const particle = createPetal(index % 3 ? 0xff9aaf : 0xffd45c);
    particle.userData.life = 0;
    particle.userData.velocity = new THREE.Vector3();
    scene.add(particle);
    return particle;
  });

  const game = engine.createGame({ random: Math.random, storage: window.localStorage });
  const unlockedLandmarks = new Set([0]);
  const entityMeshes = new Map();
  let soundEnabled = false;
  let audioContext = null;
  let soundEffects = null;
  let inView = false;
  let pageVisible = !document.hidden;
  let autoPaused = false;
  let rafId = 0;
  let lastTime = performance.now();
  let runStartedAt = 0;
  let firstJumpTracked = false;
  let sectionViewed = false;
  let wasGrounded = true;
  let previousMultiplier = 1;
  let shakeUntil = 0;
  let currentJourneyIndex = -1;
  let duckVisual = 0;
  let runCyclePhase = 0;
  let landmarkViewerTrigger = null;

  try {
    const storedLandmarks = JSON.parse(window.localStorage.getItem(UNLOCKED_LANDMARKS_STORAGE_KEY) || '[]');
    if (Array.isArray(storedLandmarks)) {
      storedLandmarks.forEach((index) => {
        if (Number.isInteger(index) && index >= 0 && index < VIETNAM_ROUTE.length) unlockedLandmarks.add(index);
      });
    }
  } catch (_error) {}

  const historicalUnlockCount = Math.min(
    VIETNAM_ROUTE.length,
    Math.floor(Math.max(0, game.getState().highScore) / LANDMARK_INTERVAL_KM) + 1,
  );
  for (let index = 0; index < historicalUnlockCount; index += 1) unlockedLandmarks.add(index);

  function persistUnlockedLandmarks() {
    try {
      window.localStorage.setItem(UNLOCKED_LANDMARKS_STORAGE_KEY, JSON.stringify([...unlockedLandmarks].sort((a, b) => a - b)));
    } catch (_error) {}
  }

  function closeLandmarkViewer() {
    if (!landmarkViewer || landmarkViewer.hidden) return;
    landmarkViewer.hidden = true;
    document.body.classList.remove('is-landmark-viewer-open');
    landmarkViewerTrigger?.focus({ preventScroll: true });
    landmarkViewerTrigger = null;
  }

  function openLandmarkViewer(stop, index, trigger) {
    if (!landmarkViewer || !landmarkViewerImage || !unlockedLandmarks.has(index)) return;
    const context = LANDMARK_CONTEXT[stop.landmark] || {};
    landmarkViewerTrigger = trigger;
    landmarkViewerImage.src = stop.backgroundUrl;
    landmarkViewerImage.alt = `${stop.landmark}, ${stop.province}`;
    landmarkViewerProvince.textContent = stop.province;
    landmarkViewerTitle.textContent = stop.landmark;
    landmarkViewerGeography.textContent = LANDMARK_DETAILS[stop.landmark] || `Địa danh tiêu biểu tại ${stop.province}.`;
    landmarkViewerSignificance.textContent = context.significance || 'Một phần của cảnh quan và bản sắc văn hóa trên hành trình xuyên Việt.';
    landmarkViewerHistory.textContent = context.history || '';
    landmarkViewerHistorySection.hidden = !context.history;
    landmarkViewerSource.href = context.sourceUrl || 'https://vietnamtourism.gov.vn/';
    landmarkViewerSource.querySelector('span').textContent = `Nguồn chính thức: ${context.sourceLabel || 'Cục Du lịch Quốc gia Việt Nam'}`;
    landmarkViewer.hidden = false;
    document.body.classList.add('is-landmark-viewer-open');
    landmarkViewerClose?.focus({ preventScroll: true });
    track('landmark_view', { landmark_index: index, province: stop.province, landmark: stop.landmark });
  }

  landmarkViewerClose?.addEventListener('click', closeLandmarkViewer);
  landmarkViewer?.addEventListener('click', (event) => {
    if (event.target === landmarkViewer) closeLandmarkViewer();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && landmarkViewer && !landmarkViewer.hidden) closeLandmarkViewer();
  });

  function renderLandmarkLibrary() {
    if (!landmarkLibraryGrid || !unlockedLandmarkCount) return;
    unlockedLandmarkCount.textContent = String(previewAllLandmarks ? VIETNAM_ROUTE.length : unlockedLandmarks.size);
    if (landmarkProgressLabel) landmarkProgressLabel.innerHTML = previewAllLandmarks
      ? `/ ${VIETNAM_ROUTE.length}<br>đang xem thử`
      : `/ ${VIETNAM_ROUTE.length}<br>đã mở khóa`;
    landmarkLibraryGrid.replaceChildren(...VIETNAM_ROUTE.map((stop, index) => {
      const earned = unlockedLandmarks.has(index);
      const unlocked = previewAllLandmarks || earned;
      const card = document.createElement('article');
      card.className = `tet-landmark-card${unlocked ? ' is-unlocked' : ' is-locked'}${previewAllLandmarks && !earned ? ' is-preview' : ''}`;
      card.dataset.landmarkIndex = String(index);
      card.setAttribute('role', 'listitem');

      const imageWrap = document.createElement('div');
      imageWrap.className = 'tet-landmark-card-image';
      const image = document.createElement('img');
      image.src = stop.backgroundUrl;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.alt = unlocked ? `${stop.landmark}, ${stop.province}` : '';
      imageWrap.appendChild(image);

      const status = document.createElement('span');
      status.className = 'tet-landmark-card-status';
      status.innerHTML = previewAllLandmarks && !earned
        ? '<i data-lucide="eye" aria-hidden="true"></i> Xem thử'
        : unlocked
        ? '<i data-lucide="badge-check" aria-hidden="true"></i> Đã mở khóa'
        : '<i data-lucide="lock-keyhole" aria-hidden="true"></i> Chưa mở khóa';
      imageWrap.appendChild(status);

      const copy = document.createElement('div');
      copy.className = 'tet-landmark-card-copy';
      const province = document.createElement('small');
      province.textContent = stop.province;
      const name = document.createElement('h3');
      name.textContent = unlocked ? stop.landmark : 'Địa danh bí mật';
      const requirement = document.createElement('span');
      requirement.textContent = index === 0 ? 'Điểm khởi hành' : `Mở khóa ở ${index * LANDMARK_INTERVAL_KM} km`;
      copy.append(province, name, requirement);
      card.append(imageWrap, copy);
      if (earned) {
        card.classList.add('is-interactive');
        const openButton = document.createElement('button');
        openButton.type = 'button';
        openButton.className = 'tet-landmark-card-open';
        openButton.setAttribute('aria-label', `Xem ảnh và thông tin ${stop.landmark}, ${stop.province}`);
        openButton.addEventListener('click', () => openLandmarkViewer(stop, index, openButton));
        card.appendChild(openButton);
      }
      return card;
    }));
    window.lucide?.createIcons();
  }

  function unlockLandmark(index, kilometers) {
    if (unlockedLandmarks.has(index)) return;
    unlockedLandmarks.add(index);
    persistUnlockedLandmarks();
    renderLandmarkLibrary();
    const stop = VIETNAM_ROUTE[index];
    track('landmark_unlock', {
      landmark_index: index,
      province: stop.province,
      landmark: stop.landmark,
      distance_km: Number(kilometers.toFixed(2)),
      mascot_year: mascotYear,
    });
  }

  persistUnlockedLandmarks();
  renderLandmarkLibrary();

  try { soundEnabled = window.localStorage.getItem('sap_tet_runner_v1_sound') === 'true'; } catch (_error) {}

  function updateSoundButton() {
    soundButton.setAttribute('aria-pressed', String(soundEnabled));
    soundButton.setAttribute('aria-label', soundEnabled ? 'Tắt âm thanh trò chơi' : 'Bật âm thanh trò chơi');
    soundButton.innerHTML = soundEnabled
      ? '<i data-lucide="volume-2" aria-hidden="true"></i><span>Âm thanh</span>'
      : '<i data-lucide="volume-x" aria-hidden="true"></i><span>Âm thanh</span>';
    window.lucide?.createIcons();
  }

  function playTone(frequency, duration, wave = 'sine', volume = .05) {
    if (!soundEnabled) return;
    try {
      audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = wave;
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      gain.gain.setValueAtTime(volume, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + duration);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
    } catch (_error) {}
  }

  function ensureSoundEffects() {
    if (soundEffects) return soundEffects;
    soundEffects = Object.fromEntries(Object.entries(SOUND_URLS).map(([name, url]) => {
      const audio = new Audio(url);
      audio.preload = name === 'background' || name === 'gallop' ? 'auto' : 'none';
      audio.volume = name === 'background' ? .095 : (name === 'gallop' ? .28 : (name === 'failed' ? .2 : (name === 'action' ? .14 : .22)));
      if (name === 'background') audio.loop = true;
      if (name === 'gallop') audio.loop = true;
      return [name, audio];
    }));
    return soundEffects;
  }

  function playEffect(name, maxDurationMs) {
    if (!soundEnabled) return;
    const audio = ensureSoundEffects()[name];
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    if (maxDurationMs) {
      window.setTimeout(() => {
        if (!audio.paused) audio.pause();
      }, maxDurationMs);
    }
  }

  function playLandmarkTransition(journeyIndex) {
    if (!soundEnabled) return;
    const effects = ensureSoundEffects();
    const background = effects.background;
    background.volume = .025;
    playEffect('landmark', 1700);
    const melodies = [
      [523, 659, 784, 1047],
      [440, 554, 659, 880],
      [392, 523, 659, 784],
    ];
    const melody = melodies[journeyIndex % melodies.length];
    melody.forEach((frequency, index) => {
      window.setTimeout(() => playTone(frequency, .18, index === melody.length - 1 ? 'triangle' : 'sine', .035), index * 115);
    });
    window.setTimeout(() => {
      if (soundEnabled) background.volume = .095;
    }, 1250);
  }

  let gallopHoldUntil = 0;

  function restartGallop(speed, minimumPlayMs = 0) {
    if (!soundEnabled) return;
    const gallop = ensureSoundEffects().gallop;
    gallop.playbackRate = THREE.MathUtils.clamp((speed || 8) / 9, .88, 1.45);
    const seekToFirstStride = () => {
      try { gallop.currentTime = GALLOP_START_OFFSET_S; } catch (_error) {}
    };
    if (gallop.readyState >= 1) seekToFirstStride();
    else gallop.addEventListener('loadedmetadata', seekToFirstStride, { once: true });
    gallopHoldUntil = performance.now() + minimumPlayMs;
    gallop.play().catch(() => {});
  }

  function syncGameAudio(shouldPlay, speed, grounded = true) {
    if (!soundEnabled && !soundEffects) return;
    const effects = ensureSoundEffects();
    const gallop = effects.gallop;
    const background = effects.background;
    gallop.playbackRate = THREE.MathUtils.clamp((speed || 8) / 9, .88, 1.45);
    const shouldPlayGallop = soundEnabled && shouldPlay && (grounded || performance.now() < gallopHoldUntil);
    if (soundEnabled && shouldPlay) {
      if (background.paused) background.play().catch(() => {});
    } else if (!background.paused) {
      background.pause();
    }
    if (shouldPlayGallop && gallop.paused) gallop.play().catch(() => {});
    if (!shouldPlayGallop && !gallop.paused) gallop.pause();
  }

  function stopAllSounds() {
    if (!soundEffects) return;
    Object.values(soundEffects).forEach((audio) => audio.pause());
  }

  function resize() {
    const width = Math.max(1, canvasHost.clientWidth);
    const height = Math.max(1, canvasHost.clientHeight);
    const aspect = width / height;
    const viewHeight = 9;
    const viewWidth = viewHeight * aspect;
    camera.left = -viewWidth / 2 + .45;
    camera.right = viewWidth / 2 + .45;
    camera.top = 6.5;
    camera.bottom = -2.5;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    renderer.render(scene, camera);
  }

  // Ảnh khoảnh khắc thua: giữ nguyên toàn khung hình đang chơi, không cắt xén.
  function updateResultHorsePortrait() {
    if (!resultHorse || typeof resultHorse.getContext !== 'function') return;
    renderer.render(scene, camera);
    const source = renderer.domElement;
    if (!source.width || !source.height) return;
    const targetWidth = 720;
    const targetHeight = Math.max(1, Math.round(targetWidth * (source.height / source.width)));
    if (resultHorse.width !== targetWidth) resultHorse.width = targetWidth;
    if (resultHorse.height !== targetHeight) resultHorse.height = targetHeight;
    // Tỉ lệ thật của khung game để CSS giới hạn chiều cao mà không cắt ảnh.
    resultHorse.parentElement?.style.setProperty('--shot-ratio', (source.width / source.height).toFixed(3));
    const context = resultHorse.getContext('2d');
    context.clearRect(0, 0, resultHorse.width, resultHorse.height);
    context.drawImage(source, 0, 0, source.width, source.height, 0, 0, resultHorse.width, resultHorse.height);
  }

  function syncEntityMeshes(state) {
    const liveIds = new Set();
    state.entities.forEach((entity) => {
      liveIds.add(entity.id);
      let object = entityMeshes.get(entity.id);
      if (!object) {
        object = entity.kind === 'collectible' ? createCollectible(entity.type) : createObstacle(entity.type);
        object.userData.kind = entity.kind;
        object.userData.type = entity.type;
        object.userData.baseY = entity.y;
        entityMeshes.set(entity.id, object);
        world.add(object);
      }
      object.position.x = entity.x;
      object.position.y = entity.y;
    });
    entityMeshes.forEach((object, id) => {
      if (liveIds.has(id)) return;
      world.remove(object);
      object.traverse((child) => {
        child.geometry?.dispose?.();
        child.material?.dispose?.();
      });
      entityMeshes.delete(id);
    });
  }

  function formatKilometers(value) {
    return `${Number(value || 0).toFixed(2).replace('.', ',')} km`;
  }

  function formatDuration(seconds) {
    const total = Math.max(0, Math.round(Number(seconds) || 0));
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
  }

  function reachedLandmarkAt(kilometers) {
    const distance = Math.max(0, Number(kilometers) || 0);
    const journeyIndex = engine.journeyIndexAtKilometers(distance, VIETNAM_ROUTE.length, LANDMARK_INTERVAL_KM);
    const milestoneKm = Math.floor(distance / LANDMARK_INTERVAL_KM) * LANDMARK_INTERVAL_KM;
    return {
      ...VIETNAM_ROUTE[journeyIndex],
      milestoneKm,
      milestoneLabel: milestoneKm === 0 ? 'ĐIỂM KHỞI HÀNH' : `CỘT MỐC ${milestoneKm} KM`,
    };
  }

  function createScoreShareImage(state) {
    const reachedLandmark = reachedLandmarkAt(state.score);
    const shareCanvas = document.createElement('canvas');
    shareCanvas.width = 1200;
    shareCanvas.height = 630;
    const context = shareCanvas.getContext('2d');
    renderer.render(scene, camera);
    context.drawImage(renderer.domElement, 0, 0, shareCanvas.width, shareCanvas.height);

    const shade = context.createLinearGradient(260, 0, 1200, 0);
    shade.addColorStop(0, 'rgba(42, 10, 28, 0.02)');
    shade.addColorStop(.52, 'rgba(60, 12, 29, 0.48)');
    shade.addColorStop(1, 'rgba(55, 8, 20, 0.94)');
    context.fillStyle = shade;
    context.fillRect(0, 0, 1200, 630);

    context.fillStyle = '#ffd45c';
    context.font = '800 24px system-ui, sans-serif';
    context.fillText('SẮP TẾT · MINIGAME', 760, 105);
    context.fillStyle = '#fff8e8';
    context.font = '900 50px system-ui, sans-serif';
    context.fillText('Ngựa Phi Đón Tết', 760, 170);
    context.fillStyle = '#ffe6a3';
    context.font = '700 25px system-ui, sans-serif';
    context.fillText('Mình đã phi được', 760, 235);
    context.fillStyle = '#ffffff';
    context.font = '1000 80px system-ui, sans-serif';
    context.fillText(formatKilometers(state.score), 760, 320);
    context.fillStyle = '#fff1c9';
    context.font = '700 25px system-ui, sans-serif';
    context.fillText(`${state.bonusPoints} điểm · Combo cao nhất ${state.maxCombo}`, 760, 375);
    context.fillStyle = '#ffd45c';
    context.font = '900 19px system-ui, sans-serif';
    context.fillText(reachedLandmark.milestoneLabel, 760, 420);
    context.fillStyle = '#ffffff';
    context.font = '800 27px system-ui, sans-serif';
    context.fillText(`${reachedLandmark.province} · ${reachedLandmark.landmark}`, 760, 454, 390);
    context.fillStyle = '#ffd45c';
    context.font = '800 22px system-ui, sans-serif';
    context.fillText('Bạn có vượt được mình không?', 760, 505);
    context.fillStyle = 'rgba(255, 248, 232, .82)';
    context.font = '600 20px system-ui, sans-serif';
    context.fillText('saptet.vn', 760, 550);
    return shareCanvas;
  }

  function canvasToPngFile(canvas) {
    const [header, data] = canvas.toDataURL('image/png').split(',');
    const mimeType = header.match(/:(.*?);/)?.[1] || 'image/png';
    const binary = window.atob(data);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return new File([bytes], 'ngua-phi-don-tet.png', { type: mimeType });
  }

  let pendingShareCanvas = null;

  function closeSharePreview() {
    sharePreview?.setAttribute('hidden', '');
    if (sharePreviewImage) sharePreviewImage.removeAttribute('src');
    pendingShareCanvas = null;
    shareScoreButton?.focus({ preventScroll: true });
  }

  function openSharePreview() {
    const state = game.getState();
    pendingShareCanvas = createScoreShareImage(state);
    sharePreviewImage.src = pendingShareCanvas.toDataURL('image/png');
    sharePreview.removeAttribute('hidden');
    sharePreviewConfirm.focus({ preventScroll: true });
    track('share_preview', { score: state.score, bonus_points: state.bonusPoints, mascot_year: mascotYear });
  }

  async function shareScore() {
    const state = game.getState();
    const reachedLandmark = reachedLandmarkAt(state.score);
    const file = canvasToPngFile(pendingShareCanvas || createScoreShareImage(state));
    const shareData = {
      title: 'Ngựa Phi Đón Tết',
      text: `Mình đã phi được ${formatKilometers(state.score)}, đến ${reachedLandmark.landmark} · ${reachedLandmark.province} trong Ngựa Phi Đón Tết. Bạn có vượt được không? saptet.vn/ngua-phi-don-tet.html`,
      files: [file],
    };
    let method = 'download';
    try {
      if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        method = 'native_image';
        await navigator.share(shareData);
        shareScoreButton.classList.add('is-done');
        shareScoreButton.innerHTML = '<i data-lucide="check" aria-hidden="true"></i> Đã chia sẻ';
      } else {
        downloadScoreImage();
        shareScoreButton.classList.add('is-done');
        shareScoreButton.innerHTML = '<i data-lucide="download" aria-hidden="true"></i> Đã lưu ảnh';
      }
      closeSharePreview();
      window.lucide?.createIcons();
      track('share_score', { score: state.score, bonus_points: state.bonusPoints, method, mascot_year: mascotYear });
    } catch (error) {
      if (error?.name !== 'AbortError') {
        shareScoreButton.textContent = 'Thử chia sẻ lại';
      }
    }
  }

  function downloadScoreImage() {
    const state = game.getState();
    const file = canvasToPngFile(pendingShareCanvas || createScoreShareImage(state));
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    track('download_score_image', { score: state.score, bonus_points: state.bonusPoints, mascot_year: mascotYear });
  }

  async function copyScoreImage() {
    const state = game.getState();
    const canvas = pendingShareCanvas || createScoreShareImage(state);
    try {
      if (!navigator.clipboard?.write || typeof ClipboardItem === 'undefined') {
        throw new Error('Clipboard API not supported');
      }
      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png');
      });
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      if (sharePreviewCopy) {
        sharePreviewCopy.innerHTML = '<i data-lucide="check" aria-hidden="true"></i> Đã sao chép';
        sharePreviewCopy.classList.add('is-done');
        window.lucide?.createIcons();
        window.setTimeout(() => {
          sharePreviewCopy.innerHTML = '<i data-lucide="copy" aria-hidden="true"></i> Sao chép ảnh';
          sharePreviewCopy.classList.remove('is-done');
          window.lucide?.createIcons();
        }, 2000);
      }
      track('copy_score_image', { score: state.score, bonus_points: state.bonusPoints, mascot_year: mascotYear });
    } catch (error) {
      downloadScoreImage();
      if (sharePreviewCopy) {
        sharePreviewCopy.innerHTML = '<i data-lucide="download" aria-hidden="true"></i> Đã lưu ảnh';
        window.lucide?.createIcons();
      }
    }
  }

  function updateHud(state) {
    scoreNode.textContent = formatKilometers(state.score);
    highScoreNode.textContent = formatKilometers(state.highScore);
    pointsNode.textContent = String(state.bonusPoints);
    comboNode.textContent = `×${state.multiplier}`;
  }

  function emitParticles(x, y, count, mode = 'petal') {
    let emitted = 0;
    particles.forEach((particle, index) => {
      if (emitted >= count || particle.userData.life > 0) return;
      emitted += 1;
      particle.visible = true;
      particle.material.color.setHex(mode === 'dust' ? (index % 2 ? 0xe5aa73 : 0xffcf86) : (index % 3 ? 0xff9aaf : 0xffd45c));
      particle.material.opacity = .9;
      particle.position.set(x + (Math.random() - .5) * .35, y + Math.random() * .18, .7 + Math.random() * .5);
      particle.scale.setScalar(mode === 'dust' ? 1.6 : 1);
      particle.userData.life = .55 + Math.random() * .4;
      particle.userData.velocity.set((Math.random() - .55) * 2.7, .9 + Math.random() * 2.5, (Math.random() - .5) * .25);
      particle.userData.spin = (Math.random() - .5) * .25;
    });
  }

  function animateParticles(delta) {
    particles.forEach((particle) => {
      if (particle.userData.life <= 0) return;
      particle.userData.life -= delta;
      if (particle.userData.life <= 0) {
        particle.visible = false;
        return;
      }
      particle.userData.velocity.y -= 4.6 * delta;
      particle.position.addScaledVector(particle.userData.velocity, delta);
      particle.rotation.z += particle.userData.spin;
      particle.material.opacity = Math.min(.9, particle.userData.life * 1.5);
    });
  }

  function flashMessage(node, text) {
    if (!node) return;
    window.clearTimeout(node._flashTimer);
    node.textContent = text;
    node.hidden = false;
    node.classList.remove('is-visible');
    void node.offsetWidth;
    node.classList.add('is-visible');
    node._flashTimer = window.setTimeout(() => { node.hidden = true; }, 1500);
  }

  function updateJourney(kilometers) {
    const journeyIndex = engine.journeyIndexAtKilometers(kilometers, VIETNAM_ROUTE.length, LANDMARK_INTERVAL_KM);
    const completedInLeg = Math.max(0, kilometers) % LANDMARK_INTERVAL_KM;
    const remaining = LANDMARK_INTERVAL_KM - completedInLeg;
    if (nextLocationNode) nextLocationNode.textContent = `Còn ${remaining.toFixed(2).replace('.', ',')} km đến điểm tiếp theo`;
    unlockLandmark(journeyIndex, kilometers);
    if (journeyIndex === currentJourneyIndex) return;
    currentJourneyIndex = journeyIndex;
    const stop = VIETNAM_ROUTE[journeyIndex];
    targetBackgroundScene = stop.sceneKey;
    provinceNode.textContent = stop.province;
    landmarkNameNode.textContent = stop.landmark;
    locationCard.classList.remove('is-arriving');
    void locationCard.offsetWidth;
    locationCard.classList.add('is-arriving');
    if (kilometers > 0) {
      flashMessage(landmark, `${stop.province} · ${stop.landmark}`);
      playLandmarkTransition(journeyIndex);
    }
  }

  function animateTravelBackgrounds(delta) {
    const requested = travelBackgrounds.get(targetBackgroundScene);
    const targetScene = requested?.loaded
      ? targetBackgroundScene
      : [...travelBackgrounds.entries()].find(([, entry]) => entry.loaded)?.[0];
    travelBackgrounds.forEach((entry, sceneKey) => {
      const targetOpacity = generatedBackgroundReady && sceneKey === targetScene ? 1 : 0;
      entry.material.opacity = THREE.MathUtils.damp(entry.material.opacity, targetOpacity, 3.8, delta);
    });
  }

  function showGameOver(state) {
    stage.classList.remove('is-playing');
    syncGameAudio(false, state.speed);
    finalScoreNode.textContent = formatKilometers(state.score);
    finalPointsNode.textContent = String(state.bonusPoints);
    finalComboNode.textContent = String(state.maxCombo);
    const obstacleNames = {
      kumquat_planter: 'Chậu quất',
      bamboo_fence: 'Hàng rào tre',
      lantern_cart: 'Xe đèn lồng',
      tet_gifts: 'Núi quà Tết',
      apricot_tree: 'Cây hoa mai',
      peach_tree: 'Cây hoa đào',
      firecracker_bundle: 'Chùm pháo Tết',
    };
    const scoreGap = Math.max(0, state.highScore - state.score);
    resultCopy.textContent = state.isHighScore
      ? 'Kỷ lục mới! Mã đáo thành công rồi!'
      : `Còn ${formatKilometers(scoreGap)} nữa là chạm kỷ lục của bạn.`;

    const reached = reachedLandmarkAt(state.score);
    const remainingToNext = LANDMARK_INTERVAL_KM - (Math.max(0, state.score) % LANDMARK_INTERVAL_KM);
    if (resultMilestone) resultMilestone.textContent = reached.milestoneLabel;
    if (resultObstacle) {
      const obstacleLabel = obstacleNames[state.crashObstacleType] || 'Chướng ngại';
      resultObstacle.querySelector('b').textContent = `${obstacleLabel} chặn đường`;
    }
    if (finalItemsNode) finalItemsNode.textContent = String(state.envelopes);
    if (finalTimeNode) finalTimeNode.textContent = formatDuration(state.elapsed);
    if (resultJourneyName) resultJourneyName.textContent = `${reached.landmark} · ${reached.province}`;
    if (resultJourneyImage) {
      resultJourneyImage.src = reached.backgroundUrl || '';
      resultJourneyImage.alt = `${reached.landmark}, ${reached.province}`;
    }
    if (resultJourneyProgress) {
      resultJourneyProgress.textContent = `Đã mở khóa ${unlockedLandmarks.size}/${VIETNAM_ROUTE.length} địa danh · còn ${formatKilometers(remainingToNext)} tới mốc kế tiếp`;
    }
    if (resultRecord) {
      resultRecord.classList.toggle('is-record', Boolean(state.isHighScore));
      resultRecord.querySelector('span').textContent = state.isHighScore
        ? `Kỷ lục mới ${formatKilometers(state.score)}`
        : `Kỷ lục ${formatKilometers(state.highScore)}`;
    }
    shakeUntil = performance.now() + 280;
    emitParticles(-4.1, 1.1, lowQuality ? 8 : 16, 'petal');
    playEffect('crash', 900);
    window.setTimeout(() => {
      updateResultHorsePortrait();
      result.removeAttribute('hidden');
      replayButton.focus({ preventScroll: true });
      playEffect('failed', 2800);
    }, reducedMotion ? 0 : 240);
    track('game_over', {
      score: state.score,
      distance: state.score,
      distance_km: state.score,
      duration_s: Math.round(state.elapsed),
      max_speed: Number(state.maxSpeed.toFixed(2)),
      envelopes: state.envelopes,
      items_collected: state.envelopes,
      bonus_points: state.bonusPoints,
      max_combo: state.maxCombo,
      obstacle_type: state.crashObstacleType,
      is_high_score: state.isHighScore,
      mascot_year: mascotYear,
    });
  }

  function handleEngineEvents(events, state) {
    events.forEach((event) => {
      if (event.type === 'collectible_collected') {
        flashMessage(pointsBurst, `+${event.points} điểm`);
        playTone(720 + event.combo * 25, .12, 'triangle', .045);
        playEffect('envelope', 900);
        emitParticles(-3.7, state.playerY + 1.25, lowQuality ? 5 : 9, 'petal');
        if (state.multiplier > previousMultiplier) {
          const labels = { 2: 'Song mã! ×2', 3: 'Mã đáo! ×3', 4: 'Phi nước đại! ×4' };
          flashMessage(comboBurst, labels[state.multiplier]);
          playTone(880 + state.multiplier * 80, .24, 'triangle', .065);
        }
        previousMultiplier = state.multiplier;
      }
      if (event.type === 'combo_reset') previousMultiplier = 1;
      if (event.type === 'score_milestone') track('score_milestone', { score: event.score, mascot_year: mascotYear });
      if (event.type === 'game_over') showGameOver(state);
    });
  }

  function animateScene(time, delta, state) {
    syncGameAudio(state.status === 'running', state.speed, state.grounded);
    runCyclePhase += delta * (state.status === 'running' ? 12 + state.speed * .7 : 2.5);
    const runCycle = runCyclePhase;
    const jumpStretch = state.grounded ? 0 : Math.min(.14, state.playerY * .045);
    const stride = Math.sin(runCycle);
    const decisiveStride = Math.sign(stride) * Math.pow(Math.abs(stride), .62);
    const runningBob = state.status === 'running' && state.grounded ? Math.abs(Math.sin(runCycle * 2)) * .065 : 0;
    const idleBounce = state.status === 'ready' ? Math.sin(time * .004) * .025 : 0;
    duckVisual = THREE.MathUtils.damp(duckVisual, state.ducking ? 1 : 0, 18, delta);
    horse.position.y = state.playerY - duckVisual * .08;
    horse.position.y += idleBounce + runningBob * (1 - duckVisual);
    horse.rotation.z = state.status === 'crashed' ? -.32 : (state.status === 'running' ? decisiveStride * .018 : Math.sin(time * .002) * .01);
    horse.scale.set(.8 - jumpStretch * .24 + duckVisual * .06, .8 + jumpStretch - duckVisual * .36, .8);
    horse.userData.legPivots.forEach((leg, index) => {
      const offset = index % 2 ? Math.PI : 0;
      const legStride = Math.sin(runCycle + offset);
      const snappedStride = Math.sign(legStride) * Math.pow(Math.abs(legStride), .58);
      leg.rotation.z = duckVisual > .05 ? (index % 2 ? -.88 : .88) : (state.grounded ? snappedStride * .72 : (index % 2 ? -.42 : .52));
    });
    horse.userData.tailPivot.rotation.z = decisiveStride * .22;
    horse.userData.head.rotation.z = duckVisual * .34 + (state.grounded ? -decisiveStride * .045 : -.08);
    horse.userData.body.rotation.z = duckVisual * .08 + (state.grounded ? -decisiveStride * .018 : .035);
    horse.userData.chest.rotation.z = duckVisual * .12 + (state.grounded ? decisiveStride * .015 : -.025);
    horse.userData.scarfTail.rotation.z = .22 + Math.sin(runCycle * 1.7) * .16;
    horseShadow.scale.set(1 - Math.min(.42, state.playerY * .12), .32 - Math.min(.12, state.playerY * .03), 1);
    horseShadow.material.opacity = .38 - Math.min(.22, state.playerY * .06);
    entityMeshes.forEach((object) => {
      if (object.userData.kind === 'collectible') {
        object.rotation.y += reducedMotion ? 0 : .035;
        object.position.y = object.userData.baseY + Math.sin(time * .004 + object.position.x) * .08;
        return;
      }
      object.userData.movingParts?.forEach((part) => { part.rotation.z = -.28 + Math.sin(time * .008 + object.position.x) * .12; });
      object.userData.swayParts?.forEach((part, index) => { part.rotation.z = part.userData.baseRotation + Math.sin(time * .002 + index) * .035; });
      object.userData.firecrackers?.forEach((part, index) => { part.rotation.z = (index % 2 ? -.12 : .12) + Math.sin(time * .006 + index) * .045; });
      object.userData.wheels?.forEach((wheel) => { wheel.rotation.y -= state.speed * delta * .8; });
    });
    groundMarkers.forEach((marker, index) => {
      const span = groundMarkers.length * 1.7;
      marker.position.x = -8 + ((index * 1.7 - state.distance * .9) % span + span) % span;
    });
    backdrop.position.x = -((state.distance * .075) % 11.6);
    festivalLayer.position.x = -((state.distance * .18) % 12);
    hills.position.x = -((state.distance * .022) % 12);
    clouds.position.x = -((state.distance * .012) % 14);
    gates.forEach((gate, gateIndex) => gate.userData.lanterns.forEach((lantern, index) => {
      lantern.rotation.z = Math.sin(time * .0028 + gateIndex + index * .5) * .08;
    }));
    tetDecor.userData.floaters.forEach((item) => {
      item.position.y = item.userData.baseY + Math.sin(time * .0022 + item.userData.phase) * .1;
      item.rotation.z = Math.sin(time * .0016 + item.userData.phase) * .09;
    });

    if (!state.grounded && wasGrounded) emitParticles(-4.8, .15, lowQuality ? 5 : 10, 'dust');
    if (state.grounded && !wasGrounded) {
      emitParticles(-4.5, .13, lowQuality ? 7 : 14, 'dust');
      restartGallop(state.speed);
      if (!reducedMotion) shakeUntil = time + 90;
    }
    wasGrounded = state.grounded;
    animateParticles(delta);

    updateJourney(state.score);
    animateTravelBackgrounds(delta);

    if (time < shakeUntil && !reducedMotion) {
      camera.position.x = .4 + (Math.random() - .5) * .09;
      camera.position.y = 3.35 + (Math.random() - .5) * .07;
    } else {
      camera.position.x = .4;
      camera.position.y = 3.35;
    }
  }

  function frame(time) {
    rafId = 0;
    if (!inView || !pageVisible) return;
    const delta = Math.min(.05, Math.max(0, (time - lastTime) / 1000));
    lastTime = time;
    let state = game.getState();
    if (state.status === 'running') {
      const update = game.update(delta);
      state = update.state;
      handleEngineEvents(update.events, state);
    }
    syncEntityMeshes(state);
    updateHud(state);
    animateScene(time, delta, state);
    renderer.render(scene, camera);
    rafId = window.requestAnimationFrame(frame);
  }

  function startLoop() {
    if (rafId || !inView || !pageVisible) return;
    lastTime = performance.now();
    rafId = window.requestAnimationFrame(frame);
  }

  function setAutomaticPause(shouldPause) {
    const state = game.getState();
    if (shouldPause && state.status === 'running') {
      autoPaused = game.pause();
      if (autoPaused) {
        game.requestDuck(false);
        duckButton.classList.remove('is-pressed');
        paused.removeAttribute('hidden');
        syncGameAudio(false, state.speed);
      }
    } else if (!shouldPause && autoPaused) {
      autoPaused = false;
      paused.setAttribute('hidden', '');
      game.resume();
      lastTime = performance.now();
    }
  }

  function begin(inputMethod) {
    const state = game.getState();
    if (state.status === 'ready') {
      game.start(true);
      runStartedAt = performance.now();
      firstJumpTracked = true;
      previousMultiplier = 1;
      currentJourneyIndex = -1;
      wasGrounded = true;
      runCyclePhase = 0;
      ready.setAttribute('hidden', '');
      stage.classList.add('is-playing');
      track('start', { input_method: inputMethod, quality: lowQuality ? 'low' : 'standard', mascot_year: mascotYear, mascot_fallback: mascot.isFallback });
      track('first_jump', { input_method: inputMethod, mascot_year: mascotYear });
      playEffect('action', 500);
      restartGallop(game.getState().speed, 900);
      syncGameAudio(true, game.getState().speed, game.getState().grounded);
      return;
    }
    if (state.status !== 'running') return;
    const jumped = game.requestJump();
    if (!jumped) return;
    duckButton.classList.remove('is-pressed');
    if (!firstJumpTracked) {
      firstJumpTracked = true;
      track('first_jump', { input_method: inputMethod, mascot_year: mascotYear });
    }
    playEffect('action', 500);
  }

  stage.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button, a')) return;
    stage.focus({ preventScroll: true });
    begin(event.pointerType === 'touch' ? 'touch' : 'pointer');
  });
  stage.addEventListener('contextmenu', (event) => event.preventDefault());

  // Trên điện thoại khung game không phủ hết màn hình: chạm vùng trống quanh khung cũng nhảy.
  section.addEventListener('pointerdown', (event) => {
    if (stage.contains(event.target)) return;
    if (event.target.closest('button, a, input, textarea')) return;
    if (!sharePreview.hasAttribute('hidden')) return;
    if (landmarkViewer && !landmarkViewer.hasAttribute('hidden')) return;
    stage.focus({ preventScroll: true });
    begin(event.pointerType === 'touch' ? 'touch' : 'pointer');
  });

  function setDuck(active) {
    const wasDucking = game.getState().ducking;
    const ducking = game.requestDuck(active);
    duckButton.classList.toggle('is-pressed', ducking);
    if (ducking && !wasDucking) playEffect('action', 500);
    return ducking;
  }

  duckButton.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    event.stopPropagation();
    stage.focus({ preventScroll: true });
    duckButton.setPointerCapture?.(event.pointerId);
    setDuck(true);
  });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((eventName) => {
    duckButton.addEventListener(eventName, (event) => {
      event.preventDefault();
      event.stopPropagation();
      setDuck(false);
    });
  });
  duckButton.addEventListener('click', (event) => event.stopPropagation());

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' && inView && document.activeElement === stage) {
      event.preventDefault();
      if (game.getState().status === 'running') {
        setDuck(true);
      } else {
        stage.blur();
        window.scrollBy({ top: Math.max(180, window.innerHeight * .72), behavior: reducedMotion ? 'auto' : 'smooth' });
      }
      return;
    }
    if (!inView || ![' ', 'ArrowUp', 'w', 'W'].includes(event.key)) return;
    if (event.target.closest('button, a, input, textarea')) return;
    event.preventDefault();
    stage.focus({ preventScroll: true });
    begin('keyboard');
  });
  document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowDown') setDuck(false);
  });

  shareScoreButton.addEventListener('click', (event) => {
    event.stopPropagation();
    openSharePreview();
  });
  sharePreviewConfirm.addEventListener('click', shareScore);
  sharePreviewClose.addEventListener('click', closeSharePreview);
  sharePreviewBack.addEventListener('click', closeSharePreview);
  if (sharePreviewCopy) sharePreviewCopy.addEventListener('click', copyScoreImage);
  if (sharePreviewDownload) sharePreviewDownload.addEventListener('click', downloadScoreImage);
  sharePreview.addEventListener('click', (event) => {
    if (event.target === sharePreview) closeSharePreview();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !sharePreview.hasAttribute('hidden')) closeSharePreview();
  });

  if (viewLandmarksButton) {
    viewLandmarksButton.addEventListener('click', (event) => {
      event.stopPropagation();
      if (!landmarkLibrary) return;
      const state = game.getState();
      track('view_landmarks', {
        from: 'game_over',
        score: state.score,
        unlocked_landmarks: unlockedLandmarks.size,
      });
      closeSharePreview();
      stage.blur();
      landmarkLibrary.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
  }

  replayButton.addEventListener('click', () => {
    const previous = game.getState();
    requestReplayAd({ score: previous.score, durationMs: performance.now() - runStartedAt }, () => {
      track('replay', { previous_score: previous.score, mascot_year: mascotYear });
      game.replay();
      runStartedAt = performance.now();
      lastTime = runStartedAt;
      firstJumpTracked = true;
      previousMultiplier = 1;
      currentJourneyIndex = -1;
      wasGrounded = true;
      runCyclePhase = 0;
      track('first_jump', { input_method: 'replay', mascot_year: mascotYear });
      result.setAttribute('hidden', '');
      closeSharePreview();
      shareScoreButton.classList.remove('is-done');
      shareScoreButton.innerHTML = '<i data-lucide="share-2" aria-hidden="true"></i> Chia sẻ điểm';
      stage.classList.add('is-playing');
      duckButton.classList.remove('is-pressed');
      stage.focus({ preventScroll: true });
      playEffect('action', 500);
      restartGallop(game.getState().speed, 900);
      syncGameAudio(true, game.getState().speed, game.getState().grounded);
    });
  });

  soundButton.addEventListener('click', (event) => {
    event.stopPropagation();
    soundEnabled = !soundEnabled;
    try { window.localStorage.setItem('sap_tet_runner_v1_sound', String(soundEnabled)); } catch (_error) {}
    updateSoundButton();
    if (soundEnabled) {
      ensureSoundEffects();
      playTone(540, .1, 'sine');
      playEffect('envelope', 500);
      const currentState = game.getState();
      if (currentState.status === 'running' && currentState.grounded) restartGallop(currentState.speed);
      syncGameAudio(currentState.status === 'running', currentState.speed, currentState.grounded);
    } else {
      stopAllSounds();
    }
  });

  const visibilityObserver = new IntersectionObserver((entries) => {
    const entry = entries[0];
    inView = entry.isIntersecting;
    if (entry.intersectionRatio >= .45 && !sectionViewed) {
      sectionViewed = true;
      track('section_view', { mascot_year: mascotYear, mascot_fallback: mascot.isFallback });
    }
    setAutomaticPause(!inView || !pageVisible);
    if (inView) startLoop();
  }, { threshold: [0, .45] });
  visibilityObserver.observe(section);

  document.addEventListener('visibilitychange', () => {
    pageVisible = !document.hidden;
    setAutomaticPause(!pageVisible || !inView);
    if (pageVisible) startLoop();
  });
  window.addEventListener('blur', () => {
    setDuck(false);
    setAutomaticPause(true);
  });
  window.addEventListener('focus', () => {
    setAutomaticPause(!inView || !pageVisible);
    startLoop();
  });

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvasHost);
  updateSoundButton();
  updateHud(game.getState());
  resize();
  return Promise.resolve();
}

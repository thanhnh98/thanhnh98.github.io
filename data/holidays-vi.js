/**
 * Phiên bản tiếng Việt cho các trang đếm ngược ngày lễ thế giới.
 * Khóa = slug trong data/holidays-en.js (ngày, múi giờ, màu, hình dùng chung từ bản tiếng Anh).
 * Trang sinh ra: vi/<slug>.html → https://saptet.vn/vi/<slug>, hub vi/countdowns.html. Chạy `npm run generate-holidays`.
 *
 * zoneLabel chỉ có ở sự kiện scope 'national'. dateNote với sự kiện moonDisclaimer phải nhắc "trăng lưỡi liềm".
 * seeAlso (tuỳ chọn): liên kết sang trang tiếng Việt sẵn có trên saptet.vn cho cùng dịp lễ.
 * h1 = 'Sắp <name>' (cụm thương hiệu, cũng là og:title). sapSlug = URL alias ASCII /sap-<tên-việt>/ → redirect noindex về /vi/<slug>.
 */
const HOLIDAYS_VI = {
  'halloween': {
    name: 'Halloween',
    h1: 'Sắp Halloween',
    sapSlug: 'sap-halloween',
    zoneLabel: 'New York',
    tagline: 'Hóa trang, bí ngô và đi xin kẹo vào ngày 31 tháng 10.',
    shareMessage: 'Cuộc đếm ngược rùng rợn đã bắt đầu.',
    aliases: ['Halloween', 'Lễ hội Halloween', 'Lễ hội hóa trang', "All Hallows' Eve"],
    keywords: [
      'sắp halloween',
      'sắp đến halloween',
      'đếm ngược halloween',
      'còn bao nhiêu ngày nữa đến halloween',
      'halloween 2026 vào ngày nào',
      'halloween là ngày mấy',
      'lễ hội hóa trang halloween'
    ],
    about: [
      'Halloween diễn ra vào ngày 31 tháng 10 hằng năm, đêm trước Lễ Các Thánh. Nguồn gốc của ngày này bắt nguồn từ lễ hội Samhain của người Celt, khi người ta đốt lửa trại và hóa trang vào thời điểm giao mùa.',
      'Ngày nay, đây là một trong những dịp lễ lớn nhất ở Mỹ, Canada, Ireland và Anh, gắn với tiệc hóa trang, đèn bí ngô khắc mặt (jack-o\'-lantern), nhà ma và trẻ em đi từng nhà xin kẹo.'
    ],
    origin: {
      roots: "Halloween hình thành từ sự pha trộn giữa lễ hội Samhain của người Gael và lễ vọng Các Thánh (All Hallows' Eve) của Kitô giáo ở Ireland và Anh.",
      communities: 'Ngày lễ này đặc biệt phổ biến ở Ireland, Anh, Mỹ và Canada, và hiện được nhiều quốc gia đón nhận như một dịp vui chơi cộng đồng mang tính thế tục.'
    },
    traditions: [
      'Hóa trang đi xin kẹo (trick-or-treat)',
      'Khắc đèn bí ngô jack-o\'-lantern',
      'Tiệc và diễu hành hóa trang',
      'Nhà ma và phim kinh dị'
    ],
    regions: [
      {
        country: 'Mỹ và Canada',
        note: 'Đi xin kẹo, tiệc hóa trang và bí ngô khắc mặt khiến Halloween trở thành một trong những dịp lễ lớn nhất trong năm.'
      },
      {
        country: 'Ireland',
        note: 'Halloween phát triển từ lễ hội Samhain của người Celt. Lửa trại và bánh mì trái cây barmbrack vẫn là một phần của đêm này, và trường học thường cho nghỉ giữa kỳ vào khoảng thời gian đó.'
      },
      {
        country: 'Anh',
        note: 'Hóa trang, tiệc tùng và đi xin kẹo rất phổ biến, nhất là với trẻ em. Đêm Lửa trại (Bonfire Night) ngày 5 tháng 11 là một dịp riêng của người Anh.'
      },
      {
        country: 'Úc và New Zealand',
        note: 'Tiệc hóa trang và đi xin kẹo ngày càng phổ biến, dù Halloween không phải ngày nghỉ lễ và mức độ hưởng ứng khác nhau tùy khu dân cư.'
      },
      {
        country: 'Nhật Bản, Hàn Quốc và Đông Nam Á',
        note: 'Các thành phố và công viên giải trí thường tổ chức diễu hành hóa trang và sự kiện thương mại; ngày này chủ yếu mang tính thế tục và tập trung ở đô thị.'
      },
      {
        country: 'Mexico và Mỹ Latinh',
        note: 'Một số cộng đồng có đón Halloween, nhưng Ngày của Người chết (Día de Muertos) ở Mexico và Lễ Các Thánh, Lễ Các Đẳng của Công giáo là những dịp tưởng niệm riêng, không nên xem là cùng một ngày lễ.'
      }
    ],
    faq: [
      {
        q: 'Halloween có phải ngày nghỉ lễ không?',
        a: 'Không. Halloween không phải ngày nghỉ lễ liên bang hay ngày nghỉ chính thức ở Mỹ và phần lớn các nước khác, nên trường học và công sở thường vẫn làm việc bình thường.'
      },
      {
        q: 'Trẻ em đi xin kẹo vào lúc mấy giờ?',
        a: 'Ở phần lớn khu dân cư tại Mỹ, trẻ em đi xin kẹo vào chiều tối ngày 31 tháng 10, thường khoảng từ 17 giờ đến 20 giờ theo giờ địa phương. Nhiều thị trấn công bố khung giờ chính thức.'
      }
    ],
    wikipedia: 'https://vi.wikipedia.org/wiki/Halloween'
  },
  'diwali': {
    name: 'Diwali',
    h1: 'Sắp Diwali',
    sapSlug: 'sap-diwali',
    zoneLabel: 'New Delhi',
    tagline: 'Lễ hội Ánh sáng được hơn một tỷ người đón mừng.',
    shareMessage: 'Những ngọn đèn đang đến gần.',
    aliases: ['Diwali', 'Deepavali', 'Lễ hội Ánh sáng', 'Lễ hội Ánh sáng Ấn Độ'],
    keywords: [
      'sắp diwali',
      'sắp đến lễ hội ánh sáng diwali',
      'đếm ngược diwali',
      'còn bao nhiêu ngày nữa đến diwali',
      'diwali 2026 vào ngày nào',
      'lễ hội ánh sáng ấn độ',
      'deepavali 2026'
    ],
    about: [
      'Diwali, hay Deepavali, là Lễ hội Ánh sáng của người theo Ấn Độ giáo. Lễ rơi vào đêm trăng mới (Amavasya) của tháng Kartika, nên ngày dương lịch thay đổi mỗi năm, trong khoảng từ giữa tháng 10 đến giữa tháng 11.',
      'Ngày chính nằm trong chuỗi lễ hội năm ngày, bắt đầu bằng Dhanteras và kết thúc bằng Bhai Dooj. Các gia đình dọn dẹp, trang trí nhà cửa, thắp đèn dầu (diya), làm lễ Lakshmi Puja và cùng nhau chia sẻ bánh kẹo. Người theo đạo Sikh, đạo Jain và Phật giáo cũng đón mừng dịp này.'
    ],
    origin: {
      roots: 'Diwali có nguồn gốc lâu đời trên khắp tiểu lục địa Ấn Độ. Các câu chuyện và ý nghĩa của lễ hội khác nhau tùy vùng và truyền thống tôn giáo, chứ không bắt nguồn từ một sự kiện duy nhất.',
      communities: 'Lễ hội chủ yếu được người theo Ấn Độ giáo đón mừng, cùng với người theo đạo Jain, đạo Sikh và một số cộng đồng Phật giáo, trên khắp Nam Á và trong cộng đồng người Nam Á ở nước ngoài.'
    },
    traditions: [
      'Thắp đèn diya và nến',
      'Làm lễ Lakshmi Puja vào buổi tối',
      'Vẽ hoa văn rangoli trước cửa nhà',
      'Tặng bánh kẹo và quà'
    ],
    regions: [
      {
        country: 'Ấn Độ',
        note: 'Diwali là ngày lễ quốc gia và là cao điểm của lễ hội năm ngày với đèn, pháo hoa, bánh kẹo và thăm hỏi gia đình.'
      },
      {
        country: 'Nepal',
        note: 'Lễ hội được gọi là Tihar, gồm những ngày tôn vinh quạ, chó và bò trước lễ Laxmi Puja.'
      },
      {
        country: 'Sri Lanka và Myanmar',
        note: 'Deepavali là ngày lễ chính thức, đặc biệt được các cộng đồng Ấn Độ giáo đón mừng bằng lễ bái ở đền, thắp đèn và sum họp gia đình.'
      },
      {
        country: 'Singapore và Malaysia',
        note: 'Deepavali là ngày nghỉ lễ. Nhà cửa và đền thờ được thắp sáng, và khu Little India ở Singapore được trang trí đường phố quy mô lớn.'
      },
      {
        country: 'Mauritius và Fiji',
        note: 'Diwali là ngày nghỉ lễ với đèn, bánh kẹo, cầu nguyện và hoạt động cộng đồng, gắn với cộng đồng lớn người gốc Ấn ở Mauritius và Fiji.'
      },
      {
        country: 'Guyana, Trinidad và Tobago, Suriname',
        note: 'Diwali là ngày nghỉ lễ ở các quốc gia vùng Caribe và Nam Mỹ này, nơi cộng đồng người gốc Ấn thắp đèn diya và tổ chức các chương trình văn hóa.'
      },
      {
        country: 'Anh, Mỹ, Canada và Úc',
        note: 'Cộng đồng người Nam Á tổ chức lễ ở đền, trình diễn ánh sáng, chương trình văn hóa và các lễ hội công cộng lớn; thành phố Leicester đặc biệt nổi tiếng ở Anh.'
      }
    ],
    faq: [
      {
        q: 'Vì sao ngày Diwali thay đổi mỗi năm?',
        a: 'Diwali theo lịch âm dương của Ấn Độ giáo. Lễ gắn với ngày trăng mới của tháng Kartika, nên mỗi năm rơi vào một ngày dương lịch khác nhau.'
      },
      {
        q: 'Diwali kéo dài bao lâu?',
        a: 'Mùa lễ hội kéo dài năm ngày: Dhanteras, Naraka Chaturdashi, Diwali (Lakshmi Puja), Govardhan Puja và Bhai Dooj.'
      }
    ],
    dateNote: 'Ngày hiển thị là ngày chính của Diwali (Lakshmi Puja) tại Ấn Độ. Một số vùng đón lễ sớm hoặc muộn hơn một ngày.',
    wikipedia: 'https://vi.wikipedia.org/wiki/Diwali'
  },
  'thanksgiving': {
    name: 'Lễ Tạ ơn',
    h1: 'Sắp Lễ Tạ ơn',
    sapSlug: 'sap-le-ta-on',
    zoneLabel: 'New York',
    tagline: 'Thứ Năm thứ tư của tháng 11 tại Mỹ.',
    shareMessage: 'Bàn tiệc sắp sẵn sàng rồi.',
    aliases: ['Lễ Tạ ơn', 'Ngày Lễ Tạ ơn', 'Lễ Tạ ơn Mỹ', 'Thanksgiving'],
    keywords: [
      'sắp lễ tạ ơn',
      'sắp đến thanksgiving',
      'đếm ngược lễ tạ ơn',
      'còn bao nhiêu ngày nữa đến lễ tạ ơn',
      'lễ tạ ơn 2026 vào ngày nào',
      'thanksgiving 2026',
      'lễ tạ ơn là ngày mấy'
    ],
    about: [
      'Lễ Tạ ơn ở Mỹ là ngày nghỉ lễ liên bang, diễn ra vào thứ Năm thứ tư của tháng 11. Từ năm 1941, luật đã ấn định ngày lễ vào thứ Năm này.',
      'Theo truyền thống, đây là ngày gia đình sum họp bên bữa tiệc lớn với món chính là gà tây quay. Kỳ nghỉ cuối tuần dài cũng mở đầu mùa mua sắm cuối năm, với Black Friday ngay ngày hôm sau.'
    ],
    origin: {
      roots: 'Lễ Tạ ơn phát triển từ các lễ mừng mùa màng ở châu Âu và những ngày tạ ơn thời thuộc địa. Ngày lễ hiện đại của Mỹ dựa trên câu chuyện vụ thu hoạch ở Plymouth năm 1621, di sản mà nhiều cộng đồng người bản địa nhìn nhận theo cách khác.',
      communities: 'Mỹ, Canada và Liberia có những ngày Lễ Tạ ơn riêng, trong khi truyền thống tạ ơn mùa màng cũng tồn tại ở một số nơi tại châu Âu và các khu vực khác.'
    },
    traditions: [
      'Bữa tối gà tây cùng gia đình',
      'Cuộc diễu hành Lễ Tạ ơn của Macy\'s ở New York',
      'Các trận bóng bầu dục NFL',
      'Chia sẻ những điều mình biết ơn'
    ],
    regions: [
      {
        country: 'Mỹ',
        note: 'Ngày nghỉ lễ liên bang vào thứ Năm thứ tư của tháng 11. Ngày hôm sau là Black Friday, mốc truyền thống mở đầu mùa mua sắm cuối năm.'
      },
      {
        country: 'Canada',
        note: 'Lễ Tạ ơn ở Canada diễn ra sớm hơn, vào thứ Hai thứ hai của tháng 10, và là ngày nghỉ lễ theo luật ở hầu hết các tỉnh bang.'
      },
      {
        country: 'Liberia',
        note: 'Liberia có Ngày Lễ Tạ ơn riêng vào thứ Năm đầu tiên của tháng 11.'
      },
      {
        country: 'Grenada',
        note: 'Ngày 25 tháng 10 là Ngày Tạ ơn quốc gia, tưởng niệm các sự kiện năm 1983; lịch sử và ý nghĩa của ngày này khác với Lễ Tạ ơn của Mỹ.'
      },
      {
        country: 'Đảo Norfolk',
        note: 'Vùng lãnh thổ của Úc này giữ truyền thống Lễ Tạ ơn riêng, hình thành từ ảnh hưởng của những người săn cá voi Mỹ và các cộng đồng nhà thờ trên đảo.'
      },
      {
        country: 'Đức và các cộng đồng châu Âu khác',
        note: 'Erntedankfest và các lễ tạ ơn mùa màng khác bày tỏ lòng biết ơn với vụ thu hoạch, nhưng đây là những dịp riêng, không phải ngày lễ của Mỹ được đếm ngược trên trang này.'
      }
    ],
    faq: [
      {
        q: 'Vì sao Lễ Tạ ơn rơi vào thứ Năm?',
        a: 'Luật Mỹ ấn định Lễ Tạ ơn vào thứ Năm thứ tư của tháng 11, nên ngày lễ dao động từ 22 đến 28 tháng 11.'
      },
      {
        q: 'Lễ Tạ ơn ở Canada có cùng ngày không?',
        a: 'Không. Canada đón Lễ Tạ ơn vào thứ Hai thứ hai của tháng 10. Trang này đếm ngược đến Lễ Tạ ơn của Mỹ.'
      }
    ],
    wikipedia: 'https://vi.wikipedia.org/wiki/Lễ_Tạ_ơn'
  },
  'hanukkah': {
    name: 'Hanukkah',
    h1: 'Sắp Hanukkah',
    sapSlug: 'sap-hanukkah',
    zoneLabel: 'Jerusalem',
    tagline: 'Tám đêm thắp nến, bắt đầu từ lúc hoàng hôn.',
    shareMessage: 'Tám đêm rực sáng sắp đến rồi.',
    aliases: ['Hanukkah', 'Chanukah', 'Lễ hội Ánh sáng Do Thái'],
    keywords: [
      'sắp hanukkah',
      'sắp đến hanukkah',
      'đếm ngược hanukkah',
      'còn bao nhiêu ngày nữa đến hanukkah',
      'hanukkah 2026 vào ngày nào',
      'lễ hội ánh sáng do thái',
      'chanukah 2026'
    ],
    about: [
      'Hanukkah (Chanukah) là Lễ hội Ánh sáng của người Do Thái. Lễ bắt đầu lúc hoàng hôn ngày 25 tháng Kislev theo lịch Do Thái và kéo dài tám đêm, nên thường rơi vào khoảng từ cuối tháng 11 đến cuối tháng 12.',
      'Lễ hội tưởng niệm việc tái cung hiến Đền Thờ Thứ Hai ở Jerusalem. Mỗi đêm, một ngọn nến được thắp thêm trên chân đèn menorah, và các gia đình thưởng thức những món chiên dầu như latke và sufganiyot.'
    ],
    origin: {
      roots: 'Hanukkah tưởng niệm cuộc khởi nghĩa Maccabee và việc tái cung hiến Đền Thờ Thứ Hai ở Jerusalem vào thế kỷ thứ 2 trước Công nguyên.',
      communities: 'Đây là lễ hội của người Do Thái, được các cộng đồng Do Thái ở Israel và khắp nơi trên thế giới đón mừng, với phong tục khác nhau tùy gia đình và khu vực.'
    },
    traditions: [
      'Thắp chân đèn menorah mỗi đêm',
      'Bánh khoai tây chiên latke và bánh rán nhân mứt sufganiyot',
      'Chơi con quay dreidel',
      'Quà nhỏ và tiền gelt'
    ],
    regions: [
      {
        country: 'Israel',
        note: 'Trường học nghỉ dịp Hanukkah, và các tiệm bánh bày đầy sufganiyot, loại bánh rán nhân mứt chiên trong dầu.'
      },
      {
        country: 'Mỹ và Canada',
        note: 'Các cộng đồng Do Thái thắp chân đèn hanukkiah tại nhà và nơi công cộng, ăn latke và sufganiyot, chơi dreidel và tổ chức sự kiện cộng đồng.'
      },
      {
        country: 'Anh và Pháp',
        note: 'Các cộng đồng Do Thái lớn đón tám đêm lễ tại nhà, trong giáo đường và tại các buổi thắp nến công cộng, trong đó có nghi lễ ở trung tâm thành phố.'
      },
      {
        country: 'Đức, Trung Âu và Đông Âu',
        note: 'Các cộng đồng Do Thái thắp chân đèn hanukkiot, hát và cùng nhau thưởng thức món chiên dầu; cách đón lễ ngày nay cũng phản ánh lịch sử Do Thái lâu đời và đa dạng của khu vực.'
      },
      {
        country: 'Argentina, Úc và Nam Phi',
        note: 'Các cộng đồng Do Thái ở Nam bán cầu đón cùng tám đêm lễ với nghi thức thắp nến trong gia đình, lễ tại giáo đường và hoạt động cộng đồng.'
      }
    ],
    faq: [
      {
        q: 'Hanukkah kéo dài bao lâu?',
        a: 'Tám đêm và tám ngày. Ngọn nến đầu tiên được thắp vào buổi tối Hanukkah bắt đầu, và mỗi đêm thắp thêm một ngọn.'
      },
      {
        q: 'Vì sao Hanukkah bắt đầu vào buổi tối?',
        a: 'Theo lịch Do Thái, một ngày bắt đầu từ lúc hoàng hôn, nên đêm đầu tiên của Hanukkah bắt đầu khi mặt trời lặn vào đêm trước ngày 25 tháng Kislev.'
      }
    ],
    dateNote: 'Hanukkah bắt đầu lúc hoàng hôn. Đồng hồ đếm ngược đến thời điểm mặt trời lặn gần đúng vào tháng 12 ở Jerusalem (khoảng 16 giờ 40); giờ mặt trời lặn nơi bạn ở có thể khác.',
    wikipedia: 'https://vi.wikipedia.org/wiki/Hanukkah'
  },
  'christmas': {
    name: 'Giáng sinh',
    h1: 'Sắp Giáng sinh',
    sapSlug: 'sap-giang-sinh',
    tagline: 'Ngày 25 tháng 12, dù bạn ở bất cứ nơi đâu trên thế giới.',
    shareMessage: 'Điều kỳ diệu đang đến gần.',
    aliases: ['Noel', 'Lễ Thiên Chúa Giáng sinh', 'Christmas', 'Xmas'],
    keywords: [
      'sắp giáng sinh',
      'sắp noel',
      'sắp đến giáng sinh',
      'đếm ngược giáng sinh',
      'còn bao nhiêu ngày nữa đến giáng sinh',
      'còn bao nhiêu ngày nữa đến noel',
      'giáng sinh 2026 vào ngày nào',
      'đếm ngược noel 2026'
    ],
    about: [
      'Giáng sinh được hàng tỷ người trên thế giới đón mừng vào ngày 25 tháng 12. Với người Kitô giáo, đây là ngày kỷ niệm Chúa Giêsu ra đời; ngày lễ này cũng đã trở thành một dịp văn hóa được chia sẻ rộng rãi.',
      'Vì Giáng sinh bắt đầu lúc nửa đêm theo giờ địa phương, Kiribati và New Zealand đón Giáng sinh sớm nhất, còn Samoa thuộc Mỹ đón muộn nhất. Mặc định, bộ đếm ngược này dùng múi giờ của bạn, và bạn có thể chuyển sang thành phố khác.'
    ],
    origin: {
      roots: 'Giáng sinh khởi đầu là lễ tưởng niệm sự ra đời của Chúa Giêsu trong Kitô giáo sơ khai. Ngày 25 tháng 12 được Giáo hội phương Tây xác lập từ khoảng thế kỷ thứ tư.',
      communities: 'Ngày lễ được người Kitô giáo thuộc nhiều hệ phái và quốc gia cử hành, đồng thời nhiều người không theo Kitô giáo cũng đón mừng như một dịp văn hóa, sum họp gia đình. Một số Giáo hội Chính thống cử hành vào một ngày dương lịch khác.'
    },
    traditions: [
      'Trang trí cây thông Noel',
      'Trao đổi quà tặng',
      'Bữa tối đêm Giáng sinh và Thánh lễ nửa đêm',
      'Thánh ca Giáng sinh và ông già Noel'
    ],
    regions: [
      { country: 'Hoa Kỳ và Canada', note: 'Ngày Giáng sinh là ngày nghỉ lễ chính thức. Nhiều gia đình mở quà vào sáng ngày 25 tháng 12.' },
      { country: 'Anh và Ireland', note: 'Ngày Giáng sinh và Boxing Day (26/12) đều là ngày nghỉ lễ, với bữa tối thịt quay và bánh pudding Giáng sinh.' },
      { country: 'Úc và New Zealand', note: 'Giáng sinh rơi vào mùa hè nên nhiều người ra biển và tổ chức tiệc nướng ngoài trời. Boxing Day cũng là ngày nghỉ lễ.' },
      { country: 'Philippines', note: 'Một trong những mùa Giáng sinh dài nhất thế giới. Các Thánh lễ rạng sáng Simbang Gabi diễn ra từ ngày 16 đến 24 tháng 12.' },
      { country: 'Đức, Áo và Trung Âu', note: 'Các phiên chợ Giáng sinh rộn ràng suốt Mùa Vọng; nhiều gia đình tặng quà vào đêm Giáng sinh và nghỉ lễ hai ngày 25 và 26 tháng 12.' },
      { country: 'Các nước Bắc Âu', note: 'Đêm Giáng sinh thường là dịp sum họp gia đình chính, với bữa ăn theo mùa, nến và tặng quà; Phần Lan còn có tục xông hơi sauna Giáng sinh và lời tuyên bố hòa bình Giáng sinh.' },
      { country: 'Mexico, Trung Mỹ và phần lớn Nam Mỹ', note: 'Truyền thống Công giáo gồm các buổi họp mặt Mùa Vọng, hang đá Giáng sinh, Thánh lễ đêm Giáng sinh và bữa ăn gia đình Nochebuena muộn; món ăn và lễ hội địa phương rất đa dạng.' },
      { country: 'Tây Ban Nha, Bồ Đào Nha và Ý', note: 'Hang đá Giáng sinh, bữa ăn đêm hoặc ngày Giáng sinh và các buổi lễ nhà thờ giữ vai trò trung tâm; ở nhiều nơi, việc tặng quà kéo dài đến Lễ Hiển linh vào tháng 1.' },
      { country: 'Đông Âu và các cộng đồng Chính thống giáo', note: 'Truyền thống gồm ăn chay, phụng vụ và bữa ăn gia đình. Những Giáo hội dùng lịch phụng vụ cũ cử hành Giáng sinh vào ngày 7 tháng 1 thay vì 25 tháng 12.' },
      { country: 'Ethiopia, Eritrea và cộng đồng Copt ở Ai Cập', note: 'Nhiều tín hữu Chính thống giáo đón lễ sau một thời gian ăn chay, thường vào ngày 7 tháng 1, với các buổi lễ nhà thờ kéo dài và những món ăn địa phương đặc trưng.' },
      { country: 'Các cộng đồng Kitô giáo ở Trung Đông', note: 'Người Kitô giáo ở Lebanon, Jordan, Palestine, Syria, Iraq và các nước lân cận kết hợp phụng vụ nhà thờ, bữa ăn gia đình, thăm hỏi và bánh ngọt địa phương, dù lịch và hoàn cảnh mỗi nơi khác nhau.' }
    ],
    faq: [
      { q: 'Giáng sinh có luôn vào ngày 25 tháng 12 không?', a: 'Đúng với phần lớn thế giới. Các Giáo hội Chính thống theo lịch Julius, như ở Nga và Serbia, cử hành vào ngày 7 tháng 1.' },
      { q: 'Nước nào đón Giáng sinh sớm nhất?', a: 'Quần đảo Line của Kiribati (UTC+14) chạm mốc nửa đêm đầu tiên, tiếp theo là New Zealand. Samoa thuộc Mỹ và đảo Baker nằm trong số những nơi đón muộn nhất.' }
    ],
    wikipedia: 'https://vi.wikipedia.org/wiki/Giáng_sinh',
    seeAlso: { href: '/noel.html', label: 'Xem thêm: trang đếm ngược Noel của Sắp Tết' },
  },
  'new-year': {
    name: 'Năm mới',
    h1: 'Sắp Năm mới',
    sapSlug: 'sap-nam-moi',
    tagline: 'Đếm ngược đến nửa đêm ngày 1 tháng 1.',
    shareMessage: 'Một khởi đầu mới đang đến rất gần.',
    aliases: ['Tết Dương lịch', 'Giao thừa Dương lịch', 'New Year', 'Hogmanay'],
    keywords: [
      'sắp năm mới',
      'sắp tết dương lịch',
      'sắp đến năm mới',
      'đếm ngược năm mới',
      'còn bao nhiêu ngày nữa đến tết dương lịch',
      'còn bao nhiêu ngày nữa đến năm mới',
      'đếm ngược năm 2027',
      'tết dương lịch 2027'
    ],
    about: [
      'Ngày đầu năm mới, 1 tháng 1, là ngày đầu tiên của lịch Gregory và là ngày nghỉ lễ ở hầu hết các quốc gia. Những bữa tiệc đêm giao thừa dồn về khoảnh khắc đếm ngược cuối cùng lúc nửa đêm.',
      'Do chênh lệch múi giờ, năm mới lần lượt đi qua địa cầu trong khoảng 26 giờ, bắt đầu ở Kiribati và kết thúc ở Samoa thuộc Mỹ. Mặc định, bộ đếm ngược này dùng giờ địa phương của bạn.'
    ],
    origin: {
      roots: 'Ngày 1 tháng 1 được chọn làm ngày đầu năm trong lịch La Mã, sau đó được giữ lại trong lịch Gregory mà thế giới dùng ngày nay.',
      communities: 'Đây là ngày lễ dân sự ở hầu hết các nước, trong khi nhiều nền văn hóa vẫn giữ những dịp năm mới theo tôn giáo, âm lịch hoặc theo mùa vào các ngày khác.'
    },
    traditions: [
      'Pháo hoa lúc nửa đêm',
      'Lễ thả quả cầu ở Quảng trường Thời Đại, New York',
      'Đặt mục tiêu cho năm mới',
      'Hát bài "Auld Lang Syne"'
    ],
    regions: [
      { country: 'Hoa Kỳ', note: 'Đám đông cùng đếm ngược đến khoảnh khắc thả quả cầu ở Quảng trường Thời Đại, New York. Ngày 1 tháng 1 là ngày nghỉ lễ liên bang.' },
      { country: 'Anh và Ireland', note: 'London đón nửa đêm với tiếng chuông Big Ben và pháo hoa; lễ Hogmanay của Scotland có những buổi tụ họp, tục xông nhà (first-footing) và các bài hát riêng.' },
      { country: 'Úc', note: 'Màn pháo hoa trên cảng Sydney là một trong những lễ đón năm mới lớn đầu tiên trên thế giới mỗi năm.' },
      { country: 'Nhật Bản', note: 'Shōgatsu là ngày lễ quan trọng nhất trong năm, với món mì toshikoshi soba vào ngày 31 tháng 12 và đi viếng đền vào ngày đầu năm.' },
      { country: 'Philippines', note: 'Các gia đình quây quần bên Media Noche, bữa ăn lúc nửa đêm, thường có mười hai loại quả tròn để cầu may.' },
      { country: 'Tây Ban Nha và một số nước Mỹ Latinh', note: 'Nhiều người ăn mười hai quả nho theo mười hai tiếng chuông nửa đêm, mỗi quả cầu may cho một tháng của năm mới.' },
      { country: 'Brazil', note: 'Những đám đông lớn mặc đồ trắng, xem pháo hoa và, nhất là ở vùng ven biển, dâng lễ vật hoặc nhảy qua bảy con sóng để cầu may mắn.' },
      { country: 'Trung Quốc, Việt Nam và Hàn Quốc', note: 'Ngày 1 tháng 1 là Tết Dương lịch, còn Xuân Tiết, Tết Nguyên Đán và Seollal là những ngày Tết âm lịch riêng biệt và quan trọng hơn về mặt văn hóa.' },
      { country: 'Trung Đông, châu Phi và Nam Á', note: 'Nhiều thành phố có các buổi đếm ngược và sự kiện công cộng đón ngày 1 tháng 1, song song với năm mới theo lịch Hồi giáo, Ethiopia, Ba Tư, Hindu và các lịch khác vào những ngày khác.' }
    ],
    faq: [
      { q: 'Nơi nào đón năm mới đầu tiên?', a: 'Quần đảo Line của Kiribati (UTC+14) là nơi có người ở đầu tiên chạm mốc nửa đêm, tiếp theo là Samoa, Tonga và New Zealand.' },
      { q: 'Ngày 1 tháng 1 có phải ngày nghỉ lễ không?', a: 'Có, ngày 1 tháng 1 là ngày nghỉ lễ ở hầu hết các quốc gia dùng lịch Gregory.' }
    ],
    wikipedia: 'https://vi.wikipedia.org/wiki/Tết_Dương_lịch',
    seeAlso: { href: '/su-kien/tet-duong-lich/', label: 'Xem thêm: Tết Dương lịch tại Việt Nam — ý nghĩa và ngày nghỉ' },
  },
  'chinese-new-year': {
    name: 'Tết Trung Quốc',
    h1: 'Sắp Tết Trung Quốc',
    sapSlug: 'sap-tet-trung-quoc',
    zoneLabel: 'Bắc Kinh',
    tagline: 'Năm mới âm lịch của Trung Quốc, tính theo giờ Bắc Kinh.',
    shareMessage: 'Một năm mới may mắn đang đến gần.',
    aliases: ['Tết Âm lịch Trung Quốc', 'Xuân Tiết', 'Chinese New Year', 'Spring Festival'],
    keywords: [
      'sắp tết trung quốc',
      'sắp đến tết trung quốc',
      'đếm ngược tết trung quốc',
      'còn bao nhiêu ngày nữa đến tết trung quốc',
      'tết trung quốc 2027 vào ngày nào',
      'xuân tiết 2027',
      'chinese new year 2027'
    ],
    about: [
      'Tết Trung Quốc, còn gọi là Xuân Tiết, là ngày đầu tiên của năm theo âm lịch Trung Quốc. Ngày này rơi vào lần trăng non thứ hai sau đông chí, trong khoảng từ 21 tháng 1 đến 20 tháng 2.',
      'Đây là ngày lễ quan trọng nhất ở Trung Quốc. Các gia đình đoàn tụ trong bữa cơm tất niên, lì xì phong bao đỏ và chào đón con giáp mới. Nhiều nơi ở Đông Á và Đông Nam Á cũng đón năm mới âm lịch, trong đó Tết Nguyên Đán của Việt Nam và Seollal của Hàn Quốc là những truyền thống riêng. Bộ đếm ngược này tính theo giờ Bắc Kinh (UTC+8).'
    ],
    origin: {
      roots: 'Xuân Tiết bắt nguồn từ truyền thống nông nghiệp và lịch âm dương cổ của Trung Quốc, đánh dấu sự đổi mới, tưởng nhớ tổ tiên và khởi đầu mùa xuân.',
      communities: 'Các truyền thống năm mới âm lịch liên quan được cộng đồng người Hoa và nhiều dân tộc ở Đông Á, Đông Nam Á gìn giữ. Tết Nguyên Đán ở Việt Nam và Seollal ở Hàn Quốc là những truyền thống dân tộc riêng biệt, có lịch sử và phong tục của mình.'
    },
    traditions: [
      'Bữa cơm đoàn viên đêm giao thừa',
      'Phong bao đỏ (hồng bao) lì xì',
      'Múa lân và múa rồng',
      'Pháo hoa và trang trí màu đỏ'
    ],
    regions: [
      { country: 'Trung Quốc', note: 'Kỳ nghỉ Xuân Tiết tạo nên cuộc di cư thường niên lớn nhất thế giới, khi người dân khắp nơi về quê dự bữa cơm đoàn viên.' },
      { country: 'Đài Loan, Hồng Kông và Ma Cao', note: 'Các gia đình quây quần bên bữa cơm đoàn viên, thăm họ hàng, lì xì phong bao đỏ và tham gia lễ ở đền chùa hoặc các lễ hội công cộng trong kỳ nghỉ kéo dài nhiều ngày.' },
      { country: 'Việt Nam', note: 'Tết Nguyên Đán là một truyền thống riêng của người Việt và là ngày lễ cổ truyền lớn nhất ở Việt Nam, với việc tưởng nhớ tổ tiên, sum họp gia đình, bánh chưng hoặc bánh tét, hoa Tết và lì xì. Tết Nguyên Đán tính theo âm lịch Việt Nam (múi giờ UTC+7) nên thường, nhưng không phải lúc nào cũng, trùng ngày với Tết Trung Quốc.' },
      { country: 'Hàn Quốc', note: 'Seollal là truyền thống năm mới riêng của Hàn Quốc, xoay quanh việc sum họp gia đình, lạy chúc thọ người lớn (sebae), món canh bánh gạo tteokguk và, ở nhiều gia đình, nghi lễ cúng tổ tiên charye.' },
      { country: 'Singapore, Malaysia và Brunei', note: 'Cộng đồng người Hoa đón Tết với bữa cơm đoàn viên, lì xì, đi thăm hỏi và múa lân; Tết Trung Quốc là ngày nghỉ lễ chính thức ở Singapore và Malaysia.' },
      { country: 'Indonesia, Thái Lan và Philippines', note: 'Cộng đồng người Hoa và người Peranakan đi lễ chùa, sum họp gia đình, lì xì phong bao đỏ và tổ chức các sự kiện văn hóa công cộng; Indonesia công nhận Tết Âm lịch là ngày nghỉ lễ quốc gia.' },
      { country: 'Hoa Kỳ, Canada, Anh, Úc và New Zealand', note: 'Cộng đồng người Hoa và người gốc Á nói chung tổ chức các buổi sum họp gia đình, diễu hành ở khu phố Tàu, múa lân và lễ hội đèn lồng.' },
      { country: 'Các cộng đồng năm mới âm lịch khác', note: 'Tsagaan Sar của Mông Cổ, Losar của Tây Tạng và các năm mới âm dương lịch khác đôi khi rơi vào cùng khoảng thời gian, nhưng là những ngày lễ riêng biệt với lịch và phong tục riêng.' }
    ],
    faq: [
      { q: 'Năm 2027 là năm con gì?', a: 'Theo lịch Trung Quốc, năm 2027 là năm con Dê, bắt đầu từ ngày 6 tháng 2 năm 2027.' },
      { q: 'Kỳ nghỉ Tết Trung Quốc kéo dài bao lâu?', a: 'Ở Trung Quốc đại lục, kỳ nghỉ lễ chính thức thường kéo dài khoảng một tuần, còn không khí lễ hội theo truyền thống kéo dài đến Tết Nguyên Tiêu vào ngày rằm tháng Giêng.' }
    ],
    seeAlso: { href: '/', label: 'Xem thêm: đếm ngược Tết Nguyên Đán Việt Nam trên Sắp Tết' },
  },
  'ramadan': {
    name: 'Ramadan',
    h1: 'Sắp Ramadan',
    sapSlug: 'sap-ramadan',
    tagline: 'Tháng chay thiêng liêng, bắt đầu từ vầng trăng lưỡi liềm.',
    shareMessage: 'Một tháng thiêng liêng đang đến gần.',
    aliases: ['Tháng chay Ramadan', 'Ramzan', 'Ramadhan', 'Ramadan Kareem'],
    keywords: [
      'sắp ramadan',
      'sắp đến tháng ramadan',
      'đếm ngược ramadan',
      'còn bao nhiêu ngày nữa đến ramadan',
      'ramadan 2027 vào ngày nào',
      'tháng chay ramadan 2027',
      'ngày bắt đầu ramadan 2027'
    ],
    about: [
      'Ramadan là tháng thứ chín trong lịch Hồi giáo, được người Hồi giáo trên khắp thế giới giữ bằng việc nhịn ăn từ bình minh đến hoàng hôn. Vì lịch Hồi giáo là âm lịch, Ramadan dịch sớm lên khoảng 11 ngày mỗi năm.',
      'Tháng này bắt đầu khi trăng lưỡi liềm mới được nhìn thấy và kéo dài 29 hoặc 30 ngày. Mỗi ngày xoay quanh bữa suhoor trước bình minh, bữa iftar lúc hoàng hôn và các buổi cầu nguyện đêm (Taraweeh); tháng chay khép lại bằng lễ Eid al-Fitr.'
    ],
    origin: {
      roots: 'Ramadan là tháng thứ chín của lịch Hồi giáo. Ý nghĩa tôn giáo của tháng gắn với những lần mặc khải đầu tiên của Kinh Qur\'an cho Nhà tiên tri Muhammad vào thế kỷ thứ bảy, và việc nhịn ăn đã trở thành một thực hành trọng tâm của Hồi giáo.',
      communities: 'Tháng chay được người Hồi giáo khắp thế giới giữ gìn, gồm cộng đồng Sunni, Shia và các cộng đồng Hồi giáo khác, từ Trung Đông, châu Phi, châu Á đến châu Âu, châu Mỹ và châu Đại Dương. Cách quan sát trăng và phong tục văn hóa khác nhau tùy nơi.'
    },
    traditions: [
      'Nhịn ăn từ bình minh đến hoàng hôn',
      'Bữa suhoor và bữa iftar',
      'Cầu nguyện đêm Taraweeh',
      'Bố thí (zakat) và đọc Kinh Qur\'an'
    ],
    regions: [
      { country: 'Ả Rập Xê Út và vùng Vịnh', note: 'Ngày Ramadan theo lịch Umm al-Qura và việc quan sát trăng; giờ làm việc thường được rút ngắn.' },
      { country: 'Jordan và vùng Levant', note: 'Jordan xác nhận ngày bắt đầu sau khi xem xét việc thấy trăng lưỡi liềm. Bữa iftar gia đình, hoạt động từ thiện trong khu phố, những buổi tụ họp buổi tối và bánh qatayef gắn liền với tháng này.' },
      { country: 'Ai Cập và Bắc Phi', note: 'Các cộng đồng kết hợp nhịn ăn và cầu nguyện hằng đêm với bữa iftar gia đình, từ thiện và những phong tục địa phương đặc trưng như đèn lồng Ramadan ở Ai Cập hay các buổi tụ họp khuya khắp vùng Maghreb.' },
      { country: 'Indonesia', note: 'Quốc gia có số dân Hồi giáo đông nhất thế giới. Chính phủ công bố ngày bắt đầu Ramadan sau phiên sidang isbat (phiên họp xác định trăng).' },
      { country: 'Malaysia, Singapore và Brunei', note: 'Ramadan có các buổi cầu nguyện chung, chợ Ramadan và bữa iftar gia đình; cơ quan tôn giáo chính thức ở từng nước công bố ngày bắt đầu tháng chay.' },
      { country: 'Pakistan, Ấn Độ, Bangladesh và Sri Lanka', note: 'Ramadan, thường được gọi là Ramzan, theo thông báo của giới chức tôn giáo địa phương; chợ phiên, cầu nguyện ở thánh đường, từ thiện và các món iftar vùng miền làm nên không khí của tháng.' },
      { country: 'Thổ Nhĩ Kỳ, vùng Balkan và Trung Á', note: 'Ramazan được đánh dấu bằng nhịn ăn, bữa iftar chung và cầu nguyện đêm. Thổ Nhĩ Kỳ công bố ngày theo tính toán thiên văn, còn phong tục khác nhau giữa các cộng đồng Hồi giáo trong khu vực.' },
      { country: 'Tây Phi và Đông Phi', note: 'Các cộng đồng Hồi giáo lớn từ Senegal, Nigeria đến Sudan, Somalia, Kenya và Tanzania kết hợp nhịn ăn và cầu nguyện với bữa ăn chung, từ thiện và món ăn địa phương.' },
      { country: 'Châu Âu, châu Mỹ và châu Đại Dương', note: 'Các cộng đồng Hồi giáo tổ chức cầu nguyện ở thánh đường, bữa iftar cộng đồng và hoạt động từ thiện. Việc quan sát trăng tại chỗ, theo thông báo từ nước ngoài hoặc theo lịch tính sẵn đôi khi dẫn đến ngày bắt đầu khác nhau.' }
    ],
    faq: [
      { q: 'Vì sao mỗi năm Ramadan bắt đầu vào một ngày khác nhau?', a: 'Lịch Hồi giáo có khoảng 354 ngày, nên so với lịch Gregory, Ramadan dịch sớm lên chừng 11 ngày mỗi năm.' },
      { q: 'Vì sao ở nước tôi Ramadan đôi khi bắt đầu vào ngày khác?', a: 'Nhiều cộng đồng bắt đầu Ramadan sau khi trăng lưỡi liềm được nhìn thấy tại địa phương, nên ngày bắt đầu đôi khi lệch một ngày so với lịch Umm al-Qura dùng trên trang này.' }
    ],
    dateNote: 'Các ngày ở đây là ngày dự kiến bắt đầu nhịn ăn theo lịch Umm al-Qura (Ả Rập Xê Út). Ngày bắt đầu thực tế phụ thuộc vào việc nhìn thấy trăng lưỡi liềm và đôi khi lệch một ngày tùy quốc gia của bạn.',
    wikipedia: 'https://vi.wikipedia.org/wiki/Ramadan'
  },
  'valentines-day': {
    name: 'Valentine',
    h1: 'Sắp Valentine',
    sapSlug: 'sap-valentine',
    tagline: 'Ngày 14 tháng 2, ngày dành cho tình yêu và tình bạn.',
    shareMessage: 'Tình yêu đang đếm ngược từng ngày.',
    aliases: ['Ngày lễ Tình nhân', "Valentine's Day", 'Lễ Thánh Valentine', 'Ngày Valentine'],
    keywords: [
      'sắp valentine',
      'sắp đến valentine',
      'sắp lễ tình nhân',
      'đếm ngược valentine',
      'còn bao nhiêu ngày nữa đến valentine',
      'valentine 2027 vào ngày nào',
      'ngày lễ tình nhân 14/2',
      'đếm ngược ngày lễ tình nhân'
    ],
    about: [
      'Valentine được đón vào ngày 14 tháng 2 ở nhiều nước trên thế giới. Ngày lễ mang tên Thánh Valentine và gắn với tình yêu đôi lứa từ thời Trung Cổ.',
      'Các cặp đôi tặng nhau thiệp, hoa và sô-cô-la, và nhiều người cũng dành ngày này cho bạn bè. Ở Nhật Bản và Hàn Quốc, White Day ngày 14 tháng 3 là ngày đáp lễ.'
    ],
    origin: {
      roots: 'Valentine kết hợp những truyền thống gắn với các vị tử đạo Kitô giáo mang tên Valentine và quan niệm về tình yêu lãng mạn hình thành sau này ở châu Âu thời Trung Cổ.',
      communities: 'Ngày nay, ở nhiều nước đây chủ yếu là dịp thế tục để tôn vinh tình yêu và tình bạn, với phong tục được điều chỉnh theo từng nơi ở châu Âu, châu Mỹ, châu Á và các khu vực khác.'
    },
    traditions: [
      'Thiệp Valentine và lời nhắn yêu thương',
      'Hoa hồng và sô-cô-la',
      'Bữa tối lãng mạn',
      'Hẹn hò cùng hội bạn thân (Galentine)'
    ],
    regions: [
      { country: 'Mỹ, Anh, Canada và Úc', note: 'Các cặp đôi tặng nhau thiệp, hoa và sô-cô-la; nhà hàng thường kín chỗ từ nhiều tuần trước.' },
      { country: 'Nhật Bản và Hàn Quốc', note: 'Theo truyền thống, phụ nữ tặng sô-cô-la vào ngày 14/2 và nam giới đáp lễ vào White Day, ngày 14/3.' },
      { country: 'Ấn Độ và Nam Á', note: 'Ở thành thị, người ta thường tặng thiệp, hoa và có cả "Tuần lễ Valentine" mang tính thương mại, còn mức độ hưởng ứng và quan điểm rất khác nhau giữa các cộng đồng.' },
      { country: 'Phần Lan và Estonia', note: 'Ngày 14/2 thường được xem là ngày của tình bạn lẫn tình yêu, bạn bè tặng nhau thiệp và quà nhỏ.' },
      { country: 'Philippines', note: 'Hoa, quà và bữa tối rất phổ biến; một số thành phố hoặc tổ chức tổ chức lễ cưới tập thể hay đám cưới dân sự quy mô lớn quanh ngày 14/2.' },
      { country: 'Mỹ Latinh', note: 'Nhiều nước tôn vinh tình yêu và tình bạn vào ngày 14/2, đôi khi mở rộng ra cả bạn bè và gia đình chứ không chỉ các cặp đôi.' },
      { country: 'Brazil', note: 'Ngày lễ tình yêu chính của Brazil là Dia dos Namorados vào 12/6, nên bộ đếm ngược ngày 14/2 này không phải ngày lễ chính ở đây.' }
    ],
    faq: [
      { q: 'Valentine có phải ngày nghỉ lễ không?', a: 'Không. Valentine không phải ngày nghỉ lễ chính thức ở bất kỳ quốc gia lớn nào, dù được hưởng ứng rộng rãi.' },
      { q: 'Valentine có luôn là ngày 14 tháng 2 không?', a: 'Có. Valentine rơi vào ngày 14 tháng 2 hằng năm.' }
    ],
    wikipedia: 'https://vi.wikipedia.org/wiki/Ngày_lễ_Tình_nhân',
    seeAlso: { href: '/su-kien/valentine/', label: 'Xem thêm: Valentine 14/2 — ý nghĩa và đếm ngược' },
  },
  'eid-al-fitr': {
    name: 'Eid al-Fitr',
    h1: 'Sắp Eid al-Fitr',
    sapSlug: 'sap-eid-al-fitr',
    tagline: 'Lễ xả chay mừng kết thúc tháng Ramadan.',
    shareMessage: 'Niềm vui Eid đã gần kề.',
    aliases: ['Lễ Eid al-Fitr', 'Lễ xả chay', 'Eid ul-Fitr', 'Hari Raya Aidilfitri', 'Lebaran'],
    keywords: [
      'sắp eid al-fitr',
      'sắp đến lễ xả chay',
      'đếm ngược eid al-fitr',
      'còn bao nhiêu ngày nữa đến eid',
      'eid al-fitr 2027 vào ngày nào',
      'lễ xả chay hồi giáo',
      'lễ eid al-fitr là gì'
    ],
    about: [
      'Eid al-Fitr là lễ đánh dấu kết thúc tháng Ramadan. Lễ rơi vào ngày đầu tiên của tháng Shawwal, tháng thứ mười trong lịch Hồi giáo, sau khi trăng lưỡi liềm mới được nhìn thấy.',
      'Ngày lễ bắt đầu bằng buổi cầu nguyện Eid đặc biệt, tiếp theo là thăm hỏi gia đình, bạn bè, những bữa ăn thịnh soạn và quà cho trẻ em. Trước buổi cầu nguyện, người Hồi giáo trao Zakat al-Fitr cho người khó khăn.'
    ],
    origin: {
      roots: 'Eid al-Fitr bắt nguồn từ cộng đồng Hồi giáo đầu tiên ở Medina vào thế kỷ 7, là ngày lễ đánh dấu việc hoàn thành tháng Ramadan.',
      communities: 'Lễ được người Hồi giáo khắp thế giới đón mừng, gồm cả Sunni, Shia và các cộng đồng Hồi giáo khác, với những nghi thức tôn giáo chung cùng món ăn, trang phục và phong tục gia đình đa dạng theo từng vùng.'
    },
    traditions: [
      'Cầu nguyện Eid vào buổi sáng',
      'Bố thí Zakat al-Fitr',
      'Quần áo mới và thăm hỏi gia đình',
      'Bánh ngọt và bữa tiệc mừng lễ'
    ],
    regions: [
      { country: 'Ả Rập Xê Út và UAE', note: 'Eid al-Fitr là kỳ nghỉ lễ kéo dài vài ngày, với buổi cầu nguyện sáng, thăm hỏi gia đình và những bữa tiệc mừng.' },
      { country: 'Jordan và vùng Levant', note: 'Ngày lễ bắt đầu bằng buổi cầu nguyện Eid, sau đó là thăm họ hàng, tiền mừng eidiya cho trẻ em và các loại bánh như ma\'amoul hay ka\'ak nhân chà là.' },
      { country: 'Ai Cập và Bắc Phi', note: 'Các gia đình dự lễ cầu nguyện Eid, thăm họ hàng và cùng thưởng thức bánh ngọt địa phương; ở Ai Cập, bánh quy kahk và những chuyến đi chơi gắn liền với dịp lễ.' },
      { country: 'Indonesia', note: 'Lễ được gọi là Lebaran. Hàng triệu người về quê trong dịp mudik, đợt hồi hương thường niên.' },
      { country: 'Malaysia và Singapore', note: 'Hari Raya Aidilfitri là ngày nghỉ lễ chính thức, các gia đình mở cửa đón bạn bè và hàng xóm đến chơi (open house).' },
      { country: 'Pakistan, Ấn Độ, Bangladesh và Sri Lanka', note: 'Eid đến sau đêm Chand Raat và thông báo nhìn trăng của từng địa phương, với buổi cầu nguyện sáng, quần áo mới, thăm gia đình, vẽ henna, quà tặng và món ngọt như sheer khurma.' },
      { country: 'Thổ Nhĩ Kỳ, Balkan và Trung Á', note: 'Ramazan Bayramı hay các tên gọi địa phương tương tự đánh dấu nhiều ngày cầu nguyện, thăm người lớn tuổi, đón khách và thưởng thức đồ ngọt.' },
      { country: 'Tây Phi và Đông Phi', note: 'Từ Senegal, Nigeria đến Sudan, Somalia và vùng duyên hải Đông Phi, các cộng đồng cùng cầu nguyện, mặc trang phục lễ hội và chia sẻ bữa ăn, quà tặng, của bố thí.' },
      { country: 'Châu Âu, châu Mỹ và châu Đại Dương', note: 'Cộng đồng Hồi giáo tụ họp ở nhà thờ Hồi giáo, công viên và nhà văn hóa để cầu nguyện và mừng lễ, giữ gìn truyền thống gia đình đồng thời thích nghi với lịch học và lịch làm việc sở tại.' }
    ],
    faq: [
      { q: 'Eid al-Fitr kéo dài bao lâu?', a: 'Về mặt tôn giáo, lễ kéo dài một ngày, nhưng nhiều nước cho nghỉ lễ từ ba ngày trở lên.' },
      { q: 'Eid al-Fitr khác Eid al-Adha thế nào?', a: 'Eid al-Fitr khép lại tháng Ramadan. Eid al-Adha, khoảng 70 ngày sau đó, gắn với cuộc hành hương Hajj và sự hiến tế của Ibrahim.' }
    ],
    dateNote: 'Ngày được tính theo lịch Umm al-Qura (Ả Rập Xê Út). Ngày lễ thực tế phụ thuộc vào việc nhìn thấy trăng lưỡi liềm nên ở quốc gia của bạn ngày lễ đôi khi chênh một ngày.',
    wikipedia: 'https://vi.wikipedia.org/wiki/Eid_al-Fitr'
  },
  'easter': {
    name: 'Lễ Phục sinh',
    h1: 'Sắp Lễ Phục sinh',
    sapSlug: 'sap-le-phuc-sinh',
    tagline: 'Chúa nhật Phục sinh, ngày lễ quan trọng nhất của Kitô giáo.',
    shareMessage: 'Một mùa Phục sinh an vui đang đến gần.',
    aliases: ['Chúa nhật Phục sinh', 'Easter', 'Easter Sunday'],
    keywords: [
      'sắp lễ phục sinh',
      'sắp đến phục sinh',
      'đếm ngược lễ phục sinh',
      'còn bao nhiêu ngày nữa đến lễ phục sinh',
      'lễ phục sinh 2027 vào ngày nào',
      'chúa nhật phục sinh 2027',
      'easter 2027'
    ],
    about: [
      'Lễ Phục sinh mừng sự phục sinh của Chúa Giêsu và là ngày lễ quan trọng nhất trong lịch Kitô giáo. Lễ rơi vào Chúa nhật đầu tiên sau ngày trăng tròn đầu tiên kể từ 21/3, nên ngày lễ xê dịch trong khoảng từ 22/3 đến 25/4.',
      'Chúa nhật Phục sinh khép lại Tuần Thánh và 40 ngày Mùa Chay. Bên cạnh thánh lễ, nhiều gia đình trang trí trứng, chơi săn trứng và quây quần bên bữa ăn mừng lễ.'
    ],
    origin: {
      roots: 'Lễ Phục sinh hình thành trong những cộng đồng Kitô hữu đầu tiên để tưởng niệm sự phục sinh của Chúa Giêsu, trong bối cảnh lịch sử và lịch pháp của lễ Vượt Qua của người Do Thái.',
      communities: 'Lễ được các cộng đồng Công giáo, Tin Lành, Chính Thống giáo và các cộng đồng Kitô giáo khác trên thế giới cử hành. Giáo hội phương Tây và phương Đông nhiều năm mừng lễ vào những ngày khác nhau vì cách tính lịch khác nhau.'
    },
    traditions: [
      'Thánh lễ Chúa nhật Phục sinh',
      'Trang trí và săn trứng',
      'Trứng sô-cô-la và Thỏ Phục sinh',
      'Bữa trưa sum họp gia đình'
    ],
    regions: [
      { country: 'Mỹ và Canada', note: 'Săn trứng là truyền thống lớn, trong đó có sự kiện lăn trứng Phục sinh tại Nhà Trắng vào thứ Hai Phục sinh.' },
      { country: 'Anh, Ireland và Úc', note: 'Thứ Sáu Tuần Thánh là ngày nghỉ lễ, và ở hầu hết các vùng thứ Hai Phục sinh cũng vậy, tạo thành kỳ nghỉ cuối tuần bốn ngày.' },
      { country: 'Philippines', note: 'Tuần Thánh (Semana Santa) được giữ trên cả nước; thứ Năm Tuần Thánh và thứ Sáu Tuần Thánh là ngày nghỉ lễ.' },
      { country: 'Đức và Trung Âu', note: 'Trứng vẽ màu, tổ trứng Phục sinh, đốt lửa trại và cành cây trang trí rất phổ biến, với khác biệt theo vùng ở Đức, Áo, Thụy Sĩ và các nước lân cận.' },
      { country: 'Tây Ban Nha, Bồ Đào Nha, Ý và Mỹ Latinh', note: 'Rước kiệu Tuần Thánh, nghi thức tưởng niệm Cuộc Thương khó, thánh lễ và món ăn gia đình là trọng tâm; phong tục khác nhau nhiều giữa các thành phố và quốc gia.' },
      { country: 'Hy Lạp, Síp, Romania, Serbia, Nga và các cộng đồng Kitô giáo Đông phương khác', note: 'Phụng vụ lúc nửa đêm, nến, lời chào mừng Phục sinh và món ăn ngày lễ rất phổ biến. Do cách tính khác, Lễ Phục sinh Chính Thống giáo thường rơi vào ngày khác.' },
      { country: 'Ethiopia, Eritrea và cộng đồng Copt ở Ai Cập', note: 'Lễ Phục sinh đến sau một mùa chay dài, được đón bằng phụng vụ kéo dài, bữa ăn gia đình và bánh mì hay món thịt địa phương theo lịch của từng giáo hội.' },
      { country: 'Các cộng đồng Kitô giáo ở Trung Đông', note: 'Kitô hữu ở Palestine, Jordan, Liban, Syria, Iraq và các nước lân cận giữ Tuần Thánh và Lễ Phục sinh bằng phụng vụ, rước kiệu, thăm hỏi gia đình và bánh ngọt địa phương.' }
    ],
    faq: [
      { q: 'Vì sao ngày Lễ Phục sinh thay đổi mỗi năm?', a: 'Lễ Phục sinh gắn với ngày trăng tròn đầu tiên sau xuân phân tháng 3, nên rơi vào một Chúa nhật bất kỳ từ 22/3 đến 25/4.' },
      { q: 'Thứ Sáu Tuần Thánh có phải ngày nghỉ lễ không?', a: 'Thứ Sáu Tuần Thánh, hai ngày trước Lễ Phục sinh, là ngày nghỉ lễ ở nhiều nước, trong đó có Anh, Úc, Đức và Canada.' }
    ],
    dateNote: 'Ngày hiển thị là Chúa nhật Phục sinh theo lịch phương Tây (Công giáo và Tin Lành). Lễ Phục sinh Chính Thống giáo thường rơi vào một Chúa nhật muộn hơn.',
    wikipedia: 'https://vi.wikipedia.org/wiki/Lễ_Phục_Sinh'
  },
  'songkran': {
    name: 'Songkran',
    h1: 'Sắp Songkran',
    sapSlug: 'sap-songkran',
    zoneLabel: 'Bangkok',
    tagline: 'Tết cổ truyền Thái Lan và lễ hội té nước lớn nhất thế giới.',
    shareMessage: 'Sẵn sàng đón năm mới thật mát lành nhé.',
    aliases: ['Tết té nước Thái Lan', 'Tết Thái Lan', 'Lễ hội Songkran', 'Thai New Year'],
    keywords: [
      'sắp songkran',
      'sắp đến tết té nước thái lan',
      'đếm ngược songkran',
      'còn bao nhiêu ngày nữa đến songkran',
      'songkran 2027 vào ngày nào',
      'tết té nước thái lan',
      'lễ hội té nước songkran 2027'
    ],
    about: [
      'Songkran là Tết cổ truyền của Thái Lan, được nghỉ lễ toàn quốc từ ngày 13 đến 15 tháng 4. Tên gọi bắt nguồn từ một từ tiếng Phạn chỉ thời điểm Mặt Trời đi vào cung Bạch Dương.',
      'Theo truyền thống, người dân dội nước thơm lên tượng Phật và tay người lớn tuổi để bày tỏ lòng kính trọng và gột rửa vận xui. Ở những thành phố như Bangkok và Chiang Mai, Songkran đã trở thành lễ hội té nước đường phố khổng lồ.'
    ],
    origin: {
      roots: 'Songkran lấy tên từ chữ sankranti trong tiếng Phạn, nghĩa là sự chuyển giao theo chiêm tinh, và phát triển từ các truyền thống năm mới theo dương lịch và Phật giáo ở Nam Á và Đông Nam Á.',
      communities: 'Đây là Tết cổ truyền của Thái Lan, có quan hệ gần gũi với các lễ năm mới tháng 4 của người Lào, Khmer, Myanmar cùng các cộng đồng Tai và Đông Nam Á khác.'
    },
    traditions: [
      'Té nước trên đường phố',
      'Rod nam dam hua: dội nước lên tay người lớn tuổi',
      'Làm công đức ở chùa',
      'Về quê đoàn tụ gia đình'
    ],
    regions: [
      { country: 'Thái Lan', note: 'Nghỉ lễ toàn quốc từ 13 đến 15/4. Các trận té nước phủ kín đường Silom, phố Khao San ở Bangkok và khu phố cổ Chiang Mai.' },
      { country: 'Cộng đồng người Lào', note: 'Pi Mai Lao là Tết Lào, gần gũi nhưng riêng biệt, được đón bằng việc đi chùa, rước lễ, té nước chúc phúc trang trọng và vui chơi, nổi bật nhất ở Luang Prabang.' },
      { country: 'Cộng đồng người Myanmar', note: 'Thingyan là lễ hội té nước mừng năm mới của Myanmar, gần gũi nhưng riêng biệt, kết hợp té nước với làm công đức, kính trọng người già và việc thiện.' },
      { country: 'Cộng đồng người Campuchia', note: 'Choul Chnam Thmey là Tết tháng 4 của Campuchia, gần gũi nhưng riêng biệt, với lễ dâng cúng ở chùa, nghi lễ gia đình, trò chơi và một số tục té nước.' },
      { country: 'Cộng đồng người Tai ở Trung Quốc, Ấn Độ và các nước lân cận', note: 'Người Dai và các dân tộc Tai khác có những lễ hội té nước và năm mới tháng 4 rất gần gũi, với tên gọi địa phương, nghi lễ Phật giáo và nghi thức cộng đồng.' },
      { country: 'Sri Lanka và một phần Nam Á', note: 'Tết của người Sinhala và Tamil cùng một số lễ năm mới theo dương lịch diễn ra vào thời điểm chuyển giao chiêm tinh tương tự, nhưng là những truyền thống riêng và không phải Songkran.' }
    ],
    faq: [
      { q: 'Songkran kéo dài bao lâu?', a: 'Kỳ nghỉ lễ chính thức kéo dài từ 13/4 đến 15/4, và ở một số nơi lễ hội còn kéo dài hơn.' },
      { q: 'Songkran có được tổ chức ngoài Thái Lan không?', a: 'Có. Các lễ hội té nước mừng năm mới tương tự được tổ chức ở Lào (Pi Mai), Myanmar (Thingyan), Campuchia và một phần miền nam Trung Quốc.' }
    ],
    wikipedia: 'https://vi.wikipedia.org/wiki/Songkran'
  },
};

const UI_VI = {
  locale: 'vi-VN',
  weekdays: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
  dayForms: { other: '{n} ngày' },
  units: { days: 'NGÀY', hours: 'GIỜ', minutes: 'PHÚT', seconds: 'GIÂY' },
  summaryRest: 'nữa là đến {name} {year}',
  target: 'Bắt đầu lúc {time}, {zone} ({offset})',
  yourZone: 'theo múi giờ của bạn',
  zonePrefix: 'giờ ',
  myZone: 'Múi giờ của tôi ({zone})',
  zonePickerLabel: 'Múi giờ',
  local: 'Tức là {datetime} theo giờ của bạn.',
  expected: ' (dự kiến)',
  liveTitle: '{name} đã đến!',
  liveText: 'Chúc bạn một ngày lễ thật vui.',
  unknownTitle: 'Ngày tiếp theo',
  unknownText: 'chưa được công bố',
  today: 'Hôm nay!',
  shareText: 'Đếm ngược {name}',
  shareCopied: 'Đã sao chép liên kết. Gửi cho bạn bè nhé!',
  shareCaptured: 'Chụp lúc {datetime}',
  shareEyebrow: 'KHOẢNH KHẮC ĐANG ĐẾN GẦN',
  shareReady: 'Ảnh đếm ngược đã sẵn sàng.',
  shareFailed: 'Không tạo được ảnh. Vui lòng thử lại.',
  shareDownloaded: 'Đã tải ảnh đếm ngược về máy.',
  shareUnavailable: 'Thiết bị chưa hỗ trợ chia sẻ ảnh trực tiếp nên ảnh đã được tải về.',
  shareFooter: 'Đếm ngược {name}',
  hubName: 'Đếm ngược ngày lễ',
  brand: 'Đếm ngược',
  more: 'Xem thêm',
  allCountdowns: 'Tất cả đếm ngược',
  navLabel: 'Đếm ngược',
  cities: {
    'Ho Chi Minh City': 'TP. Hồ Chí Minh',
    'Mumbai & New Delhi': 'Mumbai & New Delhi',
    'Berlin & Paris': 'Berlin & Paris',
    'New York & Toronto': 'New York & Toronto',
    'Los Angeles & Vancouver': 'Los Angeles & Vancouver',
  },
};

const HOLIDAY_CATEGORIES_VI = {
  'new-year': { title: 'Đón năm mới', intro: 'Khoảnh khắc nửa đêm 1/1 và những dịp năm mới truyền thống ở châu Á.' },
  religious: { title: 'Lễ tôn giáo', intro: 'Các dịp lễ lớn của Kitô giáo, Hồi giáo, Ấn Độ giáo và Do Thái giáo. Ngày theo lịch âm thay đổi mỗi năm.' },
  cultural: { title: 'Văn hóa & theo mùa', intro: 'Những ngày lễ phổ biến không gắn với một tôn giáo cụ thể.' },
};

module.exports = { HOLIDAYS_VI, UI_VI, HOLIDAY_CATEGORIES_VI };

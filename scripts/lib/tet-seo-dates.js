/**
 * Tết / giao thừa date helpers (Asia/Ho_Chi_Minh).
 * Shared by inject script and tests.
 */

const TET_2027 = new Date('2027-02-06T00:00:00+07:00');
const GIAO_THUA_2027 = new Date('2027-02-05T00:00:00+07:00');

const VN_WEEKDAYS = [
  'Chủ Nhật',
  'Thứ Hai',
  'Thứ Ba',
  'Thứ Tư',
  'Thứ Năm',
  'Thứ Sáu',
  'Thứ Bảy',
];

function getVietnamNow() {
  return new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })
  );
}

function daysUntil(targetDate, fromDate = getVietnamNow()) {
  const ms = targetDate.getTime() - fromDate.getTime();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

function formatDateVN(date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Ho_Chi_Minh',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).formatToParts(date);
  const day = parts.find((p) => p.type === 'day').value;
  const month = parts.find((p) => p.type === 'month').value;
  const year = parts.find((p) => p.type === 'year').value;
  return `${day}/${month}/${year}`;
}

function weekdayVN(date) {
  const dayIndex = new Date(
    date.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })
  ).getDay();
  return VN_WEEKDAYS[dayIndex];
}

function buildTetSeoPayload(now = getVietnamNow()) {
  const daysUntilTet = daysUntil(TET_2027, now);
  const daysUntilGiaoThua = daysUntil(GIAO_THUA_2027, now);
  const todayWeekday = weekdayVN(now);
  const todayDate = formatDateVN(now);
  const tetWeekday = weekdayVN(TET_2027);
  const tetDate = '06/02/2027';
  const giaoThuaDate = '05/02/2027';

  const snippetParagraph = `Hôm nay là ${todayWeekday}, ngày ${todayDate}. Còn ${daysUntilTet} ngày nữa đến Tết Nguyên Đán 2027. Tết 2027 rơi vào ${tetWeekday}, ngày ${tetDate} dương lịch.`;

  const landingDetailLine = `Hôm nay là ${todayWeekday}, ngày ${todayDate}. Tết Nguyên Đán 2027 rơi vào ${tetWeekday}, ngày ${tetDate} dương lịch.`;

  const answerLead = `Hôm nay còn ${daysUntilTet} ngày nữa đến Tết Nguyên Đán 2027.`;

  return {
    daysUntilTet,
    daysUntilGiaoThua,
    todayWeekday,
    todayDate,
    tetWeekday,
    tetDate,
    giaoThuaDate,
    snippetParagraph,
    landingDetailLine,
    answerLead,
    faq: {
      daysUntilTetAnswer: `Tính từ 00:00 hôm nay (giờ Việt Nam, ${todayDate}) đến 00:00 ngày 06/02/2027, hôm nay còn ${daysUntilTet} ngày nữa đến Tết Nguyên Đán 2027. Đồng hồ bên dưới cập nhật theo giờ, phút, giây.`,
      tetDateAnswer:
        'Tết Nguyên Đán 2027 là Thứ Bảy, ngày 6 tháng 2 năm 2027 dương lịch (mùng 1 tháng Giêng năm Đinh Mùi).',
      giaoThuaAnswer: `Giao thừa 2027 là đêm 30 Tết, ngày ${giaoThuaDate} dương lịch. Hôm nay còn ${daysUntilGiaoThua} ngày nữa đến giao thừa (tính cùng quy ước lịch trên Sắp Tết).`,
      zodiacAnswer: 'Tết 2027 là năm Đinh Mùi – năm con Dê theo 12 con giáp Việt Nam.',
      whyChangesAnswer:
        'Số ngày giảm 1 sau mỗi 00:00 giờ Việt Nam vì ngày hiện tại tiến gần hơn tới mùng 1 Tết (06/02/2027). Trang được cập nhật lại mỗi ngày để số ngày trong câu trả lời luôn khớp.',
    },
    metaDescriptionLanding: `Xem ngay còn bao nhiêu ngày nữa đến Tết Nguyên Đán 2027. Hôm nay còn ${daysUntilTet} ngày. Đồng hồ đếm ngược realtime, chính xác từng ngày, giờ, phút.`,
    metaDescriptionHome:
      'Đếm ngược Tết Nguyên Đán 2027 theo giờ Việt Nam. Xem còn bao nhiêu ngày nữa đến Tết, lịch Tết, lời chúc, ảnh Tết và tiện ích Tết.',
    titleLanding: 'Còn Bao Nhiêu Ngày Nữa Đến Tết 2027? | Đếm Ngược Realtime | Sắp Tết',
    titleHome: 'Sắp Tết 2027 – Đếm Ngược Tết Nguyên Đán',
  };
}

module.exports = {
  TET_2027,
  GIAO_THUA_2027,
  buildTetSeoPayload,
  daysUntil,
  getVietnamNow,
};

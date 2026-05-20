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

  const snippetParagraph = `Hôm nay là ${todayWeekday}, ngày ${todayDate}. Tết Nguyên Đán 2027 rơi vào ${tetWeekday}, ngày ${tetDate} dương lịch. Đồng hồ đếm ngược trên Sắp Tết cập nhật số ngày, giờ và phút còn lại theo giờ Việt Nam.`;

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
      daysUntilTetAnswer: `Đồng hồ ở đầu trang hiển thị số ngày, giờ và phút còn lại đến 00:00 ngày 06/02/2027 theo giờ Việt Nam. Số ngày được cập nhật realtime để bạn không phải tự tính lại.`,
      tetDateAnswer:
        'Tết Nguyên Đán 2027 là Thứ Bảy, ngày 6 tháng 2 năm 2027 dương lịch (mùng 1 tháng Giêng năm Đinh Mùi).',
      giaoThuaAnswer: `Giao thừa 2027 là đêm 30 Tết, ngày ${giaoThuaDate} dương lịch. Bạn có thể mở trang đếm ngược giao thừa để xem số ngày và giờ còn lại theo thời gian thực.`,
      zodiacAnswer: 'Tết 2027 là năm Đinh Mùi – năm con Dê theo 12 con giáp Việt Nam.',
      whyChangesAnswer:
        'Số ngày giảm dần khi thời gian tiến gần hơn tới mùng 1 Tết (06/02/2027). Đồng hồ trên trang tự cập nhật theo giờ Việt Nam để câu trả lời luôn khớp thời điểm bạn mở trang.',
    },
    metaDescriptionLanding:
      'Xem còn bao nhiêu ngày nữa đến Tết Nguyên Đán 2027 với đồng hồ đếm ngược realtime theo giờ Việt Nam, kèm ngày Tết, giao thừa và FAQ nhanh.',
    metaDescriptionHome:
      'Đếm ngược Tết Nguyên Đán 2027 theo giờ Việt Nam. Xem còn bao nhiêu ngày nữa đến Tết, lịch Tết, lời chúc, ảnh Tết và tiện ích Tết.',
    titleLanding: 'Còn Bao Nhiêu Ngày Nữa Đến Tết 2027? | Sắp Tết',
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

(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.HomeDailyQuote = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const quotes = [
    '“Tết không chỉ là một ngày, mà là cả một cảm giác...”',
    '“Chúc năm mới bình an, niềm vui luôn ghé cửa.”',
    '“Xuân sang vạn sự như ý, gia đình luôn sum vầy.”',
    '“Tết này chúc bạn đủ đầy yêu thương và may mắn.”',
    '“Chúc một mùa xuân ấm áp, mọi điều tốt lành đến bên bạn.”',
    '“Hoa đào nở trước hiên nhà, niềm vui nở trong lòng ta.”',
    '“Năm mới đến, chúc những ước mong đẹp sớm thành hiện thực.”',
  ];

  function idForDateKey(dateKey) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return 0;
    const [year, month, day] = dateKey.split('-').map(Number);
    const dayNumber = Math.floor(Date.UTC(year, month - 1, day) / 86400000);
    return dayNumber % quotes.length;
  }

  function forId(id) {
    return Number.isInteger(id) && id >= 0 && id < quotes.length ? quotes[id] : null;
  }

  function forDateKey(dateKey) {
    return forId(idForDateKey(dateKey));
  }

  return { forDateKey, forId, idForDateKey };
});

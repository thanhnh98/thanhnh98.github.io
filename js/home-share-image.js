(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.HomeShareImage = factory();
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';
  var TET = '2027-02-06';
  function getData(now) {
    var parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
    var values = {};
    parts.forEach(function (part) { values[part.type] = part.value; });
    var key = values.year + '-' + values.month + '-' + values.day;
    return {
      days: Math.max(0, Math.round((Date.parse(TET + 'T00:00:00Z') - Date.parse(key + 'T00:00:00Z')) / 86400000)),
      today: values.day + '/' + values.month + '/' + values.year,
      year: '2027', tetDate: '06/02/2027', watermark: 'saptet.vn'
    };
  }
  function draw(canvas, data) {
    canvas.width = 1080;
    canvas.height = 1350;
    var ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas unavailable');
    var red = '#a7283b';
    function text(value, x, y, size, weight, color) {
      ctx.font = (weight || 700) + ' ' + size + 'px Nunito, Arial, sans-serif';
      ctx.fillStyle = color || red;
      ctx.textAlign = 'center';
      ctx.fillText(value, x, y);
    }
    function rounded(x, y, width, height, radius, color) {
      ctx.beginPath(); ctx.roundRect(x, y, width, height, radius); ctx.fillStyle = color; ctx.fill();
    }
    function blossom(x, y, size, rotation) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rotation);
      for (var i = 0; i < 5; i++) {
        ctx.rotate(Math.PI * 2 / 5);
        ctx.beginPath(); ctx.ellipse(0, -size * .55, size * .36, size * .55, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#f7cd55'; ctx.fill();
      }
      ctx.beginPath(); ctx.arc(0, 0, size * .17, 0, Math.PI * 2); ctx.fillStyle = '#d88a32'; ctx.fill();
      ctx.restore();
    }
    function lantern(x, y, scale) {
      ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale);
      ctx.strokeStyle = '#efd28a'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(0, -170); ctx.lineTo(0, -78); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(0, 0, 72, 87, 0, 0, Math.PI * 2); ctx.fillStyle = '#dc3940'; ctx.fill();
      ctx.stroke();
      [-35, 0, 35].forEach(function (offset) {
        ctx.beginPath(); ctx.moveTo(offset * .5, -79); ctx.bezierCurveTo(offset * 1.8, -36, offset * 1.8, 36, offset * .5, 79); ctx.stroke();
      });
      rounded(-35, -89, 70, 13, 5, '#efd28a');
      rounded(-35, 77, 70, 13, 5, '#efd28a');
      ctx.beginPath(); ctx.moveTo(0, 90); ctx.lineTo(0, 112); ctx.stroke();
      rounded(-11, 109, 22, 42, 5, '#efd28a');
      ctx.restore();
    }
    function tetGifts(x, y) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(-.12);
      rounded(-65, -65, 130, 130, 15, '#4d7955');
      rounded(-53, -53, 106, 106, 10, '#659467');
      ctx.strokeStyle = '#f4e3b5'; ctx.lineWidth = 8;
      ctx.beginPath(); ctx.moveTo(-22, -65); ctx.lineTo(-22, 65); ctx.moveTo(22, -65); ctx.lineTo(22, 65); ctx.moveTo(-65, -22); ctx.lineTo(65, -22); ctx.moveTo(-65, 22); ctx.lineTo(65, 22); ctx.stroke();
      ctx.restore();
      ctx.save(); ctx.translate(1080 - x, y); ctx.rotate(.12);
      rounded(-48, -77, 96, 154, 10, '#e33d40');
      ctx.strokeStyle = '#f5d582'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(-43, -54); ctx.lineTo(0, -29); ctx.lineTo(43, -54); ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 16, 25, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#f5d582'; ctx.textAlign = 'center'; ctx.font = '800 22px Nunito, Arial, sans-serif'; ctx.fillText('TẾT', 0, 24);
      ctx.restore();
    }
    var bg = ctx.createLinearGradient(0, 0, 1080, 1350);
    bg.addColorStop(0, '#a82033'); bg.addColorStop(1, '#6e1529');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 1080, 1350);
    ctx.strokeStyle = '#d8b46a'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(30, 30, 1020, 1290, 42); ctx.stroke();
    // Hand-drawn blossom branches stay crisp at every export size.
    ctx.strokeStyle = '#d9b885'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(-20, 385); ctx.bezierCurveTo(70, 280, 50, 145, 210, 65); ctx.stroke();
    [[65,290,35,.2],[92,188,46,.5],[170,95,30,.1],[205,195,25,.2]].forEach(function (flower) { blossom.apply(null, flower); });
    lantern(920, 148, .75);
    lantern(1010, 85, .42);
    text('SẮP TẾT', 540, 152, 43, 800, '#ffe3a0');
    text('Giữ một chút háo hức mỗi ngày', 540, 203, 26, 600, '#f5d8b0');
    ctx.save(); ctx.shadowColor = '#8b583318'; ctx.shadowBlur = 42; ctx.shadowOffsetY = 16;
    rounded(105, 275, 870, 830, 56, '#fffcf5'); ctx.restore();
    text('CHỈ CÒN', 540, 389, 34, 800, '#94744f');
    text(String(data.days), 540, 663, data.days > 999 ? 216 : 270, 900);
    text(data.days === 0 ? 'Tết đã đến!' : 'ngày nữa đến Tết', 540, 752, 51, 800);
    ctx.strokeStyle = '#e9d8bd'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(350, 802); ctx.lineTo(730, 802); ctx.stroke();
    rounded(212, 850, 656, 113, 28, '#f9eddc');
    text('TẾT NGUYÊN ĐÁN ' + data.year, 540, 892, 25, 800, '#846b57');
    text(data.tetDate, 540, 937, 35, 800);
    text('Tết đang đến gần!', 540, 1033, 35, 700);
    tetGifts(185, 1215);
    text('Hôm nay · ' + data.today, 540, 1176, 26, 600, '#f5d8b0');
    // Watermark is baked into PNG pixels, not just the preview UI.
    text(data.watermark, 540, 1254, 28, 700, '#ebc990');
    return canvas;
  }
  return { getData: getData, draw: draw };
});

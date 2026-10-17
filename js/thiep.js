// Thiệp chúc Tết: saptet.vn/thiep/<slug> is a wish card sent from the apps.
// With the app installed the OS opens it there (Universal Links / App Links);
// otherwise GitHub Pages serves 404.html, which loads this file and shows the
// card: a sealed red envelope that opens on tap, then the card itself.
(function (root) {
  'use strict';

  var API_BASE = 'https://api.saptet.vn/saptet/v1';
  var PLAY_URL = 'https://play.google.com/store/apps/details?id=com.thanh_nguyen.tet_count_down';
  var STORE_URL = 'https://apps.apple.com/app/id6743064990';
  var SLUG = /^\/thiep\/([A-Za-z2-9]{10})\/?$/;

  // The backgrounds of api-v2's card-themes, served from this site
  // (assets/images/thiep/<id>.webp). Keep in step with that list: a card on a
  // background missing here shows on the first one.
  var BACKGROUNDS = [
    { id: 'mai_vang', textColor: '#7A1414', nameColor: '#B8860B', textBox: { x: 0.12, y: 0.22, w: 0.76, h: 0.5 } },
    { id: 'dao_hong', textColor: '#7A1414', nameColor: '#B8860B', textBox: { x: 0.12, y: 0.28, w: 0.76, h: 0.52 } },
    { id: 'den_long', textColor: '#FFF4D6', nameColor: '#FFD54F', textBox: { x: 0.12, y: 0.3, w: 0.76, h: 0.52 } },
    { id: 'banh_chung', textColor: '#1E4D2B', nameColor: '#B8860B', textBox: { x: 0.12, y: 0.1, w: 0.76, h: 0.5 } },
    { id: 'cau_doi', textColor: '#7A1414', nameColor: '#B8860B', textBox: { x: 0.22, y: 0.16, w: 0.56, h: 0.58 } },
    { id: 'de_con', textColor: '#7A1414', nameColor: '#B8860B', textBox: { x: 0.14, y: 0.18, w: 0.72, h: 0.44 } },
    { id: 'phao_hoa', textColor: '#FFF4D6', nameColor: '#FFD54F', textBox: { x: 0.12, y: 0.3, w: 0.76, h: 0.5 } },
    { id: 'li_xi', textColor: '#FFF4D6', nameColor: '#FFD54F', textBox: { x: 0.2, y: 0.22, w: 0.6, h: 0.56 } },
    { id: 'ngu_qua', textColor: '#7A1414', nameColor: '#B8860B', textBox: { x: 0.12, y: 0.2, w: 0.76, h: 0.4 } },
    { id: 'cho_hoa', textColor: '#0D2B4D', nameColor: '#B8860B', textBox: { x: 0.12, y: 0.18, w: 0.76, h: 0.46 } }
  ];
  var FONTS = { calligraphy: 'ThiepThuPhap', classic: 'ThiepSelender', modern: 'ThiepBep' };

  function slugFromPath(pathname) {
    var match = SLUG.exec(pathname || '');
    return match ? match[1].toUpperCase() : null;
  }

  // The background and font a card names, falling back to the defaults the
  // apps use when an id is unknown (a newer app may know more themes).
  function resolveTheme(backgroundId, fontId) {
    var background = BACKGROUNDS[0];
    for (var i = 0; i < BACKGROUNDS.length; i++) if (BACKGROUNDS[i].id === backgroundId) background = BACKGROUNDS[i];
    var font = FONTS[fontId] ? fontId : 'calligraphy';
    return { background: background, url: '/assets/images/thiep/' + background.id + '.webp', fontId: font, fontFamily: FONTS[font] };
  }

  // The largest font size (px) at which the text fits, by bisection over a
  // measuring function that says whether a size fits.
  function fitFontSize(fits, min, max) {
    var lo = min, hi = max, best = min;
    while (hi - lo > 0.5) {
      var mid = (lo + hi) / 2;
      if (fits(mid)) { best = mid; lo = mid; } else { hi = mid; }
    }
    return Math.floor(best);
  }

  function appLinks(slug, ua) {
    var isAndroid = /Android/i.test(ua || '');
    var scheme = 'saptet://saptet.vn/?page=wish_card&slug=' + slug;
    if (!isAndroid) return scheme;
    return 'intent://saptet.vn/?page=wish_card&slug=' + slug +
      '#Intent;scheme=saptet;package=com.thanh_nguyen.tet_count_down;S.browser_fallback_url=' +
      encodeURIComponent(PLAY_URL) + ';end';
  }

  var api = { BACKGROUNDS: BACKGROUNDS, slugFromPath: slugFromPath, resolveTheme: resolveTheme, fitFontSize: fitFontSize, appLinks: appLinks };
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; return; }

  // ---------------------------------------------------------------- page

  var slug = root.THIEP_SLUG;
  if (!slug) return;
  var doc = root.document;
  var $ = function (id) { return doc.getElementById(id); };
  var params = new URLSearchParams(root.location.search);
  // ?api= lets a local server be tried.
  var apiBase = params.get('api') || API_BASE;

  function fetchJson(url) {
    return fetch(url, { credentials: 'omit' }).then(function (r) {
      if (!r.ok) { var e = new Error('HTTP ' + r.status); e.status = r.status; throw e; }
      return r.json();
    });
  }

  // Message and sender together must fit the background's empty area.
  function layoutText(card, box) {
    var message = $('thiep-message');
    var sender = $('thiep-sender');
    var size = fitFontSize(function (px) {
      message.style.fontSize = px + 'px';
      sender.style.fontSize = Math.max(12, px * 0.55) + 'px';
      return box.scrollHeight <= box.clientHeight + 1 && box.scrollWidth <= box.clientWidth + 1;
    }, 12, Math.max(14, card.clientWidth * 0.11));
    message.style.fontSize = size + 'px';
    sender.style.fontSize = Math.max(12, size * 0.55) + 'px';
  }

  function render(card, theme) {
    var bg = theme.background;
    var el = $('thiep-card');
    var box = $('thiep-textbox');
    el.style.backgroundImage = 'url("' + theme.url + '")';
    box.style.left = (bg.textBox.x * 100) + '%';
    box.style.top = (bg.textBox.y * 100) + '%';
    box.style.width = (bg.textBox.w * 100) + '%';
    box.style.height = (bg.textBox.h * 100) + '%';
    box.style.fontFamily = theme.fontFamily + ', "Be Vietnam Pro", sans-serif';
    $('thiep-message').textContent = card.message;
    $('thiep-message').style.color = bg.textColor;
    $('thiep-sender').textContent = '— ' + card.senderName;
    $('thiep-sender').style.color = bg.nameColor;
    var relayout = function () { layoutText(el, box); };
    if (doc.fonts && doc.fonts.load) {
      doc.fonts.load('40px ' + theme.fontFamily).then(relayout, relayout);
    }
    root.addEventListener('resize', relayout);
    return relayout;
  }

  function confetti() {
    var layer = $('thiep-confetti');
    var colors = ['#FFD54F', '#FFB300', '#F48FB1', '#FFF59D', '#E53935'];
    for (var i = 0; i < 70; i++) {
      var p = doc.createElement('i');
      p.className = i % 3 === 0 ? 'petal' : 'spark';
      p.style.left = Math.random() * 100 + '%';
      p.style.background = colors[i % colors.length];
      p.style.animationDelay = (Math.random() * 0.8) + 's';
      p.style.animationDuration = (2.6 + Math.random() * 2.2) + 's';
      p.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');
      layer.appendChild(p);
    }
    setTimeout(function () { layer.innerHTML = ''; }, 6000);
  }

  function showError(status) {
    $('thiep-stage').hidden = true;
    $('thiep-error').hidden = false;
    doc.querySelector('.thiep-title').textContent = 'Chưa mở được thiệp';
    $('thiep-error-text').textContent = status === 404
      ? 'Tấm thiệp này không còn nữa hoặc đường link chưa đúng.'
      : 'Chưa mở được thiệp. Kiểm tra kết nối rồi tải lại trang nhé.';
  }

  var ua = root.navigator.userAgent || '';
  var isAndroid = /Android/i.test(ua);
  var isIOS = /iPhone|iPad|iPod/i.test(ua) || (root.navigator.platform === 'MacIntel' && root.navigator.maxTouchPoints > 1);
  $('thiep-open-app').href = appLinks(slug, ua);
  if (isAndroid) $('thiep-ios').hidden = true;
  if (isIOS) $('thiep-android').hidden = true;
  $('thiep-android').href = PLAY_URL;
  $('thiep-ios').href = STORE_URL;

  fetchJson(apiBase + '/public/cards/' + slug).then(function (response) {
    var card = response.data;
    var theme = resolveTheme(card.backgroundId, card.fontId);
    $('thiep-from').textContent = card.senderName;
    doc.title = card.senderName + ' gửi bạn thiệp chúc Tết 🧧 | Sắp Tết';
    var relayout = render(card, theme);
    $('thiep-stage').classList.add('is-ready');
    var opened = false;
    var open = function () {
      if (opened) return;
      opened = true;
      $('thiep-stage').classList.add('is-open');
      if (root.navigator.vibrate) root.navigator.vibrate(30);
      confetti();
      setTimeout(relayout, 50);
      setTimeout(function () { $('thiep-after').hidden = false; }, 900);
    };
    $('thiep-envelope').addEventListener('click', open);
    $('thiep-envelope').addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  }).catch(function (e) { showError(e && e.status); });
})(typeof window !== 'undefined' ? window : this);

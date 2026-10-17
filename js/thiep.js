// Thiệp: saptet.vn/thiep/<slug> is a greeting card sent from the apps. The
// card itself is only shown in the app. With the app installed the OS opens
// the link there (Universal Links / App Links); otherwise GitHub Pages serves
// 404.html, which loads this file: it hands the card to the app through the
// saptet:// scheme and offers the store when the app is not installed.
(function (root) {
  'use strict';

  var PLAY_URL = 'https://play.google.com/store/apps/details?id=com.thanh_nguyen.tet_count_down';
  var STORE_URL = 'https://apps.apple.com/app/id6743064990';
  var SLUG = /^\/thiep\/([A-Za-z2-9]{10})\/?$/;

  function slugFromPath(pathname) {
    var match = SLUG.exec(pathname || '');
    return match ? match[1].toUpperCase() : null;
  }

  // The link that opens the card in the app; on Android an intent that falls
  // back to Google Play when the app is missing.
  function appLink(slug, ua) {
    var scheme = 'saptet://saptet.vn/?page=wish_card&slug=' + slug;
    if (!/Android/i.test(ua || '')) return scheme;
    return 'intent://saptet.vn/?page=wish_card&slug=' + slug +
      '#Intent;scheme=saptet;package=com.thanh_nguyen.tet_count_down;S.browser_fallback_url=' +
      encodeURIComponent(PLAY_URL) + ';end';
  }

  var api = { slugFromPath: slugFromPath, appLink: appLink, PLAY_URL: PLAY_URL, STORE_URL: STORE_URL };
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; return; }

  var slug = root.THIEP_SLUG;
  if (!slug) return;
  var doc = root.document;
  var $ = function (id) { return doc.getElementById(id); };
  var ua = root.navigator.userAgent || '';
  var isAndroid = /Android/i.test(ua);
  var isIOS = /iPhone|iPad|iPod/i.test(ua) || (root.navigator.platform === 'MacIntel' && root.navigator.maxTouchPoints > 1);
  var link = appLink(slug, ua);

  $('thiep-open-app').href = link;
  $('thiep-envelope').href = link;
  $('thiep-android').href = PLAY_URL;
  $('thiep-ios').href = STORE_URL;
  if (isAndroid) $('thiep-ios').hidden = true;
  if (isIOS) $('thiep-android').hidden = true;

  // On a phone, try the app straight away once. If it is not installed the
  // page simply stays, with the download buttons.
  if (isAndroid || isIOS) root.location.href = link;
})(typeof window !== 'undefined' ? window : this);

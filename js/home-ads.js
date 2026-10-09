(function () {
    'use strict';

    const controls = document.getElementById('home-inline-controls');
    const shareContainer = document.querySelector('.home-share-strip .container');
    if (controls && shareContainer) shareContainer.appendChild(controls);

    const ad = document.querySelector('#home-countdown-ad .adsbygoogle');
    if (!ad || document.body.dataset.homeManualAds !== 'on') return;
    // Manual units are opt-in. Auto ads is managed separately by AdSense.
    // Local previews never request live ads.
    if (!['saptet.vn', 'www.saptet.vn'].includes(location.hostname)) return;
    if (ad.dataset.homeAdRequested || ad.getAttribute('data-adsbygoogle-status')) return;

    ad.dataset.homeAdRequested = 'true';
    (window.adsbygoogle = window.adsbygoogle || []).push({});
})();

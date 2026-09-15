(function () {
  'use strict';

  document.querySelectorAll('[data-game-card]').forEach(function (card) {
    card.addEventListener('click', function () {
      window.webAnalytics?.trackEvent('game_hub_open', {
        game_name: card.getAttribute('data-game-card'),
        destination: card.getAttribute('href') || ''
      });
    });
  });
})();

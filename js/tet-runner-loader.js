(function () {
  'use strict';

  const section = document.getElementById('tet-mascot-runner');
  if (!section) return;

  let loading = false;
  let loaded = false;

  function track(action, params) {
    const analytics = window.webAnalytics;
    if (!analytics) return;
    const eventParams = {
      game_name: 'tet_mascot_runner',
      action,
      ...(params || {}),
    };
    if (typeof analytics.trackEvent === 'function') {
      analytics.trackEvent(`web_game_tet_runner_${action}`, eventParams);
    } else if (typeof analytics.trackGameAction === 'function') {
      analytics.trackGameAction('tet_mascot_runner', action, params || {});
    }
  }

  function showFallback(reason) {
    section.querySelector('#tet-runner-ready')?.setAttribute('hidden', '');
    section.querySelector('#tet-runner-fallback')?.removeAttribute('hidden');
    track(reason === 'webgl' ? 'webgl_fallback' : 'load_error', { reason });
  }

  function loadGame() {
    if (loading || loaded) return;
    loading = true;
    if (!window.TetRunnerEngine) {
      showFallback('engine_unavailable');
      return;
    }
    import('./tet-runner-three.bundle.js?v=20260914n')
      .then((module) => module.initTetRunner({ section, engine: window.TetRunnerEngine, track, showFallback }))
      .then(() => { loaded = true; })
      .catch((error) => {
        console.warn('Tet runner could not start:', error);
        showFallback('three_load_failed');
      });
  }

  if ('IntersectionObserver' in window) {
    const loadObserver = new IntersectionObserver((entries, observer) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      loadGame();
    }, { rootMargin: '400px 0px' });
    loadObserver.observe(section);
  } else {
    loadGame();
  }
})();

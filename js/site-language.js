/* Optional English reading mode for the Vietnamese site. The reviewed Tet answer
   has its own indexable English page; this mode stays on the original canonical URL. */
(function () {
  var requested = new URLSearchParams(window.location.search).get('lang');
  if (requested !== 'en') return;

  var englishPaths = new Set([
    '/when-is-tet-in-vietnam/', '/countdowns', '/halloween', '/christmas',
    '/new-year', '/chinese-new-year', '/ramadan', '/eid-al-fitr', '/easter',
    '/songkran', '/diwali', '/thanksgiving', '/hanukkah', '/valentines-day',
    '/privacy-policy/en/', '/terms-of-use/en/'
  ]);
  var exactPaths = {
    '/tet-2027-la-ngay-nao/': '/when-is-tet-in-vietnam/',
    '/sap-halloween/': '/halloween',
    '/noel.html': '/christmas',
    '/privacy-policy/vi/': '/privacy-policy/en/',
    '/terms-of-use/vi/': '/terms-of-use/en/'
  };
  if (exactPaths[window.location.pathname]) {
    window.location.replace(exactPaths[window.location.pathname] + window.location.hash);
    return;
  }
  var translatedNodes = new WeakMap();
  var translatedAttributes = new WeakMap();
  var dictionary;
  var stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = '/css/site-language.css';
  document.head.appendChild(stylesheet);

  function normalized(value) { return value.trim().replace(/\s+/g, ' '); }

  function translate(value) {
    var raw = normalized(value);
    if (!raw) return null;
    var numbers = [];
    var key = raw.replace(/\d+(?:[./:-]\d+)*/g, function (match) {
      var token = 'ZZNUM' + numbers.length + 'ZZ';
      numbers.push(match);
      return token;
    });
    var result = dictionary[key];
    if (!result) return null;
    return result.replace(/ZZNUM(\d+)ZZ/g, function (_, index) { return numbers[Number(index)] || _; });
  }

  function translateText(node) {
    if (!node || !node.parentElement || node.parentElement.closest('script, style, noscript, svg, template, code, pre, textarea, [data-site-lang-toggle]')) return;
    if (translatedNodes.get(node) === node.nodeValue) return;
    var match = node.nodeValue.match(/^(\s*)([\s\S]*?)(\s*)$/);
    if (!match || !match[2]) return;
    var result = translate(match[2]);
    if (result && result !== normalized(match[2])) {
      node.nodeValue = match[1] + result + match[3];
      translatedNodes.set(node, node.nodeValue);
    }
  }

  function rewriteHref(anchor) {
    if (anchor.hasAttribute('data-site-lang-toggle')) {
      var original = new URL(window.location.href);
      original.searchParams.delete('lang');
      var returnHref = original.pathname + original.search + original.hash;
      if (anchor.getAttribute('href') !== returnHref) anchor.setAttribute('href', returnHref);
      var label = anchor.querySelector('span') || anchor;
      if (label.textContent !== 'Tiếng Việt') label.textContent = 'Tiếng Việt';
      if (anchor.getAttribute('hreflang') !== 'vi') anchor.setAttribute('hreflang', 'vi');
      if (anchor.getAttribute('lang') !== 'vi') anchor.setAttribute('lang', 'vi');
      return;
    }
    var href = anchor.getAttribute('href');
    if (!href || href[0] === '#' || /^(mailto:|tel:|javascript:)/i.test(href)) return;
    var target;
    try { target = new URL(href, window.location.href); } catch (_) { return; }
    if (target.origin !== window.location.origin) return;
    var path = exactPaths[target.pathname] || target.pathname;
    target.pathname = path;
    if (englishPaths.has(path)) target.searchParams.delete('lang');
    else if (target.searchParams.get('lang') !== 'ar') target.searchParams.set('lang', 'en');
    var updated = target.pathname + target.search + target.hash;
    if (href !== updated) anchor.setAttribute('href', updated);
  }

  function translateElement(element) {
    if (element.closest('script, style, noscript, svg, template, code, pre, textarea')) return;
    if (element.hasAttribute('data-en') && element.textContent !== element.getAttribute('data-en')) {
      element.textContent = element.getAttribute('data-en');
    }
    ['alt', 'title', 'placeholder', 'aria-label'].forEach(function (name) {
      var value = element.getAttribute(name);
      if (!value) return;
      var previous = translatedAttributes.get(element);
      if (previous && previous[name] === value) return;
      var result = translate(value);
      if (result && result !== value) {
        element.setAttribute(name, result);
        if (!previous) { previous = {}; translatedAttributes.set(element, previous); }
        previous[name] = result;
      }
    });
    if (element.tagName === 'A') rewriteHref(element);
  }

  function translateTree(root) {
    if (!root || !root.isConnected) return;
    if (root.nodeType === Node.TEXT_NODE) { translateText(root); return; }
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    translateElement(root);
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      var node = walker.currentNode;
      if (node.nodeType === Node.TEXT_NODE) translateText(node);
      else translateElement(node);
    }
  }

  function start() {
    document.documentElement.lang = 'en';
    var translatedTitle = translate(document.title);
    if (translatedTitle) document.title = translatedTitle;
    var main = document.querySelector('main');
    if (main) {
      var note = document.createElement('div');
      note.className = 'site-language-note';
      note.setAttribute('role', 'note');
      note.appendChild(document.createTextNode('Automatic English translation. For verified Tet dates and holiday details, see '));
      var guide = document.createElement('a');
      guide.href = '/when-is-tet-in-vietnam/';
      guide.textContent = 'When is Tet in Vietnam?';
      note.appendChild(guide);
      main.insertBefore(note, main.firstChild);
    }
    translateTree(document.body);
    var pending = new Set();
    var queued = false;
    function flush() {
      queued = false;
      pending.forEach(translateTree);
      pending.clear();
    }
    new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === 'characterData') pending.add(mutation.target);
        else if (mutation.type === 'attributes') pending.add(mutation.target);
        else mutation.addedNodes.forEach(function (node) { pending.add(node); });
      });
      if (!queued && pending.size) { queued = true; queueMicrotask(flush); }
    }).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['href', 'alt', 'title', 'placeholder', 'aria-label'] });
  }

  fetch('/data/site-vi-en.json').then(function (response) {
    if (!response.ok) throw new Error('English translations unavailable');
    return response.json();
  }).then(function (data) { dictionary = data; start(); }).catch(function (error) { console.warn(error); });
})();

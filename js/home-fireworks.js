(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) {
    root.HomeFireworks = api;
    var start = function () { api.init(root, root.document); };
    if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', start, { once: true });
    else start();
  }
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

  var PALETTES = [
    ['#ff3b30', '#ffd60a'],
    ['#a40e2c', '#ff7a00'],
    ['#ff2d78', '#8b2cf5'],
    ['#159947', '#ffd60a'],
    ['#1769e0', '#00a6fb'],
    ['#ff6a00', '#e02626']
  ];
  var TET_TIME = new Date('2027-02-06T00:00:00+07:00');
  var DAY_MS = 24 * 60 * 60 * 1000;
  var COMBO_TARGET = 20;
  var COMBO_RESET_MS = 1800;

  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }

  function between(minimum, maximum, random) {
    return minimum + (maximum - minimum) * random();
  }

  function createLaunchPlan(width, height, random) {
    var randomValue = typeof random === 'function' ? random : Math.random;
    var safeWidth = Math.max(320, Number(width) || 320);
    var safeHeight = Math.max(480, Number(height) || 480);
    var count = 2 + Math.floor(randomValue() * 3);
    var plan = [];
    for (var index = 0; index < count; index += 1) {
      var targetX = between(safeWidth * 0.1, safeWidth * 0.9, randomValue);
      var palette = PALETTES[Math.floor(randomValue() * PALETTES.length) % PALETTES.length];
      plan.push({
        startX: clamp(targetX + between(-safeWidth * 0.12, safeWidth * 0.12, randomValue), 24, safeWidth - 24),
        targetX: targetX,
        targetY: between(safeHeight * 0.14, safeHeight * 0.55, randomValue),
        delay: index * 135 + Math.round(between(0, 55, randomValue)),
        duration: between(680, 880, randomValue),
        curve: between(-32, 32, randomValue),
        color: palette[0],
        accent: palette[1]
      });
    }
    return plan;
  }

  function isSignatureLaunch(clickCount) {
    return Number(clickCount) >= COMBO_TARGET;
  }

  function getDaysUntilTet(now) {
    var date = now instanceof Date ? now : new Date();
    return Math.max(0, Math.floor((TET_TIME.getTime() - date.getTime()) / DAY_MS));
  }

  function createSignatureMessage(random, now) {
    var randomValue = typeof random === 'function' ? random : Math.random;
    var messages = [
      'Sắp Tết',
      'Tết còn ' + getDaysUntilTet(now) + ' ngày',
      'Chúc Mừng Năm Mới'
    ];
    return messages[Math.floor(randomValue() * messages.length) % messages.length];
  }

  function createSignatureRocket(width, height, random) {
    var randomValue = typeof random === 'function' ? random : Math.random;
    var safeWidth = Math.max(320, Number(width) || 320);
    var safeHeight = Math.max(480, Number(height) || 480);
    return {
      startX: between(safeWidth * .38, safeWidth * .62, randomValue),
      targetX: between(safeWidth * .28, safeWidth * .72, randomValue),
      targetY: between(safeHeight * .18, safeHeight * .52, randomValue),
      delay: 240,
      duration: between(820, 980, randomValue),
      curve: between(-18, 18, randomValue),
      color: '#d71932',
      accent: '#ffd60a',
      signature: true
    };
  }

  function createController(win, doc, trigger) {
    var canvas = null;
    var context = null;
    var width = 0;
    var height = 0;
    var rockets = [];
    var particles = [];
    var flashes = [];
    var wordBursts = [];
    var pendingLaunches = 0;
    var animationFrame = 0;
    var cleanupTimer = 0;
    var clickCount = 0;
    var comboResetTimer = 0;

    function resizeCanvas() {
      if (!canvas) return;
      width = win.innerWidth;
      height = win.innerHeight;
      var ratio = Math.min(win.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function ensureCanvas() {
      win.clearTimeout(cleanupTimer);
      cleanupTimer = 0;
      if (canvas) {
        resizeCanvas();
        return;
      }
      canvas = doc.createElement('canvas');
      canvas.className = 'home-fireworks-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      doc.body.appendChild(canvas);
      context = canvas.getContext('2d');
      resizeCanvas();
    }

    function removeCanvasWhenIdle() {
      win.clearTimeout(cleanupTimer);
      cleanupTimer = win.setTimeout(function () {
        if (rockets.length || particles.length || flashes.length || wordBursts.length || pendingLaunches) return;
        if (canvas) canvas.remove();
        canvas = null;
        context = null;
      }, 350);
    }

    function explode(rocket, now) {
      var particleCount = (rocket.signature ? 92 : 68) + Math.floor(Math.random() * 24);
      flashes.push({ x: rocket.targetX, y: rocket.targetY, born: now, life: 430, color: rocket.accent });
      if (rocket.signature) {
        wordBursts.push({ x: rocket.targetX, y: rocket.targetY, born: now, life: 2300, text: rocket.message || 'Sắp Tết' });
      }
      for (var index = 0; index < particleCount; index += 1) {
        var angle = (index / particleCount) * Math.PI * 2 + between(-0.055, 0.055, Math.random);
        var speed = between(75, 205, Math.random);
        particles.push({
          x: rocket.targetX,
          y: rocket.targetY,
          born: now,
          life: between(1050, 1750, Math.random),
          velocityX: Math.cos(angle) * speed,
          velocityY: Math.sin(angle) * speed,
          radius: between(.75, 3.8, Math.random),
          color: index % 5 === 0 ? rocket.accent : rocket.color
        });
      }
      if (particles.length > 1800) particles.splice(0, particles.length - 1800);
    }

    function drawRocket(rocket, now) {
      var progress = clamp((now - rocket.born) / rocket.duration, 0, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var previousProgress = clamp(progress - 0.08, 0, 1);
      var previousEased = 1 - Math.pow(1 - previousProgress, 3);
      var curve = Math.sin(progress * Math.PI) * rocket.curve;
      var previousCurve = Math.sin(previousProgress * Math.PI) * rocket.curve;
      var x = rocket.startX + (rocket.targetX - rocket.startX) * eased + curve;
      var y = height + 18 + (rocket.targetY - height - 18) * eased;
      var previousX = rocket.startX + (rocket.targetX - rocket.startX) * previousEased + previousCurve;
      var previousY = height + 18 + (rocket.targetY - height - 18) * previousEased;
      var gradient = context.createLinearGradient(previousX, previousY, x, y);
      gradient.addColorStop(0, 'rgba(255,255,255,0)');
      gradient.addColorStop(1, rocket.accent);
      context.beginPath();
      context.moveTo(previousX, previousY);
      context.lineTo(x, y);
      context.lineWidth = 2.2;
      context.strokeStyle = gradient;
      context.stroke();
      context.beginPath();
      context.arc(x, y, 3.2, 0, Math.PI * 2);
      context.fillStyle = rocket.accent;
      context.shadowColor = rocket.color;
      context.shadowBlur = 13;
      context.fill();
      context.shadowBlur = 0;
      return progress >= 1;
    }

    function drawParticle(particle, now) {
      var age = now - particle.born;
      var progress = age / particle.life;
      if (progress >= 1) return false;
      var seconds = age / 1000;
      var drag = 1 - progress * 0.32;
      var x = particle.x + particle.velocityX * seconds * drag;
      var y = particle.y + particle.velocityY * seconds + 72 * seconds * seconds;
      var alpha = Math.pow(1 - progress, 1.35);
      context.globalAlpha = alpha;
      context.beginPath();
      context.moveTo(x - particle.velocityX * .045 * (1 - progress), y - (particle.velocityY + 144 * seconds) * .045 * (1 - progress));
      context.lineTo(x, y);
      context.strokeStyle = particle.color;
      context.lineWidth = Math.max(.55, particle.radius * .58);
      context.lineCap = 'round';
      context.stroke();
      context.beginPath();
      context.arc(x, y, Math.max(.45, particle.radius * (1 - progress * .55)), 0, Math.PI * 2);
      context.fillStyle = particle.color;
      context.shadowColor = particle.color;
      context.shadowBlur = 7;
      context.fill();
      context.shadowBlur = 0;
      context.globalAlpha = 1;
      return true;
    }

    function drawWordBurst(wordBurst, now) {
      var age = now - wordBurst.born;
      var progress = age / wordBurst.life;
      if (progress >= 1) return false;
      var reveal = clamp(age / 360, 0, 1);
      var fade = progress > .68 ? clamp((1 - progress) / .32, 0, 1) : 1;
      var scale = .72 + (1 - Math.pow(1 - reveal, 3)) * .28;
      var fontSize = clamp(width * .085, 38, 84);
      context.save();
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.lineJoin = 'round';
      context.font = '700 ' + fontSize + 'px "Dancing Script", "Be Vietnam Pro", sans-serif';
      var measuredWidth = context.measureText(wordBurst.text).width;
      var fitScale = Math.min(1, (width * .84) / Math.max(1, measuredWidth));
      var renderedHalfWidth = measuredWidth * fitScale * scale / 2;
      var safeX = clamp(wordBurst.x, renderedHalfWidth + 18, width - renderedHalfWidth - 18);
      var safeY = clamp(wordBurst.y, fontSize * .75, height - fontSize);
      context.translate(safeX, safeY);
      context.scale(scale * fitScale, scale * fitScale);
      context.globalAlpha = fade;
      context.lineWidth = Math.max(4, fontSize * .075);
      context.strokeStyle = '#8a1025';
      context.shadowColor = 'rgba(127, 14, 32, .72)';
      context.shadowBlur = 18;
      context.strokeText(wordBurst.text, 0, 0);
      context.fillStyle = '#ffd60a';
      context.fillText(wordBurst.text, 0, 0);
      context.restore();
      return true;
    }

    function drawFlash(flash, now) {
      var progress = (now - flash.born) / flash.life;
      if (progress >= 1) return false;
      context.globalAlpha = 1 - progress;
      context.beginPath();
      context.arc(flash.x, flash.y, Math.max(0, 12 * (1 - progress)), 0, Math.PI * 2);
      context.fillStyle = flash.color;
      context.shadowColor = flash.color;
      context.shadowBlur = 22;
      context.fill();
      context.shadowBlur = 0;
      context.beginPath();
      context.arc(flash.x, flash.y, 8 + progress * 42, 0, Math.PI * 2);
      context.strokeStyle = flash.color;
      context.lineWidth = 3 * (1 - progress);
      context.stroke();
      context.globalAlpha = 1;
      return true;
    }

    function animate(now) {
      animationFrame = 0;
      if (!canvas || !context) return;
      context.clearRect(0, 0, width, height);
      var remainingRockets = [];
      rockets.forEach(function (rocket) {
        if (drawRocket(rocket, now)) explode(rocket, now);
        else remainingRockets.push(rocket);
      });
      rockets = remainingRockets;
      particles = particles.filter(function (particle) { return drawParticle(particle, now); });
      flashes = flashes.filter(function (flash) { return drawFlash(flash, now); });
      wordBursts = wordBursts.filter(function (wordBurst) { return drawWordBurst(wordBurst, now); });
      if (rockets.length || particles.length || flashes.length || wordBursts.length || pendingLaunches) animationFrame = win.requestAnimationFrame(animate);
      else removeCanvasWhenIdle();
    }

    function requestAnimation() {
      if (!animationFrame) animationFrame = win.requestAnimationFrame(animate);
    }

    function launch() {
      clickCount += 1;
      win.clearTimeout(comboResetTimer);
      comboResetTimer = win.setTimeout(function () { clickCount = 0; }, COMBO_RESET_MS);
      trigger.classList.remove('is-launching');
      void trigger.offsetWidth;
      trigger.classList.add('is-launching');
      win.setTimeout(function () { trigger.classList.remove('is-launching'); }, 700);

      if (win.matchMedia && win.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
      ensureCanvas();
      var plan = createLaunchPlan(width, height, Math.random);
      if (isSignatureLaunch(clickCount)) {
        var signatureRocket = createSignatureRocket(width, height, Math.random);
        signatureRocket.message = createSignatureMessage(Math.random, new Date());
        plan.push(signatureRocket);
        clickCount = 0;
        win.clearTimeout(comboResetTimer);
      }
      pendingLaunches += plan.length;
      plan.forEach(function (item) {
        win.setTimeout(function () {
          pendingLaunches -= 1;
          rockets.push(Object.assign({ born: win.performance.now() }, item));
          requestAnimation();
        }, item.delay);
      });
      requestAnimation();
      return true;
    }

    return { launch: launch };
  }

  function init(win, doc) {
    if (!win || !doc) return null;
    var trigger = doc.getElementById('home-fireworks-trigger');
    if (!trigger || trigger.hasAttribute('data-home-fireworks-bound')) return null;
    trigger.setAttribute('data-home-fireworks-bound', 'true');
    var controller = createController(win, doc, trigger);
    trigger.addEventListener('click', function () {
      var launched = controller.launch();
      if (launched && win.webAnalytics && typeof win.webAnalytics.trackEvent === 'function') {
        win.webAnalytics.trackEvent('home_fireworks_launch', { source: 'floating_button' });
      }
    });
    return controller;
  }

  return {
    createLaunchPlan: createLaunchPlan,
    createSignatureRocket: createSignatureRocket,
    createSignatureMessage: createSignatureMessage,
    getDaysUntilTet: getDaysUntilTet,
    isSignatureLaunch: isSignatureLaunch,
    createController: createController,
    init: init
  };
});

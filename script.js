(function () {
  'use strict';

  // 1. Layout Toggle Logic (A vs B)
  var layoutButtons = document.querySelectorAll('[data-layout]');

  function setLayout(layout) {
    document.documentElement.setAttribute('data-layout', layout);
    try { localStorage.setItem('layout', layout); } catch (e) {}
    for (var i = 0; i < layoutButtons.length; i++) {
      var btn = layoutButtons[i];
      btn.classList.toggle('active', btn.getAttribute('data-layout') === layout);
    }
    if (layout === 'b' && window.innerWidth >= 768) closeSidebar();
  }

  for (var i = 0; i < layoutButtons.length; i++) {
    (function (btn) {
      btn.addEventListener('click', function () { setLayout(btn.getAttribute('data-layout')); });
    })(layoutButtons[i]);
  }

  // 2. Sidebar Logic
  var hamburger = document.getElementById('hamburger');
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('overlay');
  var closeBtn = document.getElementById('closeSidebar');
  var body = document.body;

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    sidebar.setAttribute('aria-hidden', 'false');
    body.classList.add('no-scroll');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    sidebar.setAttribute('aria-hidden', 'true');
    body.classList.remove('no-scroll');
  }

  if (hamburger) hamburger.addEventListener('click', function () {
    if (sidebar.classList.contains('open')) closeSidebar(); else openSidebar();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) closeSidebar();
  });

  // 3. Work In Progress (WIP) Banner
  var wipTriggers = document.querySelectorAll('.wip-trigger');
  var wipBanner = document.getElementById('wipBanner');
  var closeWipBtn = document.getElementById('closeWip');

  function openWip(e) {
    if (e) e.preventDefault();
    wipBanner.classList.add('open');
    wipBanner.setAttribute('aria-hidden', 'false');
    body.classList.add('no-scroll');
    closeSidebar();
  }

  function closeWip() {
    wipBanner.classList.remove('open');
    wipBanner.setAttribute('aria-hidden', 'true');
    body.classList.remove('no-scroll');
  }

  for (var j = 0; j < wipTriggers.length; j++) {
    wipTriggers[j].addEventListener('click', openWip);
  }
  if (closeWipBtn) closeWipBtn.addEventListener('click', closeWip);

  // 4. Placeholder Cart Logic
  var cartCount = document.getElementById('cartCount');
  var count = 0;
  var addButtons = document.querySelectorAll('[data-add]');

  for (var k = 0; k < addButtons.length; k++) {
    (function (btn) {
      btn.addEventListener('click', function () {
        count++;
        if (cartCount) cartCount.textContent = count;
        var original = btn.textContent;
        btn.textContent = 'Added';
        btn.disabled = true;
        setTimeout(function () {
          btn.textContent = original;
          btn.disabled = false;
        }, 1200);
      });
    })(addButtons[k]);
  }

  // 5. Initialize Layout
  var saved = 'b';
  try { saved = localStorage.getItem('layout') || 'b'; } catch (e) { saved = 'b'; }
  setLayout(saved);

})();

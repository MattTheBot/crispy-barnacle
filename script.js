(function () {
  'use strict';

  // 1. Layout Toggle Logic (A vs B)
  var layoutButtons = document.querySelectorAll('[data-layout]');
  function setLayout(layout) {
    document.documentElement.setAttribute('data-layout', layout);
    try { localStorage.setItem('layout', layout); } catch (e) {}
    layoutButtons.forEach(function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-layout') === layout);
    });
    if (layout === 'b' && window.innerWidth >= 768) closeSidebar();
  }
  layoutButtons.forEach(function(btn) {
    btn.addEventListener('click', function() { setLayout(btn.getAttribute('data-layout')); });
  });

  // 2. Sidebar Logic
  var hamburger = document.getElementById('hamburger');
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('overlay');
  var closeBtn = document.getElementById('closeSidebar');
  var body = document.body;

  function openSidebar() {
    if(!sidebar) return;
    sidebar.classList.add('open');
    overlay.classList.add('open');
    if(hamburger) hamburger.setAttribute('aria-expanded', 'true');
    body.classList.add('no-scroll');
  }

  function closeSidebar() {
    if(!sidebar) return;
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    if(hamburger) hamburger.setAttribute('aria-expanded', 'false');
    body.classList.remove('no-scroll');
  }

  if (hamburger) hamburger.addEventListener('click', function () {
    if (sidebar.classList.contains('open')) closeSidebar(); else openSidebar();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  // 3. Work In Progress Banner
  var wipTriggers = document.querySelectorAll('.wip-trigger');
  var wipBanner = document.getElementById('wipBanner');
  var closeWipBtn = document.getElementById('closeWip');

  wipTriggers.forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      if(wipBanner) {
        wipBanner.classList.add('open');
        body.classList.add('no-scroll');
        closeSidebar();
      }
    });
  });

  if (closeWipBtn) {
    closeWipBtn.addEventListener('click', function() {
      wipBanner.classList.remove('open');
      body.classList.remove('no-scroll');
    });
  }

  // 4. Placeholder Cart Logic
  var cartCount = document.getElementById('cartCount');
  var count = 0;
  document.querySelectorAll('[data-add]').forEach(function(btn) {
    btn.addEventListener('click', function() {
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
  });

  // 5. Init
  var saved = 'b';
  try { saved = localStorage.getItem('layout') || 'b'; } catch (e) {}
  setLayout(saved);
})();

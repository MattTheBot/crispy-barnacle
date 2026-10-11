(function () {
  'use strict';

  // ---------- Layout toggle ----------
  var layoutButtons = document.querySelectorAll('[data-layout]');

  function setLayout(layout) {
    document.documentElement.setAttribute('data-layout', layout);

    try {
      localStorage.setItem('layout', layout);
    } catch (e) {}

    for (var i = 0; i < layoutButtons.length; i++) {
      var btn = layoutButtons[i];
      if (btn.getAttribute('data-layout') === layout) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }

    // If switching to Layout B on desktop, close the sidebar
    if (layout === 'b' && window.innerWidth >= 768) {
      closeSidebar();
    }
  }

  for (var i = 0; i < layoutButtons.length; i++) {
    (function (btn) {
      btn.addEventListener('click', function () {
        setLayout(btn.getAttribute('data-layout'));
      });
    })(layoutButtons[i]);
  }

  // ---------- Sidebar ----------
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

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (sidebar.classList.contains('open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  window.addEventListener('resize', function () {
    if (document.documentElement.getAttribute('data-layout') === 'b' && window.innerWidth >= 768) {
      closeSidebar();
    }
  });

  // ---------- Add to cart (placeholder) ----------
  var cartCount = document.getElementById('cartCount');
  var count = 0;
  var addButtons = document.querySelectorAll('[data-add]');

  for (var j = 0; j < addButtons.length; j++) {
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
    })(addButtons[j]);
  }

  // ---------- Init layout from storage ----------
  var saved = 'a';
  try {
    saved = localStorage.getItem('layout') || 'a';
  } catch (e) {
    saved = 'a';
  }
  setLayout(saved);

})();

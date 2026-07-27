/* Niazur Rahman, portfolio scripts */
(function () {
  'use strict';

  /* The no-js class is removed here so CSS can safely hide things that only
     make sense once scripting is available (the scroll reveal, for example). */
  document.documentElement.classList.remove('no-js');

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');

  function setMenu(open) {
    if (!menuBtn || !navLinks) return;
    navLinks.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.textContent = open ? 'Close' : 'Menu';
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      setMenu(!navLinks.classList.contains('open'));
    });

    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });

    // Escape closes the menu and returns focus to the button.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        setMenu(false);
        menuBtn.focus();
      }
    });

    // A tap outside the panel closes it too.
    document.addEventListener('click', function (e) {
      if (!navLinks.classList.contains('open')) return;
      if (navLinks.contains(e.target) || menuBtn.contains(e.target)) return;
      setMenu(false);
    });

    // Returning to desktop width must not leave the panel stuck open.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860 && navLinks.classList.contains('open')) setMenu(false);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealItems.forEach(function (el) { io.observe(el); });
  } else {
    // Older browsers simply show everything.
    revealItems.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById('contactForm');
  if (form) {
    var note = form.querySelector('.form-note');
    var button = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      if (!form.getAttribute('action')) {
        // No mail service connected, so nothing would actually be sent.
        e.preventDefault();
        if (note) {
          note.textContent = 'This form is not connected to a mail service yet. Please email rahman@niazur.me in the meantime.';
        }
        return;
      }
      if (button) {
        button.disabled = true;
        button.textContent = 'Sending';
      }
      if (note) note.textContent = 'Sending your message.';
    });
  }
})();

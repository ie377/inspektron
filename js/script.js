/* Инспектрон: навигация, формы, попап, цели Метрики */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    /* --- Мобильное меню --- */
    var navToggle = document.getElementById('navToggle');
    var nav = document.getElementById('nav');
    if (navToggle && nav) {
      navToggle.addEventListener('click', function () {
        nav.classList.toggle('active');
        navToggle.classList.toggle('active');
      });
    }

    /* --- FAQ аккордеон --- */
    var faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach(function (item) {
      var question = item.querySelector('.faq__question');
      if (!question) return;
      question.addEventListener('click', function () {
        var wasActive = item.classList.contains('active');
        faqItems.forEach(function (other) { other.classList.remove('active'); });
        if (!wasActive) item.classList.add('active');
      });
    });

    /* --- Тень шапки при скролле --- */
    window.addEventListener('scroll', function () {
      var header = document.querySelector('.header');
      if (!header) return;
      header.style.boxShadow = window.scrollY > 100 ? '0 2px 8px rgba(0,0,0,0.1)' : '';
    }, { passive: true });

    /* --- Плавный скролл по якорям --- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var header = document.querySelector('.header');
        var headerHeight = header ? header.offsetHeight : 0;
        var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });

    /* --- Маска телефона +7 (___) ___-__-__ --- */
    document.querySelectorAll('input[type="tel"]').forEach(function (input) {
      input.setAttribute('inputmode', 'tel');
      input.setAttribute('placeholder', '+7 (___) ___-__-__');
      input.addEventListener('input', function () {
        var d = this.value.replace(/\D/g, '');
        if (d.length && d[0] === '8') d = '7' + d.slice(1);
        if (d.length && d[0] !== '7') d = '7' + d;
        d = d.slice(0, 11);
        var out = '+7';
        if (d.length > 1) out += ' (' + d.slice(1, 4);
        if (d.length >= 4) out += ')';
        if (d.length > 4) out += ' ' + d.slice(4, 7);
        if (d.length > 7) out += '-' + d.slice(7, 9);
        if (d.length > 9) out += '-' + d.slice(9, 11);
        this.value = d.length ? out : '';
      });
    });

    /* --- Формы: валидация + цели Метрики --- */
    document.querySelectorAll('form[action*="formspree.io"]').forEach(function (form) {
      form.setAttribute('novalidate', 'novalidate');
      form.addEventListener('submit', function (e) {
        var valid = true;
        form.querySelectorAll('input[required], select[required], textarea[required]').forEach(function (field) {
          if (field.type === 'checkbox') {
            if (!field.checked) valid = false;
            return;
          }
          if (!field.value.trim()) {
            valid = false;
            field.style.borderColor = '#DC2626';
          } else {
            field.style.borderColor = '';
          }
        });
        var email = form.querySelector('input[type="email"]');
        if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value)) {
          valid = false;
          email.style.borderColor = '#DC2626';
        }
        if (!valid) {
          e.preventDefault();
          alert('Пожалуйста, заполните обязательные поля корректно.');
          return;
        }
        if (window.ym) {
          try { ym(108394825, 'reachGoal', 'submit_form'); } catch (err) { /* noop */ }
        }
      });
    });

    /* --- Цели: звонок и скачивание каталога --- */
    document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.ym) { try { ym(108394825, 'reachGoal', 'click_phone'); } catch (err) { /* noop */ } }
      });
    });
    document.querySelectorAll('a[download]').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.ym) { try { ym(108394825, 'reachGoal', 'click_download_pdf'); } catch (err) { /* noop */ } }
      });
    });
  });

  /* --- Попап обратного звонка --- */
  window.openPopup = function () {
    var p = document.getElementById('popupForm');
    if (p) p.classList.add('active');
  };
  window.closePopup = function () {
    var p = document.getElementById('popupForm');
    if (p) p.classList.remove('active');
  };
  document.addEventListener('DOMContentLoaded', function () {
    var p = document.getElementById('popupForm');
    if (p) {
      p.addEventListener('click', function (e) { if (e.target === p) window.closePopup(); });
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') window.closePopup();
  });
})();

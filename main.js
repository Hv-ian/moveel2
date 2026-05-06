// MOVEEL LUBE — Mobile-first Interactive JS
document.addEventListener('DOMContentLoaded', () => {

  // ─── MOBILE MENU TOGGLE ───────────────────────────────────────────────
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.modern-nav');
  const body = document.body;

  if (mobileBtn && nav) {
    // Inject "Get Quote" and "Call" CTAs inside the nav on mobile
    if (!nav.querySelector('.mobile-nav-cta')) {
      const cta = document.createElement('div');
      cta.className = 'mobile-nav-cta';
      cta.innerHTML = `
        <a href="contact.html" class="btn-primary">
          <i class="fas fa-arrow-right"></i> Get a Quote
        </a>
        <a href="tel:+13105384242" class="phone-btn-full">
          <i class="fas fa-phone-alt"></i> 310-538-4242
        </a>`;
      nav.appendChild(cta);
    }

    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle('active');
      mobileBtn.classList.toggle('active', isOpen);
      body.style.overflow = isOpen ? 'hidden' : '';
      mobileBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('active') &&
          !nav.contains(e.target) &&
          !mobileBtn.contains(e.target)) {
        closeNav();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) closeNav();
    });
  }

  function closeNav() {
    if (!nav) return;
    nav.classList.remove('active');
    mobileBtn && mobileBtn.classList.remove('active');
    body.style.overflow = '';
    mobileBtn && mobileBtn.setAttribute('aria-expanded', 'false');
  }

  // ─── DROPDOWN — MOBILE ONLY ───────────────────────────────────────────
  const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
  dropdownTriggers.forEach(trigger => {
    const link = trigger.querySelector(':scope > a');
    if (!link) return;
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        // Close siblings
        dropdownTriggers.forEach(other => {
          if (other !== trigger) other.classList.remove('active');
        });
        trigger.classList.toggle('active');
      }
    });
  });

  // ─── CLOSE NAV when any inner link is clicked ─────────────────────────
  document.querySelectorAll('.modern-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        // Don't close when it's the dropdown trigger link itself
        const parentTrigger = link.closest('.dropdown-trigger');
        const isTopLink = parentTrigger && link === parentTrigger.querySelector(':scope > a');
        if (!isTopLink) {
          setTimeout(closeNav, 100);
        }
      }
    });
  });

  // ─── HEADER SCROLL EFFECT ─────────────────────────────────────────────
  const header = document.querySelector('.modern-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  // ─── SMOOTH SCROLL ────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerH = document.querySelector('.modern-header')?.offsetHeight || 64;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ─── FORM SUBMISSION ──────────────────────────────────────────────────
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      if (!btn) return;
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        btn.style.background = 'linear-gradient(135deg,#10B981 0%,#059669 100%)';
        form.reset();
        setTimeout(() => {
          btn.innerHTML = orig;
          btn.disabled = false;
          btn.style.background = '';
        }, 3000);
      }, 1500);
    });
  });

  // ─── FADE-IN CARDS ───────────────────────────────────────────────────
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(
    '.service-card-modern, .testimonial-card, .equipment-glass-item, .stat-card-modern, .equipment-card-modern'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObserver.observe(el);
  });

  // ─── ACTIVE NAV LINK ─────────────────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item > a').forEach(item => {
    if (item.getAttribute('href') === currentPage) {
      item.style.color = 'var(--primary)';
    }
  });

  // ─── STAT COUNTER ────────────────────────────────────────────────────
  const animateNum = (el, target, hasPlus) => {
    let current = 0;
    const step = target / 50;
    const t = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target + (hasPlus ? '+' : '');
        clearInterval(t);
      } else {
        el.textContent = Math.floor(current) + (hasPlus ? '+' : '');
      }
    }, 20);
  };

  const statObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const hasPlus = text.includes('+');
        const num = parseInt(text);
        if (!isNaN(num)) {
          el.textContent = '0' + (hasPlus ? '+' : '');
          animateNum(el, num, hasPlus);
        }
        statObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(el => statObs.observe(el));

  // ─── RESIZE: reset nav if resized to desktop ─────────────────────────
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeNav();
      dropdownTriggers.forEach(t => t.classList.remove('active'));
    }
  });
});
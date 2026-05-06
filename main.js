// MOVEEL LUBE - Modern Interactive JavaScript (Fixed for + signs)
document.addEventListener('DOMContentLoaded', () => {

  // Mobile menu toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.modern-nav');
  
  if (mobileBtn && nav) {
    mobileBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      mobileBtn.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
  }

  // Header scroll effect
  const header = document.querySelector('.modern-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Dropdown mobile handling
  const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        trigger.classList.toggle('active');
      }
    });
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.modern-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        nav.classList.remove('active');
        mobileBtn?.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Form submission handler
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn?.innerHTML;
      
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
          submitBtn.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
          form.reset();
          
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
          }, 3000);
        }, 1500);
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.service-card-modern, .testimonial-card, .equipment-item, .stat-card-modern');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });

  // Parallax effect for hero particles
  const heroParticles = document.querySelector('.hero-particles');
  if (heroParticles) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) * 20;
      const y = (e.clientY / window.innerHeight) * 20;
      heroParticles.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // Floating animation for hero cards
  const floatingCards = document.querySelectorAll('.floating-card');
  floatingCards.forEach((card, index) => {
    card.style.animation = `float ${4 + index}s ease-in-out infinite`;
    card.style.animationDelay = `${index * 0.5}s`;
  });

  // Add active class to current page nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-item > a');
  navItems.forEach(item => {
    if (item.getAttribute('href') === currentPage) {
      item.style.color = '#FF6B00';
    }
  });

  // FIXED: Number counter that preserves + signs properly
  const animateNumber = (element, target, hasPlus = false) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = hasPlus ? Math.floor(target) + '+' : Math.floor(target);
        clearInterval(timer);
      } else {
        element.textContent = hasPlus ? Math.floor(current) + '+' : Math.floor(current);
      }
    }, 20);
  };

  // FIXED: Observer that handles numbers with + signs correctly
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const originalText = element.textContent;
        
        // Check if there's a plus sign in the original text
        const hasPlus = originalText.includes('+');
        
        // Extract the numeric value
        let number = parseInt(originalText);
        
        // If it's a valid number, animate it
        if (!isNaN(number)) {
          // Store the original value
          element.setAttribute('data-original', originalText);
          element.textContent = '0' + (hasPlus ? '+' : '');
          animateNumber(element, number, hasPlus);
        }
        statObserver.unobserve(element);
      }
    });
  }, { threshold: 0.5 });

  // Observe all stat-number elements
  document.querySelectorAll('.stat-number').forEach(el => {
    statObserver.observe(el);
  });
});
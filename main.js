/**
 * O2 Helpdesk UK - Main JavaScript
 * Animations, interactions, and functionality
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = {
    observer: {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    },
    counter: {
      duration: 2000,
      easing: 'easeOutExpo'
    }
  };

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  const easings = {
    linear: t => t,
    easeOutQuad: t => 1 - (1 - t) * (1 - t),
    easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
  };

  const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // ============================================
  // MOBILE MENU
  // ============================================
  const initMobileMenu = () => {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      toggle.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        toggle.classList.remove('active');
      });
    });
  };

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  const initHeaderScroll = () => {
    const header = document.querySelector('.site-header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', throttle(() => {
      const currentScroll = window.scrollY;
      
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    }, 100));
  };

  // ============================================
  // SCROLL ANIMATIONS
  // ============================================
  const initScrollAnimations = () => {
    if (prefersReducedMotion()) {
      document.querySelectorAll('.fade-in-up, .service-card, .process-step, .stat-card, .testimonial-card').forEach(el => {
        el.classList.add('visible');
      });
      return;
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Animate counters
          if (entry.target.classList.contains('stat-card')) {
            animateCounter(entry.target);
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, CONFIG.observer);
    
    document.querySelectorAll('.fade-in-up, .service-card, .process-step, .stat-card, .testimonial-card').forEach(el => {
      observer.observe(el);
    });
  };

  // ============================================
  // COUNTER ANIMATION
  // ============================================
  const animateCounter = (statCard) => {
    const numberEl = statCard.querySelector('.stat-number');
    if (!numberEl) return;
    
    const text = numberEl.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const hasSlash = text.includes('/');
    
    let targetValue = parseFloat(text.replace(/[^0-9.]/g, ''));
    if (isNaN(targetValue)) return;
    
    const duration = CONFIG.counter.duration;
    const startTime = performance.now();
    const easing = easings[CONFIG.counter.easing];
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);
      
      let currentValue = targetValue * easedProgress;
      
      let displayValue;
      if (hasPercent) {
        displayValue = Math.floor(currentValue) + '%';
      } else if (hasSlash) {
        displayValue = currentValue.toFixed(1) + '/5';
      } else if (targetValue >= 1000) {
        displayValue = Math.floor(currentValue).toLocaleString();
      } else {
        displayValue = Math.floor(currentValue);
      }
      
      if (hasPlus) displayValue += '+';
      
      numberEl.textContent = displayValue;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  };

  // ============================================
  // FAQ ACCORDION
  // ============================================
  const initFAQ = () => {
    document.querySelectorAll('.faq-question').forEach(button => {
      button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all items
        document.querySelectorAll('.faq-item').forEach(faq => {
          faq.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  };

  // ============================================
  // COOKIE CONSENT
  // ============================================
  const initCookieConsent = () => {
    const banner = document.querySelector('.cookie-consent');
    if (!banner) return;
    
    // Check if already accepted
    if (localStorage.getItem('cookiesAccepted')) return;
    
    // Show banner after delay
    setTimeout(() => {
      banner.classList.add('active');
    }, 2000);
    
    // Accept button
    const acceptBtn = banner.querySelector('.cookie-accept');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        banner.classList.remove('active');
      });
    }
  };

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  const initBackToTop = () => {
    const button = document.querySelector('.back-to-top');
    if (!button) return;
    
    window.addEventListener('scroll', throttle(() => {
      if (window.scrollY > 500) {
        button.classList.add('visible');
      } else {
        button.classList.remove('visible');
      }
    }, 100));
    
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      });
    });
  };

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion() ? 'auto' : 'smooth'
        });
      });
    });
  };

  // ============================================
  // FORM VALIDATION
  // ============================================
  const initFormValidation = () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
          } else {
            field.classList.remove('error');
          }
        });
        
        if (!isValid) {
          e.preventDefault();
          alert('Please fill in all required fields.');
        }
      });
    });
  };

  // ============================================
  // LAZY LOADING
  // ============================================
  const initLazyLoading = () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.classList.add('loaded');
      });
    }
  };

  // ============================================
  // BUTTON RIPPLE EFFECT
  // ============================================
  const initButtonRipple = () => {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        btn.style.setProperty('--x', `${x}%`);
        btn.style.setProperty('--y', `${y}%`);
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.setProperty('--x', '50%');
        btn.style.setProperty('--y', '50%');
      });
    });
  };

  // ============================================
  // INITIALIZE ALL
  // ============================================
  const init = () => {
    initMobileMenu();
    initHeaderScroll();
    initScrollAnimations();
    initFAQ();
    initCookieConsent();
    initBackToTop();
    initSmoothScroll();
    initFormValidation();
    initLazyLoading();
    initButtonRipple();
    
    document.body.classList.add('js-loaded');
    console.log('O2 Helpdesk initialized');
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

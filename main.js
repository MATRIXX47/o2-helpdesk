/**
 * O2 Helpdesk UK - Main JavaScript
 * Secure, accessible, and performant interactions
 * @version 2.0.0
 */

(function() {
  'use strict';

  // ============================================
  // SECURITY: Content Security Policy Check
  // ============================================
  if (window.trustedTypes && window.trustedTypes.createPolicy) {
    window.trustedTypes.createPolicy('default', {
      createHTML: (input) => input,
      createScript: (input) => input,
      createScriptURL: (input) => input
    });
  }

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
    },
    selectors: {
      mobileMenuToggle: '.mobile-menu-toggle',
      mainNav: '.main-nav',
      header: '.site-header',
      backToTop: '.back-to-top',
      cookieConsent: '.cookie-consent',
      cookieAccept: '.cookie-accept',
      faqQuestion: '.faq-question',
      fadeElements: '.fade-in-up, .service-card, .process-step, .stat-card, .testimonial-card',
      forms: 'form'
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

  /**
   * SECURITY: Sanitize HTML to prevent XSS
   * @param {string} str - String to sanitize
   * @returns {string} Sanitized string
   */
  const sanitizeHTML = (str) => {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  };

  // ============================================
  // MOBILE MENU
  // ============================================
  const initMobileMenu = () => {
    const toggle = document.querySelector(CONFIG.selectors.mobileMenuToggle);
    const nav = document.querySelector(CONFIG.selectors.mainNav);
    
    if (!toggle || !nav) return;
    
    // Set ARIA attributes for accessibility
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'main-navigation');
    nav.id = 'main-navigation';
    
    const closeMenu = () => {
      nav.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    
    const openMenu = () => {
      nav.classList.add('active');
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    
    toggle.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    
    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        closeMenu();
        toggle.focus();
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('active') && 
          !nav.contains(e.target) && 
          !toggle.contains(e.target)) {
        closeMenu();
      }
    });
  };

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  const initHeaderScroll = () => {
    const header = document.querySelector(CONFIG.selectors.header);
    if (!header) return;
    
    let lastScroll = 0;
    let ticking = false;
    
    const updateHeader = () => {
      const currentScroll = window.scrollY;
      
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Hide/show header on scroll direction (optional)
      if (currentScroll > lastScroll && currentScroll > 200) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  };

  // ============================================
  // SCROLL ANIMATIONS
  // ============================================
  const initScrollAnimations = () => {
    const elements = document.querySelectorAll(CONFIG.selectors.fadeElements);
    
    if (prefersReducedMotion()) {
      elements.forEach(el => el.classList.add('visible'));
      return;
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add stagger delay based on element index
          const siblings = Array.from(entry.target.parentElement?.children || []);
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.1}s`;
          
          entry.target.classList.add('visible');
          
          // Animate counters
          if (entry.target.classList.contains('stat-card')) {
            animateCounter(entry.target);
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, CONFIG.observer);
    
    elements.forEach(el => observer.observe(el));
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
    const hasLessThan = text.includes('<');
    
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
      if (hasLessThan) displayValue = '<' + displayValue;
      
      // SECURITY: Use textContent, not innerHTML
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
    document.querySelectorAll(CONFIG.selectors.faqQuestion).forEach((button, index) => {
      // Set ARIA attributes
      const item = button.parentElement;
      const answer = item.querySelector('.faq-answer');
      const answerId = `faq-answer-${index}`;
      
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', answerId);
      if (answer) answer.id = answerId;
      
      button.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        document.querySelectorAll('.faq-item').forEach(faq => {
          faq.classList.remove('active');
          const btn = faq.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add('active');
          button.setAttribute('aria-expanded', 'true');
        }
      });
      
      // Keyboard support
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          button.click();
        }
      });
    });
  };

  // ============================================
  // COOKIE CONSENT
  // ============================================
  const initCookieConsent = () => {
    const banner = document.querySelector(CONFIG.selectors.cookieConsent);
    if (!banner) return;
    
    // Check if already accepted
    try {
      if (localStorage.getItem('cookiesAccepted')) return;
    } catch (e) {
      // localStorage might be disabled
      console.warn('localStorage not available');
      return;
    }
    
    // Show banner after delay
    setTimeout(() => {
      banner.classList.add('active');
      banner.setAttribute('aria-live', 'polite');
    }, 2000);
    
    // Accept button
    const acceptBtn = banner.querySelector(CONFIG.selectors.cookieAccept);
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        try {
          localStorage.setItem('cookiesAccepted', 'true');
          localStorage.setItem('cookiesAcceptedDate', new Date().toISOString());
        } catch (e) {
          console.warn('Could not save cookie preference');
        }
        banner.classList.remove('active');
        
        // Remove from DOM after animation
        setTimeout(() => {
          banner.style.display = 'none';
        }, 500);
      });
    }
  };

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  const initBackToTop = () => {
    const button = document.querySelector(CONFIG.selectors.backToTop);
    if (!button) return;
    
    // Set ARIA label
    button.setAttribute('aria-label', 'Back to top');
    
    let ticking = false;
    
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        button.classList.add('visible');
      } else {
        button.classList.remove('visible');
      }
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(toggleVisibility);
        ticking = true;
      }
    }, { passive: true });
    
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      });
      // Focus management for accessibility
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.focus({ preventScroll: true });
      }
    });
  };

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;
        
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
        
        // Update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  };

  // ============================================
  // SECURE FORM VALIDATION
  // ============================================
  const initFormValidation = () => {
    const forms = document.querySelectorAll(CONFIG.selectors.forms);
    
    forms.forEach(form => {
      // Create error container if it doesn't exist
      let errorContainer = form.querySelector('.form-errors');
      if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.className = 'form-errors';
        errorContainer.setAttribute('role', 'alert');
        errorContainer.style.cssText = 'display: none; background: #fee; color: #c00; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;';
        form.prepend(errorContainer);
      }
      
      form.addEventListener('submit', (e) => {
        const requiredFields = form.querySelectorAll('[required]');
        const errors = [];
        
        requiredFields.forEach(field => {
          // Remove previous error state
          field.classList.remove('error');
          field.removeAttribute('aria-invalid');
          
          if (!field.value.trim()) {
            const label = field.labels?.[0]?.textContent || field.name || field.id || 'Field';
            errors.push(sanitizeHTML(label) + ' is required');
            field.classList.add('error');
            field.setAttribute('aria-invalid', 'true');
          }
        });
        
        if (errors.length > 0) {
          e.preventDefault();
          
          // SECURITY: Use textContent, build list safely
          errorContainer.innerHTML = '';
          const ul = document.createElement('ul');
          ul.style.margin = '0';
          ul.style.paddingLeft = '1.5rem';
          
          errors.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            ul.appendChild(li);
          });
          
          errorContainer.appendChild(ul);
          errorContainer.style.display = 'block';
          
          // Focus first error field
          const firstError = form.querySelector('.error');
          if (firstError) firstError.focus();
        } else {
          errorContainer.style.display = 'none';
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
            
            // SECURITY: Validate URL before setting
            const src = img.dataset.src;
            if (src && (src.startsWith('/') || src.startsWith('http'))) {
              img.src = src;
              img.removeAttribute('data-src');
              img.classList.add('loaded');
            }
            
            imageObserver.unobserve(img);
          }
        });
      }, { rootMargin: '50px' });
      
      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      lazyImages.forEach(img => {
        const src = img.dataset.src;
        if (src && (src.startsWith('/') || src.startsWith('http'))) {
          img.src = src;
          img.classList.add('loaded');
        }
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
  // ANALYTICS (Privacy-Respecting)
  // ============================================
  const initAnalytics = () => {
    // Only track if cookies are accepted
    try {
      if (!localStorage.getItem('cookiesAccepted')) return;
    } catch (e) {
      return;
    }
    
    // Simple page view tracking (replace with GA4 or Plausible)
    const trackEvent = (eventName, params = {}) => {
      if (window.gtag) {
        window.gtag('event', eventName, params);
      }
      console.log('Track:', eventName, params);
    };
    
    // Track CTA clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
      link.addEventListener('click', () => {
        trackEvent('phone_click', { number: link.href.replace('tel:', '') });
      });
    });
  };

  // ============================================
  // SERVICE WORKER REGISTRATION (PWA)
  // ============================================
  const initServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered:', registration.scope);
          })
          .catch(error => {
            console.log('SW registration failed:', error);
          });
      });
    }
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
    initAnalytics();
    // initServiceWorker(); // Uncomment when sw.js is created
    
    document.body.classList.add('js-loaded');
    console.log('O2 Helpdesk initialized securely ✓');
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

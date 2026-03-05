/**
 * O2 Helpdesk - Animation Controller
 * Scroll-triggered animations, counters, and interactions
 * Lightweight, performant, accessible
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = {
    // Intersection Observer settings
    observer: {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    },
    // Counter animation settings
    counter: {
      duration: 2000,
      easing: 'easeOutExpo'
    },
    // Stagger delays
    stagger: {
      default: 100,
      fast: 50,
      slow: 150
    }
  };

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  
  /**
   * Check if user prefers reduced motion
   */
  const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  /**
   * Easing functions for animations
   */
  const easings = {
    linear: t => t,
    easeInQuad: t => t * t,
    easeOutQuad: t => 1 - (1 - t) * (1 - t),
    easeInOutQuad: t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    easeOutElastic: t => {
      const c4 = (2 * Math.PI) / 3;
      return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    }
  };

  /**
   * Debounce function for performance
   */
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  /**
   * Throttle function for scroll events
   */
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
  // INTERSECTION OBSERVER CONTROLLER
  // ============================================
  class ScrollAnimator {
    constructor() {
      this.observer = null;
      this.animatedElements = new Set();
      this.init();
    }

    init() {
      if (prefersReducedMotion()) {
        this.showAllElements();
        return;
      }

      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        CONFIG.observer
      );

      this.observeElements();
    }

    observeElements() {
      // Elements with animation classes
      const selectors = [
        '.fade-in-up',
        '.fade-in-left',
        '.fade-in-right',
        '.scale-in',
        '.service-card',
        '.process-step',
        '.stat-card',
        '.testimonial-card',
        '.trust-item',
        '.stagger-container',
        '.process-connector'
      ];

      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          this.observer.observe(el);
        });
      });
    }

    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.animatedElements.add(entry.target);
          
          // Add visible class for CSS transitions
          entry.target.classList.add('visible');
          
          // Handle special cases
          this.handleSpecialAnimations(entry.target);
          
          // Stop observing after animation
          this.observer.unobserve(entry.target);
        }
      });
    }

    handleSpecialAnimations(element) {
      // Stat counter animation
      if (element.classList.contains('stat-card')) {
        this.animateCounter(element);
      }
      
      // Stagger children
      if (element.classList.contains('stagger-container')) {
        this.staggerChildren(element);
      }
    }

    staggerChildren(container) {
      const children = container.querySelectorAll('.stagger-item');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add('visible');
        }, index * CONFIG.stagger.default);
      });
    }

    animateCounter(statCard) {
      const numberEl = statCard.querySelector('.stat-number');
      if (!numberEl) return;

      const text = numberEl.textContent;
      const hasPlus = text.includes('+');
      const hasK = text.includes('K');
      const hasPercent = text.includes('%');
      const hasMin = text.includes('min');
      
      // Extract numeric value
      let targetValue = parseFloat(text.replace(/[^0-9.]/g, ''));
      if (isNaN(targetValue)) return;

      // Handle K multiplier
      if (hasK) targetValue *= 1000;

      const duration = CONFIG.counter.duration;
      const startTime = performance.now();
      const easing = easings[CONFIG.counter.easing];

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easing(progress);
        
        let currentValue = targetValue * easedProgress;
        
        // Format the display
        let displayValue;
        if (hasK) {
          displayValue = Math.floor(currentValue / 1000) + 'K';
        } else if (hasPercent) {
          displayValue = Math.floor(currentValue) + '%';
        } else if (hasMin) {
          displayValue = '<' + Math.ceil(currentValue) + 'min';
        } else if (targetValue % 1 !== 0) {
          displayValue = currentValue.toFixed(1);
        } else {
          displayValue = Math.floor(currentValue).toLocaleString();
        }
        
        if (hasPlus) displayValue += '+';
        
        numberEl.textContent = displayValue;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    }

    showAllElements() {
      // For reduced motion, show everything immediately
      const animatedElements = document.querySelectorAll(
        '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, ' +
        '.service-card, .process-step, .stat-card, .testimonial-card, ' +
        '.trust-item, .stagger-item, .process-connector'
      );
      
      animatedElements.forEach(el => {
        el.classList.add('visible');
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }
  }

  // ============================================
  // BUTTON INTERACTIONS
  // ============================================
  class ButtonController {
    constructor() {
      this.init();
    }

    init() {
      // Ripple effect for buttons
      document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', this.handleMouseMove);
        btn.addEventListener('mouseleave', this.handleMouseLeave);
      });

      // Magnetic button effect (desktop only)
      if (!window.matchMedia('(pointer: coarse)').matches) {
        document.querySelectorAll('.btn-magnetic').forEach(btn => {
          btn.addEventListener('mousemove', this.handleMagneticMove);
          btn.addEventListener('mouseleave', this.handleMagneticLeave);
        });
      }
    }

    handleMouseMove(e) {
      const rect = this.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      this.style.setProperty('--x', `${x}%`);
      this.style.setProperty('--y', `${y}%`);
    }

    handleMouseLeave() {
      this.style.setProperty('--x', '50%');
      this.style.setProperty('--y', '50%');
    }

    handleMagneticMove(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    }

    handleMagneticLeave() {
      this.style.transform = 'translate(0, 0)';
    }
  }

  // ============================================
  // PARALLAX CONTROLLER
  // ============================================
  class ParallaxController {
    constructor() {
      this.elements = [];
      this.ticking = false;
      this.init();
    }

    init() {
      if (prefersReducedMotion()) return;

      // Find parallax elements
      document.querySelectorAll('[data-parallax]').forEach(el => {
        this.elements.push({
          element: el,
          speed: parseFloat(el.dataset.parallax) || 0.5
        });
      });

      if (this.elements.length > 0) {
        window.addEventListener('scroll', throttle(this.handleScroll.bind(this), 16));
      }
    }

    handleScroll() {
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this.updateParallax();
          this.ticking = false;
        });
        this.ticking = true;
      }
    }

    updateParallax() {
      const scrollY = window.scrollY;
      
      this.elements.forEach(({ element, speed }) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const offset = (scrollY - elementTop + window.innerHeight) * speed;
        
        element.style.transform = `translateY(${offset}px)`;
      });
    }
  }

  // ============================================
  // NAVIGATION CONTROLLER
  // ============================================
  class NavigationController {
    constructor() {
      this.header = null;
      this.lastScrollY = 0;
      this.init();
    }

    init() {
      this.header = document.querySelector('.site-header');
      if (!this.header) return;

      window.addEventListener('scroll', throttle(this.handleScroll.bind(this), 100));
    }

    handleScroll() {
      const currentScrollY = window.scrollY;
      
      // Add/remove scrolled class
      if (currentScrollY > 50) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }

      // Hide/show on scroll direction (optional)
      if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
        this.header.classList.add('hidden');
      } else {
        this.header.classList.remove('hidden');
      }

      this.lastScrollY = currentScrollY;
    }
  }

  // ============================================
  // SMOOTH SCROLL CONTROLLER
  // ============================================
  class SmoothScrollController {
    constructor() {
      this.init();
    }

    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', this.handleClick.bind(this));
      });
    }

    handleClick(e) {
      const href = e.currentTarget.getAttribute('href');
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
    }
  }

  // ============================================
  // TYPING EFFECT CONTROLLER
  // ============================================
  class TypingEffectController {
    constructor() {
      this.elements = [];
      this.init();
    }

    init() {
      if (prefersReducedMotion()) {
        // Show all text immediately
        document.querySelectorAll('[data-typing]').forEach(el => {
          el.textContent = el.dataset.typing;
        });
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.typeText(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      document.querySelectorAll('[data-typing]').forEach(el => {
        observer.observe(el);
      });
    }

    typeText(element) {
      const text = element.dataset.typing;
      const speed = parseInt(element.dataset.typingSpeed) || 50;
      let index = 0;

      element.textContent = '';
      element.classList.add('typing');

      const type = () => {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
          setTimeout(type, speed);
        } else {
          element.classList.remove('typing');
          element.classList.add('typing-complete');
        }
      };

      type();
    }
  }

  // ============================================
  // CARD 3D TILT EFFECT
  // ============================================
  class CardTiltController {
    constructor() {
      this.init();
    }

    init() {
      // Only on desktop
      if (window.matchMedia('(pointer: coarse)').matches) return;
      if (prefersReducedMotion()) return;

      document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', this.handleMouseMove.bind(this));
        card.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
      });
    }

    handleMouseMove(e) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    }

    handleMouseLeave(e) {
      const card = e.currentTarget;
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }
  }

  // ============================================
  // LAZY LOADING CONTROLLER
  // ============================================
  class LazyLoadController {
    constructor() {
      this.init();
    }

    init() {
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
        // Fallback for older browsers
        lazyImages.forEach(img => {
          img.src = img.dataset.src;
          img.classList.add('loaded');
        });
      }
    }
  }

  // ============================================
  // CONFETTI EFFECT (for success states)
  // ============================================
  class ConfettiController {
    constructor() {
      this.colors = ['#0019A5', '#0050FF', '#00BFFF', '#00D4AA', '#FF4081'];
    }

    trigger(element, options = {}) {
      if (prefersReducedMotion()) return;

      const count = options.count || 30;
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      for (let i = 0; i < count; i++) {
        this.createParticle(centerX, centerY);
      }
    }

    createParticle(x, y) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${this.colors[Math.floor(Math.random() * this.colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        pointer-events: none;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
      `;

      document.body.appendChild(particle);

      const angle = Math.random() * Math.PI * 2;
      const velocity = 5 + Math.random() * 10;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity - 10;
      let posX = x;
      let posY = y;
      let rotation = 0;
      let rotationSpeed = (Math.random() - 0.5) * 20;
      let opacity = 1;

      const animate = () => {
        posX += vx;
        posY += vy + (20 - opacity * 20); // gravity
        rotation += rotationSpeed;
        opacity -= 0.02;

        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.transform = `rotate(${rotation}deg)`;
        particle.style.opacity = opacity;

        if (opacity > 0) {
          requestAnimationFrame(animate);
        } else {
          particle.remove();
        }
      };

      requestAnimationFrame(animate);
    }
  }

  // ============================================
  // INITIALIZE ALL CONTROLLERS
  // ============================================
  const init = () => {
    // Initialize all animation controllers
    new ScrollAnimator();
    new ButtonController();
    new ParallaxController();
    new NavigationController();
    new SmoothScrollController();
    new TypingEffectController();
    new CardTiltController();
    new LazyLoadController();

    // Expose confetti controller globally for use
    window.o2Confetti = new ConfettiController();

    // Add loaded class to body
    document.body.classList.add('animations-loaded');

    console.log('O2 Helpdesk animations initialized');
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialize for dynamically added content
  window.o2Animations = {
    refresh: () => {
      new ScrollAnimator();
    },
    triggerConfetti: (element, options) => {
      window.o2Confetti.trigger(element, options);
    }
  };

})();

# O2 Helpdesk Animation System

A complete, lightweight, and performant animation system for the O2 Helpdesk website. All animations are CSS-based with JavaScript for scroll triggers and interactions.

## Features

- **Pure CSS Animations** - No heavy libraries, 60fps performance
- **Scroll-Triggered Effects** - Elements animate as they enter viewport
- **Counter Animations** - Animated number counting for statistics
- **Hover Effects** - Smooth transitions on all interactive elements
- **Reduced Motion Support** - Respects `prefers-reduced-motion`
- **Mobile Optimized** - Works perfectly on all devices
- **Accessible** - ARIA-compliant and keyboard navigable

## Files Included

| File | Description |
|------|-------------|
| `o2-helpdesk-animations.css` | Complete CSS animation library |
| `o2-helpdesk-animations.js` | JavaScript for scroll triggers and interactions |
| `o2-helpdesk-demo.html` | Full demo page showcasing all animations |
| `o2-helpdesk-icons.svg` | SVG sprite with all icons |

## Quick Start

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="o2-helpdesk-animations.css">
</head>
<body>
  <!-- Your content -->
  
  <script src="o2-helpdesk-animations.js"></script>
</body>
</html>
```

## Animation Classes

### Scroll-Triggered Animations

Add these classes to elements you want to animate on scroll:

```html
<!-- Fade in from bottom -->
<div class="fade-in-up">Content</div>

<!-- Fade in from left -->
<div class="fade-in-left">Content</div>

<!-- Fade in from right -->
<div class="fade-in-right">Content</div>

<!-- Scale in -->
<div class="scale-in">Content</div>
```

### Staggered Animations

For lists or grids with staggered entrance:

```html
<div class="stagger-container">
  <div class="stagger-item">Item 1</div>
  <div class="stagger-item">Item 2</div>
  <div class="stagger-item">Item 3</div>
</div>
```

### Service Cards

```html
<div class="service-card">
  <div class="service-icon-wrapper">
    <svg class="service-icon" viewBox="0 0 24 24">
      <!-- Icon path -->
    </svg>
  </div>
  <h3>Service Title</h3>
  <p>Service description</p>
</div>
```

### Process Steps

```html
<div class="process-container">
  <div class="process-connector"></div>
  <div class="process-step">
    <div class="process-number">1</div>
    <h3>Step Title</h3>
    <p>Step description</p>
  </div>
  <!-- More steps... -->
</div>
```

### Stats Counter

```html
<div class="stat-card">
  <div class="stat-number">50K+</div>
  <div class="stat-label">Happy Customers</div>
</div>
```

### Testimonial Cards

```html
<div class="testimonial-card">
  <svg class="quote-mark" viewBox="0 0 24 24">
    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
  </svg>
  <p class="testimonial-content">Quote text...</p>
  <div class="testimonial-author">
    <div class="author-avatar">AB</div>
    <div class="author-info">
      <h4>Author Name</h4>
      <p>Customer since 2020</p>
    </div>
  </div>
</div>
```

### Trust Indicators

```html
<div class="trust-indicators">
  <div class="trust-item">
    <svg class="checkmark-icon" viewBox="0 0 24 24">
      <circle class="checkmark-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
      <path class="checkmark-path" d="M9 12l2 2 4-4" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>
    <span>Feature text</span>
  </div>
</div>
```

### Buttons

```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-magnetic">Magnetic Effect</button>
```

### Hero Section

```html
<section class="hero animated-gradient-bg">
  <div class="particles-overlay">
    <div class="particle"></div>
    <!-- More particles... -->
  </div>
  
  <div class="support-bubbles-container">
    <div class="support-bubble">
      <!-- Icon -->
    </div>
    <!-- More bubbles... -->
  </div>
  
  <div class="phone-icon-container">
    <div class="phone-pulse-ring"></div>
    <svg class="phone-icon" viewBox="0 0 24 24">
      <!-- Phone icon -->
    </svg>
  </div>
  
  <h1 class="hero-title">Title</h1>
  <p class="hero-subtitle">Subtitle</p>
  <div class="hero-cta">
    <a href="#" class="btn btn-primary">Call Now</a>
  </div>
</section>
```

## Customization

### CSS Custom Properties

Override these variables to customize the design:

```css
:root {
  /* Brand Colors */
  --o2-blue: #0019A5;
  --o2-light-blue: #0050FF;
  --o2-cyan: #00BFFF;
  --o2-teal: #00D4AA;
  
  /* Animation Durations */
  --duration-fast: 0.2s;
  --duration-normal: 0.4s;
  --duration-slow: 0.8s;
  
  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 25, 165, 0.1);
  --shadow-md: 0 8px 24px rgba(0, 25, 165, 0.15);
  --shadow-lg: 0 16px 48px rgba(0, 25, 165, 0.2);
}
```

### Animation Timing

Adjust scroll trigger sensitivity:

```javascript
const CONFIG = {
  observer: {
    threshold: 0.15,  // Trigger when 15% visible
    rootMargin: '0px 0px -50px 0px'
  },
  counter: {
    duration: 2000,  // 2 seconds for counter animation
    easing: 'easeOutExpo'
  }
};
```

## JavaScript API

### Refresh Animations

After dynamically adding content:

```javascript
window.o2Animations.refresh();
```

### Trigger Confetti

For success states:

```javascript
window.o2Animations.triggerConfetti(element, { count: 30 });
```

## Performance Tips

1. **Use `transform` and `opacity`** - These are GPU-accelerated
2. **Avoid animating `width`, `height`, `top`, `left`** - These cause reflows
3. **Use `will-change` sparingly** - Only on elements that will animate
4. **Debounce scroll events** - Already handled by the animation system
5. **Use Intersection Observer** - Already used for scroll triggers

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## Accessibility

The animation system respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  /* All animations disabled */
}
```

Users with motion sensitivity will see static content instead.

## License

MIT License - Free for personal and commercial use.

---

Created for O2 Helpdesk - Independent Customer Support Service

/**
 * Application Logic
 * Main application functionality
 */

class App {
  constructor() {
    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    this.setupEventListeners();
    this.setupNavigation();
    this.setupFormValidation();
    this.animateOnScroll();
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // CTA Button click handler
    const ctaButton = select('#ctaButton');
    if (ctaButton) {
      on(ctaButton, 'click', () => {
        this.handleCtaClick();
      });
    }

    // Window scroll handler
    on(
      window,
      'scroll',
      throttle(() => {
        this.handleScroll();
      }, 100)
    );

    // Window resize handler
    on(
      window,
      'resize',
      debounce(() => {
        this.handleResize();
      }, 250)
    );
  }

  /**
   * Setup smooth navigation
   */
  setupNavigation() {
    const navLinks = selectAll('.nav-link');
    navLinks.forEach(link => {
      on(link, 'click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = select(targetId);
        if (targetElement) {
          scrollToElement(targetElement, 80);
        }
      });
    });
  }

  /**
   * Setup form validation
   */
  setupFormValidation() {
    const contactForm = select('#contactForm');
    if (contactForm) {
      on(contactForm, 'submit', e => {
        e.preventDefault();
        this.handleFormSubmit(e.target);
      });
    }
  }

  /**
   * Handle CTA button click
   */
  handleCtaClick() {
    const aboutSection = select('#about');
    if (aboutSection) {
      scrollToElement(aboutSection, 80);
    }
  }

  /**
   * Handle form submission
   * @param {HTMLFormElement} form - Form element
   */
  handleFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate form data
    if (this.validateFormData(data)) {
      // In a real application, you would send this data to a server
      console.log('Form submitted:', data);
      
      // Show success message
      this.showNotification('Message sent successfully!', 'success');
      
      // Reset form
      form.reset();
    } else {
      this.showNotification('Please fill in all fields correctly.', 'error');
    }
  }

  /**
   * Validate form data
   * @param {Object} data - Form data
   * @returns {boolean} Validation result
   */
  validateFormData(data) {
    const { name, email, message } = data;

    // Basic validation
    if (!name || !email || !message) {
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    return true;
  }

  /**
   * Show notification message
   * @param {string} message - Notification message
   * @param {string} type - Notification type (success, error, warning)
   */
  showNotification(message, type = 'info') {
    const notification = createElement('div', {
      class: `notification notification-${type}`,
      text: message,
    });

    document.body.appendChild(notification);

    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px 24px',
      borderRadius: '8px',
      backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
      color: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      zIndex: '9999',
      animation: 'fadeIn 0.3s ease-in-out',
    });

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.3s ease-in-out';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  /**
   * Handle window scroll
   */
  handleScroll() {
    const header = select('.header');
    if (window.scrollY > 100) {
      header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }

    // Animate elements on scroll
    this.animateOnScroll();
  }

  /**
   * Handle window resize
   */
  handleResize() {
    // Handle any resize-specific logic here
    console.log('Window resized:', window.innerWidth, window.innerHeight);
  }

  /**
   * Animate elements when they come into viewport
   */
  animateOnScroll() {
    const elements = selectAll('.feature-card, .section-title');
    elements.forEach(element => {
      if (isInViewport(element) && !element.classList.contains('fade-in')) {
        element.classList.add('fade-in');
      }
    });
  }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}

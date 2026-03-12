/**
 * Main JavaScript Entry Point
 * BoilerPlateloadingTest10000
 */

'use strict';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the application
  initApp();
});

/**
 * Initialize the application
 */
function initApp() {
  // Set current year in footer
  setCurrentYear();

  // Initialize navigation
  initNavigation();

  // Initialize forms
  initContactForm();

  // Initialize CTA button
  initCTAButton();

  // Initialize smooth scrolling
  initSmoothScrolling();

  // Log initialization
  console.log('✅ Application initialized successfully');
}

/**
 * Set current year in footer
 */
function setCurrentYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Initialize navigation toggle for mobile
 */
function initNavigation() {
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('is-open');

      // Update aria-expanded attribute
      const isOpen = navMenu.classList.contains('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', event => {
      if (!event.target.closest('.nav')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/**
 * Initialize contact form
 */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      // Validate form
      if (validateContactForm(data)) {
        // In a real application, you would send this data to a server
        console.log('Form submitted:', data);

        // Show success message
        showNotification('Message sent successfully!', 'success');

        // Reset form
        contactForm.reset();
      }
    });
  }
}

/**
 * Validate contact form data
 * @param {Object} data - Form data
 * @returns {boolean} - Validation result
 */
function validateContactForm(data) {
  const { name, email, message } = data;

  if (!name || name.trim().length < 2) {
    showNotification('Please enter a valid name', 'error');
    return false;
  }

  if (!validateEmail(email)) {
    showNotification('Please enter a valid email address', 'error');
    return false;
  }

  if (!message || message.trim().length < 10) {
    showNotification('Message must be at least 10 characters long', 'error');
    return false;
  }

  return true;
}

/**
 * Initialize CTA button
 */
function initCTAButton() {
  const ctaButton = document.getElementById('ctaButton');

  if (ctaButton) {
    ctaButton.addEventListener('click', () => {
      // Scroll to features section
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');

      // Skip if it's just "#"
      if (targetId === '#') {
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // Update URL without scrolling
        history.pushState(null, null, targetId);
      }
    });
  });
}

/**
 * Show notification message
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, info, warning)
 */
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;

  // Add styles
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '16px 24px',
    borderRadius: '8px',
    backgroundColor: getNotificationColor(type),
    color: '#ffffff',
    fontWeight: '500',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    zIndex: '9999',
    animation: 'slideInRight 0.3s ease-out',
  });

  // Add to DOM
  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

/**
 * Get notification color based on type
 * @param {string} type - Notification type
 * @returns {string} - Color value
 */
function getNotificationColor(type) {
  const colors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#06b6d4',
  };

  return colors[type] || colors.info;
}

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

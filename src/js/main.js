/**
 * Main JavaScript Entry Point
 * BoilerPlateloadingTest10000
 */

import { formatDate, debounce, addClass, removeClass } from './utils/helpers.js';

// DOM Elements
const ctaButton = document.getElementById('cta-button');
const contactForm = document.getElementById('contact-form');
const currentYearElement = document.getElementById('current-year');
const navLinks = document.querySelectorAll('.nav__link');

/**
 * Initialize the application
 */
function init() {
  // Set current year in footer
  setCurrentYear();

  // Setup event listeners
  setupEventListeners();

  // Smooth scroll for navigation
  setupSmoothScroll();

  // Log initialization
  console.log('Application initialized successfully!');
}

/**
 * Set current year in footer
 */
function setCurrentYear() {
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
  // CTA Button click
  if (ctaButton) {
    ctaButton.addEventListener('click', handleCtaClick);
  }

  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  // Window scroll with debounce
  window.addEventListener('scroll', debounce(handleScroll, 100));

  // Window resize with debounce
  window.addEventListener('resize', debounce(handleResize, 250));
}

/**
 * Handle CTA button click
 */
function handleCtaClick() {
  const featuresSection = document.getElementById('features');
  if (featuresSection) {
    featuresSection.scrollIntoView({ behavior: 'smooth' });
  }
  console.log('CTA button clicked!');
}

/**
 * Handle contact form submission
 * @param {Event} event - Form submit event
 */
function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  console.log('Form submitted with data:', data);

  // Show success message
  alert('Thank you for your message! We will get back to you soon.');

  // Reset form
  contactForm.reset();
}

/**
 * Setup smooth scrolling for navigation links
 */
function setupSmoothScroll() {
  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // Update active state
        updateActiveNavLink(link);
      }
    });
  });
}

/**
 * Update active navigation link
 * @param {HTMLElement} activeLink - The active link element
 */
function updateActiveNavLink(activeLink) {
  navLinks.forEach(link => {
    removeClass(link, 'active');
  });
  addClass(activeLink, 'active');
}

/**
 * Handle window scroll
 */
function handleScroll() {
  const scrollPosition = window.scrollY;

  // Add/remove header shadow based on scroll position
  const header = document.querySelector('.header');
  if (header) {
    if (scrollPosition > 50) {
      addClass(header, 'scrolled');
    } else {
      removeClass(header, 'scrolled');
    }
  }
}

/**
 * Handle window resize
 */
function handleResize() {
  const width = window.innerWidth;
  console.log('Window resized to:', width);
  
  // Add responsive logic here if needed
}

/**
 * Example API call function
 * @param {string} url - API endpoint
 * @returns {Promise} - Promise with response data
 */
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Initialize the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export functions for testing
export { init, handleCtaClick, handleFormSubmit, fetchData };

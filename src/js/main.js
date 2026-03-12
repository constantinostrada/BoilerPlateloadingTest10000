/**
 * Main JavaScript Entry Point
 * This file initializes the application and imports necessary modules
 */

import { formatDate, debounce, throttle } from './utils/helpers.js';

/**
 * Application State
 */
const state = {
  isInitialized: false,
  theme: 'light'
};

/**
 * Initialize the application
 */
function init() {
  if (state.isInitialized) {
    console.warn('Application already initialized');
    return;
  }

  console.warn('Initializing BoilerPlateloadingTest10000...');

  // Set up event listeners
  setupEventListeners();

  // Initialize components
  initializeComponents();

  // Mark as initialized
  state.isInitialized = true;

  console.warn('Application initialized successfully');
  console.warn(`Current time: ${formatDate(new Date())}`);
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
  // CTA Button
  const ctaButton = document.getElementById('ctaButton');
  if (ctaButton) {
    ctaButton.addEventListener('click', handleCtaClick);
  }

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', handleSmoothScroll);
  });

  // Window resize handler with debounce
  window.addEventListener('resize', debounce(handleResize, 250));

  // Window scroll handler with throttle
  window.addEventListener('scroll', throttle(handleScroll, 100));
}

/**
 * Initialize components
 */
function initializeComponents() {
  // Add active class to current section in navigation
  updateActiveNavLink();

  // Add animations on scroll (if elements are visible)
  observeElements();
}

/**
 * Handle CTA button click
 */
function handleCtaClick(event) {
  event.preventDefault();
  console.warn('CTA button clicked!');

  // Scroll to features section
  const featuresSection = document.getElementById('features');
  if (featuresSection) {
    featuresSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Handle form submission
 */
function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  console.warn('Form submitted with data:', data);

  // Show success message
  alert('Thank you for your message! We will get back to you soon.');

  // Reset form
  event.target.reset();
}

/**
 * Handle smooth scrolling for navigation links
 */
function handleSmoothScroll(event) {
  event.preventDefault();

  const targetId = event.currentTarget.getAttribute('href');
  const targetSection = document.querySelector(targetId);

  if (targetSection) {
    const headerOffset = 70;
    const elementPosition = targetSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * Handle window resize
 */
function handleResize() {
  console.warn('Window resized:', {
    width: window.innerWidth,
    height: window.innerHeight
  });
}

/**
 * Handle window scroll
 */
function handleScroll() {
  updateActiveNavLink();
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 100) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

/**
 * Observe elements for intersection (scroll animations)
 */
function observeElements() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => observer.observe(card));
}

/**
 * Start the application when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/**
 * Export state for debugging (optional)
 */
window.__APP_STATE__ = state;

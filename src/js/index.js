/**
 * Main JavaScript Entry Point
 * BoilerPlateloadingTest10000
 */

import { initNavigation } from './modules/navigation.js';
import { initContactForm } from './modules/contact.js';
import { initSmoothScroll } from './modules/smoothScroll.js';
import { logger } from './utils/logger.js';

/**
 * Initialize the application
 */
const initApp = () => {
  try {
    logger.info('Initializing application...');

    // Initialize navigation
    initNavigation();

    // Initialize contact form
    initContactForm();

    // Initialize smooth scroll
    initSmoothScroll();

    logger.info('Application initialized successfully');
  } catch (error) {
    logger.error('Error initializing application:', error);
  }
};

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    logger.info('Page hidden');
  } else {
    logger.info('Page visible');
  }
});

// Handle online/offline events
window.addEventListener('online', () => {
  logger.info('Browser is online');
});

window.addEventListener('offline', () => {
  logger.warn('Browser is offline');
});

export { initApp };

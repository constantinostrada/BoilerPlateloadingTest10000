/**
 * Main entry point for the application
 */

import { App } from './app.js';
import { logger } from './utils/logger.js';

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  logger.info('DOM Content Loaded - Initializing application...');

  try {
    const app = new App();
    app.init();
    logger.info('Application initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize application:', error);
  }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    logger.info('Page is now hidden');
  } else {
    logger.info('Page is now visible');
  }
});

// Handle errors globally
window.addEventListener('error', event => {
  logger.error('Global error:', event.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', event => {
  logger.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

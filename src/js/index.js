/**
 * Main Application Entry Point
 */

import { Counter } from './modules/counter.js';
import { initNavigation } from './modules/navigation.js';
import { logger } from './utils/logger.js';

/**
 * Initialize the application
 */
const init = () => {
  logger.info('Initializing application...');

  // Initialize navigation
  initNavigation();

  // Initialize counter component
  const counter = new Counter('counter-value');

  // Set up event listeners for counter buttons
  const incrementBtn = document.getElementById('increment-btn');
  const decrementBtn = document.getElementById('decrement-btn');
  const resetBtn = document.getElementById('reset-btn');

  if (incrementBtn) {
    incrementBtn.addEventListener('click', () => {
      counter.increment();
      logger.info(`Counter incremented to: ${counter.getValue()}`);
    });
  }

  if (decrementBtn) {
    decrementBtn.addEventListener('click', () => {
      counter.decrement();
      logger.info(`Counter decremented to: ${counter.getValue()}`);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      counter.reset();
      logger.info('Counter reset to 0');
    });
  }

  // CTA Button interaction
  const ctaButton = document.getElementById('cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', () => {
      logger.info('CTA button clicked');
      alert('Welcome to BoilerPlateloadingTest10000!');
    });
  }

  logger.info('Application initialized successfully');
};

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for potential external use
export { init };

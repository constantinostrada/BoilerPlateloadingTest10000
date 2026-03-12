/**
 * Smooth Scroll Module
 * Handles smooth scrolling for anchor links
 */

import { logger } from '../utils/logger.js';

/**
 * Initialize smooth scroll functionality
 */
export const initSmoothScroll = () => {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', handleSmoothScroll);
  });

  logger.info('Smooth scroll initialized');
};

/**
 * Handle smooth scroll on link click
 * @param {Event} event - Click event
 */
const handleSmoothScroll = event => {
  const href = event.currentTarget.getAttribute('href');

  // Skip if href is just "#"
  if (href === '#') {
    event.preventDefault();
    return;
  }

  const targetId = href.substring(1);
  const targetElement = document.getElementById(targetId);

  if (!targetElement) {
    return;
  }

  event.preventDefault();

  const headerHeight = document.querySelector('.header').offsetHeight;
  const targetPosition = targetElement.offsetTop - headerHeight;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });

  logger.info(`Scrolled to section: ${targetId}`);
};

/**
 * Scroll to top of page
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  logger.info('Scrolled to top');
};

/**
 * Scroll to element by ID
 * @param {string} elementId - Element ID to scroll to
 */
export const scrollToElement = elementId => {
  const element = document.getElementById(elementId);

  if (!element) {
    logger.warn(`Element with ID "${elementId}" not found`);
    return;
  }

  const headerHeight = document.querySelector('.header').offsetHeight;
  const targetPosition = element.offsetTop - headerHeight;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });

  logger.info(`Scrolled to element: ${elementId}`);
};

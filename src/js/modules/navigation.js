/**
 * Navigation Module
 * Handles mobile navigation toggle and active states
 */

import { logger } from '../utils/logger.js';

/**
 * Initialize navigation functionality
 */
export const initNavigation = () => {
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!navToggle || !navMenu) {
    logger.warn('Navigation elements not found');
    return;
  }

  // Toggle mobile menu
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    logger.info('Navigation menu toggled');
  });

  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      logger.info('Navigation menu closed');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', event => {
    if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
      navMenu.classList.remove('active');
    }
  });

  // Handle scroll to add/remove shadow
  let lastScroll = 0;
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.style.boxShadow = 'var(--shadow-md)';
    } else {
      header.style.boxShadow = 'var(--shadow-sm)';
    }

    lastScroll = currentScroll;
  });

  logger.info('Navigation initialized');
};

/**
 * Set active navigation link based on current section
 */
export const setActiveNavLink = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
};

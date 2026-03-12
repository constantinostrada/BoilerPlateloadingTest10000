/**
 * Contact Form Module
 * Handles form validation and submission
 */

import { logger } from '../utils/logger.js';
import { validateEmail } from '../utils/validation.js';

/**
 * Initialize contact form functionality
 */
export const initContactForm = () => {
  const form = document.getElementById('contactForm');

  if (!form) {
    logger.warn('Contact form not found');
    return;
  }

  form.addEventListener('submit', handleFormSubmit);
  logger.info('Contact form initialized');
};

/**
 * Handle form submission
 * @param {Event} event - Submit event
 */
const handleFormSubmit = event => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Validate form data
  if (!validateForm(data)) {
    return;
  }

  // Submit form data
  submitForm(data)
    .then(response => {
      logger.info('Form submitted successfully', response);
      showSuccessMessage('Thank you! Your message has been sent.');
      form.reset();
    })
    .catch(error => {
      logger.error('Form submission failed', error);
      showErrorMessage('Oops! Something went wrong. Please try again.');
    });
};

/**
 * Validate form data
 * @param {Object} data - Form data
 * @returns {boolean} - Validation result
 */
const validateForm = data => {
  const errors = [];

  // Validate name
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  // Validate email
  if (!data.email || !validateEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }

  // Validate message
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  if (errors.length > 0) {
    showErrorMessage(errors.join('. '));
    return false;
  }

  return true;
};

/**
 * Submit form data to server
 * @param {Object} data - Form data
 * @returns {Promise} - Submission promise
 */
const submitForm = async data => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success (90% success rate for demo)
      if (Math.random() > 0.1) {
        resolve({ success: true, message: 'Form submitted successfully' });
      } else {
        reject(new Error('Submission failed'));
      }
    }, 1000);
  });
};

/**
 * Show success message
 * @param {string} message - Success message
 */
const showSuccessMessage = message => {
  alert(message); // In production, use a proper toast/notification system
};

/**
 * Show error message
 * @param {string} message - Error message
 */
const showErrorMessage = message => {
  alert(message); // In production, use a proper toast/notification system
};

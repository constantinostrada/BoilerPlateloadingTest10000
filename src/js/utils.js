/**
 * Utility Functions
 * BoilerPlateloadingTest10000
 */

'use strict';

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait = 300) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit how often a function can be called
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit = 300) {
  let inThrottle;

  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Validate email address
 * @param {string} email - Email address to validate
 * @returns {boolean} - Validation result
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Format date to locale string
 * @param {Date|string|number} date - Date to format
 * @param {string} locale - Locale string (default: 'en-US')
 * @returns {string} - Formatted date string
 */
function formatDate(date, locale = 'en-US') {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} - Cloned object
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }

  if (obj instanceof Object) {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}

/**
 * Get element by ID with error handling
 * @param {string} id - Element ID
 * @returns {HTMLElement|null} - Element or null
 */
function getElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with id "${id}" not found`);
  }
  return element;
}

/**
 * Get elements by selector with error handling
 * @param {string} selector - CSS selector
 * @param {HTMLElement} context - Context element (default: document)
 * @returns {NodeList} - NodeList of elements
 */
function getElements(selector, context = document) {
  const elements = context.querySelectorAll(selector);
  if (elements.length === 0) {
    console.warn(`No elements found with selector "${selector}"`);
  }
  return elements;
}

/**
 * Add class to element
 * @param {HTMLElement} element - Target element
 * @param {string|string[]} className - Class name(s) to add
 */
function addClass(element, className) {
  if (!element) {
    return;
  }

  if (Array.isArray(className)) {
    element.classList.add(...className);
  } else {
    element.classList.add(className);
  }
}

/**
 * Remove class from element
 * @param {HTMLElement} element - Target element
 * @param {string|string[]} className - Class name(s) to remove
 */
function removeClass(element, className) {
  if (!element) {
    return;
  }

  if (Array.isArray(className)) {
    element.classList.remove(...className);
  } else {
    element.classList.remove(className);
  }
}

/**
 * Toggle class on element
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name to toggle
 */
function toggleClass(element, className) {
  if (!element) {
    return;
  }

  element.classList.toggle(className);
}

/**
 * Check if element has class
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name to check
 * @returns {boolean} - True if element has class
 */
function hasClass(element, className) {
  if (!element) {
    return false;
  }

  return element.classList.contains(className);
}

/**
 * Local storage helper functions
 */
const storage = {
  /**
   * Set item in local storage
   * @param {string} key - Storage key
   * @param {*} value - Value to store (will be JSON stringified)
   */
  set(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  /**
   * Get item from local storage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key not found
   * @returns {*} - Parsed value or default value
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },

  /**
   * Remove item from local storage
   * @param {string} key - Storage key
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  /**
   * Clear all items from local storage
   */
  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

/**
 * Generate random ID
 * @param {number} length - Length of ID
 * @returns {string} - Random ID
 */
function generateId(length = 16) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Check if user prefers dark mode
 * @returns {boolean} - True if user prefers dark mode
 */
function prefersDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Check if user prefers reduced motion
 * @returns {boolean} - True if user prefers reduced motion
 */
function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

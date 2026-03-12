/**
 * Utility Functions
 * Collection of reusable helper functions
 */

/**
 * Debounce function to limit rate of function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit function execution frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
const throttle = (func, limit = 300) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Select DOM element
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (optional)
 * @returns {Element|null} Selected element
 */
const select = (selector, parent = document) => parent.querySelector(selector);

/**
 * Select all DOM elements
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (optional)
 * @returns {NodeList} List of selected elements
 */
const selectAll = (selector, parent = document) =>
  parent.querySelectorAll(selector);

/**
 * Add event listener to element(s)
 * @param {Element|NodeList} element - Element(s) to attach listener to
 * @param {string} event - Event type
 * @param {Function} handler - Event handler function
 */
const on = (element, event, handler) => {
  if (element instanceof NodeList) {
    element.forEach(el => el.addEventListener(event, handler));
  } else {
    element.addEventListener(event, handler);
  }
};

/**
 * Remove event listener from element(s)
 * @param {Element|NodeList} element - Element(s) to remove listener from
 * @param {string} event - Event type
 * @param {Function} handler - Event handler function
 */
const off = (element, event, handler) => {
  if (element instanceof NodeList) {
    element.forEach(el => el.removeEventListener(event, handler));
  } else {
    element.removeEventListener(event, handler);
  }
};

/**
 * Create a new DOM element with attributes
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - Element attributes
 * @returns {Element} Created element
 */
const createElement = (tag, attributes = {}) => {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'class') {
      element.className = value;
    } else if (key === 'text') {
      element.textContent = value;
    } else if (key === 'html') {
      element.innerHTML = value;
    } else {
      element.setAttribute(key, value);
    }
  });
  return element;
};

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
const formatDate = date => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

/**
 * Smooth scroll to element
 * @param {string|Element} target - Target element or selector
 * @param {number} offset - Offset from top (optional)
 */
const scrollToElement = (target, offset = 0) => {
  const element =
    typeof target === 'string' ? select(target) : target;
  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }
};

/**
 * Check if element is in viewport
 * @param {Element} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
const isInViewport = element => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Local storage helper functions
 */
const storage = {
  get: key => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  },
  remove: key => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
};

/**
 * Export utility functions
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    debounce,
    throttle,
    select,
    selectAll,
    on,
    off,
    createElement,
    formatDate,
    generateId,
    scrollToElement,
    isInViewport,
    storage,
  };
}

/**
 * Logger Utility
 * Provides consistent logging throughout the application
 */

const isDevelopment = window.location.hostname === 'localhost';

/**
 * Logger object with different log levels
 */
export const logger = {
  /**
   * Log info messages
   * @param {string} message - Message to log
   * @param {*} data - Optional data to log
   */
  info: (message, data = null) => {
    if (isDevelopment) {
      if (data) {
        console.log(`ℹ️ ${message}`, data);
      } else {
        console.log(`ℹ️ ${message}`);
      }
    }
  },

  /**
   * Log warning messages
   * @param {string} message - Message to log
   * @param {*} data - Optional data to log
   */
  warn: (message, data = null) => {
    if (isDevelopment) {
      if (data) {
        console.warn(`⚠️ ${message}`, data);
      } else {
        console.warn(`⚠️ ${message}`);
      }
    }
  },

  /**
   * Log error messages
   * @param {string} message - Message to log
   * @param {*} error - Optional error object to log
   */
  error: (message, error = null) => {
    if (error) {
      console.error(`❌ ${message}`, error);
    } else {
      console.error(`❌ ${message}`);
    }
  },

  /**
   * Log debug messages (only in development)
   * @param {string} message - Message to log
   * @param {*} data - Optional data to log
   */
  debug: (message, data = null) => {
    if (isDevelopment) {
      if (data) {
        console.debug(`🐛 ${message}`, data);
      } else {
        console.debug(`🐛 ${message}`);
      }
    }
  },
};

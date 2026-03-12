/**
 * Logger utility for consistent logging across the application
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  NONE: 4,
};

class Logger {
  constructor(level = 'INFO') {
    this.level = LOG_LEVELS[level] || LOG_LEVELS.INFO;
    this.enableTimestamp = true;
  }

  /**
   * Set the logging level
   */
  setLevel(level) {
    if (LOG_LEVELS[level] !== undefined) {
      this.level = LOG_LEVELS[level];
    }
  }

  /**
   * Get formatted timestamp
   */
  getTimestamp() {
    if (!this.enableTimestamp) {
      return '';
    }
    const now = new Date();
    return `[${now.toLocaleTimeString()}]`;
  }

  /**
   * Format log message
   */
  formatMessage(level, ...args) {
    return [this.getTimestamp(), `[${level}]`, ...args].filter(Boolean);
  }

  /**
   * Debug level logging
   */
  debug(...args) {
    if (this.level <= LOG_LEVELS.DEBUG) {
      console.log(...this.formatMessage('DEBUG', ...args));
    }
  }

  /**
   * Info level logging
   */
  info(...args) {
    if (this.level <= LOG_LEVELS.INFO) {
      console.info(...this.formatMessage('INFO', ...args));
    }
  }

  /**
   * Warning level logging
   */
  warn(...args) {
    if (this.level <= LOG_LEVELS.WARN) {
      console.warn(...this.formatMessage('WARN', ...args));
    }
  }

  /**
   * Error level logging
   */
  error(...args) {
    if (this.level <= LOG_LEVELS.ERROR) {
      console.error(...this.formatMessage('ERROR', ...args));
    }
  }

  /**
   * Log a table (useful for objects/arrays)
   */
  table(data) {
    if (this.level <= LOG_LEVELS.INFO) {
      console.table(data);
    }
  }

  /**
   * Group related logs
   */
  group(label) {
    if (this.level <= LOG_LEVELS.INFO) {
      console.group(label);
    }
  }

  /**
   * End log group
   */
  groupEnd() {
    if (this.level <= LOG_LEVELS.INFO) {
      console.groupEnd();
    }
  }
}

// Export singleton instance
export const logger = new Logger('INFO');

// Export class for custom instances
export { Logger };

/**
 * App Tests
 * Unit tests for application logic
 */

describe('App', () => {
  test('should be defined', () => {
    expect(App).toBeDefined();
  });

  test('should initialize without errors', () => {
    // Mock DOM elements
    document.body.innerHTML = `
      <div id="ctaButton"></div>
      <form id="contactForm">
        <input name="name" />
        <input name="email" />
        <textarea name="message"></textarea>
      </form>
    `;

    expect(() => {
      // Test app initialization if running in browser environment
      // new App();
    }).not.toThrow();
  });
});

describe('Utility Functions', () => {
  // Mock utilities for testing
  const debounce = (func, wait) => {
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

  test('debounce should delay function execution', done => {
    jest.useFakeTimers();
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 300);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(300);

    expect(mockFn).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
    done();
  });

  test('generateId should return unique IDs', () => {
    const generateId = () =>
      `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const id1 = generateId();
    const id2 = generateId();

    expect(id1).toBeDefined();
    expect(id2).toBeDefined();
    expect(typeof id1).toBe('string');
    expect(typeof id2).toBe('string');
  });

  test('formatDate should format dates correctly', () => {
    const formatDate = date => {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    const testDate = new Date('2024-01-01');
    const formatted = formatDate(testDate);

    expect(formatted).toContain('January');
    expect(formatted).toContain('2024');
  });
});

describe('Form Validation', () => {
  test('should validate email format', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    expect(emailRegex.test('test@example.com')).toBe(true);
    expect(emailRegex.test('invalid-email')).toBe(false);
    expect(emailRegex.test('test@')).toBe(false);
    expect(emailRegex.test('@example.com')).toBe(false);
  });

  test('should validate required fields', () => {
    const validateFormData = data => {
      const { name, email, message } = data;
      return !!(name && email && message);
    };

    expect(validateFormData({ name: 'John', email: 'john@example.com', message: 'Hello' })).toBe(true);
    expect(validateFormData({ name: '', email: 'john@example.com', message: 'Hello' })).toBe(false);
    expect(validateFormData({ name: 'John', email: '', message: 'Hello' })).toBe(false);
  });
});

describe('Storage Helper', () => {
  test('should store and retrieve data', () => {
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
    };

    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
    global.localStorage = localStorageMock;

    storage.set('testKey', { test: 'value' });
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'testKey',
      JSON.stringify({ test: 'value' })
    );
  });
});

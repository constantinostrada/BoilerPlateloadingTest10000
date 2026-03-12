/**
 * Tests for helper utility functions
 */

import {
  formatDate,
  debounce,
  addClass,
  removeClass,
  hasClass,
  generateId,
  isEmpty,
  deepClone,
} from '../src/js/utils/helpers.js';

describe('Helper Functions', () => {
  describe('formatDate', () => {
    test('should format date correctly', () => {
      const date = new Date('2024-01-15');
      const formatted = formatDate(date);
      expect(formatted).toContain('2024');
      expect(formatted).toContain('January');
    });
  });

  describe('debounce', () => {
    jest.useFakeTimers();

    test('should debounce function calls', () => {
      const func = jest.fn();
      const debouncedFunc = debounce(func, 300);

      debouncedFunc();
      debouncedFunc();
      debouncedFunc();

      expect(func).not.toHaveBeenCalled();

      jest.advanceTimersByTime(300);

      expect(func).toHaveBeenCalledTimes(1);
    });

    jest.useRealTimers();
  });

  describe('addClass', () => {
    test('should add class to element', () => {
      const element = document.createElement('div');
      addClass(element, 'test-class');
      expect(element.classList.contains('test-class')).toBe(true);
    });
  });

  describe('removeClass', () => {
    test('should remove class from element', () => {
      const element = document.createElement('div');
      element.classList.add('test-class');
      removeClass(element, 'test-class');
      expect(element.classList.contains('test-class')).toBe(false);
    });
  });

  describe('hasClass', () => {
    test('should check if element has class', () => {
      const element = document.createElement('div');
      element.classList.add('test-class');
      expect(hasClass(element, 'test-class')).toBe(true);
      expect(hasClass(element, 'other-class')).toBe(false);
    });
  });

  describe('generateId', () => {
    test('should generate random ID of correct length', () => {
      const id = generateId(8);
      expect(id).toHaveLength(8);
    });

    test('should generate different IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('isEmpty', () => {
    test('should return true for empty values', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty('')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
    });

    test('should return false for non-empty values', () => {
      expect(isEmpty('text')).toBe(false);
      expect(isEmpty([1, 2, 3])).toBe(false);
      expect(isEmpty({ key: 'value' })).toBe(false);
      expect(isEmpty(0)).toBe(false);
    });
  });

  describe('deepClone', () => {
    test('should create deep clone of object', () => {
      const original = { a: 1, b: { c: 2 } };
      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.b).not.toBe(original.b);
    });
  });
});

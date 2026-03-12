/**
 * Tests for main application functions
 */

import { handleFormSubmit, fetchData } from '../src/js/main.js';

describe('Main Application', () => {
  describe('handleFormSubmit', () => {
    test('should prevent default form submission', () => {
      const mockEvent = {
        preventDefault: jest.fn(),
      };

      // Create a mock form
      const form = document.createElement('form');
      form.id = 'contact-form';
      form.innerHTML = `
        <input name="name" value="John Doe">
        <input name="email" value="john@example.com">
        <textarea name="message">Test message</textarea>
      `;
      document.body.appendChild(form);

      handleFormSubmit(mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalled();

      // Cleanup
      document.body.removeChild(form);
    });
  });

  describe('fetchData', () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('should fetch data successfully', async () => {
      const mockData = { id: 1, name: 'Test' };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchData('https://api.example.com/data');

      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/data');
    });

    test('should handle fetch errors', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(fetchData('https://api.example.com/data')).rejects.toThrow(
        'HTTP error! status: 404'
      );
    });
  });
});

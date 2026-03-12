/**
 * Counter Module
 * Manages counter state and updates the UI
 */

export class Counter {
  constructor(elementId, initialValue = 0) {
    this.value = initialValue;
    this.element = document.getElementById(elementId);

    if (!this.element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    this.render();
  }

  /**
   * Get the current counter value
   * @returns {number} Current value
   */
  getValue() {
    return this.value;
  }

  /**
   * Set a new counter value
   * @param {number} newValue - The new value to set
   */
  setValue(newValue) {
    if (typeof newValue !== 'number') {
      throw new TypeError('Value must be a number');
    }
    this.value = newValue;
    this.render();
  }

  /**
   * Increment the counter
   * @param {number} amount - Amount to increment by (default: 1)
   */
  increment(amount = 1) {
    this.value += amount;
    this.render();
  }

  /**
   * Decrement the counter
   * @param {number} amount - Amount to decrement by (default: 1)
   */
  decrement(amount = 1) {
    this.value -= amount;
    this.render();
  }

  /**
   * Reset the counter to zero
   */
  reset() {
    this.value = 0;
    this.render();
  }

  /**
   * Render the counter value to the DOM
   */
  render() {
    if (this.element) {
      this.element.textContent = this.value;

      // Add visual feedback for positive/negative values
      this.element.style.color =
        this.value > 0 ? '#2ecc71' : this.value < 0 ? '#e74c3c' : '#3498db';
    }
  }
}

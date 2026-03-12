/**
 * Main Entry Point
 * Initialize the application when DOM is ready
 */

/**
 * Wait for DOM to be fully loaded
 */
const ready = callback => {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
};

/**
 * Initialize application
 */
ready(() => {
  // Initialize the app
  const app = new App();

  // Log initialization
  console.log('BoilerPlateloadingTest10000 initialized successfully!');

  // Add any additional initialization logic here
  initializeAnalytics();
  checkBrowserCompatibility();
});

/**
 * Initialize analytics (placeholder)
 */
function initializeAnalytics() {
  // Add your analytics initialization here
  // Example: Google Analytics, Mixpanel, etc.
  console.log('Analytics initialized');
}

/**
 * Check browser compatibility
 */
function checkBrowserCompatibility() {
  const features = {
    localStorage: typeof Storage !== 'undefined',
    promise: typeof Promise !== 'undefined',
    fetch: typeof fetch !== 'undefined',
    es6: () => {
      try {
        eval('const test = (x) => x;');
        return true;
      } catch (e) {
        return false;
      }
    },
  };

  const unsupportedFeatures = Object.entries(features)
    .filter(([, supported]) =>
      typeof supported === 'function' ? !supported() : !supported
    )
    .map(([feature]) => feature);

  if (unsupportedFeatures.length > 0) {
    console.warn(
      'Your browser does not support the following features:',
      unsupportedFeatures.join(', ')
    );
  } else {
    console.log('All features are supported!');
  }
}

/**
 * Service Worker registration (for PWA support)
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment when you have a service worker file
    // navigator.serviceWorker
    //   .register('/service-worker.js')
    //   .then(registration => {
    //     console.log('ServiceWorker registered:', registration);
    //   })
    //   .catch(error => {
    //     console.log('ServiceWorker registration failed:', error);
    //   });
  });
}

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled promise rejection:', event.reason);
});

/**
 * Handle errors
 */
window.addEventListener('error', event => {
  console.error('Global error:', event.error);
});

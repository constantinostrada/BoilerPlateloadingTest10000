/**
 * Navigation Module
 * Handles smooth scrolling and active link states
 */

/**
 * Initialize navigation behavior
 */
export const initNavigation = () => {
  const navLinks = document.querySelectorAll('.navbar__link');

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href');

      // Only handle internal links
      if (href && href.startsWith('#')) {
        event.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          smoothScrollTo(targetElement);
          updateActiveLink(link);
        }
      }
    });
  });

  // Update active link on scroll
  window.addEventListener('scroll', () => {
    updateActiveNavOnScroll();
  });
};

/**
 * Smooth scroll to a target element
 * @param {HTMLElement} element - Target element to scroll to
 */
const smoothScrollTo = element => {
  const targetPosition = element.offsetTop - 80; // Account for fixed header
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 800;
  let start = null;

  const animation = currentTime => {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  requestAnimationFrame(animation);
};

/**
 * Easing function for smooth scroll
 * @param {number} t - Current time
 * @param {number} b - Start value
 * @param {number} c - Change in value
 * @param {number} d - Duration
 * @returns {number} Calculated position
 */
const ease = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

/**
 * Update active link state
 * @param {HTMLElement} activeLink - The link to set as active
 */
const updateActiveLink = activeLink => {
  const navLinks = document.querySelectorAll('.navbar__link');
  navLinks.forEach(link => link.classList.remove('active'));
  activeLink.classList.add('active');
};

/**
 * Update active navigation link based on scroll position
 */
const updateActiveNavOnScroll = () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.pageYOffset + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      const correspondingLink = document.querySelector(
        `.navbar__link[href="#${sectionId}"]`
      );
      if (correspondingLink) {
        updateActiveLink(correspondingLink);
      }
    }
  });
};

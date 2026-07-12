import { useEffect } from 'react';

/**
 * Automatically applies scroll-reveal animations to elements across the entire app.
 * Targets specific classes dynamically as they are mounted by React.
 */
export default function GlobalScrollObserver() {
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          intersectionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // The classes we want to automatically animate when they scroll into view
    const targetSelectors = [
      '.animate-reveal',
      '.scroll-reveal',
      '.product-card',
      '.category-card',
      '.section-header',
      '.feature-card',
      '.about-block',
      '.info-panel'
    ].join(', ');

    // 1. Observe elements currently in the DOM
    const observeExisting = () => {
      document.querySelectorAll(targetSelectors).forEach((el) => {
        if (!el.classList.contains('is-visible')) {
          // Pre-add the animate-reveal base class if it's not already there
          // so it gets the CSS transition rules
          el.classList.add('animate-reveal');
          intersectionObserver.observe(el);
        }
      });
    };

    observeExisting();

    // 2. Observe elements as React mounts them (Route changes, etc)
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldScan = false;
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          shouldScan = true;
        }
      });
      
      if (shouldScan) {
        observeExisting();
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}

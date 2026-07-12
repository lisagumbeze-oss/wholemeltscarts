import { useEffect, useRef } from 'react';

/**
 * Hook to apply a CSS class when an element scrolls into view.
 * Default behavior: adds 'is-visible' class when 12% of the element is visible.
 */
export function useScrollReveal(options = {}) {
  const { 
    threshold = 0.12, 
    rootMargin = '0px 0px -40px 0px',
    activeClass = 'is-visible'
  } = options;
  
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(activeClass);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, activeClass]);

  return ref;
}

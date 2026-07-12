import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * A wrapper component that applies a fade-up reveal animation when scrolled into view.
 */
export default function ScrollReveal({ 
  children, 
  className = '', 
  as: Component = 'div',
  delay = 0,
  ...props 
}) {
  const ref = useScrollReveal();

  const baseClass = 'scroll-reveal';
  const delayClass = delay > 0 && delay <= 3 ? `scroll-reveal--delay-${delay}` : '';
  const combinedClassName = `${baseClass} ${delayClass} ${className}`.trim();

  return (
    <Component ref={ref} className={combinedClassName} {...props}>
      {children}
    </Component>
  );
}

import { useEffect, RefObject } from 'react';

export const useIntersectionObserver = ({
  targetRef,
  onInterSect,
  options,
}: {
  targetRef: RefObject<HTMLElement>;
  onInterSect: (entry?: IntersectionObserverEntry) => void;
  options?: IntersectionObserverInit;
}) => {
  useEffect(() => {
    if (!targetRef.current) return;
    const targetElement = targetRef.current;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) onInterSect(entry);
      }
    }, options);
    observer.observe(targetElement);

    return () => observer.unobserve(targetElement);
  }, [targetRef, onInterSect, options]);
};

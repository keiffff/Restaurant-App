import { useEffect, RefObject } from 'react';

type Props = {
  targetRef: RefObject<HTMLElement>;
  callback?: () => void;
  options?: IntersectionObserverInit;
};

export const useIntersectionObserver = ({ targetRef, callback, options }: Props) => {
  useEffect(() => {
    if (!targetRef.current) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          callback && callback();
        }
      }
    }, options);
    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [callback, options, targetRef]);
};

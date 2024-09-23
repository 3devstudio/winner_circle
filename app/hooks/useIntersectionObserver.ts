import { useEffect, useState, useRef, MutableRefObject } from 'react';

const useIntersectionObserver = <T extends HTMLElement>(threshold = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        threshold,
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [ref, isIntersecting] as const;
};

export default useIntersectionObserver;

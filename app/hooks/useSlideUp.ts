import { useEffect, useState, useRef } from 'react';

const useSlideUp = (threshold = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  const ref = useRef(null);

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isIntersecting] as const;
};

export default useSlideUp;
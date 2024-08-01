import { useState, useRef, useEffect } from 'react';

interface FadeInImageProps {
  src: string;
  alt: string;
  className?: string; // Optional className
}

// eslint-disable-next-line react/prop-types
const FadeInImage: React.FC<FadeInImageProps> = ({ src, alt, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25, // Trigger when 25% of the image is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className || ''}`}
      style={{ transitionProperty: 'opacity' }} // Add Tailwind transition classes
    />
  );
};

export default FadeInImage;

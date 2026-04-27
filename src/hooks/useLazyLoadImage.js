/**
 * useLazyLoadImage: Lazy loads images only when they enter the viewport
 * Uses Intersection Observer API for efficient image loading
 * 
 * Usage:
 *   const { imageRef, imageSrc } = useLazyLoadImage(originalSrc, placeholderSrc);
 *   <img ref={imageRef} src={imageSrc} alt="..." />
 */

import { useRef, useState, useEffect } from 'react';

export const useLazyLoadImage = (src, placeholderSrc = '') => {
  const imageRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(placeholderSrc || src);
  const [isLoaded, setIsLoaded] = useState(!placeholderSrc);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new Image();
            img.onload = () => {
              setImageSrc(src);
              setIsLoaded(true);
            };
            img.onerror = () => {
              // Keep placeholder on error
              console.warn(`Failed to load image: ${src}`);
            };
            img.src = src;
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '50px' } // Start loading 50px before entering viewport
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [src]);

  return {
    imageRef,
    imageSrc,
    isLoaded,
    className: isLoaded ? '' : 'image-loading'
  };
};

/**
 * LazyImage component for simple usage
 * 
 * Usage:
 *   <LazyImage src="/image.jpg" alt="Description" />
 */
export const LazyImage = ({
  src,
  placeholderSrc,
  alt = '',
  className = '',
  ...props
}) => {
  const { imageRef, imageSrc, isLoaded } = useLazyLoadImage(src, placeholderSrc);

  return (
    <img
      ref={imageRef}
      src={imageSrc}
      alt={alt}
      className={`lazy-image ${!isLoaded ? 'loading' : 'loaded'} ${className}`}
      {...props}
    />
  );
};

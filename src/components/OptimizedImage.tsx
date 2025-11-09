import { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean; // Für wichtige Bilder (z.B. erstes Bild)
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  onLoad,
  onError 
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer für Lazy Loading (nur wenn nicht priority)
  useEffect(() => {
    if (priority) {
      setShouldLoad(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '150px', // Start loading 150px before image is visible
        threshold: 0.01
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ minHeight: shouldLoad ? 'auto' : '400px' }}
    >
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && shouldLoad && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg flex items-center justify-center z-10">
          <div className="text-gray-400 text-sm">Lädt Bild...</div>
        </div>
      )}
      
      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-gray-400 text-sm">Bild konnte nicht geladen werden</div>
        </div>
      )}
      
      {/* Actual Image */}
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          style={{ 
            imageRendering: 'auto',
            imageOrientation: 'from-image'
          }}
        />
      )}
      
      {/* Placeholder wenn noch nicht geladen */}
      {!shouldLoad && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-gray-300 text-xs">Wird geladen...</div>
        </div>
      )}
    </div>
  );
};


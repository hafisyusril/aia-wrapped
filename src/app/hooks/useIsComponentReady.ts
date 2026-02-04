import { useEffect, useState } from "react";

/**
 * Hook untuk track ketika component sudah fully render dan mount
 * Berguna untuk memastikan semua images dan assets sudah loaded sebelum capture
 */
export function useIsComponentReady() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Set ready setelah component sudah mount dan DOM sudah fully painted
    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsReady(true);
      });
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  return isReady;
}

/**
 * Hook untuk track ketika element dan semua images di dalamnya sudah fully loaded
 * Lebih comprehensive daripada useIsComponentReady
 */
export function useIsElementLoadingComplete(
  elementRef: React.RefObject<HTMLElement>
) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const checkImagesLoaded = () => {
      const images = elementRef.current?.querySelectorAll("img");
      if (!images || images.length === 0) {
        setIsLoaded(true);
        return;
      }

      const allLoaded = Array.from(images).every((img) => {
        return img.complete && img.naturalHeight !== 0;
      });

      if (allLoaded) {
        setIsLoaded(true);
      } else {
        // Retry after a short delay
        const timer = setTimeout(checkImagesLoaded, 100);
        return () => clearTimeout(timer);
      }
    };

    // Wait for component to mount first
    const mountTimer = requestAnimationFrame(() => {
      checkImagesLoaded();
    });

    // Also listen for image load events
    const images = elementRef.current.querySelectorAll("img");
    images.forEach((img) => {
      img.addEventListener("load", checkImagesLoaded);
      img.addEventListener("error", checkImagesLoaded);
    });

    return () => {
      cancelAnimationFrame(mountTimer);
      images.forEach((img) => {
        img.removeEventListener("load", checkImagesLoaded);
        img.removeEventListener("error", checkImagesLoaded);
      });
    };
  }, [elementRef]);

  return isLoaded;
}

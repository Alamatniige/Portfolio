import { useState, useEffect } from 'react';

/**
 * Hook to detect if the current viewport is mobile
 * @param breakpoint - The breakpoint in pixels (default: 768)
 * @returns boolean indicating if the viewport is mobile
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint || 'ontouchstart' in window);
    };

    // Check on mount
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}


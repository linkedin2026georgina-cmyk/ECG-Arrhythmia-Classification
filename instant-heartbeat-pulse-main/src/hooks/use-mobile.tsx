import { useState, useEffect } from "react";

/**
 * useIsMobile is a custom hook that checks screen width.
 * It returns true when the screen size is considered mobile.
 * This is used to adjust the layout for smaller devices.
 */

const TABLET_MOBILE_THRESHOLD = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Media query to detect screen width
    const mediaQuery = window.matchMedia(
      `(max-width: ${TABLET_MOBILE_THRESHOLD - 1}px)`
    );

    // Set initial value on mount
    setIsMobile(mediaQuery.matches);

    // Update value when screen size changes
    const handleWindowResize = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleWindowResize);

    // Cleanup listener on unmount
    return () =>
      mediaQuery.removeEventListener("change", handleWindowResize);
  }, []);

  return isMobile;
}

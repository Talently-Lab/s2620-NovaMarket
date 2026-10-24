import { useState, useEffect } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    return typeof window !== "undefined" ? window.matchMedia(QUERY).matches : false;
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    
    const listener = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, []);

  return prefersReducedMotion;
};
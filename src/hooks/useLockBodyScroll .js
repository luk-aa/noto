import { useLayoutEffect } from "react";

export function useLockBodyScroll(lock = true) {
  useLayoutEffect(() => {
    if (lock) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [lock]);
}

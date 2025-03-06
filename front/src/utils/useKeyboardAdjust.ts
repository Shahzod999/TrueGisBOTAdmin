import { useEffect } from "react";

export const useKeyboardAdjust = () => {
  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        document.body.style.paddingBottom =
          window.innerHeight < window.visualViewport.height
            ? `${window.visualViewport.height - window.innerHeight}px`
            : "0px";
      }
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);
};

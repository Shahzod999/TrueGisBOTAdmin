import { useEffect, useState } from "react";

export const useKeyboardAdjust = () => {
  const [padding, setPadding] = useState(0);

  useEffect(() => {
    const updatePadding = () => {
      const viewportHeight =
        window.visualViewport?.height || window.innerHeight;
      const keyboardHeight = window.innerHeight - viewportHeight;
      setPadding(keyboardHeight);
    };

    updatePadding();
    window.visualViewport?.addEventListener("resize", updatePadding);

    return () => {
      window.visualViewport?.removeEventListener("resize", updatePadding);
    };
  }, []);

  useEffect(() => {
    document.body.style.paddingBottom = `${padding}px`;
    return () => {
      document.body.style.paddingBottom = "0px";
    };
  }, [padding]);
};

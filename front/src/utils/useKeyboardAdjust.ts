import { useEffect } from "react";

export const useKeyboardAdjust = () => {
  useEffect(() => {
    const updatePadding = () => {
      const viewportHeight = window.innerHeight; // Реальная высота окна
      document.body.style.height = `${viewportHeight}px`; // Подгоняем высоту body
    };

    updatePadding(); // Вызов сразу при монтировании
    window.addEventListener("resize", updatePadding);

    return () => {
      window.removeEventListener("resize", updatePadding);
    };
  }, []);
};

import { useEffect } from "react";
import { useURLState } from "../../hooks/useURLState";
import { useNavigate } from "react-router";

const useTelegramBackButton = () => {
  const { allParams, setParam } = useURLState();
  const navigate = useNavigate();

  useEffect(() => {
    const backButton = window.Telegram.WebApp.BackButton;
    if (!backButton) return;

    backButton.show();

    const handleBack = () => {
      const keys = Object.keys(allParams).reverse();

      if (keys.length === 0) {
        navigate(-1);
        return;
      }

      for (const key of keys) {
        if (allParams[key] === "true") {
          setParam(key, false);
          break;
        }
      }
    };

    backButton.onClick(handleBack);

    return () => {
      backButton.hide();
      backButton.offClick(handleBack); // Отключаем только наш обработчик
    };
  }, [allParams, navigate, setParam]);
};

export default useTelegramBackButton;

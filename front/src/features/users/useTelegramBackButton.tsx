import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { useURLState } from "../../hooks/useURLState";

const useTelegramBackButton = () => {
  const { allParams, setParam } = useURLState();
  const navigate = useNavigate();
  const location = useLocation();
  const prevParamsRef = useRef(allParams); // Отслеживаем предыдущее состояние

  useEffect(() => {
    const backButton = window.Telegram.WebApp.BackButton;
    if (!backButton) return;

    backButton.show();

    const handleBack = () => {
      const keys = Object.keys(allParams).reverse();

      if (keys.length > 0) {
        // Закрываем последнюю открытую вкладку
        const lastKey = keys.find((key) => allParams[key] === "true");
        if (lastKey) setParam(lastKey, false);
      } else {
        // Если вкладок нет, проверяем путь
        if (location.pathname !== "/") {
          navigate("/");
        } else {
          backButton.hide();
        }
      }
    };

    backButton.onClick(handleBack);

    return () => {
      backButton.hide();
      backButton.offClick(handleBack);
    };
  }, [allParams, navigate, location.pathname, setParam]);

  useEffect(() => {
    const backButton = window.Telegram.WebApp.BackButton;

    // Проверяем, было ли закрытие всех вкладок
    if (
      Object.keys(allParams).length === 0 &&
      Object.keys(prevParamsRef.current).length > 0
    ) {
      if (location.pathname !== "/") {
        navigate("/");
      } else {
        backButton.hide();
      }
    }

    prevParamsRef.current = allParams; // Обновляем предыдущее состояние
  }, [allParams, navigate, location.pathname]);
};

export default useTelegramBackButton;

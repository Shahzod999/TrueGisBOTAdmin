import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useURLState } from "../../hooks/useURLState";

const useTelegramBackButton = () => {
  const { allParams, setParam } = useURLState();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const prevParamsRef = useRef(allParams); // Отслеживаем предыдущее состояние

  useEffect(() => {
    const backButton = window.Telegram.WebApp.BackButton;
    if (!backButton) return;

    backButton.show();

    const handleBack = () => {
      const keys = Object.keys(allParams).reverse();

      if (pathname === "/") {
        backButton.hide();
        return;
      }
      if (keys.length === 0) {
        navigate(-1);
        return;
      }

      const lastKey = keys.find((key) => allParams[key] === "true");

      if (lastKey) {
        setParam(lastKey, false);
      }
    };

    backButton.onClick(handleBack);

    return () => {
      backButton.hide();
      backButton.offClick(handleBack);
    };
  }, [allParams, navigate, setParam]);

  useEffect(() => {
    const backButton = window.Telegram.WebApp.BackButton;

    // Проверяем, был ли параметр удален и не добавился ли снова
    if (
      Object.keys(allParams).length === 0 &&
      Object.keys(prevParamsRef.current).length > 0
    ) {
      backButton.hide();
    }

    prevParamsRef.current = allParams; // Обновляем предыдущее состояние
  }, [allParams]);
};

export default useTelegramBackButton;

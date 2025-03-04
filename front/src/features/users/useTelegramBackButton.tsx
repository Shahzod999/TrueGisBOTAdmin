import { useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useURLState } from "../../hooks/useURLState";

const useTelegramBackButton = () => {
  const { allParams, deleteParam } = useURLState();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  //   const prevParamsRef = useRef(allParams); // Отслеживаем предыдущее состояние

  useEffect(() => {
    const backButton = window.Telegram.WebApp.BackButton;
    if (!backButton) return;

    if (pathname === "/") {
      backButton.hide();
      return;
    }
    backButton.show();

    const keys = Object.keys(allParams).reverse();

    const handleBack = () => {
      if (keys.length === 0) {
        navigate("/");
        return;
      }

      const lastKey = keys[0];
      if (lastKey) {
        deleteParam(lastKey);
      }
    };

    backButton.onClick(handleBack);

    return () => {
      backButton.hide();
      backButton.offClick(handleBack);
    };
  }, [allParams, navigate, deleteParam]);
};

export default useTelegramBackButton;

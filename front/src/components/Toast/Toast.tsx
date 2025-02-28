import "./toast.scss";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  removeToast,
  selectToastMessage,
} from "../../features/Toast/toastSlice";

const Toast = () => {
  const dispatch = useAppDispatch();
  const message = useAppSelector(selectToastMessage);
  const { t } = useTranslation();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(removeToast());
      }, 1500); // Убираем тост через 3 секунды
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const handleRemoveToast = () => {
    dispatch(removeToast());
  };

  console.log(message);

  if (!message) return null;
  return (
    <div className="square">
      <div className="square__box">
        <div className="square__box__text">
          <div className={`toast-container ${message.state}`}></div>
          {message.state == "error" && <h3>{t("error")}</h3>}
          {message.state == "info" && <h3>{t("attention")}</h3>}
          {message.state == "success" && <h3>{t("requestSent")}</h3>}
          <p>{message.text}</p>
        </div>

        <button onClick={handleRemoveToast}>Понятно</button>
      </div>
    </div>
  );
};

export default Toast;

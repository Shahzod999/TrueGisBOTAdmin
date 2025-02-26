import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";

export const useURLState = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const tg = window.Telegram.WebApp;
  console.log(location, "params");
  
  useEffect(() => {
    tg.BackButton.show();
    tg.BackButton.onClick(() => {
      navigate(-1);
    });
  }, [location]);

  const setParam = (key: string, value: string | boolean) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, String(value));
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const getParam = (key: string) => searchParams.get(key);

  return { getParam, setParam };
};

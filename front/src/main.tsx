import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Router from "./app/router";
import "./styles/global.scss";
import { BrowserRouter } from "react-router";
import "./utils/i18n.ts";
import Toast from "./components/Toast/Toast.tsx";
import i18n from "i18next";
import { useCloudStorage } from "./hooks/useCloudStorage.tsx";
import Loading from "./components/Loading/Loading";

// Создаем обертку для приложения, которая обеспечивает стабильную структуру DOM
const AppWithProviders = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Toast />
      <Router />
    </BrowserRouter>
  </Provider>
);

// Компонент для инициализации языка и управления загрузкой
const AppInitializer = () => {
  const { value: language, isLoading } = useCloudStorage("language", "ru");
  const [isReady, setIsReady] = useState(false);
  
  // Инициализируем язык и устанавливаем готовность приложения
  useEffect(() => {
    if (!isLoading) {
      i18n.changeLanguage(language);
      setIsReady(true);
    }
  }, [language, isLoading]);
  
  // Используем стабильную структуру DOM с условным рендерингом содержимого
  return (
    <div className="app-container">
      {!isReady ? <Loading /> : <AppWithProviders />}
    </div>
  );
};

// Корневой компонент
const App = () => {
  return (
    <StrictMode>
      <AppInitializer />
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<App />);

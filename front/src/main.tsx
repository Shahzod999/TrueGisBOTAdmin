import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Router from "./app/router";
import "./styles/global.scss";
import { BrowserRouter } from "react-router";
import "./utils/i18n.ts";
import Toast from "./components/Toast/Toast.tsx";

const App = () => {
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toast />
        <Router />
      </BrowserRouter>
    </Provider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

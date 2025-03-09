import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import styles from "./adminStyle.module.scss";
import { useURLState } from "../../hooks/useURLState";
import { useAddNewAdminMutation } from "../../features/admins/adminApi";
import Loading from "../../components/Loading/Loading";
import { useAppDispatch } from "../../app/hooks";
import { errorToast, succesToast } from "../../features/Toast/toastSlice";
import IconButton from "../../components/Button/IconButton";
import { useLocation, useNavigate } from "react-router";

interface AdminFormData {
  full_name: string;
  password: string;
  username: string;
}

const AddNewAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { search, pathname } = useLocation();
  console.log(pathname, search);

  const [addNewAdmin, { isLoading }] = useAddNewAdminMutation();

  const [visible, setVisible] = useState({
    id: false,
    password: false,
  });

  const [formData, setFormData] = useState<AdminFormData>({
    full_name: "",
    password: "",
    username: "",
  });
  const formDataRef = useRef(formData);

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  const handleVisible = (key: "password" | "id") => (e: MouseEvent) => {
    e.stopPropagation();
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(async () => {
    // Используем актуальное состояние формы из ref
    const currentFormData = formDataRef.current;

    if (
      currentFormData.full_name === "" ||
      currentFormData.username === "" ||
      currentFormData.password === ""
    ) {
      dispatch(errorToast("Поля не могут быть пустыми"));
      return;
    }
    try {
      // Токен будет добавлен автоматически через baseQuery
      const res = await addNewAdmin(currentFormData).unwrap();
      console.log("Администратор успешно создан:", res);
      dispatch(succesToast("Администратор успешно создан"));
      navigate(`/adminList?adminPower=${res.id}`);
      // Можно добавить уведомление об успешном создании
      setFormData({
        full_name: "",
        password: "",
        username: "",
      });
    } catch (error) {
      console.error("Ошибка при создании администратора:", error);
      // Можно добавить уведомление об ошибке
      dispatch(
        errorToast(
          (error as any).data?.message || "Ошибка при создании администратора",
        ),
      );
    }
  }, [addNewAdmin, dispatch, navigate, setFormData]);

  // useEffect(() => {
  //   // Проверяем доступность Telegram WebApp API
  //   if (!window.Telegram || !window.Telegram.WebApp) {
  //     console.warn("Telegram WebApp API не доступен");
  //     return;
  //   }

  //   const mainButton = window.Telegram.WebApp.MainButton;

  //   try {
  //     // Полностью очищаем предыдущие обработчики
  //     // @ts-ignore
  //     mainButton.offClick();

  //     if (search === "?addNewAdmin=true" && pathname === "/adminList") {
  //       console.log("Настраиваем MainButton для AddNewAdmin");
  //       // @ts-ignore
  //       mainButton.setParams({ text: "Далее" });
  //       // @ts-ignore
  //       mainButton.onClick(handleSubmit);
  //       // @ts-ignore
  //       mainButton.show();
  //     }
  //   } catch (e) {
  //     console.error("Ошибка при настройке MainButton:", e);
  //   }

  //   return () => {
  //     if (!window.Telegram || !window.Telegram.WebApp) return;

  //     try {
  //       // @ts-ignore
  //       mainButton.hide();
  //       // @ts-ignore
  //       mainButton.offClick();
  //       console.log("MainButton очищен при размонтировании");
  //     } catch (e) {
  //       console.warn("Ошибка при очистке MainButton:", e);
  //     }
  //   };
  // }, [search, pathname, handleSubmit]);

  return (
    <div className={`container ${styles.addNewAdmin}`}>
      {isLoading && <Loading />}

      <div className={styles.title}>
        <h2>Новый Админ</h2>
        <span>Придумайте логин и пароль для этого роля. </span>
      </div>

      <div className={styles.form}>
        <label className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="ФИО"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Login"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles.inputWrapper}>
          <input
            type={visible.password ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <ReactSVG
            src={
              visible.password ? "./Other/unVisible.svg" : "./Other/visible.svg"
            }
            onClick={handleVisible("password")}
          />
        </label>
        <div>
          <IconButton
            text="Далее"
            styleName="linkColor"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default AddNewAdmin;

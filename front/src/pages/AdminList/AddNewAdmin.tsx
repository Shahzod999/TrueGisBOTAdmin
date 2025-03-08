import { MouseEvent, useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import styles from "./adminStyle.module.scss";
import { useURLState } from "../../hooks/useURLState";
import { useAddNewAdminMutation } from "../../features/admins/adminApi";
import Loading from "../../components/Loading/Loading";
import { useAppDispatch } from "../../app/hooks";
import { errorToast, succesToast } from "../../features/Toast/toastSlice";

interface AdminFormData {
  full_name: string;
  password: string;
  username: string;
}

const AddNewAdmin = () => {
  const dispatch = useAppDispatch();
  const { setParam, getParam } = useURLState();
  const [addNewAdmin, { isLoading, isSuccess }] = useAddNewAdminMutation();
  const initialPage = Boolean(getParam("addNewAdmin"));

  console.log(initialPage, "initialPage");

  const [visible, setVisible] = useState({
    id: false,
    password: false,
  });

  const [formData, setFormData] = useState<AdminFormData>({
    full_name: "",
    password: "",
    username: "",
  });

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

  const handleSubmit = async () => {
    if (
      formData.full_name === "" ||
      formData.username === "" ||
      formData.password === ""
    ) {
      dispatch(errorToast("Поля не могут быть пустыми"));
      return;
    }
    try {
      // Токен будет добавлен автоматически через baseQuery
      const res = await addNewAdmin(formData).unwrap();
      console.log(res);

      setParam("addNewAdmin", "false");
      dispatch(succesToast("Администратор успешно создан"));
      setParam("adminPower", res.id);
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
          (error as any).data.message || "Администратор успешно создан",
        ),
      );
    }
  };
  const adminPowerState = Boolean(getParam("adminPower"));
  const mainButton = Telegram.WebApp.MainButton;

  useEffect(() => {
    const emptyFunc = () => {};
    mainButton.offClick(emptyFunc);

    if (initialPage && !adminPowerState) {
      mainButton.setText("Далее");
      mainButton.onClick(handleSubmit);
      mainButton.show();
    }

    return () => {
      mainButton.offClick(handleSubmit);
    };
  }, [formData, initialPage, isSuccess, handleSubmit, adminPowerState]);

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
        {/* <IconButton text="Далее" styleName="linkColor" /> */}
      </div>
    </div>
  );
};

export default AddNewAdmin;

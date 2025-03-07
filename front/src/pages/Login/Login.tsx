import { ReactSVG } from "react-svg";
import styles from "./Login.module.scss";
import BottomSheet from "../../components/BottomSheet/BottomSheet";
import { FormEvent, MouseEvent, useState } from "react";
import IconButton from "../../components/Button/IconButton";
import Lottie from "lottie-react";
import utya from "../../../public/utya/technical.json";
import { useNavigate } from "react-router";
import { useLoginUserMutation } from "../../features/auth/authApi";
import { useAppDispatch } from "../../app/hooks";
import { setCredentials } from "../../features/auth/authSlice";
import {
  setCompany,
  setCompanyToken,
} from "../../features/company/companySlice";
import CustomError from "../../utils/customError";
import Loading from "../../components/Loading/Loading";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    signature: "",
  });
  const [visible, setVisible] = useState({
    id: false,
    password: false,
  });
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    signature?: string;
    general?: string;
  }>({});

  const handleVisible = (key: "password" | "id") => (e: MouseEvent) => {
    e.stopPropagation();
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Очищаем ошибку при изменении поля
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Введите имя пользователя";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Введите пароль";
    }
    if (!formData.signature.trim()) {
      newErrors.signature = "Введите Truegis ID";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await loginUser({ data: formData }).unwrap();
      if (!response.selected_company) {
        throw new CustomError({ message: "У вас нет связанных компании" });
      }

      if (response.status === "success") {
        dispatch(
          setCredentials({
            data: response.data,
          }),
        );
        dispatch(setCompany(response.selected_company));
        dispatch(setCompanyToken(response.selected_company.token));
        navigate("/");
      } else {
        setErrors({ general: "Ошибка входа в систему" });
      }
    } catch (err: any) {
      console.error("Failed to login:", err);
      setErrors({
        general: err.data?.message || "Произошла ошибка при входе в систему",
      });
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className={`container ${styles.login}`}>
        <div className={styles.logo}>
          <ReactSVG src="./Company/logo.svg" />
          <h3>
            Trues<span>Gis</span>
          </h3>
        </div>

        <h2>Truegis бизнес!</h2>
        <p>Выполните вход в свой аккаунт</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          {errors.general && (
            <div className={styles.errorMessage}>{errors.general}</div>
          )}
          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <div className={styles.fieldError}>{errors.username}</div>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <input
              type={visible.password ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <ReactSVG
              src={
                visible.password
                  ? "./Other/unVisible.svg"
                  : "./Other/visible.svg"
              }
              onClick={handleVisible("password")}
            />
            {errors.password && (
              <div className={styles.fieldError}>{errors.password}</div>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <input
              type={visible.id ? "text" : "password"}
              name="signature"
              placeholder="Truegis ID"
              value={formData.signature}
              onChange={handleChange}
              required
            />
            <ReactSVG
              src={visible.id ? "./Other/unVisible.svg" : "./Other/visible.svg"}
              onClick={handleVisible("id")}
            />
            {errors.signature && (
              <div className={styles.fieldError}>{errors.signature}</div>
            )}
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Загрузка..." : "Войти"}
          </button>
        </form>

        <div className={styles.technical} onClick={() => setIsOpen(true)}>
          <ReactSVG src="./Other/blueWarning.svg" />
          <span>Техническая поддержка</span>
        </div>
      </div>

      {/* Модальное окно технической поддержки */}
      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.technicalInfo}>
          <h3>Техническая поддержка</h3>

          <div className={styles.utya}>
            <Lottie animationData={utya} />
          </div>
          <p>Вы в любое время можете связаться с техподдержкой</p>

          <div className={styles.buttons}>
            <IconButton
              icon="./iconsSvg/message.svg"
              text="Написать"
              styleName="hintColor"
            />
            <IconButton
              icon="./iconsSvg/phone.svg"
              text="Позвонить"
              styleName="linkColor"
            />
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

export default Login;

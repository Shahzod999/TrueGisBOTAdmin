import { ReactSVG } from "react-svg";
import styles from "./Login.module.scss";
import BottomSheet from "../../components/BottomSheet/BottomSheet";
import { FormEvent, MouseEvent, useState } from "react";
import IconButton from "../../components/Button/IconButton";
import Lottie from "lottie-react";
import utya from "../../../public/utya/technical.json";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState({
    id: false,
    password: false,
  });

  const handleVisible = (key: "password" | "id") => (e: MouseEvent) => {
    e.stopPropagation();
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <>
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
          <div className={styles.inputWrapper}>
            <input type="text" placeholder="Login" />
          </div>
          <div className={styles.inputWrapper}>
            <input
              type={visible.password ? "text" : "password"}
              placeholder="Password"
            />
            <ReactSVG
              src={
                visible.password
                  ? "./Other/unVisible.svg"
                  : "./Other/visible.svg"
              }
              onClick={handleVisible("password")}
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              type={visible.id ? "text" : "password"}
              placeholder="Truegis ID"
            />
            <ReactSVG
              src={visible.id ? "./Other/unVisible.svg" : "./Other/visible.svg"}
              onClick={handleVisible("id")}
            />
          </div>
          <button type="submit">Войти</button>
        </form>

        <div className={styles.technical} onClick={() => setIsOpen(true)}>
          <ReactSVG src="./Other/blueWarning.svg" />
          <span>Техническая поддержка</span>
        </div>
      </div>
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

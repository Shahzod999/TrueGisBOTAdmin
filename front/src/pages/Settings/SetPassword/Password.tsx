import Lottie from "lottie-react";
import IconButton from "../../../components/Button/IconButton";
import styles from "./password.module.scss";
import passwordUtya from "../../../../public/utya/password.json";
import OpenFromSide from "../../../components/OpenFromSide/OpenFromSide";
import { useURLState } from "../../../hooks/useURLState";
import PinCode from "./PinCode";
import { useNavigate } from "react-router";

const Password = () => {
  const navigate = useNavigate();
  const { getParam, setParam } = useURLState();
  const initialPage = Boolean(getParam("setPassword"));
  return (
    <>
      <div className={`container ${styles.password}`}>
        <h2 className={styles.title}>Код-пароль</h2>

        <div className={styles.main}>
          <Lottie animationData={passwordUtya} />
        </div>

        <IconButton
          text="Установить код-пароль"
          styleName="linkColor"
          onClick={() => setParam("setPassword", true)}
        />
      </div>

      <OpenFromSide
        isOpen={initialPage}
        onClose={() => setParam("setPassword", false)}>
        <PinCode
          onComplete={(code: number | string) => {
            console.log("Введен код:", code);
            navigate("/settings");
          }}
        />
      </OpenFromSide>
    </>
  );
};

export default Password;

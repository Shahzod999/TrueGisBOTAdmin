import Lottie from "lottie-react";
import IconButton from "../../../components/Button/IconButton";
import styles from "./password.module.scss";
import passwordUtya from "../../../../public/utya/password.json";
import OpenFromSide from "../../../components/OpenFromSide/OpenFromSide";
import { useURLState } from "../../../hooks/useURLState";
import PinCode from "./PinCode";
import { useNavigate } from "react-router";
import { useCloudStorage } from "../../../hooks/useCloudStorage";
import { useAppDispatch } from "../../../app/hooks";
import { succesToast } from "../../../features/Toast/toastSlice";

const Password = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { getParam, setParam } = useURLState();
  const initialPage = Boolean(getParam("setPassword"));
  const { value, saveValue } = useCloudStorage<string | null>(
    "accessPassword",
    null,
  );

  const handleRemovePassword = () => {
    dispatch(succesToast("Пароль удален"));
    saveValue(null);
  };

  console.log(value);

  return (
    <>
      <div className={`container ${styles.password}`}>
        <h2 className={styles.title}>Код-пароль</h2>
        {value && value !== "null" && (
          <IconButton
            text="🗑 Удалить пароль"
            styleName="deleteButton"
            onClick={handleRemovePassword}
          />
        )}

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
          onComplete={(code: string) => {
            saveValue(code);
            dispatch(succesToast("Пароль Установлен"));
            navigate("/settings");
          }}
        />
      </OpenFromSide>
    </>
  );
};

export default Password;

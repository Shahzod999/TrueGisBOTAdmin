import { useState } from "react";
import styles from "../Settings/SetPassword/PinCode.module.scss";
import { ReactSVG } from "react-svg";
import useBiometricAuth from "../../hooks/useBiometricAuth";
import { useAppDispatch } from "../../app/hooks";
import { errorToast } from "../../features/Toast/toastSlice";

interface PincodeProps {
  onComplete: (code: string) => Promise<boolean>;
}

const AccessPassword = ({ onComplete }: PincodeProps) => {
  const { isAccessGranted, requestAccess, openSettings, authenticate } =
    useBiometricAuth();
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handlePress = async (num: number | string) => {
    if (pin.length < 6) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 6) {
        const isConfirmed = await onComplete(newPin);
        if (!isConfirmed) {
          setError("Неверный код"); // Показываем ошибку
          dispatch(errorToast("Неверный код"));
          setPin("");
        }
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handleBiometricAuth = async () => {
    if (!isAccessGranted) {
      await requestAccess();
      if (!isAccessGranted) {
        openSettings();
        return;
      }
    }
    const success = await authenticate();

    if (success) {
      const isConfirmed = await onComplete("biometric_success");

      if (!isConfirmed) {
        setError("Ошибка биометрии");
        dispatch(errorToast("Ошибка биометрии"));
      }
    } else {
      dispatch(errorToast("Ошибка биометрии"));
      setError("Ошибка биометрии"); // Показываем ошибку
    }
  };

  return (
    <div className={`container ${styles.pinCode}`}>
      <h2 className={styles.title}>Введите код-пароль</h2>
      <div className={styles.dots}>
        {[...Array(6)].map((_, i) => (
          <span key={i} className={pin.length > i ? styles.filled : ""}></span>
        ))}
      </div>
      <div className={styles.grid}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "<", 0].map((num, i) => (
          <button
            key={i}
            className={styles.button}
            onClick={() => (num === "<" ? handleDelete() : handlePress(num))}>
            <strong className={styles.number}>{num}</strong>
            {typeof num === "number" && (
              <span className={styles.letters}>{getLetters(num)}</span>
            )}
          </button>
        ))}
        <button
          className={styles.biometricButton}
          onClick={handleBiometricAuth}>
          <ReactSVG src={"./iconsSvg/FaceID.svg"} />
        </button>
      </div>
      {error && <p className="errorText">{error}</p>}
    </div>
  );
};

const getLetters = (num: number) => {
  const mapping: Record<number, string> = {
    1: "",
    2: "ABC",
    3: "DEF",
    4: "GHI",
    5: "JKL",
    6: "MNO",
    7: "PQRS",
    8: "TUV",
    9: "WXYZ",
    0: "",
  };
  return mapping[num] || "";
};

export default AccessPassword;

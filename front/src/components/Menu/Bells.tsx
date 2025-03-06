import { ReactSVG } from "react-svg";
import styles from "./Menu.module.scss";
import { useState } from "react";

const Bells = () => {
  const [isRinging, setIsRinging] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Обработчик нажатия на колокольчик
  const handleBellClick = () => {
    setIsRinging(true);
    setShowInfo(true);

    // Останавливаем анимацию звона через 1.5 секунды
    setTimeout(() => {
      setIsRinging(false);
    }, 1500);

    // Скрываем информационный текст через 3 секунды
    setTimeout(() => {
      setShowInfo(false);
    }, 3000);
  };

  return (
    <div className={styles.bellContainer}>
      <ReactSVG
        src="./iconsSvg/bells.svg"
        className={`${styles.bells} ${isRinging ? styles.ringing : ""}`}
        onClick={handleBellClick}
      />
      {showInfo && <div className={styles.infoText}>Скоро...</div>}
    </div>
  );
};

export default Bells;

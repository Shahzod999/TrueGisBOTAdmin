import { useState } from "react";
import styles from "./settings.module.scss";
import { ReactSVG } from "react-svg";

const Lang = () => {
  const [selectedLang, setSelectedLang] = useState<string>("ru");

  const handleChange = (lang: string) => {
    setSelectedLang(lang);
  };

  return (
    <div className={`container ${styles.lang}`}>
      <h2 className={styles.title}>Языки</h2>

      <div className={styles.langBox}>
        <div className={styles.tabs} onClick={() => handleChange("ru")}>
          <div>
            <strong>Uzbek</strong>
            <span>Русский</span>
          </div>
          {selectedLang === "ru" && <ReactSVG src="./arrows/ok.svg" />}
        </div>
        <div className={styles.tabs} onClick={() => handleChange("uz")}>
          <div>
            <strong>Uzbek</strong>
            <span>O’zbek</span>
          </div>
          {selectedLang === "uz" && <ReactSVG src="./arrows/ok.svg" />}
        </div>
        <div className={styles.tabs} onClick={() => handleChange("en")}>
          <div>
            <strong>English</strong>
            <span>English</span>
          </div>
          {selectedLang === "en" && <ReactSVG src="./arrows/ok.svg" />}
        </div>
      </div>
    </div>
  );
};

export default Lang;

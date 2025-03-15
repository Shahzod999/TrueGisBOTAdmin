import styles from "./settings.module.scss";
import { ReactSVG } from "react-svg";
import { useTranslation } from "react-i18next";
import { useCloudStorage } from "../../hooks/useCloudStorage";
import Loading from "../../components/Loading/Loading";
import i18n from "../../utils/i18n";

const Lang = () => {
  const {
    value: language,
    isLoading,
    saveValue,
  } = useCloudStorage("language", "ru");

  const { t } = useTranslation();

  const handleLanguage = (lang: string) => {
    saveValue(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className={`container ${styles.lang}`}>
      {isLoading && <Loading />}
      <h2 className={styles.title}>{t("languages")}</h2>

      <div className={styles.langBox}>
        <div className={styles.tabs} onClick={() => handleLanguage("ru")}>
          <div>
            <strong>Русский</strong>
            <span>Русский</span>
          </div>
          {language === "ru" && <ReactSVG src="./arrows/ok.svg" />}
        </div>
        <div className={styles.tabs} onClick={() => handleLanguage("uz")}>
          <div>
            <strong>Uzbek</strong>
            <span>O'zbek</span>
          </div>
          {language === "uz" && <ReactSVG src="./arrows/ok.svg" />}
        </div>
        <div className={styles.tabs} onClick={() => handleLanguage("en")}>
          <div>
            <strong>English</strong>
            <span>English</span>
          </div>
          {language === "en" && <ReactSVG src="./arrows/ok.svg" />}
        </div>
      </div>
    </div>
  );
};

export default Lang;

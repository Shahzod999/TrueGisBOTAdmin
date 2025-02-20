import { ReactSVG } from "react-svg";
import styles from "./settings.module.scss";
import OpenFromSide from "../../components/OpenFromSide/OpenFromSide";
import { useURLState } from "../../hooks/useURLState";
import Lang from "./Lang";
import InfoAboutPlace from "./InfoAboutPlace/InfoAboutPlace";
import Password from "./SetPassword/Password";

const Settings = () => {
  const { getParam, setParam } = useURLState();
  const infoPage = Boolean(getParam("infoPage"));
  const initialPage = Boolean(getParam("lang"));
  const passwordPage = Boolean(getParam("passwordPage"));
  return (
    <>
      <div className={`container ${styles.settings}`}>
        <h2 className={styles.title}>Настройки</h2>

        <div className={styles.box}>
          <div
            className={styles.tabs}
            onClick={() => setParam("infoPage", true)}>
            <ReactSVG src="./settings/info.svg" />
            <span>Информация заведении</span>
          </div>
          <div className={styles.tabs} onClick={() => setParam("lang", true)}>
            <ReactSVG src="./settings/lang.svg" />
            <span>Язык</span>
          </div>
          <div
            className={styles.tabs}
            onClick={() => setParam("passwordPage", true)}>
            <ReactSVG src="./settings/pass.svg" />
            <span>Установить код-пароль</span>
          </div>
        </div>
      </div>

      <OpenFromSide
        isOpen={infoPage}
        onClose={() => setParam("infoPage", false)}>
        <InfoAboutPlace />
      </OpenFromSide>
      <OpenFromSide
        isOpen={initialPage}
        onClose={() => setParam("lang", false)}>
        <Lang />
      </OpenFromSide>
      <OpenFromSide
        isOpen={passwordPage}
        onClose={() => setParam("passwordPage", false)}>
        <Password />
      </OpenFromSide>
    </>
  );
};

export default Settings;

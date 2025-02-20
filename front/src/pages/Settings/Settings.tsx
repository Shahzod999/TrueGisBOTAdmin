import { ReactSVG } from "react-svg";
import styles from "./settings.module.scss";
import OpenFromSide from "../../components/OpenFromSide/OpenFromSide";
import { useURLState } from "../../hooks/useURLState";
import Lang from "./Lang";

const Settings = () => {
  const { getParam, setParam } = useURLState();
  const initialPage = Boolean(getParam("lang"));
  const passwordPage = Boolean(getParam("passwordPage"));
  return (
    <>
      <div className={`container ${styles.settings}`}>
        <h2 className={styles.title}>Настройки</h2>

        <div className={styles.box}>
          <div className={styles.tabs}>
            <ReactSVG src="./settings/info.svg" />
            <span>Информация заведении</span>
          </div>
          <div className={styles.tabs} onClick={() => setParam("lang", true)}>
            <ReactSVG src="./settings/lang.svg" />
            <span>Язык</span>
          </div>
          <div className={styles.tabs}>
            <ReactSVG src="./settings/pass.svg" />
            <span>Установить код-пароль</span>
          </div>
        </div>
      </div>

      <OpenFromSide
        isOpen={initialPage}
        onClose={() => setParam("lang", false)}>
        <Lang />
      </OpenFromSide>

      <OpenFromSide
        isOpen={passwordPage}
        onClose={() => setParam("passwordPage", false)}>
        <>Pas</>
      </OpenFromSide>
    </>
  );
};

export default Settings;

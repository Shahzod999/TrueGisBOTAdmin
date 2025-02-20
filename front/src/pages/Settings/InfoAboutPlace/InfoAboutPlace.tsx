import { Link } from "react-router";
import styles from "./InfoAboutPlace.module.scss";

const InfoAboutPlace = () => {
  return (
    <div className={`container ${styles.info}`}>
      <h2 className={styles.title}>Coming Soon..</h2>

      <div className={styles.langBox}>
        <h2>Coming Soon...</h2>

        <br />
        <br />
        <Link to="/">
          <h2>go back to home</h2>
        </Link>
      </div>
    </div>
  );
};

export default InfoAboutPlace;

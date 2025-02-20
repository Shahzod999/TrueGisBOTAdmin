import { ReactSVG } from "react-svg";
import styles from "./Table.module.scss";

interface Props {
  icon: string;
  iconText: string;
  hintText: string;
  mainText: string;
  curency?: string;
}

const Table = ({ icon, iconText, hintText, mainText, curency }: Props) => {
  return (
    <div className={styles.table}>
      <div className={styles.icon}>
        <ReactSVG src={icon} />
        <span>{iconText}</span>
      </div>

      <span className={styles.hintText}>{hintText}</span>

      <div className={styles.mainText}>
        <strong>
          {mainText}
          <span>{curency}</span>
        </strong>
      </div>
    </div>
  );
};

export default Table;

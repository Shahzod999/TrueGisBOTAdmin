import { ReactSVG } from "react-svg";
import styles from "./Table.module.scss";

interface Props {
  icon: string;
  iconText: string;
  hintText: string;
  mainText: string;
  curency?: string;
  onClick?: () => void;
}

const Table = ({
  icon,
  iconText,
  hintText,
  mainText,
  curency,
  onClick,
}: Props) => {
  return (
    <div className={styles.table} onClick={onClick}>
      <div className={styles.icon}>
        <ReactSVG src={icon} />
        <span>{iconText}</span>
      </div>

      <span className={styles.hintText}>{hintText}</span>

      <div className={styles.mainText}>
        <h4>{mainText}</h4>
        <strong>
          <span>{curency}</span>
        </strong>
      </div>
    </div>
  );
};

export default Table;

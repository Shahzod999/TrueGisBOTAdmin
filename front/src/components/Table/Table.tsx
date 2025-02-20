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
  const trimText = mainText.replace(/\s/g, "");
  const UpperValue = trimText.length / 3;
  let mainValue = Number(trimText);

  if (UpperValue > 1) {
    mainValue = Math.round((UpperValue % 1) * 3);
  }

  return (
    <div className={styles.table} onClick={onClick}>
      <div className={styles.icon}>
        <ReactSVG src={icon} />
        <span>{iconText}</span>
      </div>

      <span className={styles.hintText}>{hintText}</span>

      <div className={styles.mainText}>
        <h4>{trimText.slice(0, mainValue)}</h4>
        <strong>
          {trimText.slice(mainValue)}
          <span>{curency}</span>
        </strong>
      </div>
    </div>
  );
};

export default Table;

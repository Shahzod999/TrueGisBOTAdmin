import { ReactSVG } from "react-svg";
import styles from "./FotoTextHint.module.scss";

interface FotoTextHintProps {
  svg?: string;
  title: string;
  smallText: string;
  arrowRight?: boolean;
}

const EditableIconTextHint = ({
  svg,
  title,
  smallText,
  arrowRight,
}: FotoTextHintProps) => {
  return (
    <div className={styles.card}>
      {svg && <ReactSVG src={svg} className={styles.icon} />}
      <div className={styles.infoMenu}>
        <p className={styles.smallText}>{smallText}</p>
        <input type="text" className={styles.title} value={title} />
      </div>
      {arrowRight && (
        <ReactSVG src="./arrows/arrowRight.svg" className={styles.arrowRight} />
      )}
    </div>
  );
};

export default EditableIconTextHint;

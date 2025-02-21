import { ReactSVG } from "react-svg";
import styles from "./FotoTextHint.module.scss";

interface FotoTextHintProps {
  image?: string;
  svg?: string;
  title: string;
  smallText: string;
  arrowRight?: boolean;
  option: string;
}

const FotoTextHint = ({
  image,
  svg,
  title,
  smallText,
  arrowRight,
  option,
}: FotoTextHintProps) => {
  return (
    <div className={styles.card}>
      {image && <img src={image} alt={title} className={styles.image} />}
      {svg && <ReactSVG src={svg} className={styles.icon} />}
      <div className={styles[option]}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.smallText}>{smallText}</p>
      </div>
      {arrowRight && (
        <ReactSVG src="./arrows/arrowRight.svg" className={styles.arrowRight} />
      )}
    </div>
  );
};

export default FotoTextHint;

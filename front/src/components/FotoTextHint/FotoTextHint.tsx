import { ReactSVG } from "react-svg";
import styles from "./FotoTextHint.module.scss";

interface FotoTextHintProps {
  image?: string;
  svg?: string;
  title: string;
  smallText: string;
  arrowRight?: boolean;
  option: string;
  onClick?: () => void;
}

const FotoTextHint = ({
  image,
  svg,
  title,
  smallText,
  arrowRight,
  option,
  onClick,
}: FotoTextHintProps) => {
  return (
    <div className={styles.card} onClick={onClick}>
      {image && <img src={image} className={styles.image} />}
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

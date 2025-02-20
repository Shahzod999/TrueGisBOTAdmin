import styles from "./iconTextArrow.module.scss";
import { ReactSVG } from "react-svg";

interface MenuItemProps {
  icon?: string;
  text: string;
  smallText?: string;
  onClick?: () => void;
}
const IconTextArrow = ({ icon, text, smallText, onClick }: MenuItemProps) => {
  return (
    <div className={styles.menuItem} onClick={onClick}>
      <div className={styles.left}>
        {icon && <ReactSVG src={icon} className={styles.icon} />}
        <span className={styles.text}>{text}</span>
      </div>
      <div className={styles.arrow}>
        <span>{smallText}</span>
        <ReactSVG src="./arrows/arrowRight.svg" />
      </div>
    </div>
  );
};

export default IconTextArrow;

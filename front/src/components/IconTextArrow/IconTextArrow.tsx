import styles from "./iconTextArrow.module.scss";
import { ReactSVG } from "react-svg";

interface MenuItemProps {
  icon: string;
  text: string;
  onClick?: () => void;
}
const IconTextArrow = ({ icon, text, onClick }: MenuItemProps) => {
  return (
    <div className={styles.menuItem} onClick={onClick}>
      <div className={styles.left}>
        <ReactSVG src={icon} className={styles.icon} />
        <span className={styles.text}>{text}</span>
      </div>
      <ReactSVG src="./arrows/arrowRight.svg" className={styles.arrow} />
    </div>
  );
};

export default IconTextArrow;

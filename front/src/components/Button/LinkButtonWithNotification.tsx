import { ReactSVG } from "react-svg";
import styles from "./linkButton.module.scss";

interface Props {
    text: string;
    notification?: number
}

const LinkButtonWithNotification = ({ text, notification }: Props) => {
  return (
    <div className={styles.newAdminActions}>
      <span>{text}</span>

      {notification && <strong>{notification}</strong>}
      <ReactSVG src="./arrows/arrowRight.svg" />
    </div>
  );
};

export default LinkButtonWithNotification;

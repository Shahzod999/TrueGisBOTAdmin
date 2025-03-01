import { ReactSVG } from "react-svg";
import styles from "./UserCard.module.scss";

interface UserCardProps {
  name: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const UserCard = ({ name, children, onClick }: UserCardProps) => {
  return (
    <div className={styles.userCard} onClick={onClick}>
      <div className={styles.info}>
        <ReactSVG src="./Other/defaultUser.svg" className={styles.avatar} />
        <span className={styles.name}>{name}</span>
      </div>

      {children}
    </div>
  );
};

export default UserCard;

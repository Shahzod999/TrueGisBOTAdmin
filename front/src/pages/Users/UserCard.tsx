import { ReactSVG } from "react-svg";
import styles from "./UserCard.module.scss";

interface UserCardProps {
  name: string;
  score: number;
  icon?: "like" | "crown" | "star" | string;
}

const UserCard = ({ name, score, icon }: UserCardProps) => {
  const getIcon = () => {
    switch (icon) {
      case "like":
        return "👍"; // Можно заменить на иконку
      case "crown":
        return "👑";
      case "star":
        return "⭐";
      default:
        return null;
    }
  };

  return (
    <div className={styles.userCard}>
      <ReactSVG src="./Other/defaultUser.svg" className={styles.avatar} />
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.score}>
          {getIcon()} {score}
        </span>
      </div>
    </div>
  );
};

export default UserCard;

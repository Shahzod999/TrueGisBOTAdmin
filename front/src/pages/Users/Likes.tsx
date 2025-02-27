import styles from "./UserCard.module.scss";

interface LikesProps {
  score: number;
  icon?: "like" | "crown" | "star" | string;
}

const Likes = ({ score, icon }: LikesProps) => {
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
    <span className={styles.score}>
      {getIcon()} {score}
    </span>
  );
};

export default Likes;

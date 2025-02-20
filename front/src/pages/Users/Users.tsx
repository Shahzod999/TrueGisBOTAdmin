import styles from "./Users.module.scss";
import LinkButtonWithNotification from "../../components/Button/LinkButtonWithNotification";
import UserCard from "./UserCard";

const usersData = [
  { name: "Andrew Parker", score: 30, icon: "like" },
  { name: "Bernice Miles", score: 26, icon: "crown" },
  { name: "Zack John", score: 18, icon: "star" },
  { name: "Karen Castillo", score: 30, icon: "star" },
  { name: "Kiero Dotson", score: 18, icon: "star" },
  { name: "Joshua Lawrance", score: 26, icon: "star" },
];

const Users = () => {
  return (
    <div className={`container ${styles.users}`}>
      <h2 className={styles.title}>Клиентская база</h2>
      <LinkButtonWithNotification text="Отправить рекламу" />

      <div className={styles.list}>
        {usersData.map((user, index) => (
          <UserCard key={index} {...user} />
        ))}
      </div>
    </div>
  );
};

export default Users;

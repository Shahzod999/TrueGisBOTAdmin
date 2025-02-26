import { ReactSVG } from "react-svg";
import styles from "./Dashboard.module.scss";
import Table from "../../components/Table/Table";
import LinearDashboard from "../../components/LinearDashboard/LinearDashboard";
import Menu from "../../components/Menu/Menu";
import { useState } from "react";
import LinkButtonWithNotification from "../../components/Button/LinkButtonWithNotification";

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const data = [
    { date: "26 ноя", value: 100 },
    { date: "27 ноя", value: 120 },
    { date: "28 ноя", value: 140 },
    { date: "29 ноя", value: 90 },
    { date: "30 ноя", value: 110 },
    { date: "1 дек", value: 130 },
  ];
  return (
    <div className={`container ${styles.dashboard}`}>
      <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className={styles.menu} onClick={() => setMenuOpen(true)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={styles.header}>
        <h2>Статистика</h2>

        <div className={styles.right}>
          <span>12.12.24</span>
          <ReactSVG src="./iconsSvg/calendar.svg" />
        </div>
      </div>

      <div className={styles.main}>
        <LinkButtonWithNotification
          text="Новые действия админов"
          notification={12}
        />

        <div className={styles.table}>
          <Table
            icon="./iconsSvg/money.svg"
            iconText="Заработок"
            hintText="Сегодня"
            mainText="12 000 000 "
            curency="сум"
          />
          <Table
            icon="./iconsSvg/timer.svg"
            iconText="Заказы"
            hintText="Сегодня"
            mainText="147"
          />
          <Table
            icon="./iconsSvg/thunder.svg"
            iconText="Звонки"
            hintText="Всего"
            mainText="39"
          />
          <Table
            icon="./iconsSvg/location.svg"
            iconText="Посещение"
            hintText="Всего"
            mainText="86"
          />
        </div>

        <LinearDashboard data={data} />
      </div>
    </div>
  );
};

export default Dashboard;

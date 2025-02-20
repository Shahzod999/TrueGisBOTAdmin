import { useState } from "react";
import IconTextArrow from "../../../components/IconTextArrow/IconTextArrow";
import styles from "./details.module.scss";
import { useNavigate } from "react-router";

const MoreDetails = () => {
  const navigate = useNavigate();
  const daysData = [
    { date: "10:27, доставка", amount: "79 000 сум" },
    { date: "11:49, самовывоз", amount: "3 500 сум" },
    { date: "10:27, доставка", amount: "128 500 сум" },
    { date: "10:27, доставка", amount: "2 083 500 сум" },
    { date: "11:49, самовывоз", amount: "2 083 500 сум" },
  ];

  const monthsData = [
    { date: "10:27, доставка", amount: "79 000 сум" },
    { date: "10:27, доставка", amount: "128 500 сум" },
    { date: "10:27, доставка", amount: "2 083 500 сум" },
  ];

  const [activeTab, setActiveTab] = useState<"type1" | "type2">("type1");

  return (
    <div className={`container ${styles.details}`}>
      <h2 className={styles.title}>День Дата</h2>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "type1" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("type1")}>
          Все
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "type2" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("type2")}>
          Доставка
        </button>
      </div>

      <div className={styles.list}>
        {(activeTab === "type1" ? daysData : monthsData).map((item) => (
          <IconTextArrow
            key={`${item.date}-${item.amount}`}
            text={item.date}
            smallText={item.amount}
            onClick={() => navigate("/")}
          />
        ))}
      </div>
    </div>
  );
};

export default MoreDetails;

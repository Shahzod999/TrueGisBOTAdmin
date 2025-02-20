import { useState } from "react";
import IconTextArrow from "../../../components/IconTextArrow/IconTextArrow";
import styles from "./details.module.scss";
import { useURLState } from "../../../hooks/useURLState";

const daysData = [
  { date: "Сегодня", amount: "2 083 500 сум" },
  { date: "Вчера", amount: "2 083 500 сум" },
  { date: "26 ноября", amount: "2 083 500 сум" },
  { date: "25 ноября", amount: "2 083 500 сум" },
  { date: "24 ноября", amount: "2 083 500 сум" },
];

const monthsData = [
  { date: "Ноябрь", amount: "2 083 500 сум" },
  { date: "Октябрь", amount: "2 083 500 сум" },
  { date: "Сентябрь", amount: "2 083 500 сум" },
];

const Details = () => {
  const [activeTab, setActiveTab] = useState<"days" | "months">("days");
  const data = activeTab === "days" ? daysData : monthsData;
  const { setParam } = useURLState();

  return (
    <div className={`container ${styles.details}`}>
      <h2 className={styles.title}>Заработок</h2>

      <div className={styles.tabs}>
        <button
          className={activeTab === "days" ? styles.active : ""}
          onClick={() => setActiveTab("days")}>
          Дни
        </button>
        <button
          className={activeTab === "months" ? styles.active : ""}
          onClick={() => setActiveTab("months")}>
          Месяцы
        </button>
      </div>

      <div className={styles.list}>
        {data.map((item) => (
          <IconTextArrow
            key={item.date}
            text={item.date}
            smallText={item.amount}
            onClick={() => setParam("moreDetails", true)}
          />
        ))}
      </div>
    </div>
  );
};

export default Details;

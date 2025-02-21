import { useState } from "react";
import IconTextArrow from "../../../components/IconTextArrow/IconTextArrow";
import styles from "./details.module.scss";
import { useURLState } from "../../../hooks/useURLState";
import ToggleTabs from "../../../components/ToggleTabs/ToggleTabs";

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

const tabs = [
  { id: "days", label: "Дни" },
  { id: "months", label: "Месяцы" },
];

const Details = () => {
  const [activeTab, setActiveTab] = useState("days");
  const data = activeTab === "days" ? daysData : monthsData;
  const { setParam } = useURLState();

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };
  return (
    <div className={`container ${styles.details}`}>
      <h2 className={styles.title}>Заработок</h2>

      <ToggleTabs tabs={tabs}  onTabChange={handleTabChange} />

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

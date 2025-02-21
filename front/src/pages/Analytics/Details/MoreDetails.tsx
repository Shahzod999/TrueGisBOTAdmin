import { useState } from "react";
import IconTextArrow from "../../../components/IconTextArrow/IconTextArrow";
import styles from "./details.module.scss";
import { useNavigate } from "react-router";
import ToggleTabs from "../../../components/ToggleTabs/ToggleTabs";

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

  const tabs = [
    { id: "all", label: "Все" },
    { id: "order", label: "Доставка" },
  ];

  const [activeTab, setActiveTab] = useState("all");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className={`container ${styles.details}`}>
      <h2 className={styles.title}>День Дата</h2>

      <ToggleTabs tabs={tabs} onTabChange={handleTabChange} />

      <div className={styles.list}>
        {(activeTab === "all" ? daysData : monthsData).map((item) => (
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

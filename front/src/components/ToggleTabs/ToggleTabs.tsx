import React, { useState } from "react";
import styles from "./ToggleTabs.module.scss";

interface TabsProps {
  tabs: { id: string; label: string }[];
  onTabChange?: (tabId: string) => void;
}

const ToggleTabs: React.FC<TabsProps> = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  // Рассчитываем позицию для span (активная вкладка)
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
  const spanWidth = 100 / tabs.length;
  const spanOffset = activeIndex * spanWidth;

  return (
    <div className={styles.tabsWrapper}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? styles.active : ""}
            onClick={() => handleTabChange(tab.id)}>
            {tab.label}
          </button>
        ))}
        <span
          style={{
            width: `${spanWidth}%`,
            left: `${spanOffset}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ToggleTabs;

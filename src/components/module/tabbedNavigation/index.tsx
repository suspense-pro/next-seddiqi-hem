import React, { useState } from "react";
import styles from "./tabbedNavigation.module.scss";
import TabContentExplore from "../tabContent/tabContentExplore";
import TabContentProducts from "../tabContent/tabContentProducts";

const tabs = [
  {
    id: 1,
    label: "PRODUCTS",
    content: <TabContentProducts />,
  },
  {
    id: 2,
    label: "EXPLORE",
    content: <TabContentExplore />,
  },
];

const TabbedNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${styles.tab} ${
              tab.id === activeTab ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      {tabs.find((tab) => tab.id === activeTab)?.content}
    </div>
  );
};

export default TabbedNavigation;

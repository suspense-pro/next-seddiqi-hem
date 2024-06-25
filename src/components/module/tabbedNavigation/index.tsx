import React, { useContext, useState } from "react";
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
const TabbedNavigation = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${tab.id === activeTab && styles.activeTab} ${
              styles.tab
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <>
        {tabs.map((tab) =>
          activeTab === tab.id ? <div key={tab.id}>{tab.content}</div> : null
        )}
      </>
    </div>
  );
};

export default TabbedNavigation;

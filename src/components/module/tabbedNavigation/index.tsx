import React, { useContext, useMemo, useState } from "react";
import styles from "./tabbedNavigation.module.scss";
import { generateUniqueId } from "@utils/helpers/uniqueId";

const TabbedNavigation: React.FC<{ tabs: any }> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tabs?.map((tab) => (
          <div
            key={generateUniqueId()}
            className={`${styles.tab} ${
              tab?.id === activeTab && styles.activeTab
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab?.title}
          </div>
        ))}
      </div>
      {tabs.find((tab) => tab.id === activeTab)?.content}
    </div>
  );
};

export default TabbedNavigation;

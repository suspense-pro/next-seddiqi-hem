import React, { useContext, useMemo, useState } from "react";
import styles from "./tabbedNavigation.module.scss";
import { generateUniqueId } from "@utils/helpers/uniqueId";

const TabbedNavigation: React.FC<{ tabs: any; className?: any; gap?: any }> = ({ tabs, className, gap }) => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className={styles.tabsContainer}>
      {tabs?.length > 1 && (
        <div className={`${className}`}>
          <div style={{ gap }} className={`${styles.tabs}`}>
            {tabs?.map((tab) => (
              <div
                key={generateUniqueId()}
                className={`${styles.tab} ${tab?.id === activeTab && styles.activeTab}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab?.title}
              </div>
            ))}
          </div>
        </div>
      )}

      {tabs.find((tab) => tab.id === activeTab)?.content}
    </div>
  );
};

export default TabbedNavigation;

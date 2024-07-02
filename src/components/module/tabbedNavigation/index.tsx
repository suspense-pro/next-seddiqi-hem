import React, { useContext, useMemo, useState } from "react";
import styles from "./tabbedNavigation.module.scss";
import TabContentExplore from "../tabContent/tabContentExplore";
import TabContentProducts from "../tabContent/tabContentProducts";
import { HeaderContext } from "@contexts/headerContext";

// const tabs = [
//   {
//     id: 1,
//     label: "PRODUCTS",
//     content: <TabContentProducts />,
//   },
//   {
//     id: 2,
//     label: "EXPLORE",
//     content: <TabContentExplore />,
//   },
// ];

const TabbedNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);

  const { header_data } = useContext(HeaderContext);

  const tabs = useMemo(() => {
    if (!header_data?.headerDataContents) return null;

    const contentComponents = [<TabContentProducts />, <TabContentExplore />];

    return header_data.headerDataContents.map((tab, index) => ({
      ...tab,
      id: index + 1,
      content: contentComponents[index] || null,
    }));
  }, [header_data]);

  if (!tabs) return null;

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tabs?.map((tab) => (
          <div
            key={tab.title}
            className={`${styles.tab} ${
              tab.id === activeTab ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      {tabs.find((tab) => tab.id === activeTab)?.content}
    </div>
  );
};

export default TabbedNavigation;

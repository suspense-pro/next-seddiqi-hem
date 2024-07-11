import React, { useContext, useState } from "react";
import styles from "./mobileHeader.module.scss";

import TabbedNavigation from "../tabbedNavigation";
import MobileHeaderNavbar from "../mobileHeaderNavbar";
import { HeaderContext } from "@contexts/headerContext";
import TabContentProducts from "../tabContent/tabContentProducts";
import TabContentExplore from "../tabContent/tabContentExplore";

const MobileHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { headerData } = useContext(HeaderContext);

  if (!headerData) return null;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const containerCss: React.CSSProperties = {
    height: menuOpen ? "100vh" : undefined,
    overflowY: menuOpen ? "scroll" : "hidden",
  };

  const contentComponents = [<TabContentProducts />, <TabContentExplore />];
  let tabs = [];
  headerData?.children?.forEach((tab, ind) => {
    let obj = {
      id: ind + 1,
      title: tab?.content?.type,
      tab,
    };

    if (
      !tabs.some(
        (existingTab) =>
          existingTab.id === obj.id || existingTab.title === obj.title
      )
    ) {
      tabs.push(obj);
    }
  });

  tabs = tabs.map((tab, ind) => {
    return { ...tab, content: contentComponents[ind] || null };
  });

  return (
    <div style={containerCss} className={styles.position}>
      <MobileHeaderNavbar menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <TabbedNavigation tabs={tabs} />
    </div>
  );
};

export default MobileHeader;

import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./mobileHeader.module.scss";

import TabbedNavigation from "../tabbedNavigation";
import MobileHeaderNavbar from "../mobileHeaderNavbar";
import { HeaderContext } from "@contexts/headerContext";
import TabContentProducts from "../tabContent/tabContentProducts";
import TabContentExplore from "../tabContent/tabContentExplore";

const MobileHeader = () => {
  // const [menuOpen, setMenuOpen] = useState(false);
  const { headerData, menuOpen, setMenuOpen } = useContext(HeaderContext);
  const headerRef = useRef<any | null>(null);


  if (!headerData) return null;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const containerCss: React.CSSProperties = {
    height: menuOpen ? "100vh" : "80px",
    overflowY: menuOpen ? "scroll" : "auto",
  };

  const contentComponents = [<TabContentProducts />, <TabContentExplore />];
  let tabs = [];
  headerData?.children?.forEach((tab, ind) => {
    let obj = {
      id: ind + 1,
      title: tab?.content?.type,
      tab,
    };

    if (!tabs.some((existingTab) => existingTab.id === obj.id || existingTab.title === obj.title)) {
      tabs.push(obj);
    }
  });

  tabs = tabs.map((tab, ind) => {
    return { ...tab, content: contentComponents[ind] || null };
  });

  useEffect(() => {
    if (!menuOpen && headerRef.current) {
      // Scroll the mobileHeader element to the top
      headerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [menuOpen]);


  return (
    <div ref={headerRef}  style={containerCss} className={styles.position}>
      <MobileHeaderNavbar menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <TabbedNavigation className={styles.tabNavigation} tabs={tabs} />
    </div>
  );
};

export default MobileHeader;

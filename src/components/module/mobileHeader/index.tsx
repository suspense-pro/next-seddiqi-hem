import React, { useContext, useState } from "react";
import styles from "./mobileHeader.module.scss";

import TabbedNavigation from "../tabbedNavigation";
import MobileHeaderNavbar from "../mobileHeaderNavbar";

const MobileHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const containerCss: React.CSSProperties = {
    height: menuOpen && "100vh",
    overflowY: menuOpen ? "scroll" : "hidden",
  };

  return (
    <div style={containerCss} className={styles.position}>
      <MobileHeaderNavbar menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <TabbedNavigation />
    </div>
  );
};

export default MobileHeader;

import React, { useContext, useState } from "react";
import styles from "./mobileHeader.module.scss";

import TabbedNavigation from "../tabbedNavigation";
import MobileHeaderNavbar from "../mobileHeaderNavbar";

const MobileHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.position}>
      <MobileHeaderNavbar menuOpen={menuOpen} toggleMenu={toggleMenu} />
      {menuOpen && <TabbedNavigation />}
    </div>
  );
};

export default MobileHeader;

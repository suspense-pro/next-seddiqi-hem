import React, { useContext, useState } from "react";
import styles from "./mobileHeader.module.scss";
import {
  AccountIcon,
  CloseIcon,
  HamburgerIcon,
  MapIcon,
  SearchIcon,
} from "@assets/images/svg";
import Image from "next/image";
import TabbedNavigation from "../tabbedNavigation";
import { HeaderContext } from "@contexts/headerContext";

interface MobileHeaderNavbar {
  menuOpen?: boolean;
  toggleMenu?: () => void;
}

export const MobileHeaderNavbar: React.FC<MobileHeaderNavbar> = ({
  toggleMenu,
  menuOpen,
}) => {
  const headerContext = useContext(HeaderContext);

  const { headerData } = headerContext;

  return (
    <header className={styles.mobileHeader}>
      <div className={styles.mobileHeaderContainer}>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
          <AccountIcon fill="#" />
        </div>
        <div className={styles.centerLogo}>
          <Image
            height={16}
            width={82}
            src={headerData.mobile_siddiqi_logo.imageUrl}
            alt="SeddiqiLogo"
          />
        </div>
        <div className={styles.rightIcons}>
          <SearchIcon fill="#" />
          <MapIcon fill="#" />
        </div>
      </div>
    </header>
  );
};

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

import React, { useContext } from "react";
import Image from "next/image";
import { AccountIcon, MapIcon, SearchIcon } from "@assets/images/svg";
import styles from "./MobileHeaderNavbar.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import { MobileHeaderNavbarProps } from "@utils/models";

const MobileHeaderNavbar: React.FC<MobileHeaderNavbarProps> = ({
  toggleMenu,
  menuOpen,
}) => {
  const { headerData } = useContext(HeaderContext);

  return (
    <header className={styles.mobileHeader}>
      <div className={styles.mobileHeaderContainer}>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          <div
            className={`${styles.hamBurger} ${
              menuOpen ? styles.hamburgerCross : ""
            }`}
          />
          <AccountIcon fill="#" />
        </div>
        <div className={styles.centerLogo}>
          <Image
            height={16}
            width={82}
            src={headerData.mobile_siddiqi_logo.imageUrl}
            alt="Seddiqi Logo"
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

export default MobileHeaderNavbar;

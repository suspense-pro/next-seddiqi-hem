import React, { useContext } from "react";
import Image from "@components/module/image";
import { AccountIcon, CalendarIcon, MapIcon, SearchIcon } from "@assets/images/svg";
import styles from "./MobileHeaderNavbar.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import { MobileHeaderNavbarProps } from "@utils/models";

const MobileHeaderNavbar: React.FC<MobileHeaderNavbarProps> = ({
  toggleMenu,
  menuOpen,
}) => {
  const { headerData } = useContext(HeaderContext);

  if (!headerData) return null;

  const MAIN_LOGO = headerData?.content?.mainLogo?.image;
  if(!MAIN_LOGO) return null
  console.log(headerData?.content?.logoSymbol?.image)
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
          <Image
            className={styles.centerLogo}
            image={headerData?.content?.logoSymbol?.image?.image}
            imageAltText={"Seddiqi Logo"}
          />
        <div className={styles.rightIcons}>
          <SearchIcon fill="#" />
          <CalendarIcon />
        </div>
      </div>
    </header>
  );
};

export default MobileHeaderNavbar;

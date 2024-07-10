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

  if (!headerData) return null;

  const MAIN_LOGO = headerData?.content?.mainLogo?.image;

  const MOBBILE_SEDDIQI_LOGO =
    `https://${MAIN_LOGO?.image.defaultHost}/i/${MAIN_LOGO?.image.endpoint}/${MAIN_LOGO?.image.name}` ||
    "/images/png/SeddiqiLogo.png";

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
            src={MOBBILE_SEDDIQI_LOGO}
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

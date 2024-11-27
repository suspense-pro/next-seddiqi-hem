import React, { useContext, useEffect, useRef } from "react";
import Image from "@components/module/image";
import { AccountIcon, CalendarIcon, MapIcon, PhoneIcon, SearchIcon } from "@assets/images/svg";
import styles from "./MobileHeaderNavbar.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import { MobileHeaderNavbarProps } from "@utils/models";
import Link from "next/link";
import PhoneIconNoBorder from "@assets/images/svg/PhoneIconNoBorder";

const MobileHeaderNavbar: React.FC<MobileHeaderNavbarProps> = ({ toggleMenu, menuOpen }) => {
  const { headerData } = useContext(HeaderContext);
  const headerRef = useRef<HTMLElement | null>(null);


  if (!headerData) return null;

  useEffect(() => {
    if (!menuOpen && headerRef.current) {
      // Scroll the mobileHeader element to the top
      headerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [menuOpen]);

  // const MAIN_LOGO = headerData?.content?.mainLogo?.image;
  // if (!MAIN_LOGO) return null;
  // console.log(headerData?.content?.logoSymbol?.image)
  return (
    <header  ref={headerRef} className={styles.mobileHeader}>
      <div className={styles.mobileHeaderContainer}>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          <div className={`${styles.hamBurger} ${menuOpen ? styles.hamburgerCross : ""}`} />
          <div style={{ visibility: "hidden" }}>
            <MapIcon fill="#" />
          </div>
        </div>
        <Link href={"/"}>
          <Image
            className={styles.centerLogo}
            image={headerData?.content?.logoSymbol?.image?.image}
            imageAltText={"Seddiqi Logo"}
          />
        </Link>
        <div className={styles.rightIcons}>
          {/* <SearchIcon fill="#" /> */}
          <Link href="/contact-us">
            <PhoneIconNoBorder className={styles.phoneIcon} fill="#" />
          </Link>
          <Link href="/find-a-boutique-listing">
            <MapIcon fill="#" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MobileHeaderNavbar;

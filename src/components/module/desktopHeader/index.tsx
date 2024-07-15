import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./header.module.scss";
import {
  AccountIcon,
  MapIcon,
  SearchIcon,
  WishlistIcon,
} from "@assets/images/svg";
import NavigationLink from "@components/module/navigationLink";
import { HeaderContext } from "@contexts/headerContext";
import MegaMenu from "../megaMenu";
import HeaderLogoBar from "../headerLogoBar";
import HeaderMainLinks from "../headerMainLinks";

export default function DesktopHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { updateCurrent } = useContext(HeaderContext);

  // MAKE SMALL HEADER ON SCROLL
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerScrollStyles = `${styles.headerContainer} ${
    scrolled && styles.scrolled
  }`;

  return (
    <div
      onMouseLeave={() => updateCurrent(null)}
      className={styles.desktopHeader}
    >
      <div className={headerScrollStyles}>
        <MegaMenu headerHeightClass={styles.headerHeight} />
        <div className={styles.headerMargin}>
          <HeaderLogoBar headerLogoContainer={styles.headerLogoContainer} />
          <HeaderMainLinks />
        </div>
      </div>
    </div>
  );
}

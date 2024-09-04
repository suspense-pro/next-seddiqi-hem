import { useCallback, useContext, useEffect, useState } from "react";
import { HeaderContext } from "@contexts/headerContext";
import MegaMenu from "../megaMenu";
import HeaderLogoBar from "../headerLogoBar";
import HeaderMainLinks from "../headerMainLinks";
import styles from "./header.module.scss";
import Image from "../image";
import Link from "next/link";

const LogoLink = ({ logo, className }) => {
  if (!logo) return null;
  return (
    <Link key={logo?.altText} href={logo?.url || "/"} style={{ margin: 0, padding: 0 }}>
      <Image image={logo?.image} className={className} imageAltText={logo?.altText} />
    </Link>
  );
};

export default function DesktopHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { headerData, updateCurrent } = useContext(HeaderContext);

  const { mainLogo } = headerData?.content;

  // MAKE SMALL HEADER ON SCROLL
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerScrollStyles = `${styles.headerContainer} ${scrolled && styles.scrolled}`;

  return (
    <div onMouseLeave={() => updateCurrent(null)} className={styles.desktopHeader}>
      <div className={headerScrollStyles}>
        <MegaMenu headerHeightClass={styles.headerHeight} />
        <div className={`${scrolled && styles.headerScrolled} ${styles.headerMargin}`}>
          {mainLogo && (
            <div className={styles.headerLogoContainer}>
              <LogoLink logo={mainLogo?.image} className={styles.mainLogo} />
            </div>
          )}
          <HeaderMainLinks />
        </div>
      </div>
    </div>
  );
}

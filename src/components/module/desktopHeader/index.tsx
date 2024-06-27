import Image from "next/image";
import styles from "./header.module.scss";
import {
  AccountIcon,
  MapIcon,
  SearchIcon,
  WishlistIcon,
} from "@assets/images/svg";
import NavigationLink from "@components/module/navigationLink";
import { headerDummyData } from "./headerDummyData";
import { useContext, useEffect, useState } from "react";
import { HeaderContext } from "@contexts/headerContext";
import Link from "next/link";
import MegaMenu from "../megaMenu";

export default function DesktopHeader() {
  const [scrolled, setScrolled] = useState(false);
  const headerContext = useContext(HeaderContext);

  if (!headerContext) {
    return null;
  }
  const { updateCurrent, headerData } = headerContext;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      onMouseLeave={() => updateCurrent(null)}
      className={styles.desktopHeader}
    >
      <div
        className={`${styles.headerContainer} ${
          scrolled ? styles.scrolled : ""
        }`}
      >
        <MegaMenu headerHeightClass={styles.headerHeight} />
        <div className={styles.headerMargin}>
          <div className={styles.headerLogoContainer}>
            {headerData?.header_logos.map((logo) => (
              <Link style={{ margin: 0, padding: 0 }} href={logo.url}>
                <Image
                  key={logo.id}
                  src={logo.imageUrl}
                  width={logo.width}
                  height={logo.height}
                  alt={logo.title}
                  className={styles.image}
                />
              </Link>
            ))}
          </div>
          <div className={styles.linksContainer}>
            <div className={styles.appointmentBtn}>BOOK APPOINTMENT</div>
            <div className={styles.links}>
              {headerDummyData.navigation?.map((link, ind) => (
                <div onMouseEnter={() => updateCurrent(ind)}>
                  <NavigationLink
                    hover={false}
                    className={styles.headerLink}
                    key={link.id}
                    title={link.title}
                    url={link.url && link.url}
                  />
                </div>
              ))}
            </div>
            <div className={styles.navIcons}>
              <SearchIcon fill={"#"} />
              <AccountIcon fill={"#"} />
              <MapIcon fill={"#"} />
              <WishlistIcon fill={"#"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

// TEMP
const HEADER_LOGOS = [
  {
    id: 1,
    width: 78.65,
    height: 46,
    title: "PatekLogo",
    imageUrl: "/images/png/PatekLogo.png",
    url: "/",
  },
  {
    id: 2,
    width: 120,
    height: 24,
    title: "PatekLogo",
    imageUrl: "/images/png/SeddiqiLogo.png",
    url: "/",
  },
  {
    id: 3,
    width: 100.3,
    height: 46,
    title: "PatekLogo",
    imageUrl: "/images/png/ROlexLogo.png",
    url: "/",
  },
];

export default function DesktopHeader() {
  const [scrolled, setScrolled] = useState(false);
  const headerContext = useContext(HeaderContext);

  if (!headerContext) {
    return null;
  }
  const { current, updateCurrent } = headerContext;

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
    <div className={styles.desktopHeader}>
      <div
        className={`${styles.headerContainer} ${
          scrolled ? styles.scrolled : ""
        }`}
      >
        <MegaMenu headerHeightClass={styles.headerHeight} />

        {/* logo bar */}
        <div className={styles.headerLogoContainer}>
          {HEADER_LOGOS?.map((logo) => (
            <Link style={{ margin: 0, padding: 0 }} href={logo.url}>
              <Image
                key={logo.title}
                src={logo.imageUrl}
                width={logo.width}
                height={logo.height}
                alt={logo.title}
                className={styles.image}
              />
            </Link>
          ))}
        </div>

        {/* links */}
        <div
          // onMouseLeave={() => updateCurrent(null)}
          className={styles.linksContainer}
        >
          <div className={styles.appointmentBtn}>BOOK APPOINTMENT</div>
          <div className={styles.links}>
            {headerDummyData.navigation?.map((link, ind) => (
              <div onMouseEnter={() => updateCurrent(ind)}>
                <NavigationLink
                  className={styles.headerLink}
                  key={link.title}
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
  );
}

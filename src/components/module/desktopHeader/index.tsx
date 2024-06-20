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
import { useContext } from "react";
import { HeaderContext } from "@contexts/headerContext";
import Link from "next/link";

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
  const headerContext = useContext(HeaderContext);

  if (!headerContext) {
    return null;
  }
  const { current, updateCurrent } = headerContext;
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* logo bar */}
        <div className={styles.headerLogoContainer}>
          {HEADER_LOGOS?.map((logo) => (
            <Link href={logo.url}>
              <Image
                key={logo.title}
                src={logo.imageUrl}
                width={logo.width}
                height={logo.height}
                alt={logo.title}
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
    </header>
  );
}

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

// TEMP
const HEADER_LOGOS = [
  {
    id: 1,
    width: 78.65,
    height: 46,
    title: "PatekLogo",
    url: "/images/png/PatekLogo.png",
  },
  {
    id: 2,
    width: 120,
    height: 24,
    title: "PatekLogo",
    url: "/images/png/SeddiqiLogo.png",
  },
  {
    id: 3,
    width: 100.3,
    height: 46,
    title: "PatekLogo",
    url: "/images/png/ROlexLogo.png",
  },
];

export default function DesktopHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* logo bar */}
        <div className={styles.headerLogoContainer}>
          {HEADER_LOGOS?.map((logo) => (
            <Image
              key={logo.title}
              src={logo.url}
              width={logo.width}
              height={logo.height}
              alt={logo.title}
            />
          ))}
        </div>

        {/* links */}
        <div className={styles.linksContainer}>
          <div className={styles.appointmentBtn}>BOOK APPOINTMENT</div>
          <div className={styles.links}>
            {headerDummyData.navigation?.map((link) => (
              <NavigationLink
                className={styles.headerLink}
                key={link.title}
                title={link.title}
              />
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

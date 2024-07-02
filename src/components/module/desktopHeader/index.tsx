import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styles from "./header.module.scss";
import {
  AccountIcon,
  MapIcon,
  SearchIcon,
  WishlistIcon,
} from "@assets/images/svg";
import NavigationLink from "@components/module/navigationLink";
import { headerDummyData } from "./headerDummyData";
import { HeaderContext } from "@contexts/headerContext";
import MegaMenu from "../megaMenu";

export default function DesktopHeader() {
  const [scrolled, setScrolled] = useState(false);
  const headerContext = useContext(HeaderContext);

  if (!headerContext) return null;

  const { updateCurrent, headerData, header_data } = headerContext;
  console.log("Header_data", header_data);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
              <Link
                key={logo.id}
                href={logo.url}
                style={{ margin: 0, padding: 0 }}
              >
                <Image
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
                <div key={link.id} onMouseEnter={() => updateCurrent(ind)}>
                  <NavigationLink
                    hover={false}
                    className={styles.headerLink}
                    title={link.title}
                    url={link.url}
                  />
                </div>
              ))}
            </div>
            <div className={styles.navIcons}>
              {[SearchIcon, AccountIcon, MapIcon, WishlistIcon].map(
                (Icon, index) => (
                  <Icon key={index} fill="#" />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

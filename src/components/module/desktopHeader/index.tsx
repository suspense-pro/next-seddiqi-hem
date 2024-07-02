import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";
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

  const { updateCurrent, headerData, header_data } = useContext(HeaderContext);

  const headerMainLinks = useMemo(
    () => header_data?.headerMainLinks?.flat(),
    [header_data]
  );

  const cta = header_data?.headerData?.booking_cta;

  if (!headerMainLinks) return null;

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
            {headerData?.header_logos.map(
              ({ id, url, imageUrl, width, height, title }) => (
                <Link key={id} href={url} style={{ margin: 0, padding: 0 }}>
                  <Image
                    src={imageUrl}
                    width={width}
                    height={height}
                    alt={title}
                    className={styles.image}
                  />
                </Link>
              )
            )}
          </div>
          <div className={styles.linksContainer}>
            <div className={styles.appointmentBtn}>
              <NavigationLink hover={false} title={cta?.title} url={cta?.url} />
            </div>
            <div className={styles.links}>
              {headerMainLinks?.map((item, ind) => (
                <div key={item.title} onMouseEnter={() => updateCurrent(ind)}>
                  <NavigationLink
                    hover={false}
                    className={styles.headerLink}
                    title={item.title}
                    url={item?.url}
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

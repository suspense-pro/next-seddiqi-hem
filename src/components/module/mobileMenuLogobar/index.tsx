import { useContext, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeaderContext } from "@contexts/headerContext";
import { HeaderFooter } from "@components/module";
import styles from "./mobileMenuLogobar.module.scss";

const MobileMenuLogobar = () => {
  const { headerData } = useContext(HeaderContext);
  const { leftLogo, bookingCTA } = headerData?.content;

  const PATEK_LOGO = "/images/png/PatekLogo.png";
  const rolexContainerRef = useRef(null);

  useEffect(() => {
    if (rolexContainerRef.current) {
      rolexContainerRef.current.innerHTML = `<div id="rolex-retailer-clock">
        <div class="LinkEnabler" style="position:absolute; height:70px; width:150px; z-index:1;"></div>
        <iframe
          id="rolex_retailer"
          title="Rolex Official Retailer"
          src="https://static.rolex.com/retailers/clock/?colour=gold&amp;apiKey=fd5d8663fc8674a9ffab32649c3e39bf&amp;lang=en"
          style="width:150px;height:70px;border:0;margin:0;padding:0;overflow:hidden;z-index:0;position:relative;"
          scrolling="NO"
          frameborder="NO">
        </iframe>
      </div>`;
    }
  }, []);

  return (
    <div className={styles.bottom}>
      <div className={styles.recommendContainer}>
        <div className={styles.recommendText}>Recommended for you</div>
        <div className={styles.logos}>
          <Link href={"/"}>
            <Image
              src={PATEK_LOGO}
              width={118}
              height={68}
              alt={leftLogo?.image?.altText || "Patek Philippe"}
              className={styles.image}
            />
          </Link>
          <Link href={headerData?.content?.rolexLogo}>
            <div ref={rolexContainerRef} className={styles.rolexScriptContainer}></div>
          </Link>
        </div>
      </div>
      <HeaderFooter className={styles.headerFooter} />
    </div>
  );
};

export default MobileMenuLogobar;

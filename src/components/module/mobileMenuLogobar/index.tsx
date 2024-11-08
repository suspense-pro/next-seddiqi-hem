import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeaderContext } from "@contexts/headerContext";
import { Button, HeaderFooter, NavigationLink } from "@components/module";
import styles from "./mobileMenuLogobar.module.scss";

const MobileMenuLogobar = () => {
  const { headerData } = useContext(HeaderContext);
  const { leftLogo, rightLogo, bookingCTA } = headerData?.content;

  const PATEK_LOGO = "/images/png/PatekLogo.png"
  const ROLEX_LOGO = "/images/png/RolexLogo.png"
    
  if(!PATEK_LOGO || !ROLEX_LOGO) return null

  const RolexScript = 
  `<div id="rolex-retailer-clock"><div class="LinkEnabler" style="position:absolute; height:70px; width:150px; z-index:1;"></div><iframe id="rolex_retailer" title="Rolex Official Retailer" src="https://static.rolex.com/retailers/clock/?colour=gold&amp;apiKey=fd5d8663fc8674a9ffab32649c3e39bf&amp;lang=en" style="width:150px;height:70px;border:0;margin:0;padding:0;overflow:hidden;z-index:0;position:relative;scroll:none" scrolling="NO" frameborder="NO"></iframe></div>`
    
  return (
    <div className={styles.bottom}>
      {/* <Button
        isLink={true}
        link={bookingCTA?.image?.url}
        className={styles.appointmentBtn}
        title={bookingCTA?.image?.label}
        color="dark_green"
        type={bookingCTA?.image?.type}
      /> */}
      <div className={styles.recommendContainer}>
        <div className={styles.recommendText}>Recommended for you</div>
        <div className={styles.logos}>
          <Link href={"/"}>
            <Image
              src={PATEK_LOGO}
              width={118}
              height={68}
              alt={leftLogo?.image?.altText}
              className={styles.image}
            />
          </Link>
          <Link href={headerData?.content?.rolexLogo} dangerouslySetInnerHTML={{__html: RolexScript}}>
          </Link>
          {/* <Link href={"/"}>
            <Image
              src={ROLEX_LOGO}
              width={104}
              height={48}
              alt={rightLogo?.image?.altText}
              className={styles.image}
            />
          </Link> */}
        </div>
      </div>
      <HeaderFooter className={styles.headerFooter} />
    </div>
  );
};

export default MobileMenuLogobar;

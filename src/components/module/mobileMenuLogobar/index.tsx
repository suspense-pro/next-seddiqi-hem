import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeaderContext } from "@contexts/headerContext";
import { HeaderFooter, NavigationLink } from "@components/module";
import styles from "./mobileMenuLogobar.module.scss";

const MobileMenuLogobar = () => {
  const { headerData } = useContext(HeaderContext);

  const { leftLogo, rightLogo, bookingCTA } = headerData?.content;
  const PATEK_LOGO = leftLogo?.image?.url
    ? leftLogo?.image?.url
    : "/images/png/PatekLogo.png";
  const ROLEX_LOGO = rightLogo?.image?.url
    ? rightLogo?.image?.url
    : "/images/png/ROlexLogo.png";

  return (
    <div className={styles.bottom}>
      <div className={styles.appointmentBtn}>
        <NavigationLink
          hover={false}
          title={bookingCTA?.image?.label}
          url={bookingCTA?.image?.url}
        />
      </div>
      <div className={styles.recommendContainer}>
        <div className={styles.recommendText}>Recommended for you</div>
        <div className={styles.logos}>
          <Link href={"/"}>
            <Image
              src={PATEK_LOGO}
              width={82}
              height={48}
              alt={leftLogo?.image?.altText}
              className={styles.image}
            />
          </Link>
          <Link href={"/"}>
            <Image
              src={ROLEX_LOGO}
              width={104}
              height={48}
              alt={rightLogo?.image?.altText}
              className={styles.image}
            />
          </Link>
        </div>
      </div>
      <HeaderFooter className={styles.headerFooter} />
    </div>
  );
};

export default MobileMenuLogobar;

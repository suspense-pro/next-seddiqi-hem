import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeaderContext } from "@contexts/headerContext";
import { HeaderFooter } from "@components/module";
import styles from "./mobileMenuLogobar.module.scss";

const MobileMenuLogobar = () => {
  const { headerData } = useContext(HeaderContext);

  return (
    <div className={styles.bottom}>
      <div className={styles.appointmentBtn}>BOOK APPOINTMENT</div>
      <div className={styles.recommendContainer}>
        <div className={styles.recommendText}>Recommended for you</div>
        <div className={styles.logos}>
          {headerData.mobile_logos.map(
            ({ id, url, imageUrl, width, height }) => (
              <Link key={id} href={url}>
                <Image
                  src={imageUrl}
                  width={width}
                  height={height}
                  alt={url}
                  className={styles.image}
                />
              </Link>
            )
          )}
        </div>
      </div>
      <HeaderFooter className={styles.headerFooter} />
    </div>
  );
};

export default MobileMenuLogobar;

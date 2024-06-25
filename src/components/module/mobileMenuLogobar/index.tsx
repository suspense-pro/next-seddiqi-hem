import styles from "./mobileMenuLogobar.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import Image from "next/image";
import { useContext } from "react";
const MobileMenuLogobar = () => {
  const headerContext = useContext(HeaderContext);
  const { headerData } = headerContext;

  return (
    <div className={styles.bottom}>
      <div className={styles.appointmentBtn}>BOOK APPOINTMENT</div>
      <div className={styles.recommendContainer}>
        <div className={styles.recommendText}>Recommended for you</div>
        <div className={styles.logos}>
          {headerData.mobile_logos.map((logo) => (
            <Image
              key={logo.imageUrl}
              src={logo.imageUrl}
              width={logo.width}
              height={logo.height}
              alt={logo.url}
              className={styles.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenuLogobar;

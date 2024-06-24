import {
  AccountIcon,
  CloseIcon,
  HamburgerIcon,
  MapIcon,
  SearchIcon,
} from "@assets/images/svg";
import styles from "./MobileHeaderNavbar.module.scss";
import { useContext } from "react";
import { HeaderContext } from "@contexts/headerContext";
import Image from "next/image";

interface MobileHeaderNavbarProps {
  menuOpen?: boolean;
  toggleMenu?: () => void;
}

const MobileHeaderNavbar: React.FC<MobileHeaderNavbarProps> = ({
  toggleMenu,
  menuOpen,
}) => {
  const headerContext = useContext(HeaderContext);

  const { headerData } = headerContext;

  return (
    <header className={styles.mobileHeader}>
      <div className={styles.mobileHeaderContainer}>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
          <AccountIcon fill="#" />
        </div>
        <div className={styles.centerLogo}>
          <Image
            height={16}
            width={82}
            src={headerData.mobile_siddiqi_logo.imageUrl}
            alt="SeddiqiLogo"
          />
        </div>
        <div className={styles.rightIcons}>
          <SearchIcon fill="#" />
          <MapIcon fill="#" />
        </div>
      </div>
    </header>
  );
};

export default MobileHeaderNavbar;

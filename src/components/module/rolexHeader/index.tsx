import React from "react";
import styles from "./rolexHeader.module.scss";
import Image from "next/image";
import Link from "next/link";

interface RolexNavbarProps {
  type?: "green" | "black"; // You can add more options if needed
}

const RolexNavbar: React.FC<RolexNavbarProps> = ({ type }) => {
  //   const links = ["Rolex At Seddiqi", "Rolex Collection", "New Watches 2024", "Servicing Your Rolex"];
  const links = ["Rolex Certified Pre-Owned at Ahmed Seddiqi", "Our Selection", "The Rolex Certification"];

  return (
    <nav className={`${type === "black" && styles.whiteBg} ${styles.rolexNavbar}`}>
      {type === "green" ? (
        <div className={styles.logoContainer}>
          <Image
            src="/images/png/RolexLogo2.png"
            alt="Rolex Official Retailer"
            width={85}
            height={42.5}
            className={styles.rolexLogo}
          />
        </div>
      ) : (
        <div className={styles.logoContainer}>
          <Image
            src="/images/png/RolexLogoBlack.png"
            alt="Rolex Official Retailer"
            width={105}
            height={44}
            className={styles.rolexLogo}
          />
        </div>
      )}

      <ul className={styles.navbarLinks}>
        {links?.map((link) => (
          <li>
            <Link className={`${type === "black" && styles.navBlack} ${styles.navLink}`} href="#">
              {link}
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.contactButton}>
        <Link className={`${type === "black" && styles.btnGreen} ${styles.btnWhite}`} href="#">
          Contact Us
        </Link>
      </div>
      <div className={styles.dropdownContainer}></div>
    </nav>
  );
};

export default RolexNavbar;

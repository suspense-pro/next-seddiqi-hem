import React from "react";
import styles from "./rolexHeader.module.scss";
import Image from "next/image";
import NavigationLink from "../navigationLink";
import Link from "next/link";

const RolexNavbar: React.FC = () => {
  return (
    <nav className={styles.rolexNavbar}>
      <div className={styles.logoContainer}>
        <Image
          src="/images/png/RolexLogo2.png"
          alt="Rolex Official Retailer"
          width={85}
          height={42.5}
          className={styles.rolexLogo}
        />
      </div>
      <ul className={styles.navbarLinks}>
        <li>
          <Link href="#">Rolex At Seddiqi</Link>
        </li>
        <li>
          <Link href="#">Rolex Collection</Link>
        </li>
        <li>
          <Link href="#">New Watches 2024</Link>
        </li>
        <li>
          <Link href="#">Servicing Your Rolex</Link>
        </li>
      </ul>
      <div className={styles.contactButton}>
        <a href="#">Contact Us</a>
      </div>
    </nav>
  );
};

export default RolexNavbar;

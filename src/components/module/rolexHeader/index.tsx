import React, { useState, useRef, useEffect } from "react";
import styles from "./rolexHeader.module.scss";
import Link from "next/link";
import { ArrowDown } from "@assets/images/svg";
import { useWindowWidth } from "@utils/useCustomHooks";
import Image from "./../image/index";

interface RolexNavbarProps {
  content?: any;
}

const RolexNavbar: React.FC<RolexNavbarProps> = ({ content }) => {
  if (!content) return null;

  const links = content?.navLinks;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [height, setHeight] = useState<number | undefined>(0);
  const [isClient, setIsClient] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const windowWidth = useWindowWidth();
  const type = content?.backgroundColor;
  const screenSize = type === "green" ? 1250 : 1110;

  const isGreen = type === "green";
  const isWhite = type === "white";

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (dropdownRef.current && isDropdownOpen) {
      setHeight(dropdownRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (!isClient) return null;

  return (
    <>
      <nav
        className={`${windowWidth < screenSize && styles.rolexMobileNavbar} ${isWhite && styles.whiteBg} ${
          styles.rolexNavbar
        }`}
      >
        <Image
          className={isGreen ? styles.rolexLogo : styles.rolexLogoBlack}
          height={isGreen ? styles.rolexLogo : styles.rolexLogoBlack}
          image={content?.logo?.image}
          imageAltText={content?.logo?.altText}
        />

        {windowWidth > screenSize ? (
          <>
            <ul className={styles.navbarLinks}>
              {links?.map((link) => (
                <li key={link?.label}>
                  <Link className={`${isWhite && styles.navBlack} ${styles.navLink}`} href={link?.url}>
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.contactButton}>
              <Link className={`${isWhite && styles.btnGreen} ${styles.btnWhite}`} href={content?.cta?.url}>
                {content?.cta?.label}
              </Link>
            </div>
          </>
        ) : (
          <div className={styles.dropdownContainer} onClick={toggleDropdown}>
            <div className={`${isGreen && styles.menuWhite} ${styles.menu}`}>Menu</div>
            <ArrowDown
              fill={isGreen ? "white" : "black"}
              className={isDropdownOpen ? styles.activeArrow : ""}
            />
          </div>
        )}
      </nav>

      {windowWidth < screenSize && (
        <ul
          ref={dropdownRef}
          className={isGreen ? styles.navbarMobileGreenLinks : styles.navbarMobileLinks}
          style={{
            height: isDropdownOpen ? height : 0,
            overflow: "hidden",
            transition: "all 0.3s ease",
          }}
        >
          {links?.map((link, index) => (
            <li key={index}>
              <Link className={`${isWhite && styles.navMobileBlack} ${styles.navMobileLink}`} href={link?.url}>
                {link?.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              className={`${isWhite && styles.navMobileBlack} ${styles.navMobileLink}`}
              href={content?.cta?.url}
            >
              {content?.cta?.label}
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default RolexNavbar;

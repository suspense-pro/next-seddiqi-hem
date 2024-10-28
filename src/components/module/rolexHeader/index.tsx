import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./rolexHeader.module.scss";
import Link from "next/link";
import { ArrowDown } from "@assets/images/svg";
import { useWindowWidth } from "@utils/useCustomHooks";
import Image from "./../image/index";
import NavigationLink from "../navigationLink";

const RolexNavbar = ({ ...content }) => {
  if (!content) return null;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [height, setHeight] = useState<number | undefined>(0);
  const [isClient, setIsClient] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);
  const windowWidth = useWindowWidth();
  const type = content?.backgroundColor;
  const screenSize = type === "green" ? 1250 : 1110;

  const isGreen = type === "green";
  const isWhite = type === "white";
  const links = content?.navLinks;

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (dropdownRef?.current && isDropdownOpen) {
      setHeight(dropdownRef?.current?.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (!isClient) return null;

  return (
    <div className={`${styles.container}`}>
      <nav
        className={`${scrolled && styles.scrolled} ${windowWidth < screenSize && styles.rolexMobileNavbar} ${
          isWhite && styles.whiteBg
        } ${styles.rolexNavbar}`}
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
                  <NavigationLink
                    className={`${isWhite && styles.navBlack} ${styles.navLink}`}
                    title={link?.label}
                    isNewTab={link?.isNewTab}
                    url={link?.url}
                  />
                </li>
              ))}
            </ul>
            <div className={styles.contactButton}>
              <NavigationLink
                className={`${isWhite && styles.btnGreen} ${styles.btnWhite}`}
                title={content?.cta?.label}
                isNewTab={content?.cta?.isNewTab}
                url={content?.cta?.url}
              />
            </div>
          </>
        ) : (
          <div className={styles.dropdownContainer} onClick={toggleDropdown}>
            <div className={`${isGreen && styles.menuWhite} ${styles.menu}`}>Menu</div>
            <ArrowDown fill={isGreen ? "white" : "black"} className={isDropdownOpen ? styles.activeArrow : ""} />
          </div>
        )}
      </nav>

      {windowWidth < screenSize && (
        <ul
          ref={dropdownRef}
          className={`${isGreen ? styles.navbarMobileGreenLinks : styles.navbarMobileLinks}`}
          style={{
            height: isDropdownOpen ? height : 0,
            overflow: "hidden",
            transition: "all 0.3s ease",
          }}
        >
          {links?.map((link, index) => (
            <li key={index}>
              <NavigationLink
                className={`${isWhite && styles.navMobileBlack} ${styles.navMobileLink}`}
                title={link?.label}
                isNewTab={link?.isNewTab}
                url={link?.url}
              />
            </li>
          ))}
          <li>
            <NavigationLink
              className={`${isWhite && styles.navMobileBlack} ${styles.navMobileLink}`}
              title={content?.cta?.label}
              isNewTab={content?.cta?.isNewTab}
              url={content?.cta?.url}
            />
          </li>
        </ul>
      )}
    </div>
  );
};

export default RolexNavbar;

import React, { useState, useRef, useEffect, useCallback, useContext } from "react";
import styles from "./rolexHeader.module.scss";
import Link from "next/link";
import { ArrowDown } from "@assets/images/svg";
import { useWindowWidth } from "@utils/useCustomHooks";
import Image from "../../../module/image/index";
import NavigationLink from "../../../module/navigationLink";
import { useRouter } from "next/router";
import { RolexContext } from "@contexts/rolexContext";

const RolexNavbar = ({ ...content }) => {
  if (!content) return null;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [height, setHeight] = useState<number | undefined>(0);
  const [isClient, setIsClient] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);
  const windowWidth = useWindowWidth();
  const { backgroundColor: type, navLinks: links, logo, cta } = content;
  const screenSize = type === "green" ? 1250 : 1110;

  const isGreen = type === "green";
  const isWhite = type === "white";

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (dropdownRef.current && isDropdownOpen) {
      setHeight(dropdownRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isDropdownOpen]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  if (!isClient) return null;
  const router = useRouter();
  const { rolexContact, updateRolexContact } = useContext(RolexContext);

  return (
    <div className={styles.container}>
      <nav className={`${scrolled && styles.scrolled} ${isWhite && styles.whiteBg} ${styles.rolexNavbar}`}>
        <Link href={isGreen ? "/rolex" : "/rolex/cpo"}>
          <Image
            className={isGreen ? styles.rolexLogo : styles.rolexLogoBlack}
            height={isGreen ? styles.rolexLogo : styles.rolexLogoBlack}
            image={logo?.image}
            imageAltText={logo?.altText}
          />
        </Link>

        {windowWidth > screenSize ? (
          <>
            <ul className={`${styles.navbarGreenLinks} ${styles.navbarLinks}`}>
              {links?.map((link) =>
                link?.label?.toLowerCase() !== "contact us" ? (
                  <li   onClick={() => {
                    updateRolexContact(false);
                  }} key={link?.label}>
                    <NavigationLink
                      className={`${isWhite && styles.navBlack} ${styles.navLink}`}
                      title={link?.label}
                      isNewTab={link?.isNewTab}
                      url={link?.url}
                    />
                  </li>
                ) : (
                  <li
                    onClick={() => {
                      updateRolexContact(true);
                    }}
                    key={link?.label}
                  >
                    <div
                      className={`${link?.url === router?.asPath && styles.activeLink} ${isWhite && styles.navBlack} ${
                        styles.navLink
                      }`}
                    >
                      <span>{link?.label}</span>
                    </div>
                  </li>
                )
              )}
            </ul>
            {/* <div className={styles.contactButton}>
              <NavigationLink
                className={`${isWhite && styles.btnGreen} ${styles.btnWhite}`}
                title={cta?.label}
                isNewTab={cta?.isNewTab}
                url={cta?.url}
              />
            </div> */}
          </>
        ) : (
          <div className={styles.dropdownContainer} onClick={toggleDropdown}>
            <div className={`${isGreen && styles.menuWhite} ${styles.menu}`}>Menu</div>
            <ArrowDown fill={isGreen ? "white" : "black"} className={isDropdownOpen ? styles.activeArrow : ""} />
          </div>
        )}

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
              <li onClick={() => setIsDropdownOpen(false)} key={index}>
                <NavigationLink
                  className={`${isWhite && styles.navMobileBlack} ${styles.navMobileLink}`}
                  title={link?.label}
                  isNewTab={link?.isNewTab}
                  url={link?.url}
                />
              </li>
            ))}
            {/* <li>
              <NavigationLink
                className={`${isWhite && styles.navMobileBlack} ${styles.navMobileLink}`}
                title={cta?.label}
                isNewTab={cta?.isNewTab}
                url={cta?.url}
              />
            </li> */}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default RolexNavbar;

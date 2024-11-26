import React, { useState, useRef, useMemo, useEffect } from "react";
import styles from "./brandListing.module.scss";
import Button from "../button";
import { getCategory } from "@utils/sfcc-connector/dataService";
import Link from "next/link";
import TabbedNavigation from "../tabbedNavigation";
import classNames from "classnames";
import { useDeviceWidth } from "@utils/useCustomHooks";

const BrandListing = ({ height = true, categories, brandPages = [], ...content }) => {
  const alphabet = [...Array(26).keys()].map((i) => String.fromCharCode(i + 97));

  const [selectedLetter, setSelectedLetter] = useState("A");

  const [brands, setBrands] = useState(categories);

  const alphabetNavRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const brandListRef = useRef(null);
  const isDesktop = useDeviceWidth();

  // Handle the letter click to scroll the brand list
  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    const section = document.getElementById(`section-${letter}`);

    if (section && brandListRef.current) {
      if (isDesktop[0]) {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;

        const containerTop = brandListRef.current.getBoundingClientRect().top + window.scrollY;

        const dynamicOffset = window.innerHeight * 0.1;
        const scrollToPosition = sectionTop - containerTop + window.scrollY + 150;

        section.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "start",
        });

        // window.scrollTo({
        //   top: scrollToPosition,
        //   behavior: "smooth",
        // });
      } else {
        section.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "start",
        });
      }
    }
  };

  const enabledAlphabets = useMemo(() => {
    const enabled = [];
    brands?.forEach((brand) => {
      const firstLetter = brand.id[0]?.toLowerCase();
      if (firstLetter && !enabled.includes(firstLetter)) {
        enabled.push(firstLetter);
      }
    });
    return enabled.sort();
  }, [brands]);
  //  scroll functionality
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.pageX || e.touches[0].pageX;
    scrollLeftRef.current = alphabetNavRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX;
    // The multiplier affects scroll speed
    const walk = (x - startXRef.current) * 2;
    alphabetNavRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // Add touch event listeners for mobile devices
  useEffect(() => {
    const nav = alphabetNavRef.current;
    if (nav) {
      nav.addEventListener("touchstart", handleMouseDown, { passive: true });
      nav.addEventListener("touchmove", handleMouseMove, { passive: true });
      nav.addEventListener("touchend", handleMouseUpOrLeave);
      return () => {
        nav.removeEventListener("touchstart", handleMouseDown);
        nav.removeEventListener("touchmove", handleMouseMove);
        nav.removeEventListener("touchend", handleMouseUpOrLeave);
      };
    }
  }, []);

  // const fetchBrands = async () => {
  //   const brands = await getCategory({ cgid: "seddiqi-storefront-catalog", method: "GET" });
  //   setBrands(brands?.response?.categories);
  // };

  useEffect(() => {
    setBrands(categories);
  }, [brands]);

  // console.log({brandPages});
  // console.log({brands});
  

  return (
    <div className={styles.brandSectionContainer}>
      {/* Alphabet Navigation */}
      <div
        ref={alphabetNavRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseUp={handleMouseUpOrLeave}
        onMouseMove={handleMouseMove}
        className={styles.alphabetNav}
      >
        {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
          <button
            key={letter}
            className={`${styles.alphabetLetter} ${
              brands.filter((x) => x.id.toLowerCase().startsWith(letter.toLowerCase())).length > 0
                ? styles.enabled
                : styles.disabled
            }`}
            onClick={() => handleLetterClick(letter.toLowerCase())}
            disabled={brands.filter((x) => x.id.toLowerCase().startsWith(letter.toLowerCase())).length < 1}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Brand List */}
      <div className={`${height && styles.brandListHeight} ${styles.brandList}`} ref={brandListRef}>
        {enabledAlphabets?.map((letter) => (
          <div key={letter} id={`section-${letter}`} className={styles.brandGroup}>
            <h4>{letter}</h4>
            <div className={styles.brandColumn}>
              {brands &&
                brands
                  .filter((x) => x.id.toLowerCase().startsWith(letter))
                  .map(({ id, name }, ind) => (
                    <div key={ind} className={styles.brandName}>

                      <Link
                        className={
                          !brandPages.find((x) => x.url.toLowerCase().includes(id.toLowerCase())) && styles.disabled
                        }
                        target="_self"
                        href={`${brandPages.find((x) => x.url.toLowerCase().includes(id.toLowerCase()))?.url ?? "/"}`}
                      >
                        {name}
                      </Link>
                    </div>
                  ))}
            </div>
          </div>
        ))}
      </div>

      {content?.viewAllBrandsCta && (
        <div className={styles.btnContainer}>
          <Button
            isLink={true}
            link={content?.viewAllBrandsCta?.url}
            title={content?.viewAllBrandsCta?.label}
            color={content?.viewAllBrandsCta?.color}
            type={content?.viewAllBrandsCta?.type}
          />
        </div>
      )}
    </div>
  );
};

export default BrandListing;

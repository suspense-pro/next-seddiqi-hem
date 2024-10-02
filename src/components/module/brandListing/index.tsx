import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from "./brandListing.module.scss";
import Button from "../button";
import { getCategory } from "@utils/sfcc-connector/dataService";

const brandsData = {
  A: ["Akrivia", "Aramedes", "Artya", "Audemars Piguet", "Arnold & Son", "Angelus"],
  B: ["Bell & Ross", "Bernard Favre", "Bovet", "Breitling", "Bvlgari", "Blancpain", "Baume & Mercier"],
  C: ["Cabestan", "Chopard", "Christian Van der Klaauw", "Christophe Claret", "Claude Meylan", "Cartier", "Corum"],
  D: ["Debethune", "Dior", "De Grisogono", "Daniel Wellington", "DeWitt"],
  F: ["Franck Muller", "Ferdinand Berthoud", "Frederique Constant"],
  G: ["Girard-Perregaux", "Glashütte Original", "Greubel Forsey"],
  H: ["Hublot", "Hermès", "Harry Winston"],
  I: ["IWC Schaffhausen", "Ikepod", "Invicta"],
  J: ["Jaeger-LeCoultre", "Jacob & Co", "Junghans"],
  M: ["MB&F", "Maurice Lacroix", "Montblanc", "Moser & Cie"],
  P: ["Patek Philippe", "Piaget", "Panerai"],
  R: ["Richard Mille", "Rolex", "Roger Dubuis"],
  T: ["Tag Heuer", "Tudor", "Tissot"],
  U: ["Ulysse Nardin", "Urwerk"],
  Z: ["Zenith", "Zodiac"],
};

const BrandListing = ({ ...content }) => {
  console.log('CONTENT', content)
  if(!content) return null;
  const [selectedLetter, setSelectedLetter] = useState("A");
  const availableLetters = useMemo(() => Object.keys(brandsData).map((letter) => letter.toUpperCase()), []);
  const [brands, setBrands] = useState(null)
  
  const alphabetNavRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleLetterClick = (letter) => {
    if (availableLetters.includes(letter)) {
      setSelectedLetter(letter);
      const section = document.getElementById(`section-${letter}`);
      section?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.pageX - alphabetNavRef.current.offsetLeft;
    scrollLeftRef.current = alphabetNavRef.current.scrollLeft;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const x = e.pageX - alphabetNavRef.current.offsetLeft;
    alphabetNavRef.current.scrollLeft = scrollLeftRef.current - (x - startXRef.current) * 2;
  };

  // const fetchSuggestions = async () => {
  //   const brands = await getCategory({ cgid: "seddiqi-storefront-catalog", method: "GET" });
  //   setBrands(brands?.response?.categories);
  // };

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
              availableLetters.includes(letter) ? styles.enabled : styles.disabled
            }`}
            onClick={() => handleLetterClick(letter)}
            disabled={!availableLetters.includes(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Brand List */}
      <div className={styles.brandList}>
        {Object.keys(brandsData).map((letter) => (
          <div key={letter} id={`section-${letter}`} className={styles.brandGroup}>
            <h4>{letter}</h4>
            <div className={styles.brandColumn}>
              {brandsData[letter].map((brand, idx) => (
                <div key={idx} className={styles.brandName}>
                  {brand}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.btnContainer}>
        <Button isLink={true} link={content?.viewAllBrandsCta?.url} title={content?.viewAllBrandsCta?.label} color={content?.viewAllBrandsCta?.color} type={content?.viewAllBrandsCta?.type} />
      </div>
    </div>
  );
};

export default BrandListing;

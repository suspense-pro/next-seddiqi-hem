import React, { useState, useEffect, useRef } from "react";
import styles from "./brandListing.module.scss"; // SCSS styles
import Button from "../button";

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

const BrandListing = () => {
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [availableLetters, setAvailableLetters] = useState([]);

  useEffect(() => {
    // Calculate available letters based on brands data
    const letters = Object.keys(brandsData).map((letter) => letter.toUpperCase());
    setAvailableLetters(letters);
  }, []);

  const handleLetterClick = (letter) => {
    if (availableLetters.includes(letter)) {
      setSelectedLetter(letter);
      // Scroll to the section for the selected letter
      const section = document.getElementById(`section-${letter}`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Group brands into chunks of 4
  const groupBrands = (brands) => {
    const grouped = [];
    for (let i = 0; i < brands.length; i += 4) {
      grouped.push(brands.slice(i, i + 4));
    }
    return grouped;
  };

  const alphabetNavRef = useRef(null);
  let isDragging = false;
  let startX, scrollLeft;

  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.pageX - alphabetNavRef.current.offsetLeft;
    scrollLeft = alphabetNavRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging = false;
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return; // Stop the function if not dragging
    e.preventDefault();
    const x = e.pageX - alphabetNavRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    alphabetNavRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className={styles.brandSectionContainer}>
      {/* Alphabet Navigation */}
      <div
        ref={alphabetNavRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
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
        <Button isLink={true} link={"/"} title={"View All Bands"} color={"dark_green"} type={"transparent"} />
      </div>
    </div>
  );
};

export default BrandListing;

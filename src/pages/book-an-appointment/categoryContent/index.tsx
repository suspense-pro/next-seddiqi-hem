import React, { useEffect, useState, useCallback, useMemo } from "react";
import styles from "./categoryContent.module.scss"; // Create a new SCSS module
import { getCategory } from "@utils/sfcc-connector/dataService";
import { Tick } from "@assets/images/svg";
import { Button } from "@components/module";
import { useBookAppointmentContext } from "@contexts/bookAppointmentContext";

const brands = {
  A: ["Akrivia", "Aramedes", "Artya", "Audemars Piguet"],
  B: ["Bell & Ross", "Bernard Favre", "Bovet", "Breitling", "Bvlgari"],
  C: ["Cabestan", "Chopard", "Christian Van der Klaauw", "Christophe Claret", "Claude Meylan"],
  D: ["Debethune", "Dior"],
  E: ["Emmanuel Bouchet"],
  F: ["F.p. Journe", "Ferdinand Berthoud", "Frederique Constant"],
};

const CategoryContent = ({ categoryType, title, suggestionsKey }) => {
  const [showAlphabetical, setShowAlphabetical] = useState(false);
  const [categorySuggestions, setCategorySuggestions] = useState(null);
  const { selectedJewellery, setSelectedJewellery, selectedWatches, setSelectedWatches, handleStepChange, updateStep } =
    useBookAppointmentContext();

  const fetchSuggestions = async () => {
    const response = await getCategory({ cgid: categoryType, method: "GET" });
    setCategorySuggestions(response?.response?.categories);
    localStorage.setItem(suggestionsKey, JSON.stringify(response?.response?.categories));
  };

  useEffect(() => {
    const cachedSuggestions = localStorage.getItem(suggestionsKey);
    if (cachedSuggestions) {
      setCategorySuggestions(JSON.parse(cachedSuggestions));
    } else {
      fetchSuggestions();
    }
  }, [suggestionsKey]);

  const handleCheckboxChange = useCallback(
    (itemName) => {
      if (categoryType === "jewellery") {
        const isSelected = selectedJewellery.includes(itemName);
        const updatedJewellery = isSelected
          ? selectedJewellery.filter((item) => item !== itemName)
          : [...selectedJewellery, itemName];
  
        if (updatedJewellery.length !== selectedJewellery.length) {
          setSelectedJewellery(updatedJewellery);
          localStorage.setItem("selectedJewellery", JSON.stringify(updatedJewellery));
        }
      } else {
        // categoryType === "watches"
        const isSelected = selectedWatches.includes(itemName);
        const updatedWatches = isSelected
          ? selectedWatches.filter((item) => item !== itemName)
          : [...selectedWatches, itemName];
  
        if (updatedWatches.length !== selectedWatches.length) {
          setSelectedWatches(updatedWatches);
          localStorage.setItem("selectedWatches", JSON.stringify(updatedWatches));
        }
      }
    },
    [selectedWatches, selectedJewellery, setSelectedWatches, setSelectedJewellery, categoryType]
  );
  

  const memoizedSuggestions = useMemo(() => categorySuggestions, [categorySuggestions]);

  if (!categorySuggestions) {
    return null;
  }

  return (
    <>
      {!showAlphabetical ? (
        <div className={styles.suggestionContainer}>
          <div className={styles.suggestionTitle}>{title}</div>
          <div className={styles.suggestionItems}>
            {memoizedSuggestions?.map((item) => (
              <div className={styles.brandItem} key={item?.name}>
                <label htmlFor={`checkbox-${item?.name}`} className={styles.checkboxLabel}>
                  {categoryType === "jewellery" ? (
                    <input
                      className={styles.inputCheckbox}
                      type="checkbox"
                      id={`checkbox-${item?.name}`}
                      checked={selectedJewellery.includes(item?.name)}
                      onChange={() => handleCheckboxChange(item?.name)}
                      disabled={selectedWatches?.length > 0}
                    />
                  ) : (
                    <input
                      className={styles.inputCheckbox}
                      type="checkbox"
                      id={`checkbox-${item?.name}`}
                      checked={selectedWatches.includes(item?.name)}
                      onChange={() => handleCheckboxChange(item?.name)}
                      disabled={selectedJewellery?.length > 0}
                    />
                  )}
                  <div className={styles.checkbox}>
                    <Tick className={styles.tick} />
                  </div>
                  <span className={styles.brandName}>{item?.name}</span>
                </label>
              </div>
            ))}
          </div>
          <Button
            clickHandler={() => setShowAlphabetical(!showAlphabetical)}
            isLink={false}
            title="View all brands"
            className={styles.brandBtn}
            type="plain"
            color="green_dark"
          />
        </div>
      ) : (
        <div className={styles.alphabeticalContainer}>
          {Object.keys(brands).map((char) => (
            <div className={styles.charContainer} key={char}>
              <div className={styles.char}>{char}</div>
              {brands[char]?.map((item) => (
                <div className={styles.brandItem} key={item}>
                  <label htmlFor={`checkbox-${item}`} className={styles.checkboxLabel}>
                    <input
                      className={styles.inputCheckbox}
                      type="checkbox"
                      id={`checkbox-${item}`}
                      checked={selectedWatches.includes(item)}
                      onChange={() => handleCheckboxChange(item)}
                    />
                    <div className={styles.checkbox}>
                      <Tick className={styles.tick} />
                    </div>
                    <span className={styles.brandName}>{item}</span>
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {selectedWatches?.length > 0 && (
        <div className={styles.selectBrandBtn}>
          <Button
            clickHandler={() => {
              handleStepChange(3);
              updateStep(2, true);
            }}
            isLink={false}
            title="Select Brands"
            type="solid"
            color="metallic"
          />
        </div>
      )}
    </>
  );
};

export default React.memo(CategoryContent);

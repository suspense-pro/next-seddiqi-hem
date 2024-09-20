import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import ServiceCard from "../serviceCard";
import { Button, TabbedNavigation } from "@components/module";
import { Tick, Tickbox } from "@assets/images/svg";
import ExclusiveInfoCards from "../exclusiveInfoCards";
import { getCategory } from "@utils/sfcc-connector/dataService";

// const brandSUggestions = [
//   "Rolex",
//   "Bell & Ross",
//   "Bvlgari",
//   "Patek Philippe",
//   "Emmanuel Bouchet",
//   "H Moser & Cie",
//   "Audemars Piguet",
//   "Dior",
//   "Moritz Grossmann",
//   "Hublot",
//   "Ferdinand Berthoud",
//   "Tag Heuer",
// ];

const watchBrands = {
  A: ["Akrivia", "Aramedes", "Artya", "Audemars Piguet"],
  B: ["Bell & Ross", "Bernard Favre", "Bovet", "Breitling", "Bvlgari"],
  C: ["Cabestan", "Chopard", "Christian Van der Klaauw", "Christophe Claret", "Claude Meylan"],
  D: ["Debethune", "Dior"],
  E: ["Emmanuel Bouchet"],
  F: ["F.p. Journe", "Ferdinand Berthoud", "Frederique Constant"],
};

const StepTwo = ({ item, handleStepChange, setSelectedCard }) => {
  if (!item) return null;

  let data = [
    {
      tabLabel: "Watches",
      content: <WatchesContent />,
    },
    {
      tabLabel: "Jewellery",
      content: "Hello",
    },
  ];

  let tabs = data?.map((item, index) => {
    return {
      id: index + 1,
      title: item?.tabLabel,
      content: item?.content,
    };
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ServiceCard
          handleStepChange={handleStepChange}
          setSelectedCard={setSelectedCard}
          className={styles.seriveCard}
          item={item}
          type={true}
        />
        <TabbedNavigation className={styles.tabNavigation} tabs={tabs} />
      </div>
      <ExclusiveInfoCards />
    </div>
  );
};

export default StepTwo;

const WatchesContent = ({ type = "watches" }) => {
  const [showAlphabetical, setShowAlphabetical] = useState(false);

  const handleViewAllBrandsClick = () => {
    setShowAlphabetical(!showAlphabetical);
  };

  const handleBackClick = () => {
    setShowAlphabetical(false);
  };

  const [watchSuggestions, setWatchSuggestions] = useState(null);
  const [jewellerySuggestions, setJewellerySuggestions] = useState(null);

  const fetchSuggestions = async () => {
    const watchs = await getCategory({ cgid: "watches", method: "GET" });
    const jewellery = await getCategory({ cgid: "watches", method: "GET" });
    console.log("RESPONSE", watchs);
    setWatchSuggestions(jewellery?.response?.categories);
    setJewellerySuggestions(jewellery?.response?.categories);
  };
  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <>
      {!showAlphabetical ? (
        <div className={styles.suggestionContainer}>
          <div className={styles.suggestionTitle}>Top Suggestions</div>
          <div className={styles.suggestionItems}>
            {watchSuggestions?.map((item) => (
              <div className={styles.brandItem} key={item}>
                <label htmlFor={`checkbox-${item?.name}`} className={styles.checkboxLabel}>
                  <input className={styles.inputCheckbox} type="checkbox" id={`checkbox-${item?.name}`} />
                  <div className={styles.checkbox}>
                    <Tick className={styles.tick} />
                  </div>
                  <span className={styles.brandName}>{item?.name}</span>
                </label>
              </div>
            ))}
          </div>
          <Button
            clickHandler={handleViewAllBrandsClick}
            isLink={false}
            title="View all brands"
            className={styles.brandBtn}
            type="plain"
            color="green_dark"
          />
        </div>
      ) : (
        <div className={styles.alphabeticalContainer}>
          {/* <Button
            clickHandler={handleBackClick}
            isLink={false}
            title="Back to suggestions"
            className={styles.backBtn}
            type="plain"
            color="green_dark"
          /> */}
          {Object.keys(watchBrands).map((char) => (
            <div className={styles.charContainer} key={char}>
              <div className={styles.char}>{char}</div>
              {watchBrands[char]?.map((item) => (
                <div className={styles.brandItem} key={item}>
                  <label htmlFor={`checkbox-${item}`} className={styles.checkboxLabel}>
                    <input className={styles.inputCheckbox} type="checkbox" id={`checkbox-${item}`} />
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
      <div className={styles.selectBrandBtn}>
        <Button
          clickHandler={() => console.log("Hello")}
          isLink={false}
          title="Select Brands"
          type="solid"
          color="metallic"
        />
      </div>
    </>
  );
};

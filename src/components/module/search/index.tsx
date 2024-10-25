import React, { useState, useEffect } from "react";
import styles from "./search.module.scss";
import Typography from "../typography";
import RichText from "../richText";
import { Button } from "@components/module";
import { SearchIcon } from "@assets/images/svg";
import { CloseIconV2 } from "@assets/images/svg";
import ProductCard from "../cards/productCard";
import { SearchProps } from "@utils/models/search";
import {
  PopularProducts,
  SearchTabs,
  RecommendedSearches,
  StoriesResults,
  NoSearchResultFound,
} from "@components/module";
import { useSearchContext } from "@contexts/searchContext";

const Search = ({ closeSearch }) => {
  const {
    inputSearchTerm,
    setInputSearchTerm,
    activeTab,
    setActiveTab,
    popularBrands,
    popularSearches,
    productSuggestions,
    recommendationResults,
    categoriesResults,
    storiesResults,
    noResults,
    setNoResults,
  } = useSearchContext();


  const handleSearchChange = (event) => {
    setInputSearchTerm(event.target.value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setInputSearchTerm("");
  };
  return (
    <>
  
    <div className={styles.searchWrapper}>
      <div className={styles.searchBarWrapper}>
        <SearchIcon fill="#" className={styles.searchIcon} />
        <input
          type="text"
          placeholder={`Search ${activeTab}`}
          value={inputSearchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      
        <div onClick= {closeSearch} className={styles.closeIcon}>
        <CloseIconV2 />
        </div>    
      </div>
      <div className={styles.searchContentWrapper}>
        <SearchTabs activeTab={activeTab} setActiveTab={handleTabChange} />
        {inputSearchTerm ? (
          <div>
            <RecommendedSearches
              categoryDetails={categoriesResults}
              productRecommendation={recommendationResults}
            ></RecommendedSearches>
            {noResults && <NoSearchResultFound />}
          </div>
        ) : (
          <>
            {activeTab === "stories" ? (
              <div className={styles.storiesWrapper}>
                <StoriesResults
                  storiesResults={storiesResults}
                ></StoriesResults>
              </div>
            ) : (
              <PopularProducts
                popularBrands={popularBrands}
                popularSearches={popularSearches}
                productSuggestions={productSuggestions}
              />
            )}
            {noResults && <NoSearchResultFound />}
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default Search;

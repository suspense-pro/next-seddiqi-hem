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
    categorySuggestions,
    setCategorySuggestions,
    fetchCategorySuggestions,
    isError,
    isLoading,
  } = useSearchContext();

  const handleSearchClick = async () => {
    if (inputSearchTerm.length > 0) {
      try {

        setNoResults(false);
        await fetchCategorySuggestions(inputSearchTerm, activeTab);
      } catch (error) {
        console.error("Error during search:", error);
        setNoResults(true); 
      }
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchBarWrapper} onClick={handleSearchClick}>
        <SearchIcon fill="#" className={styles.searchIcon} />
        <input
          type="text"
          placeholder={`Search ${activeTab}`}
          value={inputSearchTerm}
          className={styles.searchInput}
          onChange={(e) => setInputSearchTerm(e.target.value)}
        />
        <div onClick={closeSearch} className={styles.closeIcon}>
          <CloseIconV2 />
        </div>
      </div>

      {inputSearchTerm && !isLoading && (
        <div className={styles.autocompleteSuggestions}>
          {categorySuggestions.map((suggestion, index) => (
            <div key={index} className={styles.suggestionItem}>
              {suggestion}
            </div>
          ))}
        </div>
      )}

      <div className={styles.searchContentWrapper}>
        <SearchTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {isLoading ? (
          <div className={styles.loading}></div>
        ) : inputSearchTerm ? (
          <div>
            {!isError && (
              <RecommendedSearches
                categoryDetails={categoriesResults}
                productRecommendation={recommendationResults}
                searchTerm={inputSearchTerm}
              />
            )}
            {(noResults || isError) && <NoSearchResultFound message={inputSearchTerm} />}
          </div>
        ) : (
          <div>
            {activeTab === "stories" ? (
              <div className={styles.storiesWrapper}>
                <StoriesResults storiesResults={storiesResults} />
              </div>
            ) : (
              <PopularProducts
                popularBrands={popularBrands}
                popularSearches={popularSearches}
                productSuggestions={productSuggestions}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

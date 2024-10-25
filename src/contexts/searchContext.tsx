
import React, { createContext, useContext, useState, useEffect } from "react";
import { SearchContextProps } from "@utils/models/search";
import {
    PopularProducts,
    SearchTabs,
    RecommendedSearches,
    StoriesResults,
    NoSearchResultFound,
  } from "@components/module";
  import {
    getSearchResults,
    getContentSearch,
    getSearchSuggestions,
  } from "@utils/sfcc-connector/dataService";

export const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("SearchContext must be used within the SearchProvider");
  }
  return context;
};


export const SearchProvider = ({ children }) => {

  const [inputSearchTerm, setInputSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("watches");
  const [popularBrands, setPopularBrands] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [recommendationResults, setRecommendationResults] = useState([]);
  const [categoriesResults, setCategories] = useState([]);
  const [storiesResults, setStoriesResults] = useState([]);
  const [noResults, setNoResults] = useState(false);


  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await getSearchResults({
          method: "GET",
          query: "",
          categoryId: "mens-clothing-suits",
        });
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchInitialData();
    fetchSuggestedSearches(activeTab.toLowerCase());
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await getSearchResults({
          method: "GET",
          query: "",
          categoryId: "mens-clothing-suits",
        });
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchInitialData();
    fetchSuggestedSearches(activeTab.toLowerCase());
  }, []);

  const fetchSuggestedSearches = async (term) => {
    try {
      const response = await getSearchSuggestions({
        method: "GET",
        query: term,
      });
      if (
        response.response.customSuggestions &&
        response.response.customSuggestions.suggestedTerms
      ) {
        const suggestedTerms =
          response.response.customSuggestions.suggestedTerms.map(
            (termObj) => termObj.originalTerm
          );
        setPopularSearches(suggestedTerms);
      } else {
        //console.log("No suggested terms found in customSuggestions.");
      }
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

  const fetchSearchesResults = async (term) => {
    try {
      const response = await getSearchResults({
        method: "GET",
        query: "",
        categoryId: "mens-clothing-suits",
      });

      if (response.response.hits) {
        const productSuggestions = response.response.hits;
        setProductSuggestions(productSuggestions);
      } else {
        //console.log("No Product Suggestions Found.");
      }
      if (response.response.refinements) {
        const brandRefinement = response.response.refinements.find(
          (refinement) => refinement.attributeId === "brand"
        );
        if (brandRefinement) {
          const popularBrands = brandRefinement.values
            .filter((value) => value.hitCount > 0)
            .slice(0, 4)
            .map((value) => value.value);
          setPopularBrands(popularBrands);
        } else {
          //console.log("No Popular Brands Found.");
        }
      } else {
        //console.log("No refinements found.");
      }

      if (response.response.refinements) {
        const categoryRefinement = response.response.refinements.find(
          (refinement) => refinement.attributeId === "cgid"
        );
        if (categoryRefinement) {
          const categoriesResults = categoryRefinement.values
            .filter((value) => value)
            .map((value) => value.value);
          setCategories(categoriesResults);
        } else {
          //console.log("No Popular Brands Found.");
        }
      } else {
        //console.log("No refinements found.");
      }
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

  const fetchStoriesResults = async (term) => {
    try {
      const response = await getContentSearch({
        method: "POST",
        query: term,
      });

      const storiesResults = response.response;

      if (Array.isArray(storiesResults)) {
        if (storiesResults.length > 2) {
          const secondContent =
            storiesResults[2].content.components[2].listItems;
          //console.log("Second Index Content:", secondContent);

          setStoriesResults(secondContent);
        } else {
          //console.log("Not enough content items found.");
        }
      } else {
        //console.log("No Stories Found.");
      }
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  useEffect(() => {
    const tabLowerCase = activeTab.toLowerCase();
    fetchSuggestedSearches(tabLowerCase);
    fetchSearchesResults(tabLowerCase);

    if (tabLowerCase === "stories") {
      fetchStoriesResults(tabLowerCase);
    }
  }, [activeTab]);

  const fetchCategories = async (term) => {
    try {
      const response = await getSearchSuggestions({
        method: "GET",
        query: term, // Use the passed term here
      });

      const productRecommendation =
        response.response.productSuggestions.products;
      setRecommendationResults(productRecommendation);

      setCategories(response.categories || []);
      return response;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const fetchRecommendedSearches = async () => {
      if (inputSearchTerm) {
        try {
          const response = await getSearchSuggestions({
            method: "GET",
            query: inputSearchTerm,
          });

          // Fetch categories using the current inputSearchTerm
          await fetchCategories(inputSearchTerm);

          // Call fetchSearchesResults with the current inputSearchTerm
          await fetchSearchesResults(inputSearchTerm);
        } catch (error) {
          console.error("Error fetching recommended searches:", error);
        }
      } else {
        setRecommendationResults([]);
        setCategories([]);
        setProductSuggestions([]); // Clear product suggestions when the input is empty
      }
    };

    fetchRecommendedSearches();
  }, [inputSearchTerm]);

  const value = {
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
  };

  return (
    <SearchContext.Provider value={{inputSearchTerm,
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
      setNoResults,}}>
      {children}
    </SearchContext.Provider>
  );
};
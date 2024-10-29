import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { SearchContextType } from "@utils/models/search";
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
  getProducts,
} from "@utils/sfcc-connector/dataService";

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("SearchContext must be used within the SearchProvider");
  }
  return context;
};

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [inputSearchTerm, setInputSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("mens-clothing-suits");
  const [popularBrands, setPopularBrands] = useState<string[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [productSuggestions, setProductSuggestions] = useState<any[]>([]);
  const [recommendedProductSuggestions, setRecommendedProductSuggestions] =
    useState<any[]>([]);
  const [recommendationResults, setRecommendationResults] = useState<any[]>([]);
  const [categoriesResults, setCategoriesResults] = useState<string[]>([]);
  const [storiesResults, setStoriesResults] = useState<any[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [categorySuggestions, setCategorySuggestions] = useState<string[]>([]);
  const [storyResults, setStoryResults] = useState([]);
  const [productResults, setProductResults] = useState([]);

  const setCategories = (categories: string[]) => {
    setCategoriesResults(categories);
  };

  const fetchSuggestedSearches = (categoryId: string) => {
    return getSearchSuggestions({ method: "GET", query: categoryId })
      .then((response) => {
        if (
          response.response.customSuggestions &&
          response.response.customSuggestions.suggestedTerms
        ) {
          const suggestedTerms =
            response.response.customSuggestions.suggestedTerms.map(
              (termObj) => termObj.originalTerm
            );
          setPopularSearches(suggestedTerms);
        }
      })
      .catch((error) =>
        console.error("Error fetching search suggestions:", error)
      );
  };

  const fetchSearchesResults = (categoryId: string) => {
    return getSearchResults({
      method: "GET",
      query: inputSearchTerm,
      categoryId,
    })
      .then((response) => {
        if (response.response.refinements) {
          const brandRefinement = response.response.refinements.find(
            (refinement) => refinement.attributeId === "brand"
          );
          if (brandRefinement) {
            const popularBrands = brandRefinement.values
              .filter((value) => value.hitCount >= 0)
              .slice(0, 4)
              .map((value) => value.value);
            setPopularBrands(popularBrands);
          }
        }

        if (response.response.hits) {
          const productSuggestions = response.response.hits;
          setProductSuggestions(productSuggestions);
        }
      })
      .catch((error) => console.error("Error fetching search results:", error));
  };

  const fetchStoriesResults = () => {
    return getContentSearch({ method: "POST", query: activeTab })
      .then((response) => {
        const storiesResults = response.response;

        if (Array.isArray(storiesResults) && storiesResults.length > 2) {
          const secondContent =
            storiesResults[2].content.components[2].listItems;
          setStoriesResults(secondContent);
        }
      })
      .catch((error) => console.error("Error fetching stories:", error));
  };

  const fetchCategorySuggestions = (
    searchTerm: string,
    categoryId: string
  ): void => {
    if (searchTerm.length === 0) {
      setCategorySuggestions([]); // Clear suggestions if input is empty
      return;
    }

    // Set the input search term
    setInputSearchTerm(searchTerm);

    // Call the first API
    getSearchResults({ method: "GET", query: "", categoryId })
      .then((searchResults) => {
        setCategorySuggestions([]); // Clear existing suggestions

        // Process search results
        const categoryRefinement = searchResults.response.refinements?.find(
          (refinement) => refinement.attributeId === "cgid"
        );
        if (categoryRefinement) {
          const categoriesResults = categoryRefinement.values
            .filter((value) => value)
            .map((value) => value.value);
          setCategories(categoriesResults);
        }

        // Call the second API for recommended products
        return getSearchSuggestions({ method: "GET", query: searchTerm });
      })
      .then((recommendedSearchResults) => {
        // Access the product recommendations
        const productRecommendation =
          recommendedSearchResults.response.productSuggestions.products;
        setRecommendationResults(productRecommendation);

        // Extract product IDs
        const productIds = productRecommendation.map(
          (product: { productId: string }) => product.productId
        );

        // Call another API with the product IDs
        return getProducts({ method: "GET", pids: productIds });
      })
      .then((productDetails) => {
        const recommendationResults = productDetails.data;

        setRecommendationResults(recommendationResults);

        // Handle the product details response as needed
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Fetch product details function
  const fetchInitialData = (tab: string) => {
    fetchSuggestedSearches(tab.toLowerCase());
    if (tab.toLowerCase() === "stories") {
      fetchStoriesResults();
    } else {
      fetchSearchesResults(tab.toLowerCase());
    }
  };

  useEffect(() => {
    fetchInitialData(activeTab);
  }, [activeTab]);

  const value: SearchContextType = {
    inputSearchTerm,
    setInputSearchTerm,
    activeTab,
    setActiveTab,
    popularBrands,
    popularSearches,
    productSuggestions,
    recommendationResults,
    categoriesResults,
    setCategories,
    storiesResults,
    noResults,
    setNoResults,
    categorySuggestions,
    setCategorySuggestions,
    fetchCategorySuggestions,
    setStoriesResults,
    storyResults,
    setStoryResults,
    productResults,
    setProductResults,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

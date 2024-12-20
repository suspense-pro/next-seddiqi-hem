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
  const [activeTab, setActiveTab] = useState<string>("watches");
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
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isError,   setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const closeSearch = () => {
    setIsSearchOpen(false);
  };

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
            (refinement) => refinement.attributeId === "c_brandName"
          );
          if (brandRefinement) {
            // Sort brands based on hitCount in descending order and slice the top 4
            const popularBrands = brandRefinement.values
              .filter((value) => value.hitCount >= 0) // Ensure hitCount is valid
              .sort((a, b) => b.hitCount - a.hitCount) // Sort by hitCount in descending order
              .slice(0, 4) 
              .map((value) => value.value); // Extract brand names
  
            setPopularBrands(popularBrands); // Set the popular brands
          }
        }

        if (response.response.hits) {
          const productSuggestions = response.response.hits;
          // Get the first three productIds from the hits
          const topProductIds = productSuggestions
            .slice(0, 3)  // Get the first 3 products
            .map((product) => product.productId);  // Extract productId for each product
  
          getProducts({ method: "GET", pids: topProductIds })
          .then((productDetails) => {
            setProductSuggestions(productDetails);
          })
          .catch((error) => console.error("Error fetching product details:", error));
        }
    
      })
      .catch((error) => console.error("Error fetching search results:", error));
  };

  const fetchStoriesResults = () => {
    return getContentSearch({ method: "POST", query: activeTab })
      .then((response) => {
        const storiesResults = response.response;

        if (Array.isArray(storiesResults) && storiesResults.length > 0) {
          const allListItems = storiesResults.map((story) => {
            if (story.content && Array.isArray(story.content.listItems)) {
              return story.content.listItems;
            }
            return [];
          });
          const flattenedListItems = allListItems.flat();
          setStoriesResults(flattenedListItems);
        }
      })
      .catch((error) => console.error("Error fetching stories:", error));
  };

  const fetchCategorySuggestions = (
    searchTerm: string,
    categoryId: string
  ): void => {
    if (searchTerm.length === 0) {
      setCategorySuggestions([]);
      setIsError(false);
      return;
    }

    // Set the input search term
    setInputSearchTerm(searchTerm);
    setIsLoading(true); 

    // Call the first API
    getSearchResults({ method: "GET", query: "", categoryId })
      .then((searchResults) => {
        setCategorySuggestions([]);

        // Call the second API for recommended products
        return getSearchSuggestions({ method: "GET", query: searchTerm });
      })
      .then((recommendedSearchResults) => {
        const watchesInCategories = recommendedSearchResults.response.categorySuggestions.categories;
        const categoryNamesRecommendations = watchesInCategories.map((category) => category.name);

        setCategories(categoryNamesRecommendations);
        
        // Access the product recommendations
        const productRecommendation =
        recommendedSearchResults.response.productSuggestions.products;
        setRecommendationResults(productRecommendation);

        // Extract product IDs
        const productIds = productRecommendation.map(
          (product: { productId: string }) => { return product.productId;
        }
        );

        // Call API with the product IDs
        return getProducts({ method: "GET", pids: productIds });
      })
      .then((productDetails) => {
        const recommendationResults = productDetails.data;

        setRecommendationResults(recommendationResults);

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
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

  const openSearch = () => {
    setIsSearchOpen(true);
    fetchInitialData(activeTab); // Fetch initial data when the search is opened
  };

  useEffect(() => {
    if (isSearchOpen) {
      fetchInitialData(activeTab);
    }
  }, [activeTab, inputSearchTerm]);

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
    openSearch,
    closeSearch,
    isError,
    setIsError,
    isLoading
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

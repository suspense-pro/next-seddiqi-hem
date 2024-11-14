export interface SearchProps {
    content?:[];

  }
  
export interface NoResultsProps {
    message?: string;
  }
  
  export interface SearchContextType  {
    inputSearchTerm: string;
    setInputSearchTerm: (term: string) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    popularBrands: string[];
    popularSearches: string[];
    productSuggestions: any[];
    recommendationResults: any[];
    categoriesResults: string[]; 
    setCategories: (categories: string[]) => void;
    noResults: boolean;
    setNoResults: (noResults: boolean) => void;
    categorySuggestions: any[];
    setCategorySuggestions: (suggestions: any[]) => void;
    fetchCategorySuggestions: (term: string, categoryId: string) => void;
    storiesResults: any[]; 
    setStoriesResults: (stories: any[]) => void; 
    storyResults: any[];
    setStoryResults: (stories: any[]) => void;
    productResults: any[]; 
    setProductResults: (products: any[]) => void;
    openSearch: () => void;
  } 
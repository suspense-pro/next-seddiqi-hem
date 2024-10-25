export interface SearchProps {
    content?:[];

  }
  
export interface NoResultsProps {
    message?: string;
  }
  
  export interface SearchContextProps {
    inputSearchTerm: string;
    setInputSearchTerm: (term: string) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void; 
    popularBrands: string[];
    popularSearches: string[];
    productSuggestions: any[];
    recommendationResults: any[];
    categoriesResults: string[];
    storiesResults: any[];
    noResults: boolean;
    setNoResults: (value: boolean) => void;
  } 
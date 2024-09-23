import React from "react";
import CategoryContent from "../categoryContent";

const WatchesContent = () => {
  return (
    <CategoryContent 
      categoryType="watches" 
      title="Top Suggestions" 
      suggestionsKey="watchSuggestions" 
    />
  );
};

export default React.memo(WatchesContent);
import React from "react";
import CategoryContent from "../categoryContent";

const JewelleryContent = () => {
  return (
    <CategoryContent 
      categoryType="jewellery" 
      title="Top Suggestions" 
      suggestionsKey="jewellerySuggestions" 
    />
  );
};

export default React.memo(JewelleryContent);
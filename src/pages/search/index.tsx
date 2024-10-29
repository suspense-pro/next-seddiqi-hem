import { useEffect } from 'react';
import { SearchProvider } from "@contexts/searchContext";
import {PlpContent, Search} from '@components/module';
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { getSearchSuggestions } from "@utils/sfcc-connector/dataService";
import { GetServerSidePropsContext } from "next";
import { isEmpty } from "@utils/helpers";
import { useRouter } from 'next/router';


const SearchPage = ({product}) => {
  const router = useRouter();
  const { recommendations } = router.query;
  const parsedRecommendations = (() => {
    if (Array.isArray(recommendations)) {
      return recommendations.length > 0 ? JSON.parse(recommendations.join('')) : [];
    }

    return recommendations ? JSON.parse(recommendations) : [];
  })();

  const hasRecommendations = Array.isArray(parsedRecommendations) && parsedRecommendations.length > 0;
  return (
    <div>
        {parsedRecommendations.length > 0 && (
          <>
          <PlpContent 
            products={parsedRecommendations}
            productGridContent={null}
          />
          </>
        ) }
    </div>
  );
};

export default SearchPage;
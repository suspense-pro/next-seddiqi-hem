import { useEffect } from 'react';
import { SearchProvider } from "@contexts/searchContext";
import {PlpContent, Search, ViewAllStories} from '@components/module';
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { getSearchSuggestions } from "@utils/sfcc-connector/dataService";
import { GetServerSidePropsContext } from "next";
import compact from "lodash/compact";
import ContentBlock from "@components/module/contentBlock";
import { isEmpty } from "@utils/helpers";
import { useRouter } from 'next/router';
import {

  getContentSearch,

  getProducts,
} from "@utils/sfcc-connector/dataService";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { recommendations } = context.query;

  let parsedRecommendations = [];

  // Check if recommendations is a string
  if (typeof recommendations === 'string') {
    try {
      parsedRecommendations = JSON.parse(recommendations);
    } catch (e) {
      console.error("Failed to parse recommendations:", e);
    }
  } else if (Array.isArray(recommendations)) {
    const joined = recommendations.join('');
    try {
      parsedRecommendations = JSON.parse(joined);
    } catch (e) {
      console.error("Failed to parse recommendations:", e);
    }
  }

  // Check if recommendations are product IDs or story IDs
  const isStoryRecommendations = parsedRecommendations
  let products = { data: [] };
  if (!isStoryRecommendations && parsedRecommendations.length > 0) {
    products = await getProducts({ method: "GET", pids: parsedRecommendations });
    console.log("Fetched products:", products);
  }

  return {
    props: {
      productDetails: products.data || [],
      isStoryRecommendations,
      recommendations: parsedRecommendations,
    },
  };
}

const SearchPage = (props) => {
  const { productDetails, isStoryRecommendations, recommendations } = props;

  if (isStoryRecommendations) {
    return (
      <div>
        <h4>Recommended Stories</h4>
        <ViewAllStories 
          storiesResults={recommendations} // Assuming you have a component for stories
        />
      </div>
    );
  }

  if (!Array.isArray(productDetails) || productDetails.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div>
      <h4>Results for Recommended Collection</h4>
      <PlpContent 
        products={productDetails}
        productGridContent={null}
      />
    </div>
  );
};

export default SearchPage;
import { useEffect } from "react";
import { SearchProvider } from "@contexts/searchContext";
import { PlpContent, Search, ViewAllStories } from "@components/module";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { getSearchSuggestions } from "@utils/sfcc-connector/dataService";
import { GetServerSidePropsContext } from "next";
import { isEmpty } from "@utils/helpers";
import { useRouter } from "next/router";

const StoriesPage = () => {
  const router = useRouter();
  const { recommendations } = router.query;
  let storiesResults = [];
  if (Array.isArray(recommendations)) {
    storiesResults = JSON.parse(decodeURIComponent(recommendations[0]));
  } else if (typeof recommendations === "string") {
    storiesResults = JSON.parse(decodeURIComponent(recommendations));
  }

  return (
    <div>
      <ViewAllStories storiesResults={storiesResults} />
    </div>
  );
};

export default StoriesPage;

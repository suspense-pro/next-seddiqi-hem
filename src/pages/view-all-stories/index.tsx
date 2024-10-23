import React from "react";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Search } from "@components/module";
import ViewAllStories from "@components/module/search/viewAllStories/viewAllStories";
import { getContentSearch } from "@utils/sfcc-connector/dataService";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "/view-all-stories" },
      },
    },
    context
  );

const searchStoriesResults = await getContentSearch({ method: "POST", query: "stories"});

  return {
    props: {
      ...data,
      searchStoriesResults
    },
  };
}



const StoriesPage = (props)=>{
  const { data, searchStoriesResults } = props;
  const storiesResponse = searchStoriesResults.response;
  let secondContent = null; 
  if (Array.isArray(storiesResponse) && storiesResponse.length > 2) {
    secondContent = storiesResponse[2].content?.components[2]?.listItems; // Optional chaining to avoid errors
    console.log("Second Index Content:", secondContent);
  } else {
    console.log("Not enough content items found or storiesResults is not an array.");
  }
 
  return (
   <>
    <ViewAllStories storiesResults= {secondContent}></ViewAllStories>
   </>
  );
};

export default StoriesPage;
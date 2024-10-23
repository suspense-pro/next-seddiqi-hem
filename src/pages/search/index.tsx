import React from "react";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Search } from "@components/module";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "search" },
      },
    },
    context
  );

  return {
    props: {
      ...data,
    },
  };
}

const SearchPage = ({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
   <>
    <Search></Search>
   </>
  );
};

export default SearchPage;

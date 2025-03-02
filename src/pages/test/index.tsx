import Layout from "@components/layout";
import ContentAndImageAdvanced from "@components/rendering/contentAndImageAdvanced";
import IntroComponent from "@components/rendering/introComponent";
import IntroPopUp from "@components/rendering/introComponent/introPopUp";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { GetServerSidePropsContext } from "next";
import React from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "" },
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

// const Test = () => {
//   return <IntroComponent />
// };
const Test = () => {
  return <ContentAndImageAdvanced />
};

export default Test;
Test.Layout = Layout;

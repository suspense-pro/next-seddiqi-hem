import { FormEvent } from "react";
import React, { useState } from "react";
import { SideDrawer } from "@components/module";
import Layout from "@components/layout";
import ContentBlock from "@components/module/contentBlock";
import compact from "lodash/compact";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { isEmpty } from "@utils/helpers";
import { getProducts } from "@utils/sfcc-connector/dataService";
import FourItemSlider from "@components/rendering/fourItemSlider";
import ThreeCompactImageText from "@components/rendering/threeCompactImageText";
import ThreeGrid from "@components/rendering/threeGrid";
import FooterBackToTop from "@components/module/footerBackToTop";
import TwoColumnImageText from "@components/rendering/twoColumnImageText";
import ThreeTallImageText from "@components/rendering/threeTallImageText";

// import { getCustomer } from "@utils/sfcc-connector/dataService";
// import LoginForm from "@components/LoginForm";
// import RegistrationForm from "@components/RegistrationForm";
// import { getHierarchyChildren } from "@utils/cms/amplience";

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "homepage" },
      },
    },
    context
  );


  // if (isEmpty(data.page)) {
  //   return {
  //     redirect: {
  //       destination: "/page-not-found",
  //     },
  //   };
  // }
  return {
    props: {
      ...data,
    },
  };
}

export default function Home({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="main-content">
      {compact(content?.page?.components).map((content) => (
        <ContentBlock content={content} key={content?._meta.deliveryId} />
      ))}

      <ThreeGrid />
      <ThreeCompactImageText />
      <FourItemSlider />
      <TwoColumnImageText />
      <ThreeTallImageText />
      <FooterBackToTop />
    </div>
  );
}

Home.Layout = Layout;

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
import { RolexComponentMapping } from "@utils/cms/config";
import { FooterBackToTop, ThreeCompactImageText, ThreeGrid, ThreeTallImageText, TwoColumnImageText } from "@components/rendering/rolex";
import ItemSlider from "@components/rendering/rolex/itemSlider";

// import { getCustomer } from "@utils/sfcc-connector/dataService";
// import LoginForm from "@components/LoginForm";
// import RegistrationForm from "@components/RegistrationForm";
// import { getHierarchyChildren } from "@utils/cms/amplience";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "rolex" },
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

export default function RolexHome({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log("Contents: ", content);

  return (
    <div className="main-content rolex">
      {compact(content?.page?.components).map((content) => (
        <ContentBlock components={RolexComponentMapping} content={content} key={content?._meta.deliveryId} />
      ))}

      {/*<ItemSlider />
      <TwoColumnImageText />
      <ThreeTallImageText />
      <FooterBackToTop /> */}
    </div>
  );
}

RolexHome.Layout = Layout;

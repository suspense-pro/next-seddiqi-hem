import { FormEvent, useContext } from "react";
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
import {
  FooterBackToTop,
  ThreeCompactImageText,
  ThreeGrid,
  ThreeTallImageText,
  TwoColumnImageText,
} from "@components/rendering/rolex";
import ItemSlider from "@components/rendering/rolex/itemSlider";
import { RolexContext, RolexProvider } from "@contexts/rolexContext";
import ContactForm from "@components/module/contactForm";
import RolexContactForm from "@components/rendering/rolex/rolexContactForm/rolexContactForm";
import NeedMoreHelp from "@components/rendering/needMoreHelp";

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

  const needMoreHelp = await fetchStandardPageData(
    {
      content: {
        page: {
          key: "need-more-help",
        },
      },
    },
    context
  );

  // if (isEmpty(data.content.page)) {
  //   return {
  //     redirect: {
  //       destination: "/page-not-found",
  //     },
  //   };
  // }
  return {
    props: {
      ...data,
      needMoreHelp
    },
  };
}

export default function RolexHome({ content, needMoreHelp }) {
  const { rolexContact } = useContext(RolexContext);
  return (
    <div className="main-content rolex">
      {rolexContact ? (
        <div>
          {compact(content?.page?.components?.slice(0, 1)).map((content) => (
            <ContentBlock components={RolexComponentMapping} content={content} key={content?._meta.deliveryId} />
          ))}
          <RolexContactForm />
          {needMoreHelp?.content?.page && <NeedMoreHelp {...needMoreHelp?.content?.page} />}
        </div>
      ) : (
        <>
          {compact(content?.page?.components).map((content) => (
            <ContentBlock components={RolexComponentMapping} content={content} key={content?._meta.deliveryId} />
          ))}
          <FooterBackToTop
            contentImage={content?.page?.footerBlock?.footer?.media?.image}
            contentAlt={content?.page?.footerBlock?.footer?.media?.altText}
          />
        </>
      )}
    </div>
  );
}

RolexHome.Layout = Layout;

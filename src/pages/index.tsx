import { FormEvent } from "react";
import React, { useState } from "react";
import { SideDrawer } from "@components/module";
import Layout from "@components/layout";
import ContentBlock from "@components/module/contentBlock";
import compact from "lodash/compact";
import { GetServerSidePropsContext } from "next";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { isEmpty } from "@utils/helpers";

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

  if (isEmpty(data.page)) {
    return {
      redirect: {
        destination: "/page-not-found",
      },
    };
  }
  return {
    props: {
      ...data,
    },
  };
}

export default function Home({ contents }) {
  return (
    <div className="main-content">
      {compact(contents).map((content) => (
        <ContentBlock content={content} key={content?._meta.deliveryId} />
      ))}
    </div>
  );
}

Home.Layout = Layout;

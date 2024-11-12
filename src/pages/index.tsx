import React, { useState } from "react";
import Layout from "@components/layout";
import ContentBlock from "@components/module/contentBlock";
import compact from "lodash/compact";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { isEmpty } from "@utils/helpers";


export async function getServerSideProps(context: GetServerSidePropsContext) {

  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "homepage" },
      },
    },
    context
  );


  if (isEmpty(data.content.page)) {
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

export default function Home({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="main-content">
      {compact(content?.page?.components).map((content) => (
        <ContentBlock content={content} key={content?._meta.deliveryId} />
      ))}
    </div>
  );
}

Home.Layout = Layout;

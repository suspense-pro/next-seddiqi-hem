import Layout from "@components/layout";
import NeedMoreHelp from "@components/rendering/needMoreHelp";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import React from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "contact-us/confirmation" },
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

export default function ContactUsConfirmationPage({ ...content }) {
  console.log("CONTACT US DATA", content);
  return <div>
  </div>;
}

ContactUsConfirmationPage.Layout = Layout;

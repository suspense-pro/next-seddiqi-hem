import Layout from "@components/layout";
import ContactForm from "@components/module/contactForm";
import NeedMoreHelp from "@components/rendering/needMoreHelp";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import React from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "/contact-us" },
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

export default function ContactUs({ ...content }) {
  console.log("DATA", content);
  return (
    <div>
      <ContactForm />
      {content?.content?.page.needMoreHelp && <NeedMoreHelp {...content?.content?.page.needMoreHelp} />}
    </div>
  );
}

ContactUs.Layout = Layout;

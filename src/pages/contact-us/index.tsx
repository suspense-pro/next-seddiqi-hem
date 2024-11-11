import Layout from "@components/layout";
import ContactForm from "@components/module/contactForm";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
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

export default function ContactUs() {
  return (
    <div>
      <ContactForm />
    </div>
  );
}

ContactUs.Layout = Layout;

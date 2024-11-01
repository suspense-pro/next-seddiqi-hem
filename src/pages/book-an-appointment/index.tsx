import React from "react";

import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { BookAppointmentProvider } from "@contexts/bookAppointmentContext";
import { BookAnAppointment } from "@components/module";
import Layout from "@components/layout";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "book-an-appointment" },
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

export default function BookAnAppointmentPage({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <BookAppointmentProvider>
      <BookAnAppointment content={content} />
    </BookAppointmentProvider>
  );
}

BookAnAppointmentPage.Layout = Layout;

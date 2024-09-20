import React from "react";

import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import BookAnAppointment from "./bookAnAppointment";
import { BookAppointmentProvider } from "@contexts/bookAppointmentContext";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "book-an-appointment" },
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

const index = ({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log("PAGE_CONTENT", content)
  return (
    <BookAppointmentProvider>
      <BookAnAppointment content={content} />
    </BookAppointmentProvider>
  );
};

export default index;

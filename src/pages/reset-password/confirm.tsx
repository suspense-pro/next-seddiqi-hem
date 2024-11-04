import Layout from "@components/layout";
import ResetPassword from "@components/module/authenticaion/resetPassword";
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

export default function ConfirmPage() {
  return (
    <div>
      <ResetPassword title={"Check your email"} subTitle={"We have sent an email to aashamsi@gmail.com. Please follow the steps to recover your password."} step={2} />
    </div>
  );
}

ConfirmPage.Layout = Layout;

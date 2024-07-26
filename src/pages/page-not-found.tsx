import Layout from "@components/layout";
import { Button, Typography } from "@components/module";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { isEmpty } from "@utils/helpers";
import { GetServerSidePropsContext } from "next";
import React from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "homepage" },
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

export default function PageNotFound() {
  return (
    <div className="error-page">
      <Typography align="center" variant="h1">
        Page not found
      </Typography>
      <Typography align="center" variant="p">
        We cannot find the page you were looking for. Please check the URL or
        navigate to another page.
        <br />
        We apologise for the inconvenience.
      </Typography>
      <Button title="Go to homepage" type="solid" color="green_dark" />
    </div>
  );
}

PageNotFound.Layout = Layout;

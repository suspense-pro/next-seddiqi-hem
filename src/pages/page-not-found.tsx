import Layout from "@components/layout";
import { Button, Typography } from "@components/module";
import NeedMoreHelp from "@components/rendering/needMoreHelp";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { isEmpty } from "@utils/helpers";
import { GetServerSidePropsContext } from "next";
import React from "react";
import styles from "./pageNotFound.module.scss";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "page-not-found" },
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

export default function PageNotFound({ ...content }) {
  const contents = content?.content?.page?.needMoreHelp;

  return (
    <>
    <div className="error-page">
      {/* <img src="/images/png/404-image.png" className="error-image" /> */}

      <div className={styles.pageNotFoundStyle}>
        404
      </div>
      <Typography align="center" variant="h1">
        Page not found
      </Typography>
      <Typography variant="p">
      We cannot find the page you were looking for. Please check the URL or navigate to another page. 
      <br />
      We apologise for the inconvenience.
      </Typography>
      <Button title="Go to homepage" type="transparent" color="metallic" />
    </div>

   {contents && <NeedMoreHelp {...contents} />}
    </>
  );
}

PageNotFound.Layout = Layout;

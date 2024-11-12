import Layout from "@components/layout";
import { BrandListing } from "@components/module";
import ContentBlock from "@components/module/contentBlock";
import { useContent } from "@contexts/withVisualizationContext";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { CmsContent } from "@utils/cms/utils";
import { isEmpty, notNull } from "@utils/helpers";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import React from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "view-all-brands" },
      },
    },
    context
  );

  const { vse } = context.query || {};

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
      vse: vse || "",
    },
  };
}

export default function ViewAllBrandsPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { vse, content } = props;
  const [page] = useContent(content.page, vse as string);
  console.log("VIEW ALL BRANDS", content)
  return (
    <div className="main-content">
      {page?.contentComponents?.filter(notNull).map((cont: CmsContent, index: number) => (
        <ContentBlock content={cont} key={index} />
      ))}
    </div>
  );
}

ViewAllBrandsPage.Layout = Layout;

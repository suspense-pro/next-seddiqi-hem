import React from "react";
import Image from "next/image";
import { getProducts } from "@utils/sfcc-connector";
import Layout from "@components/layout";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useContent } from "@contexts/withVisualizationContext";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import fetchPageData from "@utils/cms/page/fetchPageData";
import { isEmpty, mapToID, notNull } from "@utils/helpers";
import { CmsContent } from "@utils/cms/utils";
import ContentBlock from "@components/module/contentBlock";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let { slug } = context.params || {};
  const { vse } = context.query || {};
  const deliveryKey = Array.isArray(slug) ? slug.join("/") : (slug as string);

  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: `brand/${deliveryKey}` },
      },
    },
    context
  );


  // if (isEmpty(data.page) || !slug) {
  //   return {
  //     redirect: {
  //       destination: "/page-not-found",
  //     },
  //   };
  // }

  return {
    props: {
      ...data,
      vse: vse || "",
    },
  };
}

const BrandPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { vse, content } = props;
  const [page] = useContent(content.page, vse as string);

  return (
    <div className="blog-content">
      {page.contentComponents
        ?.filter(notNull)
        .map((cont: CmsContent, index: number) => (
          <ContentBlock content={cont} key={index} />
        ))} 
    </div>
  );
};

export default BrandPage;

BrandPage.Layout = Layout;


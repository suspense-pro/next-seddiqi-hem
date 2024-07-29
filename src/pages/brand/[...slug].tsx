// pages/brand/[slug].tsx
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
import BrandHero from "@components/module/brandHero";

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

  if (isEmpty(data.page) || !slug) {
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

const BrandPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { vse, content } = props;

  return (
    <div className="blog-content">
      {content?.page?.components
        ?.filter(notNull)
        .map((content: CmsContent, index: number) => (
          <ContentBlock content={content} key={index} />
        ))}
        {/* <BrandHero content={content}    /> */}
    </div>
  );
};

BrandPage.Layout = Layout;

export default BrandPage;

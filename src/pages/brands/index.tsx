import Layout from "@components/layout";
import { BrandListing, ScrollToTop } from "@components/module";
import ViewAllBrandsCategory from "@components/module/brands/viewAllBrandsCategory";
import ContentBlock from "@components/module/contentBlock";
import { HeroBanner } from "@components/rendering";
import { useContent } from "@contexts/withVisualizationContext";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { CmsContent } from "@utils/cms/utils";
import { isEmpty, notNull } from "@utils/helpers";
import { getCategory } from "@utils/sfcc-connector/dataService";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import React from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "brands" },
      },
    },
    context
  );

  // console.log({data});

  const brandPagesResponse = await fetchStandardPageData(
    {
      content: {
        page: {
          filterBy: [
            {
              path: "/_meta/schema",
              value: "https://seddiqi.amplience.com/page/brand-page",
            },
          ],
        },
      },
    },
    context
  );

  const { vse } = context.query || {};

  const brands = await getCategory({ method: "GET", cgid: "brands" });

  const brandPages = brandPagesResponse.content.page.responses.map(
    ({ content }) => {
      return {
        url: content._meta.deliveryKey,
      };
    }
  );

  // if (isEmpty(data.content.page)) {
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
      ...brands.response,
      brandPages,
    },
  };
}

export default function ViewAllBrandsPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { vse, content, categories, brandPages } = props;
  const [page] = useContent(content.page, vse as string);
  const heroBanner = content?.page?.heroBanner;
  // console.log("VIEW ALL BRANDS", content)

  // console.log({categories});
  return (
    <div className="brand-lister-main-content">
      {heroBanner && (
        <HeroBanner
          banners={heroBanner?.banners}
          bannerType={heroBanner?.bannerType}
        />
      )}
      <ViewAllBrandsCategory />
      <BrandListing categories={categories} brandPages={brandPages} />
      <ScrollToTop />
    </div>
  );
}

ViewAllBrandsPage.Layout = Layout;

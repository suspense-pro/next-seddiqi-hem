import Layout from "@components/layout";
import React from "react";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { getHierarchyChildren } from "@utils/cms/amplience";
import { GetServerSidePropsContext } from "next";
import { PlpContent } from "@components/module";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "homepage" },
      },
    },
    context
  );
  const header = (data?.hierarchies as any)?.pages?.find(
    (data: any) => data?.root?.key === "headerNavigation"
  );
  const cardsData = await getHierarchyChildren(
    header?.content?._meta?.deliveryId
  );

  return {
    props: {
      ...data,
      cardsData,
      header,
    },
  };
}

const Products = (props) => {
  const products = props?.hierarchies?.pages[2]?.content?.productGridContent;
  return <PlpContent products={products} />;
};

export default Products;

Products.Layout = Layout;

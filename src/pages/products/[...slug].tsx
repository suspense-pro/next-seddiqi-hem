import Layout from "@components/layout";
import React from "react";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { GetServerSidePropsContext } from "next";
import { PlpContent } from "@components/module";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug = [] } = context.params || {};
  const plpKey = Array.isArray(slug) ? slug.join('/') : slug;
  const { vse } = context.query || {};
  
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: `products/${plpKey}` },
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

const Products = (props) => {
  const products = props?.content?.page?.productGridContent;
  if(!products) return null
  return <PlpContent products={products} />;
};

export default Products;

Products.Layout = Layout;

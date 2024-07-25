import Layout from "@components/layout";
import React from "react";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { GetServerSidePropsContext } from "next";
import { PlpContent } from "@components/module";
import { getProductListing } from "@utils/sfcc-connector/dataService";

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

  const products = await getProductListing({categoryId: "mens-clothing-suits", method: "POST"});  

  return {
    props: {
      ...data,
      products
    },
  };
}

const Products = (props) => {
  const twoColumnImageCopy = props?.content?.page?.productGridContent;
  const products = props?.products?.productResults?.hits
  if(!products || !twoColumnImageCopy) return null
  return <PlpContent products={products} twoColumnImageCopy={twoColumnImageCopy} />;
};

export default Products;

Products.Layout = Layout;

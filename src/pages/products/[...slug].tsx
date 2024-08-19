import Layout from "@components/layout";
import React, {useEffect} from "react";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { GetServerSidePropsContext } from "next";
import { PlpContent } from "@components/module";
import { getProductListing } from "@utils/sfcc-connector/dataService";
import { isEmpty } from "@utils/helpers";
import { useContent } from "@contexts/withVisualizationContext";

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

  // if (isEmpty(data.page)) {
  //   return {
  //     redirect: {
  //       destination: "/page-not-found",
  //     },
  //   };
  // }

  const products = await getProductListing({categoryId: plpKey, method: "POST"});

  // if (!products) {
  //   return {
  //     redirect: {
  //       destination: "/page-not-found",
  //     },
  //   };
  // }
  
  return {
    props: {
      ...data,
      products,
      vse: vse || '',
    },
  };
}

const Products = (props) => {
  const { vse, products, content } = props;
  
  const [productGridContent] = useContent(content?.page?.productGridContent, vse);
  const productResults = products?.productResults;

  return <PlpContent products={productResults} productGridContent={productGridContent} />;
};

export default Products;

Products.Layout = Layout;

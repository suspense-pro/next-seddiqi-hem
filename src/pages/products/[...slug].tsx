import Layout from "@components/layout";
import React, {useEffect} from "react";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { GetServerSidePropsContext } from "next";
import { PlpContent } from "@components/module";
import { getProductListing } from "@utils/sfcc-connector/dataService";
import { isEmpty } from "@utils/helpers";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug = [] } = context.params || {};
  const plpKey = Array.isArray(slug) ? slug.join('/') : slug;
  const { vse } = context.query || {};

  console.log("plpKey---------", plpKey)
  
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: `products/${plpKey}` },
      },
    },
    context
  );

  const products = await getProductListing({categoryId: plpKey, method: "POST"});

  // if (isEmpty(data.page)) {
  //   return {
  //     redirect: {
  //       destination: "/page-not-found",
  //     },
  //   };
  // }
  

  return {
    props: {
      ...data,
      products
    },
  };
}

const Products = (props) => {
  async function getProds() {
    const category = JSON.stringify("mens-clothing-suits");
    const response = await getProductListing({method: "POST", categoryId: category});  
    const resData = await response.json();
    console.log(resData);
 
  }
  useEffect(()=> {
    getProds();
  }, [])
  const products = props?.content?.page?.productGridContent;
  const productGridContent = props?.content?.page?.productGridContent;

  return <PlpContent productGridContent={productGridContent} products={products} />;
};

export default Products;

Products.Layout = Layout;

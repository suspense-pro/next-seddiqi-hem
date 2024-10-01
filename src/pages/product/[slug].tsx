import Layout from "@components/layout";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { getProductDetails } from "@utils/sfcc-connector/dataService";
import { GetServerSidePropsContext } from "next";
import compact from "lodash/compact";
import ProductDetailInfo from "@components/module/product/productDetailInfo";
import ContentBlock from "@components/module/contentBlock";
import { PdpTabs } from "@components/rendering";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug = [] } = context.params || {};
  const plpKey = Array.isArray(slug) ? slug.join('/') : slug;
  const { vse } = context.query || {};

  const data = await fetchStandardPageData({
    content: {
      page: { key: `product/${plpKey}` },
    },
  }, context);

  const product = await getProductDetails({ productId: plpKey, method: "GET" });

  const sizeGuideDataKeyGender = product?.response?.c_gender?.toLowerCase();
  const sizeGuideDataKeyCategory = product?.response?.c_categoryName?.toLowerCase();
  const sizeGuidePlpKey= `${sizeGuideDataKeyGender}-${sizeGuideDataKeyCategory}`;

  const sizeGuideData = await fetchStandardPageData({
    content: {
      page: { key: `product-size-guide/${sizeGuidePlpKey}` },
    },  },
  context);


  return {
    props: {
      ...data,
      sizeGuideData,
      product,
      vse: vse || '',
    },
  };
}

export default function ProductPage({ content, product, sizeGuideData }) {
  const productTechSpecs = product.techSpecs;

  return (
    <div className="main-content">
      <ProductDetailInfo 
        product={product?.response} 
        content={content} 
        sizeGuideData={sizeGuideData}
      />
      {/* Other components like ScrollToTop and StickyWhatsapp */}
      {compact(content?.page?.components).map((content) => (
        <ContentBlock content={content} key={content?._meta.deliveryId} />
      ))}
      <PdpTabs productTechSpecs={productTechSpecs} amplienceData={""} />     
    </div>
  );
}

ProductPage.Layout = Layout;

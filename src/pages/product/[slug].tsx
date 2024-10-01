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

  const sizeGuideDataWomenWatches = await fetchStandardPageData({
    content: {
      page: { key: `product-size-guide/womens-watches` },
    },
  }, context);

  const sizeGuideDataMenWatches = await fetchStandardPageData({
    content: {
      page: { key: `product-size-guide/mens-watches` },
    },
  }, context);

  const product = await getProductDetails({ productId: plpKey, method: "GET" });

  return {
    props: {
      ...data,
      sizeGuideDataWomenWatches,
      sizeGuideDataMenWatches,
      product,
      vse: vse || '',
    },
  };
}

export default function ProductPage({ content, product, sizeGuideDataWomenWatches, sizeGuideDataMenWatches }) {
  const productTechSpecs = product.techSpecs;

  return (
    <div className="main-content">
      <ProductDetailInfo product={product?.response} content={content} sizeGuideDataMenWatches={sizeGuideDataMenWatches} sizeGuideDataWomenWatches={sizeGuideDataWomenWatches} />
      {/* Other components like ScrollToTop and StickyWhatsapp */}
      {compact(content?.page?.components).map((content) => (
        <ContentBlock content={content} key={content?._meta.deliveryId} />
      ))}
      <PdpTabs productTechSpecs={productTechSpecs} amplienceData={""} />     
    </div>
  );
}

ProductPage.Layout = Layout;

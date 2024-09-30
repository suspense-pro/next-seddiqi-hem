import React from "react";

import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { SizeGuideProvider } from "@contexts/sizeGuideSelectorContext";
import { SizeSelector } from "@components/module";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const sizeGuideDataWomenWatches = await fetchStandardPageData(
    {
      content: {
        page: { key: `product-size-guide/womens-watches` },
      },
    },
    context
  );

  const sizeGuideDataMenWatches = await fetchStandardPageData(
    {
      content: {
        page: { key: `product-size-guide/mens-watches` },
      },
    },
    context
  );

  return {
    props: {
      sizeGuideDataWomenWatches,
      sizeGuideDataMenWatches,
    },
  };
}

const index = ({
  sizeGuideDataWomenWatches,
  sizeGuideDataMenWatches,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <SizeGuideProvider
      sizeGuideDataMenWatches={sizeGuideDataMenWatches}
      sizeGuideDataWomenWatches={sizeGuideDataWomenWatches}
    >
      <SizeSelector />
    </SizeGuideProvider>
  );
};

export default index;

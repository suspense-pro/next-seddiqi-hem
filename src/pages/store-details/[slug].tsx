import React, { useState, useEffect } from "react";
import Layout from "@components/layout";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { getStores } from "@utils/sfcc-connector/dataService";
import { GetServerSidePropsContext } from "next";
import {
  StoreLocationDetailsProps,
  Store,
} from "@utils/models/storeLocatorDetails";
import { StoreDetailsPage } from "@components/module";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug = [] } = context.params || {};
  const { vse } = context.query || {};
  const plpKey = "store10";

  // Fetch the standard page data
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: `store-details/${plpKey}` },
      },
    },
    context
  );

  return {
    props: {
      ...data,
      selectedStore: plpKey,
      vse: vse || "",
    },
  };
}

const StoreDetails = (props) => {
  const { selectedStore } = props;

  return (
    <div className="main-content">
      <StoreDetailsPage store={selectedStore} />
    </div>
  );
};

export default StoreDetails;

StoreDetails.Layout = Layout;

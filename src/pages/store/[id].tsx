import React, { useState, useEffect } from "react";
import Layout from "@components/layout";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { getStores } from "@utils/sfcc-connector/dataService";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import {
  StoreLocationDetailsProps,
  Store,
} from "@utils/models/storeLocatorDetails";
import { StoreDetailsPage, StoreLocationDetails } from "@components/module";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.params! ;

    console.log('Store ID from context params:', id);

    const data = await fetchStandardPageData(
        {
            content: {
                page: { key: "/" },
            },
        },
        context
    );
    console.log("data", data)

    return {
        props: {
            ...data,
            selectedStore: id, 
        },
    };
}


export default function StoreDetails(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { selectedStore } = props; 

    return (
        <div className="main-content">
            <StoreDetailsPage store={selectedStore} />
        </div>
    );
}

StoreDetails.Layout = Layout;

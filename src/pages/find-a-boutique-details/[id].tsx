import React, { useState, useEffect } from "react";
import Layout from "@components/layout";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { getStores } from "@utils/sfcc-connector/dataService";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import {
  StoreLocationDetailsProps,
  Store,
} from "@utils/models/storeLocatorDetails";
import { StoreDetailsPageContent, StoreLocationDetails } from "@components/module";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.params! ;
    const { mapView } = context.query;

    const data = await fetchStandardPageData(
        {
            content: {
                page: { key: "/" },
            },
        },
        context
    );

    return {
        props: {
            ...data,
            selectedStore: id, 
            mapView: mapView === 'true',
        },
    };
}


export default function StoreDetails(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { selectedStore, mapView } = props;

    return (
        <div className="main-content">
            <StoreDetailsPageContent store={selectedStore} mapViewOn={mapView} />
        </div>
    );
}

StoreDetails.Layout = Layout;

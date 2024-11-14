import React, { useState, useEffect, Component } from "react";
import styles from "./storeLocationDetails.module.scss";
import Typography from "../typography";
import RichText from "../richText";
import SideDrawer from "../sideDrawer";
import { Button } from "@components/module";
import Image from "@components/module/image";
import { getStores } from "@utils/sfcc-connector/dataService";
import { StoreDetails } from "@components/module";
import {
  StoreLocationDetailsProps,
  Store,
} from "@utils/models/storeLocatorDetails";

const StoreLocationDetails: React.FC<StoreLocationDetailsProps> = ({
  storeId,
  isOpen,
  onClose,
  mapViewOn,
}) => {
  const [storeDetails, setStoreDetails] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  useEffect(() => {
    const fetchStoresData = async () => {
      try {
        const response = await getStores({
          method: "GET",
          brand: "",
          city: "",
          name: "",
          service: "",
          lat: "",
          lng: "",
        });
        const storeDetails = response?.response;
        if (Array.isArray(storeDetails)) {
          setStoreDetails(storeDetails);
        } else {
          throw new Error("No data found in response");
        }
        setStoreDetails(storeDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStoresData();
  }, [storeId]);

  useEffect(() => {
    if (storeDetails.length > 0 && storeId) {
      const storeDetailsMatch = storeDetails.find(
        (store) => store.id === storeId
      );
      if (storeDetailsMatch) {
        setSelectedStore(storeDetailsMatch);
      } else {
        console.log("No matching store found for storeId:", storeId);
      }
    }
  }, [storeId, storeDetails]);

  return (
    <div className={styles.storeDetailsWrapper}>
      <SideDrawer
        isOpen={isOpen}
        showFooter={false}
        showBackButton={true}
        onClose={onClose}
        onSubmit={null}
        onClearAll={null}
        position={"right"}
        className={styles.customSideDrawerStyle}
      >
        {selectedStore && <StoreDetails store={selectedStore} mapViewOn={mapViewOn}/>}
      </SideDrawer>
    </div>
  );
};

export default StoreLocationDetails;

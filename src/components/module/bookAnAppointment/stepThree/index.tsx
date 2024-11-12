import React, { useContext, useEffect, useState, useMemo } from "react";
import styles from "./index.module.scss";
import { Image } from "@components/module";
import { CloseIcon, MapIcon } from "@assets/images/svg";
import ExclusiveInfoCards from "../exclusiveInfoCards";
import { getStores } from "@utils/sfcc-connector/dataService";
import { BookAppointmentContext } from "@contexts/bookAppointmentContext";
import { Button } from "@components/module";
import MapView from "@components/module/mapView";
import { getDistance } from "@utils/helpers/getDistance";
import SelectedBrands from "../selectedBrands";

const StepThree = () => {
  const { handleStepChange, selectedCard, setSelectedCard, setSelectedStore, updateStep } =
    useContext(BookAppointmentContext);

  const [stores, setStores] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [isMapView, setIsMapView] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const handleSelectBoutique = () => {
    const selectedStore = stores.find((store) => store.id === selectedStoreId);
    if (selectedStore) {
      setSelectedStore(selectedStore);
      updateStep(3, true);
      handleStepChange(4);
    }
  };

  const handleMapViewToggle = () => {
    if (selectedStoreId) {
      setIsMapView(!isMapView);
    }
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await getStores({
          method: "GET",
          brand: "",
          city: "",
          name: "",
          service: ""
        });
        console.log("Stores response:", response);

        if (response && !response.isError && response.response && response.response.data) {
          setStores(response.response.data);

          const uniqueCities = Array.from(new Set(response.response.data.map((store) => store.city)));
          setCities(uniqueCities);
        }
      } catch (error) {
        console.error("error---", error);
      }
    };

    fetchStores();
  }, [selectedCard]);

  useEffect(() => {
    if (selectedTabIndex === 0) {
      setSelectedCity("");
    } else {
      setSelectedCity(cities[selectedTabIndex - 1]);
    }
  }, [selectedTabIndex, cities]);

  const filteredStores = useMemo(() => {
    return selectedCity ? stores.filter((store) => store.city === selectedCity) : stores;
  }, [selectedCity, stores]);

  const tabs = ["All", ...cities];

  const nearestStore = useMemo(() => {
    if (!userLocation || stores.length === 0) return null;

    let minDistance = Infinity;
    let nearest = null;

    stores.forEach((store) => {
      if (store.latitude && store.longitude) {
        const distance = getDistance(
          { lat: userLocation.lat, lng: userLocation.lng },
          { lat: store.latitude, lng: store.longitude }
        );

        if (distance < minDistance) {
          minDistance = distance;
          nearest = store;
        }
      }
    });

    return nearest;
  }, [userLocation, stores]);

  const activeStore = stores.find((store) => store.id === selectedStoreId);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.selectedData}>
          <div className={styles.serviceCard}>
            <Image
              className={`${styles.serviceImg} ${styles.serviceImage}`}
              image={selectedCard?.media?.image}
              imageAltText={selectedCard?.media?.altText}
            />
            <div className={styles.serviceInfo}>
              <div className={styles.serviceTitle}>{selectedCard?.title}</div>
              <div className={styles.serviceDesc}>{selectedCard?.description}</div>
            </div>
            <div
              onClick={() => {
                handleStepChange(1);
                setSelectedCard(null);
                updateStep(1, false);
              }}
            >
              <CloseIcon className={styles.closeIcon} />
            </div>
          </div>
          <SelectedBrands />
        </div>

        <div className={styles.tabs}>
          <div className={styles.tabWrapper}>
            {tabs.map((tabLabel, index) => (
              <button
                key={index}
                className={`${styles.tabButton} ${selectedTabIndex === index ? styles.activeTab : ""}`}
                onClick={() => setSelectedTabIndex(index)}
              >
                {tabLabel}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.mapViewContainer}>
          <div className={styles.mapViewToggle}>
            <label className={styles.mapViewLabel}>
              MAP VIEW
              <div className={styles.switch}>
                <input
                  type="checkbox"
                  checked={isMapView}
                  onChange={handleMapViewToggle}
                  disabled={!selectedStoreId}
                  className={styles.switchInput}
                />
                <span className={styles.switchSlider}></span>
              </div>
            </label>
          </div>
          <div className={styles.storeCount}>{filteredStores.length.toString().padStart(2, "0")} Results</div>
        </div>

        {isMapView ? (
          <div className={styles.storeListMapContainer}>
            <div className={styles.mapContainer}>
              {selectedStoreId && (
                <MapView
                  nearestStore={nearestStore}
                  stores={filteredStores}
                  activeStore={activeStore || nearestStore || filteredStores[0]}
                  userLocation={userLocation}
                  useOnPopup={false}
                />
              )}
            </div>
            <div className={styles.storeList}>
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  className={`${styles.storeItem} ${selectedStoreId === store.id ? styles.selectedStoreItem : ""}`}
                  onClick={() => setSelectedStoreId(store.id)}
                >
                  <div className={styles.storeName}>{store.name}</div>
                  <div className={styles.storeAddress}>
                    <MapIcon /> {store.city} | {store.address1}
                  </div>
                  {selectedStoreId === store.id && (
                    <a
                      href={store.c_googleMapLocation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.getDirections}
                    >
                      Get Directions
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.storeList}>
            {filteredStores.map((store) => (
              <div
                key={store.id}
                className={`${styles.storeItem} ${selectedStoreId === store.id ? styles.selectedStoreItem : ""}`}
                onClick={() => setSelectedStoreId(store.id)}
              >
                <div className={styles.storeName}>{store.name}</div>
                <div className={styles.storeAddress}>
                  <MapIcon /> {store.city} | {store.address1}
                </div>
                {selectedStoreId === store.id && (
                  <a
                    href={store.c_googleMapLocation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.getDirections}
                  >
                    Get Directions
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.appointmentBtn}>
        <Button title={"Select Boutique"} color="metallic" type="solid" clickHandler={handleSelectBoutique} />
      </div>
    </div>
  );
};

export default StepThree;

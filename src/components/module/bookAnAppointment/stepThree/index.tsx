import React, { useContext, useEffect, useState, useMemo } from "react";
import styles from "./index.module.scss";
import { Image } from "@components/module";
import { CloseIcon, MapIcon } from "@assets/images/svg";
import ExclusiveInfoCards from "../exclusiveInfoCards";
import { getStores } from "@utils/sfcc-connector/dataService";
import { BookAppointmentContext } from "@contexts/bookAppointmentContext";
import { Button } from "@components/module";
import MapView from "@components/module/mapView";

const StepThree = () => {
  const {
    handleStepChange,
    selectedCard,
    setSelectedCard,
    setSelectedStore,
    updateStep,
  } = useContext(BookAppointmentContext);

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
    setIsMapView(!isMapView);
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await getStores({
          method: "GET",
          brand: "",
          city: "",
          name: "",
        });
        console.log("Stores response:", response);

        if (
          response &&
          !response.isError &&
          response.response &&
          response.response.data
        ) {
          setStores(response.response.data);

          const uniqueCities = Array.from(
            new Set(response.response.data.map((store) => store.city))
          );
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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Got user location:", position);
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("geolocation error---", error);
          setUserLocation({ lat: 25.2048, lng: 55.2708 });
        }
      );
    } else {
      console.error("geolocation is not supported by this browser---");
      setUserLocation({ lat: 25.2048, lng: 55.2708 }); //Dubai
    }
  }, []);

  const filteredStores = useMemo(() => {
    return selectedCity
      ? stores.filter((store) => store.city === selectedCity)
      : stores;
  }, [selectedCity, stores]);

  const tabs = ["All", ...cities];

  const getDistance = (lat1, lng1, lat2, lng2) => {
    const toRadians = (degree) => (degree * Math.PI) / 180;
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const nearestStore = useMemo(() => {
    if (!userLocation || stores.length === 0) return null;

    let minDistance = Infinity;
    let nearest = null;

    stores.forEach((store) => {
      if (store.latitude && store.longitude) {
        const distance = getDistance(
          userLocation.lat,
          userLocation.lng,
          store.latitude,
          store.longitude
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

  // console.log(
  //   "nearestStore", nearestStore,
  //   "filteredStores", filteredStores,
  //   "activeStore", activeStore,
  //   "userLocation", userLocation
  // );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.serviceCard}>
          <Image
            className={`${styles.serviceImg} ${styles.serviceImage}`}
            image={selectedCard?.media?.image}
            imageAltText={selectedCard?.media?.altText}
          />
          <div className={styles.serviceInfo}>
            <div className={styles.serviceTitle}>{selectedCard?.title}</div>
            <div className={styles.serviceDesc}>
              {selectedCard?.description}
            </div>
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

        <div className={styles.tabs}>
          <div className={styles.tabWrapper}>
            {tabs.map((tabLabel, index) => (
              <button
                key={index}
                className={`${styles.tabButton} ${
                  selectedTabIndex === index ? styles.activeTab : ""
                }`}
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
                  className={styles.switchInput}
                />
                <span className={styles.switchSlider}></span>
              </div>
            </label>
          </div>
          <div className={styles.storeCount}>
            {filteredStores.length.toString().padStart(2, "0")} Results
          </div>
        </div>

        {isMapView ? (
          <div className={styles.storeListMapContainer}>
            <div className={styles.mapContainer}>
              {userLocation && filteredStores.length > 0 && (
                <MapView
                  nearestStore={nearestStore}
                  stores={filteredStores}
                  activeStore={activeStore || nearestStore || filteredStores[0]}
                  userLocation={userLocation}
                />
              )}
            </div>
            <div className={styles.storeList}>
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  className={`${styles.storeItem} ${
                    selectedStoreId === store.id ? styles.selectedStoreItem : ""
                  }`}
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
                className={`${styles.storeItem} ${
                  selectedStoreId === store.id ? styles.selectedStoreItem : ""
                }`}
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

        <div className={styles.appointmentBtn}>
          <Button
            title={"Select Boutique"}
            color="metallic"
            type="solid"
            clickHandler={handleSelectBoutique}
          />
        </div>
      </div>
      <ExclusiveInfoCards />
    </div>
  );
};

export default StepThree;

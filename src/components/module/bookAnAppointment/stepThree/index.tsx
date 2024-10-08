import React, { useContext, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Image } from "@components/module";
import { CloseIcon } from "@assets/images/svg";
import ExclusiveInfoCards from "../exclusiveInfoCards";
import { getStores } from "@utils/sfcc-connector/dataService";
import { BookAppointmentContext } from "@contexts/bookAppointmentContext";
import { Button } from "@components/module";
import { MapIcon } from "@assets/images/svg";

const StepThree = () => {
  const { selectedCard, updateStep, handleStepChange, setSelectedCard } =
    useContext(BookAppointmentContext);
  if (!selectedCard) return null;

  const [stores, setStores] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");

  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [isMapView, setIsMapView] = useState(false);

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
        console.error("Error fetching stores:", error);
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

  const filteredStores = selectedCity
    ? stores.filter((store) => store.city === selectedCity)
    : stores;

  const tabs = ["All", ...cities];

  const MapView = ({ stores, selectedStoreId }) => {
    const mapRef = React.useRef(null);

    useEffect(() => {
      const loadGoogleMapsApi = () => {
        if (window.google && window.google.maps) {
          initializeMap();
        } else {
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBD-TGPmve8xmC6qIawp7eOXPKfs3ldS_U`;
          script.async = true;
          document.body.appendChild(script);
          script.onload = initializeMap;
        }
      };

      const initializeMap = () => {
        const { google } = window;
        if (!google) return;

        const mapOptions = {
          center: { lat: 25.2048, lng: 55.2708 },
          zoom: 10,
        };

        const map = new google.maps.Map(mapRef.current, mapOptions);

        stores.forEach((store) => {
          if (store.latitude && store.longitude) {
            const marker = new google.maps.Marker({
              position: { lat: store.latitude, lng: store.longitude },
              map: map,
              title: store.name,
              icon:
                selectedStoreId === store.id
                  ? {
                      url: "/images/png/MapPinPoint.png",
                      scaledSize: new google.maps.Size(44, 60),
                      anchor: new google.maps.Point(30, 60),
                    }
                  : undefined,
            });

            if (selectedStoreId === store.id) {
              map.setCenter({ lat: store.latitude, lng: store.longitude });
              map.setZoom(12);
            }

            marker.addListener("click", () => {
              setSelectedStoreId(store.id);
            });
          }
        });
      };

      loadGoogleMapsApi();
    }, [stores, selectedStoreId]);

    return (
      <div className={styles.mapContainer}>
        <div ref={mapRef} className={styles.map} />
      </div>
    );
  };

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

            <MapView
              stores={filteredStores}
              selectedStoreId={selectedStoreId}
            />
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
                  {store.city} | {store.address1}
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
          <Button title={"Select Boutique"} color="metallic" type="solid" />
        </div>
      </div>
      <ExclusiveInfoCards />
    </div>
  );
};

export default StepThree;

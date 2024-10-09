import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const MapView = ({ nearestStore, stores, activeStore, userLocation }) => {
  const mapRef = useRef();

  useEffect(() => {
    const loader = new Loader({
      apiKey: API_KEY,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then((google) => {
      if (google && (nearestStore || activeStore)) {
        const map = new google.maps.Map(mapRef.current, {
          center: {
            lat: activeStore ? activeStore.latitude : nearestStore.latitude,
            lng: activeStore ? activeStore.longitude : nearestStore.longitude,
          },
          zoom: 12,
        });

        const getIconSize = () => {
          const width = window.innerWidth;
          return new google.maps.Size(width < 600 ? 36 : 50, width < 600 ? 49 : 68);
        };

        const nearestStoreIcon = {
          url: "/images/png/map-pin.png",
          scaledSize: getIconSize(),
        };

        const userLocationIcon = {
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          //scaledSize: getIconSize(),
        };

        const storeIcon = {
          url: "/images/png/map-pin.png",
          scaledSize: getIconSize(),
        };

        if (nearestStore) {
          new google.maps.Marker({
            position: { lat: nearestStore.latitude, lng: nearestStore.longitude },
            map: map,
            title: nearestStore.name,
            icon: nearestStoreIcon,
          });
        }

        // Marker for the user location
        if (userLocation) {
          new google.maps.Marker({
            position: userLocation,
            map: map,
            title: "Your Location",
            icon: userLocationIcon
          });
        }

        if (activeStore) {
          map.setCenter({ lat: activeStore.latitude, lng: activeStore.longitude });
        }

        stores.forEach((store) => {
          new google.maps.Marker({
            position: { lat: store.latitude, lng: store.longitude },
            map: map,
            title: store.name,
            icon: storeIcon,
          });
        });
      }
    }).catch(err => {
      console.error("Error loading Google Maps: ", err);
    });
  }, [nearestStore, stores, activeStore]);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }}></div>;
};

export default MapView;
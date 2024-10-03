import React, { useEffect, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import styles from "./mapComponent.module.scss";
import { MapComponentProps } from "@utils/models/mapComponent";

const MapComponent: React.FC<MapComponentProps> = ({
  latitude,
  longitude,
  storeName,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const getSvgDataUrl = (svgComponent: React.ReactNode) => {
    // Render the SVG component to static markup
    const svgString = renderToStaticMarkup(svgComponent);
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`;
  };

  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBD-TGPmve8xmC6qIawp7eOXPKfs3ldS_U`; // Replace with your Google Maps API key
    mapScript.async = true;

    mapScript.onload = () => {
      if (mapContainerRef.current) {
        const map = new window.google.maps.Map(mapContainerRef.current, {
          center: { lat: latitude, lng: longitude },
          zoom: 12,
        });

        const markerIcon = {
          // url: getSvgDataUrl(<MapLocationPin />),// Map Location Pin
          scaledSize: new window.google.maps.Size(24, 24), // Adjust size as needed
        };

        new window.google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map,
          title: storeName,
          icon: markerIcon,
        });
      }
    };

    document.body.appendChild(mapScript);

    return () => {
      document.body.removeChild(mapScript);
    };
  }, [latitude, longitude, storeName]);

  return <div ref={mapContainerRef} className={styles.mapStyles} />;
};

export default MapComponent;

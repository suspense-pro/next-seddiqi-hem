import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useDeviceWidth } from "@utils/useCustomHooks";

const api_key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

const MapView = ({ nearestStore, stores, activeStore, userLocation, useOnPopup }) => {
  const mapRef = useRef();
  const markersRef = useRef([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [isDesktop] = useDeviceWidth();

  useEffect(() => {
    const styles = [
      {
          "featureType": "all",
          "elementType": "all",
          "stylers": [
              {
                  "hue": "#ffaa00"
              },
              {
                  "saturation": "-33"
              },
              {
                  "lightness": "10"
              }
          ]
      },
      {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#9c5e18"
              }
          ]
      },
      {
          "featureType": "landscape.natural.terrain",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.attraction",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.business",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.government",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.place_of_worship",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "transit.line",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "saturation": "-23"
              },
              {
                  "gamma": "2.01"
              },
              {
                  "color": "#f2f6f6"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "saturation": "-14"
              }
          ]
      }
  ];
    
  const loader = new Loader({
    apiKey: api_key,
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
        styles: styles
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
      };

      const storeIcon = {
        url: "/images/png/map-pin.png",
        scaledSize: getIconSize(),
      };

      /*if (nearestStore) {
        new google.maps.Marker({
          position: { lat: nearestStore.latitude, lng: nearestStore.longitude },
          map: map,
          title: nearestStore.name,
          icon: nearestStoreIcon,
        });
      }*/
      
      if (userLocation && (nearestStore.latitude !== userLocation.lat || nearestStore.longitude !== userLocation.lng)) {
        new google.maps.Marker({
          position: userLocation,
          map: map,
          title: "Your Location",
          icon: userLocationIcon,
        });
      }

      if (activeStore) {
        // Only center on mobile devices
        if (isDesktop && useOnPopup === false) {
          const currentCenter = map.getCenter();
          map.panTo({
            lat: currentCenter.lat(),
            lng: currentCenter.lng() + -0.03,
          });
          map.setZoom(14);
        }
      }

      stores.forEach((store) => {
        const marker = new google.maps.Marker({
          position: { lat: store.latitude, lng: store.longitude },
          map: map,
          title: store.name,
          icon: storeIcon,
        });

        markersRef.current.push(marker);

        if (activeStore && store.id !== activeStore.id) {
          marker.setVisible(false); 
        }

        /*marker.addListener("click", () => {
          setActiveMarker(store.id); 

          const currentCenter = map.getCenter();
          map.panTo({
            lat: currentCenter.lat(),  
            lng: currentCenter.lng() + -0.03 
          });
          map.setZoom(14); 
          markersRef.current.forEach((m) => {
            if (m !== marker) {
              m.setVisible(false); 
            }
          });
        });*/
      });
    }
  }).catch(err => {
    console.error("Error loading Google Maps: ", err);
  });

}, [nearestStore, stores, activeStore, isDesktop]); // Add isDesktop as a dependency

return <div ref={mapRef} style={{ height: '100%', width: '100%' }}></div>;
};

export default MapView;
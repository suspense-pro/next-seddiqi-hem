import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const api_key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

const MapView = ({ nearestStore, stores, activeStore, userLocation }) => {
  const mapRef = useRef();
  const mapLoaded = useRef(false);
  const mapInstance = useRef(null);

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

        mapInstance.current = map;

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
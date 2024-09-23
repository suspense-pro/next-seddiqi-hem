import React, { useEffect, useState } from "react";
import styles from "./storeLocator.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getStores } from "@utils/sfcc-connector/dataService";
import SlidingRadioSwitch from "@components/module/slidingRadioSwitch";

const StoreLocator = ({ productImgAlt, productImgSrc, productBrand, productName, productPrice, productCurrency }) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [activeToggle, setActiveToggle] = useState(true);
  const [fadeList, setFadeList] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [nearestStore, setNearestStore] = useState(null);
  const [dubaiStores, setDubaiStores] = useState([]);
  const [abuDhabiStores, setAbuDhabiStores] = useState([]);

  useEffect(() => {
    // Load Google Maps API
    const loadGoogleMapsApi = () => {
      const existingScript = document.getElementById('google-maps');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
        script.id = 'google-maps';
        document.body.appendChild(script);
      }
    };

    loadGoogleMapsApi();

    const fetchStores = async () => {
      try {
        const result = await getStores({
          method: 'GET',
          brand: productBrand,
          name: productName,
          city: ''
        });

        const filteredDubaiStores = result.response.data.filter(store => store.city.toLowerCase() === 'dubai');
        const filteredAbuDhabiStores = result.response.data.filter(store => store.city.toLowerCase() === 'abu dhabi');

        setDubaiStores(filteredDubaiStores);
        setAbuDhabiStores(filteredAbuDhabiStores);
        setStores(result.response.data);
        
        //console.log("RES: ", result.response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch stores');
      } finally {
        setLoading(false);
      }
    };

    fetchStores();

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
      });
    }
  }, [productBrand, productName]);

  useEffect(() => {
    if (stores.length > 0 && userLocation) {
      const nearest = calculateNearestStore(stores);
      setNearestStore(nearest);
    }
  }, [stores, userLocation]);

  const calculateNearestStore = (storesList) => {
    if (!userLocation || storesList.length === 0) return null;

    const distances = storesList.map(store => {
      const storeLocation = { lat: store.latitude, lng: store.longitude };
      return {
        store,
        distance: getDistance(userLocation, storeLocation)
      };
    });

    return distances.reduce((prev, curr) => (prev.distance < curr.distance ? prev : curr)).store;
  };

  const getDistance = (loc1, loc2) => {
    const rad = (x) => (x * Math.PI) / 180;
    const R = 6371; // Radius of Earth in kilometers
    const dLat = rad(loc2.lat - loc1.lat);
    const dLon = rad(loc2.lng - loc1.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(rad(loc1.lat)) * Math.cos(rad(loc2.lat)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  const handleTabChange = (tab) => {
    setFadeList(true);
    setTimeout(() => {
      setActiveTab(tab);
      setFadeList(false);
      const storesToCalculate = tab === 'All' ? stores : tab === 'Dubai' ? dubaiStores : abuDhabiStores;
      const nearest = calculateNearestStore(storesToCalculate);
      setNearestStore(nearest);
    }, 300);
  };

  const handleToggleChange = (toggle) => {
    setFadeList(true);
    setTimeout(() => {
      setActiveToggle(toggle);
      setFadeList(false);
    }, 300);
  };

  const renderStores = (storesList) => {
    return (
      <ul className={styles.storeList}>
        {storesList.map(store => (
          <li className={styles.store} key={store.id}>
            <div className={styles.storeImageContainer}>
              <img src={store.c_storeImage} alt={store.name} className={styles.storeImage} />

              {activeToggle ? (
                <>
                  {nearestStore && nearestStore.id === store.id && (
                    <h3 className={styles.nearestStore}>Nearest Store</h3>
                  )}
                </>
              ) : null}
            </div>

            <div className={styles.storeDetails}>
              <h4 className={styles.storeName}>{store.name}</h4>

              <div className={styles.storeLocation}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.99999 15.4692C8.49655 14.9778 9.88758 13.5512 11.159 11.7874C12.4417 10.0081 13.6 7.88985 13.6 6.04364C13.6 4.58157 13.01 3.1795 11.96 2.14571C10.9096 1.11157 9.48517 0.530884 7.99999 0.530884C6.51482 0.530884 5.09034 1.11157 4.03999 2.14571C2.98999 3.1795 2.39999 4.58157 2.39999 6.0433C2.39999 7.89054 3.38482 9.34744 4.55758 10.7623C5.27083 11.6228 6.2494 12.6427 6.99788 13.4M7.99999 8.28847C7.54896 8.28847 7.10793 8.15675 6.73275 7.9102C6.35758 7.66364 6.06551 7.31295 5.89275 6.90261C5.72034 6.49226 5.67517 6.04123 5.7631 5.60571C5.85103 5.17019 6.06827 4.77019 6.38724 4.4564C6.7062 4.14226 7.11241 3.92847 7.55517 3.84192C7.99758 3.75537 8.4562 3.79985 8.8731 3.96985C9.28999 4.13985 9.6462 4.42744 9.89655 4.79675C10.1472 5.16606 10.2807 5.59985 10.2807 6.04399C10.28 6.63916 10.0396 7.20985 9.61206 7.63054C9.18448 8.05157 8.60482 8.28778 7.99999 8.28847Z" stroke="#464F4A"/>
                </svg>

                <p><span>{store.city}</span><span>{store.address1}</span></p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const renderMaps = (storesList) => {
    if (storesList.length === 0) return null;

    return (
      <>
        <div className={styles.mapContainer}>
          {/* {nearestStore && <MapView 
            userLocation={userLocation} 
            nearestStore={nearestStore} 
          />}  */}
          <img src="/images/jpg/map-image.jpg" />
        </div>
        
        <ul className={styles.storeMapList}>
          {storesList.map(store => (
            <li className={styles.storeMap} key={store.id}>
              <div className={styles.storeMapDetails}>
                <h4 className={styles.storeMapName}>{store.name}</h4>

                <div className={styles.storeMapLocation}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99999 15.4692C8.49655 14.9778 9.88758 13.5512 11.159 11.7874C12.4417 10.0081 13.6 7.88985 13.6 6.04364C13.6 4.58157 13.01 3.1795 11.96 2.14571C10.9096 1.11157 9.48517 0.530884 7.99999 0.530884C6.51482 0.530884 5.09034 1.11157 4.03999 2.14571C2.98999 3.1795 2.39999 4.58157 2.39999 6.0433C2.39999 7.89054 3.38482 9.34744 4.55758 10.7623C5.27083 11.6228 6.2494 12.6427 6.99788 13.4M7.99999 8.28847C7.54896 8.28847 7.10793 8.15675 6.73275 7.9102C6.35758 7.66364 6.06551 7.31295 5.89275 6.90261C5.72034 6.49226 5.67517 6.04123 5.7631 5.60571C5.85103 5.17019 6.06827 4.77019 6.38724 4.4564C6.7062 4.14226 7.11241 3.92847 7.55517 3.84192C7.99758 3.75537 8.4562 3.79985 8.8731 3.96985C9.28999 4.13985 9.6462 4.42744 9.89655 4.79675C10.1472 5.16606 10.2807 5.59985 10.2807 6.04399C10.28 6.63916 10.0396 7.20985 9.61206 7.63054C9.18448 8.05157 8.60482 8.28778 7.99999 8.28847Z" stroke="#464F4A"/>
                  </svg>

                  <p><span>{store.city}</span><span>{store.address1}</span></p>
                </div>
              </div>

              <a href={store.c_googleMapLocation} target="_blank" className={`${[styles.storeMapLink]} button plain green_dark`}><span>Get Directions</span></a>
            </li>
          ))}
        </ul>
      </>
    );
  };

  const combinedStores = [...dubaiStores, ...abuDhabiStores];
  const storeCounts = {
    All: combinedStores.length,
    Dubai: dubaiStores.length,
    'Abu Dhabi': abuDhabiStores.length,
  };

  return (
    <div className={styles.storeLocatorContainer}>
      <div className={styles.productInfoContainer}>
        <div className={styles.productInfoContainerImage}>
          <img alt={productImgAlt} src={productImgSrc} />
        </div>
        <div className={styles.productInfoContainerTexts}>
          <h6>{productBrand}</h6>
          <p>{productName}</p>
          <span>{productCurrency} {productPrice}</span>
        </div>
      </div>

      <div className={styles.tabsSwiperContainer}>
        <Swiper slidesPerView={"auto"} className={styles.tabsSwiper}>
          <SwiperSlide className={styles.tabsSwiperSlide}>
            <button onClick={() => handleTabChange('All')} className={activeTab.toLowerCase() === 'all' ? styles.active : ''}>
              All Boutiques
            </button>
          </SwiperSlide>
          <SwiperSlide className={styles.tabsSwiperSlide}>
            <button onClick={() => handleTabChange('Dubai')} className={activeTab.toLowerCase() === 'dubai' ? styles.active : ''}>
              Dubai
            </button>
          </SwiperSlide>
          <SwiperSlide className={styles.tabsSwiperSlide}>
            <button onClick={() => handleTabChange('Abu Dhabi')} className={activeTab.toLowerCase() === 'abu dhabi' ? styles.active : ''}>
              Abu Dhabi
            </button>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className={styles.toggleResultsContainer}>
        <SlidingRadioSwitch toggleLabel={"Map View"} onToggle={handleToggleChange} />

        <p className={styles.storeResult}>{storeCounts[activeTab] > 10 ? storeCounts[activeTab] : "0" + storeCounts[activeTab]} Results</p>
      </div>

      <div className={`${styles.storeListContainer} ${fadeList ? styles.fadeOut : styles.fadeIn}`}>
        {activeToggle ? (
          activeTab === 'All' ? renderStores(combinedStores) :
          activeTab === 'Dubai' ? renderStores(dubaiStores) :
          renderStores(abuDhabiStores)
        ) : (
          activeTab === 'All' ? renderMaps(combinedStores) :
          activeTab === 'Dubai' ? renderMaps(dubaiStores) :
          renderMaps(abuDhabiStores)
        )}
      </div>
    </div>
  );
};

// New MapView component
const MapView = ({ userLocation, nearestStore }) => {
  const mapRef = React.useRef();

  useEffect(() => {
    const loadMap = () => {
      const { google } = window;
      if (google && nearestStore) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: nearestStore.latitude, lng: nearestStore.longitude },
          zoom: 12,
        });

        // Marker for the nearest store
        new google.maps.Marker({
          position: { lat: nearestStore.latitude, lng: nearestStore.longitude },
          map: map,
          title: nearestStore.name,
        });

        // Marker for the user location
        if (userLocation) {
          new google.maps.Marker({
            position: userLocation,
            map: map,
            title: "Your Location",
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }
          });
        }
      }
    };

    loadMap();
  }, [userLocation, nearestStore]);

  return (
    <div className={styles.map} ref={mapRef} style={{ height: '300px', width: '100%' }}></div>
  );
};

export default StoreLocator;
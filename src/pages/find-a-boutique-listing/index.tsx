import React, { useEffect, useState } from "react";
import styles from "./findABotiqueListing.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { getStores } from "@utils/sfcc-connector/dataService";
import SlidingRadioSwitch from "@components/module/slidingRadioSwitch";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import compact from "lodash/compact";
import Layout from "@components/layout";
import NeedMoreHelp from "@components/rendering/needMoreHelp";

import "swiper/css";
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';
import ContentBlock from "@components/module/contentBlock";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "find-a-boutique-listing" },
      },
    },
    context
  );

  return {
    props: {
      ...data,
    },
  };
}


export default function FindABoutiqueListing({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // Initialize active index
  const [itemsToShow, setItemsToShow] = useState(8);

  const handleStoreClick = (index) => {
    setActiveIndex(index); // Set the clicked store as active
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call initially to set state correctly

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Load Google Maps API
    const loadGoogleMapsApi = () => {
      const existingScript = document.getElementById('google-maps');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBD-TGPmve8xmC6qIawp7eOXPKfs3ldS_U&libraries=places`;
        script.id = 'google-maps';
        document.body.appendChild(script);
      }
    };

    loadGoogleMapsApi();

    const fetchStores = async () => {
      try {
        const result = await getStores({
          method: 'GET',
          brand: '',
          name: '',
          city: ''
        });

        const filteredDubaiStores = result.response.data.filter(store => store.city.toLowerCase() === 'dubai');
        const filteredAbuDhabiStores = result.response.data.filter(store => store.city.toLowerCase() === 'abu dhabi');

        setDubaiStores(filteredDubaiStores);
        setAbuDhabiStores(filteredAbuDhabiStores);
        setStores(result.response.data);
        
        console.log("RES: ", result.response.data);
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
  }, []);

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

  const handleLoadMore = () => {
    setItemsToShow(prevItems => prevItems + 8); // Increment items to show by 8
  };

  const handleTabChange = (tab) => {
    setFadeList(true);
    setTimeout(() => {
      setActiveTab(tab);
      setItemsToShow(8);
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
    const displayedStores = storesList.slice(0, itemsToShow);

    return (
      <>
        <ul className={styles.storeList}>
        {displayedStores.map(store => (
          <li className={styles.store} key={store.id}>
            <div className={styles.storeImageContainer}>
              <img src={store.c_storeImage} alt={store.name} className={styles.storeImage} />
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
      
      {storesList.length > itemsToShow && (
        <button className={`${[styles.loadMore]} button transparent`} onClick={handleLoadMore}>Load More</button>
      )}
      </>
    );
  };

  const renderMaps = (storesList) => {
    if (storesList.length === 0) return null;

    return (
      <>
        <div className={styles.mapContainer}>
          {nearestStore && (
            <MapView 
              userLocation={userLocation} 
              nearestStore={nearestStore} 
              stores={stores} // Pass all stores here
              activeStore={stores[activeIndex]} // Pass the currently active store
            />
          )}
        </div>
        
        <div className={styles.storeMapListContainer}>
          {!isMobile ? (
            <Swiper
              direction={'vertical'}
              slidesPerView={'auto'}
              freeMode={true}
              scrollbar={{ dragSize: 160, draggable: true }}
              mousewheel={true}
              modules={[FreeMode, Scrollbar, Mousewheel]}
              className={styles.storeMapListSwiper}
            >
              <SwiperSlide>
                <ul className={styles.storeMapList}>
                  {storesList.map((store, index) => (
                    <li 
                      key={store.id} 
                      className={`${styles.storeMap} ${activeIndex === index ? styles.isActive : ''}`} 
                      onClick={() => handleStoreClick(index)} // Update active index on click
                    >
                      <div className={styles.storeMapDetails}>
                        <h4 className={styles.storeMapName}>{store.name}</h4>
                        <div className={styles.storeMapLocation}>
                          <div className={styles.locationContainer}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7.99999 15.4692C8.49655 14.9778 9.88758 13.5512 11.159 11.7874C12.4417 10.0081 13.6 7.88985 13.6 6.04364C13.6 4.58157 13.01 3.1795 11.96 2.14571C10.9096 1.11157 9.48517 0.530884 7.99999 0.530884C6.51482 0.530884 5.09034 1.11157 4.03999 2.14571C2.98999 3.1795 2.39999 4.58157 2.39999 6.0433C2.39999 7.89054 3.38482 9.34744 4.55758 10.7623C5.27083 11.6228 6.2494 12.6427 6.99788 13.4M7.99999 8.28847C7.54896 8.28847 7.10793 8.15675 6.73275 7.9102C6.35758 7.66364 6.06551 7.31295 5.89275 6.90261C5.72034 6.49226 5.67517 6.04123 5.7631 5.60571C5.85103 5.17019 6.06827 4.77019 6.38724 4.4564C6.7062 4.14226 7.11241 3.92847 7.55517 3.84192C7.99758 3.75537 8.4562 3.79985 8.8731 3.96985C9.28999 4.13985 9.6462 4.42744 9.89655 4.79675C10.1472 5.16606 10.2807 5.59985 10.2807 6.04399C10.28 6.63916 10.0396 7.20985 9.61206 7.63054C9.18448 8.05157 8.60482 8.28778 7.99999 8.28847Z" stroke="#464F4A"/>
                            </svg>
                            <p><span>{store.city}</span><span>{store.address1}</span></p>
                          </div>
                          <p className={styles.storeMapDistance}>{store.distance} {store.distanceUnit}</p>
                        </div>
                      </div>
                      <div className={styles.storeMapLinksContainer}>
                        <a href="" target="_blank" className={`${[styles.storeMapLink]} button plain green_dark`}>
                          <span>View Details</span>
                        </a>

                        <a href={store.c_googleMapLocation} target="_blank" className={`${[styles.storeMapLink]} button plain green_dark`}>
                          <span>Get Directions</span>
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </SwiperSlide>
            </Swiper>
          ) : (
            <ul className={styles.storeMapList}>
              {storesList.map((store, index) => (
                <li 
                  key={store.id} 
                  className={`${styles.storeMap} ${activeIndex === index ? styles.isActive : ''}`} 
                  onClick={() => handleStoreClick(index)} // Update active index on click
                >
                  <div className={styles.storeMapDetails}>
                    <h4 className={styles.storeMapName}>{store.name}</h4>
                    <div className={styles.storeMapLocation}>
                      <div className={styles.locationContainer}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.99999 15.4692C8.49655 14.9778 9.88758 13.5512 11.159 11.7874C12.4417 10.0081 13.6 7.88985 13.6 6.04364C13.6 4.58157 13.01 3.1795 11.96 2.14571C10.9096 1.11157 9.48517 0.530884 7.99999 0.530884C6.51482 0.530884 5.09034 1.11157 4.03999 2.14571C2.98999 3.1795 2.39999 4.58157 2.39999 6.0433C2.39999 7.89054 3.38482 9.34744 4.55758 10.7623C5.27083 11.6228 6.2494 12.6427 6.99788 13.4M7.99999 8.28847C7.54896 8.28847 7.10793 8.15675 6.73275 7.9102C6.35758 7.66364 6.06551 7.31295 5.89275 6.90261C5.72034 6.49226 5.67517 6.04123 5.7631 5.60571C5.85103 5.17019 6.06827 4.77019 6.38724 4.4564C6.7062 4.14226 7.11241 3.92847 7.55517 3.84192C7.99758 3.75537 8.4562 3.79985 8.8731 3.96985C9.28999 4.13985 9.6462 4.42744 9.89655 4.79675C10.1472 5.16606 10.2807 5.59985 10.2807 6.04399C10.28 6.63916 10.0396 7.20985 9.61206 7.63054C9.18448 8.05157 8.60482 8.28778 7.99999 8.28847Z" stroke="#464F4A"/>
                        </svg>
                        <p><span>{store.city}</span><span>{store.address1}</span></p>
                      </div>
                      <p className={styles.storeMapDistance}>{store.distance} {store.distanceUnit}</p>
                    </div>
                  </div>

                  <div className={styles.storeMapLinksContainer}>
                    <a href="" target="_blank" className={`${[styles.storeMapLink]} button plain green_dark`}>
                      <span>View Details</span>
                    </a>

                    <a href={store.c_googleMapLocation} target="_blank" className={`${[styles.storeMapLink]} button plain green_dark`}>
                      <span>Get Directions</span>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    );
  };

  const combinedStores = [...dubaiStores, ...abuDhabiStores];
  const storeCounts = {
    All: combinedStores.length,
    Dubai: dubaiStores.length,
    'Abu Dhabi': abuDhabiStores.length,
  };

  console.log("CONTENT: ", content);

  return (
    <>
      <div className={styles.heroBannerWrapper}>
      {compact(content?.page?.components).map((content) => (
        <ContentBlock content={content} key={content?._meta.deliveryId} />
      ))}
      </div>

      <div className={styles.storeLocatorContainer}>
        
        <div className={styles.tabsSwiperContainer}>
          <div className={styles.filtersContainer}>
            <button className={styles.filterButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6H22" stroke="black"/>
                <path d="M5.5 12L18.5 12" stroke="black"/>
                <path d="M8 18L16 18" stroke="black"/>
              </svg>

              <span>Filters By (00)</span>
            </button>
          </div>

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

      <NeedMoreHelp />
    </>
  );
};

// New MapView component
const MapView = ({ userLocation, nearestStore, stores, activeStore }) => {
  const mapRef = React.useRef();

  useEffect(() => {
    const loadMap = () => {
      const { google } = window;
      if (google && (nearestStore || activeStore)) {
        const map = new google.maps.Map(mapRef.current, {
          center: { 
            lat: (activeStore ? activeStore.latitude : nearestStore.latitude), 
            lng: (activeStore ? activeStore.longitude : nearestStore.longitude) 
          },
          zoom: 12,
        });
    
        // Function to get icon size based on screen width
        const getIconSize = () => {
          const width = window.innerWidth;
          if (width < 600) { // Mobile size
            return new google.maps.Size(36, 49); // Smaller size for mobile
          } else { // Default size
            return new google.maps.Size(50, 68); // Adjust size as needed
          }
        };
    
        // Define custom icon URLs
        const nearestStoreIcon = {
          url: "/images/png/map-pin.png",
          scaledSize: getIconSize()
        };
    
        const userLocationIcon = {
          url: "/images/png/map-pin.png",
          scaledSize: getIconSize()
        };
    
        const storeIcon = {
          url: "/images/png/map-pin.png",
          scaledSize: getIconSize()
        };
    
        // Marker for the nearest store
        if (nearestStore) {
          new google.maps.Marker({
            position: { lat: nearestStore.latitude, lng: nearestStore.longitude },
            map: map,
            title: nearestStore.name,
            icon: nearestStoreIcon
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
    
        // Marker for all stores
        stores.forEach(store => {
          new google.maps.Marker({
            position: { lat: store.latitude, lng: store.longitude },
            map: map,
            title: store.name,
            icon: storeIcon
          });
        });
    
        // Center the map on the active store if selected
        if (activeStore) {
          map.setCenter({ lat: activeStore.latitude, lng: activeStore.longitude });
        }
      }
    };
    
    // Optionally, listen for window resize events to update marker sizes
    window.addEventListener('resize', loadMap);

    loadMap();
  }, [userLocation, nearestStore, stores, activeStore]);

  return (
    <div className={styles.map} ref={mapRef} style={{ height: '100%', width: '100%' }}></div>
  );
};


FindABoutiqueListing.Layout = Layout;

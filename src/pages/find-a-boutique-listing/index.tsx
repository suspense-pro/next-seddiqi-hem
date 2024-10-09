import React, { useEffect, useState } from "react";
import styles from "./findABotiqueListing.module.scss";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import compact from "lodash/compact";
import Layout from "@components/layout";
import NeedMoreHelp from "@components/rendering/needMoreHelp";
import ContentBlock from "@components/module/contentBlock";
import UseFetchStores from "@utils/useCustomHooks/useFetchStores";
import MapView from "@components/module/mapView";
import { useDeviceWidth } from "@utils/useCustomHooks";
import { FilterIcon, LocationIcon } from "@assets/images/svg";
import StoreMapListContainer from "@components/module/storeMapListContainer";
import LocationTabs from "@components/module/locationTabs";
import { getDistance } from "@utils/helpers/getDistance";
import ToggleMapResults from "@components/module/toggleMapResults";

import "swiper/css";
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';


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
  const [userLocation, setUserLocation] = useState(null);
  const [nearestStore, setNearestStore] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeToggle, setActiveToggle] = useState(true);
  const [fadeList, setFadeList] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(8);
  const [activeTab, setActiveTab] = useState('All');
  const [cities, setCities] = useState([]);

  const tabs = [
    { label: 'All Boutiques', value: 'All' },
    { label: 'Dubai', value: 'Dubai' },
    { label: 'Abu Dhabi', value: 'Abu Dhabi' },
  ];

  const handleStoreClick = (index) => {
    setActiveIndex(index); // Set the clicked store as active
  };

  const [isMobile] = useDeviceWidth();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const result = await UseFetchStores('', '', '');
        setStores(result);

        // Extract unique cities
        const uniqueCities = [...new Set(result.map(store => store.city))];
        setCities(uniqueCities);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();

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

  const handleLoadMore = () => {
    setItemsToShow(prevItems => prevItems + 8); // Increment items to show by 8
  };

  const handleTabChange = (tab) => {
    setFadeList(true);
    setTimeout(() => {
      setActiveTab(tab);
      setItemsToShow(8);
      setFadeList(false);

      const storesToCalculate = tab === 'All' ? stores : stores.filter(store => store.city === tab);
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

              {/* {activeToggle ? (
                  <>
                    {nearestStore && nearestStore.id === store.id && (
                      <h3 className={styles.nearestStore}>Nearest Store</h3>
                    )}
                  </>
                ) : null} */}
            </div>

            <div className={styles.storeDetails}>
              <h4 className={styles.storeName}>{store.name}</h4>

              <div className={styles.storeLocation}>
                <LocationIcon />

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
              nearestStore={nearestStore} 
              stores={stores} 
              activeStore={stores[activeIndex]} 
              userLocation={userLocation}
            />
          )}
        </div>

        <StoreMapListContainer 
          storesList={storesList} 
          activeIndex={activeIndex} 
          handleStoreClick={handleStoreClick} 
          isMobile={!isMobile} 
          isAbsolutePosition={true}
        />
      </>
    );
  };

  //const combinedStores = stores;
  const combinedStores = stores.filter(store => 
    store.city.toLowerCase() === 'dubai' || store.city.toLowerCase() === 'abu dhabi'
  );

  const storeCounts = {
    All: combinedStores.length,
    ...Object.fromEntries(cities.map(city => [city, stores.filter(store => store.city === city).length])),
  };

  //console.log("CONTENT: ", content);

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
              <FilterIcon />

              <span>Filters By (00)</span>
            </button>
          </div>

          {/* <LocationTabs activeTab={activeTab} handleTabChange={handleTabChange} tabs={[{ label: 'All Boutiques', value: 'All' }, ...cities.map(city => ({ label: city, value: city }))]}  /> */}
          <LocationTabs activeTab={activeTab} handleTabChange={handleTabChange} tabs={tabs} />
        </div>

        <ToggleMapResults 
          onToggle={handleToggleChange} 
          activeTab={activeTab} 
          storeCounts={storeCounts} 
        />

        <div className={`${styles.storeListContainer} ${fadeList ? styles.fadeOut : styles.fadeIn}`}>
          {activeToggle ? 
            renderStores(activeTab === 'All' ? combinedStores : stores.filter(store => store.city === activeTab)) : 
            renderMaps(activeTab === 'All' ? combinedStores : stores.filter(store => store.city === activeTab))
          }
        </div>
      </div>

      <NeedMoreHelp />
    </>
  );
};


FindABoutiqueListing.Layout = Layout;

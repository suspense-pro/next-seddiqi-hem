import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./storeMapListContainer.module.scss";
import { LocationIcon } from "@assets/images/svg";
import { StoreLocationDetails } from "@components/module";

import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';
import { useRouter } from 'next/router';

import "swiper/css";
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

const StoreMapListContainer = ({
  storesList,
  activeIndex,
  handleStoreClick,
  isMobile,
  isAbsolutePosition,
  needScrollbar,
  useOnPopup,
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [mapViewOn, setMapViewOn] = useState(false);
  const swiperRef = useRef(null);
  const router = useRouter();

  const handleStoreDtetails = (store) => {
    setSelectedStoreId(store.id);
    setMapViewOn(true);
    //setIsDetailsOpen(true);
    setMapViewOn(true);
    if (useOnPopup) {
      // Show StoreLocationDetails as a popup
      setIsDetailsOpen(true);
    } else {
      // Redirect to details page
      handleStoreDetailsPage(store.id, true);
    }
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedStoreId(null);
    setMapViewOn(false);
  };

  const handleStoreDetailsPage = (storeId, showMapView = false) => {
    router.push({
      pathname: `/find-a-boutique-details/${storeId}`,
      query: { mapView: showMapView ? 'true' : 'false' }
    });
  };

  useEffect(() => {
    const updateSwiper = () => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.update();
      }
    };

    updateSwiper();

    const handleResize = () => {
      updateSwiper();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [storesList]);

  return (
    <>
    <div className={`${[styles.storeMapListContainer]} ${isAbsolutePosition === true ? "" : styles.isRelative} ${needScrollbar === true ? "" : styles.noScrollbar}`}>
      {!isMobile && needScrollbar === true ? (
        <Swiper
            direction={'vertical'}
            slidesPerView={'auto'}
            freeMode={true}
            scrollbar={{ dragSize: 160, draggable: true }}
            mousewheel={true}
            modules={[FreeMode, Scrollbar, Mousewheel]}
            className={styles.storeMapListSwiper}
            ref={swiperRef}
        >
          <SwiperSlide>
            <ul className={styles.storeMapList}>
              {storesList.map((store, index) => (
                <li
                  key={store.id}
                  className={`${styles.storeMap} ${activeIndex === index ? styles.isActive : ''}`}
                  onClick={() => handleStoreClick(index)}
                >
                  <div className={styles.storeMapDetails}>
                    <h4 className={styles.storeMapName}>{store.name}</h4>
                    <div className={styles.storeMapLocation}>
                      <div className={styles.locationContainer}>
                        {/* <LocationIcon /> */}
                        <p>
                          <span><LocationIcon /> {store.city}</span>
                          <span>{store.address1}</span>
                        </p>
                      </div>

                      {store.distance !== null ? (
                        <p className={styles.storeMapDistance}>
                          {store.distance} {store.distanceUnit}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className={styles.storeMapLinksContainer}>
                  <a href="/" target="_blank" className={`${styles.storeMapLink} button plain green_dark`} 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          handleStoreDtetails(store);
                        }}>
                      <span>View Details</span>
                    </a>
                    <a href={store.c_googleMapLocation} target="_blank" className={`${styles.storeMapLink} button plain green_dark`}>
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
              onClick={() => handleStoreClick(index)}
            >
              <div className={styles.storeMapDetails}>
                <h4 className={styles.storeMapName}>{store.name}</h4>
                <div className={styles.storeMapLocation}>
                  <div className={styles.locationContainer}>
                    {/* <LocationIcon /> */}
                    <p>
                      <span><LocationIcon /> {store.city}</span>
                      <span>{store.address1}</span>
                    </p>
                  </div>
                  {store.distance !== null ? (
                    <p className={styles.storeMapDistance}>
                      {store.distance} {store.distanceUnit}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className={styles.storeMapLinksContainer}>
              <a href="/" target="_blank" className={`${styles.storeMapLink} button plain green_dark`} 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          handleStoreDtetails(store);
                        }}>
                  <span>View Details</span>
                </a>
                <a href={store.c_googleMapLocation} target="_blank" className={`${styles.storeMapLink} button plain green_dark`}>
                  <span>Get Directions</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    {isDetailsOpen && (
    <>
    <div className={styles.storeDetailsBackdrop} onClick={handleCloseDetails} />
      <StoreLocationDetails
          storeId={selectedStoreId}
          isOpen={isDetailsOpen}
          onClose={handleCloseDetails}
          mapViewOn={mapViewOn}
          useOnPopup={true}
        />
    </>
    )}
    </>
  );
};

export default StoreMapListContainer;
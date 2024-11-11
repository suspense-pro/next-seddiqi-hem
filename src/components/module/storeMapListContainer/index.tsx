import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./storeMapListContainer.module.scss";
import { LocationIcon } from "@assets/images/svg";
import { StoreLocationDetails } from "@components/module";

import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';

import "swiper/css";
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

const StoreMapListContainer = ({
  storesList,
  activeIndex,
  handleStoreClick,
  isMobile,
  isAbsolutePosition,
  needScrollbar
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  const handleStoreDtetails = (store) => {
    setSelectedStoreId(store.id);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedStoreId(null);
  };

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
                      <p className={styles.storeMapDistance}>{store.distance} {store.distanceUnit}</p>
                    </div>
                  </div>
                  <div className={styles.storeMapLinksContainer}>
                    <a href="" target="_blank" className={`${styles.storeMapLink} button plain green_dark`}>
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
            >
              <div className={styles.storeMapDetails}  onClick={() => handleStoreDtetails(store)}>
                <h4 className={styles.storeMapName}>{store.name}</h4>
                <div className={styles.storeMapLocation}>
                  <div className={styles.locationContainer}>
                    <LocationIcon />
                    <p><span>{store.city}</span><span>{store.address1}</span></p>
                  </div>
                  <p className={styles.storeMapDistance}>{store.distance} {store.distanceUnit}</p>
                </div>
              </div>
              <div className={styles.storeMapLinksContainer}>
                <a href="" target="_blank" className={`${styles.storeMapLink} button plain green_dark`}>
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
        />
    </>
    )}
    </>
  );
};

export default StoreMapListContainer;
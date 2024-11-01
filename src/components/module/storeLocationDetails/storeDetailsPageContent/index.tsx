import React, { useState, useEffect } from "react";
import styles from "./storeDetailsPageContent.module.scss";
import Typography from "../../typography";
import RichText from "../../richText";
import SideDrawer from "../../sideDrawer";
import { Button } from "@components/module";
import Image from "@components/module/image";
import { getStores } from "@utils/sfcc-connector/dataService";
import { TimeIcon } from "@assets/images/svg";
import { ServiceIcon } from "@assets/images/svg";
import { BrandsIcon } from "@assets/images/svg";
import { WhatsappIcon } from "@assets/images/svg";
import { MapIcon } from "@assets/images/svg";
import { StoreDetailsProps } from "@utils/models/storeLocatorDetails";
import SlidingRadioSwitch from "@components/module/slidingRadioSwitch";
import MapView from "@components/module/mapView";
import { ArrowRight } from "@assets/images/svg";
import { useDeviceWidth } from "@utils/useCustomHooks";
import BrandPopup from "@components/module/storeLocationDetails/brandPopUp";
import { useRouter } from "next/router";

const StoreDetailsPageContent: React.FC<StoreDetailsProps> = ({ store }) => {
  const [matchedStore, setMatchedStore] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [stores, setStores] = useState([]);
  const [mapView, setMapView] = useState(false);
  const [activeToggle, setActiveToggle] = useState(true);
  const isMobile = !useDeviceWidth()[0];
  const [isAllBrandPopupOpen, setAllBrandPopupOpen] = useState(false);
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.push('/find-a-boutique-listing');
  };

  const handleViewAllBrands = () => {
    setAllBrandPopupOpen(true);
  };
  const handleClosePopup = () => {
    setAllBrandPopupOpen(false);
  };

  useEffect(() => {
    const fetchStoresData = async () => {
      try {
        const response = await getStores({
          method: "GET",
          brand: "",
          city: "",
          name: "",
          service: "",
        });
        

        const fetchedStores = response?.response || [];
        setStores(fetchedStores);
        const storeId = store;
        const matchedStore = fetchedStores.find(
          (store) => store.id === storeId
        );
        setMatchedStore(matchedStore);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStoresData();
  }, [store]);

  if (!matchedStore) {
    return null;
  }

  // Store data from matchedStore
  const storeImage = matchedStore?.c_storeImage;
  const storeHoursString = matchedStore.storeHours || "";

  const formattedStoreHours = storeHoursString
    .split("<br />")
    .map((line) => {
      const [days, timings] = line.split(": ");
      return {
        days: days?.trim() || "",
        timings: timings?.trim() || "",
      };
    })
    .filter((item) => item.days && item.timings);

  const handleToggleChange = (toggle) => {
    setTimeout(() => {
      setActiveToggle(toggle);
    }, 300);
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.backBtn} onClick={handleBackButtonClick}>
        <div className={styles.arrowLeftWrapper}>
          <ArrowRight fill="black" className={styles.arrowLeft} />
        </div>
        <div className={styles.backButtonContent}>
          <Typography
            align="left"
            variant="span"
            className={styles.backButtonText}
          >
            Back
          </Typography>
          <div className={styles.underline} />
        </div>
      </div>
      <div className={styles.mapViewWrapper}>
        <SlidingRadioSwitch
          toggleLabel={"Map View"}
          onToggle={handleToggleChange}
        />
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.storeImageWrapper}>
          {activeToggle ? (
            <div className={styles.twoColumnLayout}>
              <div className={styles.infoTwoColumn}>
                <div className={styles.content}>
                  <Typography variant="h3" className={styles.title}>
                    {matchedStore?.name}
                  </Typography>
                </div>
                <div className={styles.locationInfo}>
                  <div className={styles.leftSection}>
                    <MapIcon className={styles.mapIcon} />
                    <span className={styles.addressWrapper}>
                      <Typography variant="p" className={styles.storeCity}>
                        {matchedStore?.city}
                      </Typography>
                      <div className={styles.vline}>&nbsp;</div>
                      <Typography variant="p" className={styles.storeAddress}>
                        {matchedStore?.address1}
                      </Typography>
                    </span>
                  </div>
                  <span className={styles.directionBtnWrapper}>
                    <a
                      href={matchedStore?.c_googleMapLocation}
                      target="_blank"
                      className={`${styles.storeMapLink} button plain green_dark`}
                    >
                      <span>Get Directions</span>
                    </a>
                  </span>
                </div>
                <hr className={styles.divider} />

                <div className={styles.storeContactWrapper}>
                  <div className={styles.leftSection}>
                    <WhatsappIcon
                      className={styles.WhatsappIcon}
                      strokeColor="#464f4a"
                    />
                    <span className={styles.contactLabelWrapper}>
                      <Typography variant="p" className={styles.contactLabel}>
                        {"Get in Touch"}
                      </Typography>
                    </span>
                  </div>
                  <span className={styles.contactWrapper}>
                    <Button
                      isLink={false}
                      className={styles.contactBtn}
                      title={"Call"}
                      color="green_dark"
                      type={"Plain"}
                    />
                    <div className={styles.vDivider}>&nbsp;</div>
                    <Button
                      isLink={false}
                      className={styles.whatsappBtn}
                      title={"WhatsApp"}
                      color="green_dark"
                      type={"Plain"}
                    />
                  </span>
                </div>

                <hr className={styles.divider} />
                <div className={styles.storeTimingWrapper}>
                  <div className={styles.timingRow}>
                    <div className={styles.iconWrapper}>
                      <TimeIcon className={styles.timeIcon} />
                    </div>
                    <div className={styles.timingItems}>
                      {formattedStoreHours.map((item, index) => (
                        <div className={styles.timingDetail} key={index}>
                          <Typography
                            variant="p"
                            className={styles.storeOpenDay}
                          >
                            {item.days}
                          </Typography>
                          <Typography
                            variant="p"
                            className={styles.storeOpenTiming}
                          >
                            {item.timings}
                          </Typography>
                        </div>
                      ))}

                      {formattedStoreHours.map((item, index) => (
                        <div className={styles.timingDetail} key={index}>
                          <Typography
                            variant="p"
                            className={styles.storeOpenDay}
                          >
                            {item.days}
                          </Typography>
                          <Typography
                            variant="p"
                            className={styles.storeOpenTiming}
                          >
                            {item.timings}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <hr className={styles.divider} />

                <div className={styles.serviceWrapper}>
                  <div className={styles.iconSection}>
                    <ServiceIcon className={styles.serviceIcon} />
                  </div>
                  <div className={styles.storeServiceInfo}>
                    <ul className={styles.serviceList}>
                      {matchedStore.c_services &&
                      matchedStore.c_services.length > 0 ? (
                        matchedStore.c_services.map((service, index) => (
                          <li key={index}>{service}</li>
                        ))
                      ) : (
                        <li>No services available</li>
                      )}
                    </ul>
                  </div>
                  <div className={styles.bookAppointment}>
                    <Button
                      isLink={true}
                      link={"/"}
                      className={styles.appointmentBtn}
                      title={"Book appointment"}
                      color="green_dark"
                      type={"Plain"}
                    />
                  </div>
                </div>

                <hr className={styles.divider} />

                <div className={styles.storeBrandsInfo}>
                  <div className={styles.iconSection}>
                    <BrandsIcon className={styles.brandsIcon} />
                  </div>
                  <span className={styles.availableBrandsLabel}>
                    <Typography
                      variant="p"
                      className={styles.availableBrandsTitle}
                    >
                      {"Brands Available"}
                    </Typography>
                  </span>
                  {matchedStore.c_availableBrands &&
                    matchedStore.c_availableBrands.length > 8 && (
                      <span className={styles.viewAllBrands}>
                        <Button
                          isLink={false}
                          className={styles.viewAllBrandsBtn}
                          title={"View all brands"}
                          color="green_dark"
                          type={"Plain"}
                          clickHandler={handleViewAllBrands}
                        />
                      </span>
                    )}
                </div>

                <div className={styles.brandsWrapper}>
                  {matchedStore.c_availableBrands &&
                    matchedStore.c_availableBrands.length > 8 &&
                    matchedStore.c_availableBrands.map(
                      (availableBrand, index) => (
                        <React.Fragment key={index}>
                          <p className={styles.brandsName}>{availableBrand}</p>
                          {index <
                            matchedStore.c_availableBrands.length - 1 && (
                            <div className={styles.brandSeparator} />
                          )}
                        </React.Fragment>
                      )
                    )}
                </div>
                <hr className={styles.divider} />
              </div>
              <div className={styles.imageContainer}>
                <img
                  className={styles.storeImg}
                  src={storeImage}
                  alt={matchedStore?.name}
                />
              </div>
              {
                <BrandPopup
                  brands={matchedStore.c_availableBrands}
                  onClose={handleClosePopup}
                  isOpen={isAllBrandPopupOpen}
                />
              }
            </div>
          ) : (
            <div className={styles.mapOuterContainer}>
              <div className={styles.mapContainer}>
                <div className={styles.fullWidthMap}>
                  <MapView
                    nearestStore={""}
                    stores={stores}
                    activeStore={matchedStore}
                    userLocation={userLocation}
                  />
                </div>
                <div className={styles.infoOverlay}>
                  <div className={styles.content}>
                    <Typography variant="h3" className={styles.title}>
                      {matchedStore?.name}
                    </Typography>
                  </div>
                  <div className={styles.locationInfo}>
                    <div className={styles.leftSection}>
                      <MapIcon className={styles.mapIcon} />
                      <span className={styles.addressWrapper}>
                        <Typography variant="p" className={styles.storeCity}>
                          {matchedStore?.city}
                        </Typography>
                        <div className={styles.vline}>&nbsp;</div>
                        <Typography variant="p" className={styles.storeAddress}>
                          {matchedStore?.address1}
                        </Typography>
                      </span>
                    </div>
                    <span className={styles.directionBtnWrapper}>
                      <a
                        href={matchedStore?.c_googleMapLocation}
                        target="_blank"
                        className={`${styles.storeMapLink} button plain green_dark`}
                      >
                        <span>Get Directions</span>
                      </a>
                    </span>
                  </div>
                  <hr className={styles.divider} />

                  <div className={styles.storeContactWrapper}>
                    <div className={styles.leftSection}>
                      <WhatsappIcon
                        className={styles.WhatsappIcon}
                        strokeColor="#464f4a"
                      />
                      <span className={styles.contactLabelWrapper}>
                        <Typography variant="p" className={styles.contactLabel}>
                          {"Get in Touch"}
                        </Typography>
                      </span>
                    </div>
                    <span className={styles.contactWrapper}>
                      <Button
                        isLink={false}
                        className={styles.contactBtn}
                        title={"Call"}
                        color="green_dark"
                        type={"Plain"}
                      />
                      <div className={styles.vDivider}>&nbsp;</div>
                      <Button
                        isLink={false}
                        className={styles.whatsappBtn}
                        title={"WhatsApp"}
                        color="green_dark"
                        type={"Plain"}
                      />
                    </span>
                  </div>

                  <hr className={styles.divider} />
                  <div className={styles.storeTimingWrapper}>
                    <div className={styles.timingRow}>
                      <div className={styles.iconWrapper}>
                        <TimeIcon className={styles.timeIcon} />
                      </div>
                      <div className={styles.timingItems}>
                        {formattedStoreHours.map((item, index) => (
                          <div className={styles.timingDetail} key={index}>
                            <Typography
                              variant="p"
                              className={styles.storeOpenDay}
                            >
                              {item.days}
                            </Typography>
                            <Typography
                              variant="p"
                              className={styles.storeOpenTiming}
                            >
                              {item.timings}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <hr className={styles.divider} />

                  <div className={styles.serviceWrapper}>
                    <div className={styles.iconSection}>
                      <ServiceIcon className={styles.serviceIcon} />
                    </div>
                    <div className={styles.storeServiceInfo}>
                      <ul className={styles.serviceList}>
                        {matchedStore.c_services &&
                        matchedStore.c_services.length > 0 ? (
                          matchedStore.c_services.map((service, index) => (
                            <li key={index}>{service}</li>
                          ))
                        ) : (
                          <li>No services available</li>
                        )}
                      </ul>
                    </div>
                    <div className={styles.bookAppointment}>
                      <Button
                        isLink={true}
                        link={"/"}
                        className={styles.appointmentBtn}
                        title={"Book appointment"}
                        color="green_dark"
                        type={"Plain"}
                      />
                    </div>
                  </div>

                  <hr className={styles.divider} />

                  <div className={styles.storeBrandsInfo}>
                    <div className={styles.iconSection}>
                      <BrandsIcon className={styles.brandsIcon} />
                    </div>
                    <span className={styles.availableBrandsLabel}>
                      <Typography
                        variant="p"
                        className={styles.availableBrandsTitle}
                      >
                        {"Brands Available"}
                      </Typography>
                    </span>
                    {matchedStore.c_availableBrands &&
                      matchedStore.c_availableBrands.length > 0 && (
                        <span className={styles.viewAllBrands}>
                          <Button
                            isLink={false}
                            className={styles.viewAllBrandsBtn}
                            title={"View all brands"}
                            color="green_dark"
                            type={"Plain"}
                            clickHandler={handleViewAllBrands}
                          />
                        </span>
                      )}
                  </div>

                  <div className={styles.brandsWrapper}>
                    {matchedStore.c_availableBrands &&
                      matchedStore.c_availableBrands.length > 0 &&
                      matchedStore.c_availableBrands.map(
                        (availableBrand, index) => (
                          <React.Fragment key={index}>
                            <p className={styles.brandsName}>
                              {availableBrand}
                            </p>
                            {index <
                              matchedStore.c_availableBrands.length - 1 && (
                              <div className={styles.brandSeparator} />
                            )}
                          </React.Fragment>
                        )
                      )}
                  </div>
                  <hr className={styles.divider} />
                  {/* All Brand Pop up */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {
        <BrandPopup
          brands={matchedStore.c_availableBrands}
          onClose={handleClosePopup}
          isOpen={isAllBrandPopupOpen}
        />
      }
    </div>
  );
};

export default StoreDetailsPageContent;

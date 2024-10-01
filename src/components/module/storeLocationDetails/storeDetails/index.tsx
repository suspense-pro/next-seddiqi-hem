import React, { useState, useEffect } from "react";
import styles from "./storeDetails.module.scss";
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

const StoreDetails: React.FC<StoreDetailsProps> = ({ store }) => {
  const [mapView, setMapView] = useState(false);
  const storeImage = store?.c_storeImage;
  const storeHoursString = store.storeHours;

  // Split by <br /> and then by ": " to separate days from timings
  const formattedStoreHours = storeHoursString
    .split("<br />")
    .map((line, index) => {
      const [days, timings] = line.split(": ");
      return { days: days.trim(), timings: timings.trim() };
    });

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.content}>
        <Typography variant="h3" className={styles.title}>
          {store?.name}
        </Typography>
      </div>
      <div className={styles.locationInfo}>
        <div className={styles.leftSection}>
          <MapIcon className={styles.mapIcon} />
          <span className={styles.addressWrapper}>
            <Typography variant="p" className={styles.storeCity}>
              {store?.city}
            </Typography>
            <div className={styles.vline}>&nbsp;</div>
            <Typography variant="p" className={styles.storeAddress}>
              {store?.address1}
            </Typography>
          </span>
        </div>
        <span className={styles.directionBtnWrapper}>
          <Button
            isLink={false}
            className={styles.getDirectionBtn}
            title={"Get directions"}
            color="green_dark"
            type={"Plain"}
            // clickHandler={handleDirection}
          />
        </span>
      </div>

      <div className={styles.storeImageWrapper}>
        {mapView ? (
          <div className={styles.mapContainer}>
            {/* Replace with actual Map component */}
            {/* <MapComponent store={store} /> */}
          </div>
        ) : (
          <div className={styles.storeImageWrapper}>
            <img className={styles.storeImg} src={store?.c_storeImage} />
          </div>
        )}
      </div>

      {/* Toogle Button for Map View */}
      {/* <div className={styles.mapViewBtn} onClick={() => setMapView(!mapView)}>
        <Typography variant="p" className={styles.mapViewBtnLabel}>
          {mapView ? "IMAGE VIEW" : "MAP VIEW"}
        </Typography>
      </div> */}
      <div className={styles.mapViewBtn}>
        <Typography variant="p" className={styles.mapViewBtnLabel}>
          {"MAP VIEW"}
        </Typography>
      </div>

      <div className={styles.storeContactWrapper}>
        <div className={styles.leftSection}>
          <WhatsappIcon className={styles.WhatsappIcon} />
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
                <Typography variant="p" className={styles.storeOpenDay}>
                  {item.days} {/* Display days */}
                </Typography>
                <Typography variant="p" className={styles.storeOpenTiming}>
                  {item.timings} {/* Display timings */}
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
            {store.c_services && store.c_services.length > 0 ? (
              store.c_services.map((service, index) => (
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
          <Typography variant="p" className={styles.availableBrandsTitle}>
            {"Brands Available"}
          </Typography>
        </span>
        <span className={styles.viewAllBrands}>
          <Button
            isLink={true}
            link={"/"}
            className={styles.viewAllBrandsBtn}
            title={"View all brands"}
            color="green_dark"
            type={"Plain"}
          />
        </span>
      </div>

      <div className={styles.brandsWrapper}>
        {store.c_availableBrands &&
          store.c_availableBrands.length > 0 &&
          store.c_availableBrands.map((availableBrand, index) => (
            <React.Fragment key={index}>
              <p className={styles.brandsName}>{availableBrand}</p>
              {index < store.c_availableBrands.length - 1 && (
                <div className={styles.brandSeparator} />
              )}
            </React.Fragment>
          ))}
      </div>
      <hr className={styles.divider} />
    </div>
  );
};

export default StoreDetails;

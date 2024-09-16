import React from "react";
import styles from "./index.module.scss";
import { Image } from "@components/module";
import { CareIcon, ProtectionIcon, WatchIcon } from "@assets/images/svg";
import ExclusiveInfoCards from "../exclusiveInfoCards";

const image = {
  _meta: {
    schema: "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link",
  },
  id: "7942dffb-3623-47dd-8b4d-dba5e376a026",
  name: "column_image_01",
  endpoint: "likedigital",
  defaultHost: "cdn.media.amplience.net",
  mimeType: "image/png",
};

const StepOne = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.title}>Choose an experience</div>
        <div className={styles.desc}>
          Step into a realm where luxury meets warmth and sophistication. Our stores beckon with an ambiance crafted to
          embrace every visitor in comfort and elegance.
        </div>
      </div>

      <div className={styles.serviceCards}>
        <div className={styles.serviceCard}>
          <Image className={styles.serviceImage} image={image} imageAltText="image" />
          <div className={styles.serviceInfo}>
            <div className={styles.serviceTitle}>Product Discovery</div>
            <div className={styles.serviceDesc}>
              Embark on a journey through time with our exquisite collection of watch adn jewellery products, blending
              precision craftsmanship.
            </div>
          </div>
        </div>
        <div className={styles.serviceCard}>
          <Image className={styles.serviceImage} image={image} imageAltText="image" />
          <div className={styles.serviceInfo}>
            <div className={styles.serviceTitle}>Product Discovery</div>
            <div className={styles.serviceDesc}>
              Embark on a journey through time with our exquisite collection of watch adn jewellery products, blending
              precision craftsmanship.
            </div>
            {/* <CareIcon />
            <ProtectionIcon />
            <WatchIcon /> */}
          </div>
        </div>
      </div>
      <ExclusiveInfoCards />
    </div>
  );
};

export default StepOne;

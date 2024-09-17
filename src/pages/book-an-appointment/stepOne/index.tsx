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

const StepOne = ({ content }) => {
  if (!content) return null;
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.title}>{content?.title}</div>
        <div className={styles.desc}>{content?.description}</div>
      </div>

      <div className={styles.serviceCards}>
        {content?.listItems?.map((item) => (
          <div className={styles.serviceCard}>
            <Image
              className={styles.serviceImage}
              image={item?.media?.image}
              imageAltText={item?.media?.altText}
            />
            <div className={styles.serviceInfo}>
              <div className={styles.serviceTitle}>{item?.title}</div>
              <div className={styles.serviceDesc}>{item?.description}</div>
            </div>
          </div>
        ))}
      </div>
      <ExclusiveInfoCards />
    </div>
  );
};

export default StepOne;

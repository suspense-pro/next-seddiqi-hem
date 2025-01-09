import React from "react";
import styles from "./searchPopUp.module.scss";
import { Image } from "@components/module";
import { CloseIconV2, SeddiqiLogoBlack } from "@assets/images/svg";

const SearchPopUp = ({ setSearchOpen }) => {
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

  return (
    <div className={styles.container}>
      <div onClick={() => setSearchOpen(false)} className={styles.closeIcon}>
        <CloseIconV2 />
      </div>
      <div className={styles.textContainer}>
        <div onClick={() => setSearchOpen(true)} className={styles.searchContainer}>
          <input type="text" placeholder="Tell me about the Ahmed Seddiqi legacy" className={styles.input} />
          <button className={styles.iconButton}>
            <span className={styles.icon}></span>
          </button>
          <div className={styles.seddiqiLogo}>
           <SeddiqiLogoBlack />
          </div>
        </div>
      </div>
      {/* Added Seddiqi text list here */}
      <div className={styles.legacyContainer}>
        <ul className={styles.legacyList}>
          <li>75 Years in the making</li>
          <li>Seddiqi legacy of excellence</li>
          <li>Ahmed Seddiqi Family</li>
          <li>The Seddiqi Museum</li>
          <li>Latest Stories from Ahmed Seddiqi</li>
        </ul>
      </div>
    </div>
  );
};

export default SearchPopUp;

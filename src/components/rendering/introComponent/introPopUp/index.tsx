import React from "react";
import styles from "./introPopUp.module.scss";
import { Image } from "@components/module";
import { CloseIconV2 } from "@assets/images/svg";

const IntroPopUp = ({setImageInfo}) => {
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
      <div onClick={() => setImageInfo(null)} className={styles.closeIcon}>
        <CloseIconV2 />
      </div>
      <Image className={styles.image} height={styles.image2} image={image} imageAltText={"image text"} />
      <div className={styles.textContainer}>
        <div>The first Ahmed Seddiqi shop was located in Bur Dubai.</div>
        <p>
          Mr. Ahmed Qasim Seddiqi maintained his focus by offering quality Swiss watches to an array of clients,
          including royalty and politicians. He furthered the company’s growth through his exclusive franchise
          agreements with the world’s leading Swiss watch companies and he safeguarded the business by keeping Ahmed
          Seddiqi a tight-knit family operation.The first franchise agreement was signed with Swiss watch brand, West
          End Watch Co. in 1949, after which the portfolio of brands expanded to include over 90% of the world’s luxury
          Swiss watch brands. Today, the passion for luxury watches is deeply embedded into the ethos of the Ahmed
          Seddiqi’ family.
        </p>
        <p>
          Mr. Ahmed Qasim Seddiqi maintained his focus by offering quality Swiss watches to an array of clients,
          including royalty and politicians. He furthered the company’s growth through his exclusive franchise
          agreements with the world’s leading Swiss watch companies and he safeguarded the business by keeping Ahmed
          Seddiqi a tight-knit family operation.The first franchise agreement was signed with Swiss watch brand, West
          End Watch Co. in 1949, after which the portfolio of brands expanded to include over 90% of the world’s luxury
          Swiss watch brands. Today, the passion for luxury watches is deeply embedded into the ethos of the Ahmed
          Seddiqi’ family.
        </p>
      </div>
    </div>
  );
};

export default IntroPopUp;

import React from "react";
import styles from "./introPopUp.module.scss";
import { GradientOverlay, Image, Typography, Video } from "@components/module";
import { CloseIconV2 } from "@assets/images/svg";
import RichText from "@components/module/richText";

const IntroPopUp = ({ imageInfo, setImageInfo }) => {
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

  console.log("imageInfo?.media?.video", imageInfo?.media?.video);

  return (
    <div className={styles.container}>
      <div onClick={() => setImageInfo(null)} className={styles.closeIcon}>
        <CloseIconV2 />
      </div>

      {imageInfo?.media?.image ? (
        <GradientOverlay className={styles.image} opacity={60}>
          <Image
            className={styles.image}
            height={styles.image2}
            image={imageInfo?.media?.image}
            imageAltText={"image text"}
          />
        </GradientOverlay>
      ) : (
        <GradientOverlay className={styles.image} opacity={60}>
          <Video
            className={`${styles.image2} ${styles.image}`}
            video={imageInfo?.media?.video}
          />
        </GradientOverlay>
      )}

      <div className={styles.textContainer}>
        <Typography className={styles.title} variant="h2">
          {imageInfo?.title}
        </Typography>
        <RichText
          className={styles.description}
          text={imageInfo?.description}
        />
        {/* <p>
          Mr. Ahmed Qasim Seddiqi maintained his focus by offering quality Swiss
          watches to an array of clients, including royalty and politicians. He
          furthered the company’s growth through his exclusive franchise
          agreements with the world’s leading Swiss watch companies and he
          safeguarded the business by keeping Ahmed Seddiqi a tight-knit family
          operation.The first franchise agreement was signed with Swiss watch
          brand, West End Watch Co. in 1949, after which the portfolio of brands
          expanded to include over 90% of the world’s luxury Swiss watch brands.
          Today, the passion for luxury watches is deeply embedded into the
          ethos of the Ahmed Seddiqi’ family.
        </p>
        <p>
          Mr. Ahmed Qasim Seddiqi maintained his focus by offering quality Swiss
          watches to an array of clients, including royalty and politicians. He
          furthered the company’s growth through his exclusive franchise
          agreements with the world’s leading Swiss watch companies and he
          safeguarded the business by keeping Ahmed Seddiqi a tight-knit family
          operation.The first franchise agreement was signed with Swiss watch
          brand, West End Watch Co. in 1949, after which the portfolio of brands
          expanded to include over 90% of the world’s luxury Swiss watch brands.
          Today, the passion for luxury watches is deeply embedded into the
          ethos of the Ahmed Seddiqi’ family.
        </p> */}
      </div>
    </div>
  );
};

export default IntroPopUp;

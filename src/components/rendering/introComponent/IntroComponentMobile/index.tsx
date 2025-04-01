import React, { useState } from "react";
import styles from "./IntroComponentMobile.module.scss";
import { Image } from "@components/module";
import IntroPopUp from "../introPopUp";
import { SeddiqiLogoBlack } from "@assets/images/svg";
import IntroComponentCarousel from "../introComponentCarousel";

const IntroComponentMobile = ({content}) => {
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
  const [imageInfo, setImageInfo] = useState(null);

  const handleMouseMove = (e) => {
    const container = document.getElementById("parallex");

    if (!container) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const xDecimal = mouseX / window.innerWidth;
    const yDecimal = mouseY / window.innerHeight;

    const maxX = container.offsetWidth - window.innerWidth;
    const maxY = container.offsetHeight - window.innerHeight;

    const scaleFactor = 1; // Increase the scale for a stronger effect

    // Parallax calculation with scaling
    const panX = maxX * (xDecimal - 0.2) * (scaleFactor + 2);
    const panY = maxY * (yDecimal - 0.2) * scaleFactor;

    container.style.transform = `translate(${panX}px, ${panY}px)`;
  };

  if (imageInfo) {
    return <IntroPopUp imageInfo={imageInfo} setImageInfo={setImageInfo} />;
  }

  if(false) {
    return <IntroComponentCarousel content={content} />
  }

  return (
    <div
      onMouseMove={(e) => handleMouseMove(e)}
      className={styles.introContainer}
      onTouchMove={(e) => handleMouseMove(e)}
    >
      {/* <div className={styles.titleSection}>
        <h1>Ahmed Seddiqi Heritage</h1>
        <p>A pioneer among leading retailers in the region</p>
      </div> */}
      <div className={styles.searchBox}>
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Tell me about the Ahmed Seddiqi legacy" className={styles.input} />
          {/* <button className={styles.iconButton}>
            <span className={styles.icon}></span>
          </button> */}
          <div className={styles.seddiqiLogo}>
            <SeddiqiLogoBlack />
          </div>
        </div>
      </div>
      <div className={styles.toggleBtn}>Carousel View</div>
      <div id="parallex" className={styles.container}>
        <Image
          clickHandler={(e) => setImageInfo("somethin")}
          className={styles.image}
          height={styles.image1}
          image={image}
          imageAltText={"image text"}
        />
        <Image
          clickHandler={(e) => setImageInfo("somethin")}
          className={styles.image}
          height={styles.image2}
          image={image}
          imageAltText={"image text"}
        />
        <Image
          clickHandler={(e) => setImageInfo("somethin")}
          className={styles.image}
          height={styles.image3}
          image={image}
          imageAltText={"image text"}
        />
        <Image
          clickHandler={(e) => setImageInfo("somethin")}
          className={styles.image}
          height={styles.image4}
          image={image}
          imageAltText={"image text"}
        />
        <Image
          clickHandler={(e) => setImageInfo("somethin")}
          className={styles.image}
          height={styles.image5}
          image={image}
          imageAltText={"image text"}
        />
        <Image
          clickHandler={(e) => setImageInfo("somethin")}
          className={styles.image}
          height={styles.image6}
          image={image}
          imageAltText={"image text"}
        />
      </div>
    </div>
  );
};

export default IntroComponentMobile;

import React, { useState } from "react";
import styles from "./introComponentDesktop.module.scss";
import { Image } from "@components/module";
import IntroPopUp from "../introPopUp";
import SearchPopUp from "../searchPopUp";

const IntroComponentDesktop = () => {
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
  const [imageInfo, setImageInfo] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)

  const handleMouseMove = (e) => {
    const container = document.getElementById("parallex");

    if (!container) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const xDecimal = mouseX / window.innerWidth;
    const yDecimal = mouseY / window.innerHeight;

    const maxX = container.offsetWidth - window.innerWidth;
    const maxY = container.offsetHeight - window.innerHeight;

    const scaleFactor = 2; // Increase the scale for a stronger effect

    // Parallax calculation with scaling
    const panX = maxX * (xDecimal - 0.5) * (scaleFactor + 10);
    const panY = maxY * (yDecimal - 0.5) * scaleFactor;

    container.style.transform = `translate(${panX}px, ${panY}px)`;
  };


  if(imageInfo) {
    return <IntroPopUp setImageInfo={setImageInfo} />
  }
  if(searchOpen) {
    return <SearchPopUp setSearchOpen={setSearchOpen} />
  }

  return (
    <div className={styles.introContainer}>
      <div onMouseMove={(e) => handleMouseMove(e)} className={styles.titleSection}>
        <h1>Ahmed Seddiqi Heritage</h1>
        <p>A pioneer among leading retailers in the region</p>
      </div>
      <div onClick={() => setSearchOpen(true)} onMouseMove={(e) => handleMouseMove(e)} className={styles.searchContainer}>
        <input type="text" placeholder="Tell me about the Ahmed Seddiqi legacy" className={styles.input} />
        <button className={styles.iconButton}>
          <span className={styles.icon}></span>
        </button>
        <div className={styles.seddiqiLogo}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2.12955 2.59101C2.12955 1.08824 3.73688 0.480768 5.044 0.480768L5.05026 0.175443L4.59057 0.100702C3.07862 -0.150554 1.85437 0.070488 1.04758 0.739976C0.356488 1.31246 0.0609777 2.02966 0.0609777 2.82318C0.0609777 4.25121 1.28054 6.21197 2.15926 7.78948C2.71275 8.76747 3.31941 9.82816 3.31941 11.0685C3.31941 12.5697 1.86687 13.4905 0.0328336 13.4905L0 13.799C1.89815 14.3015 5.47398 14.0948 5.47398 10.4134C5.47398 9.10619 4.70784 7.73541 3.86821 6.32328C3.00826 4.78712 2.12955 3.54356 2.12955 2.59101Z"
              fill="#271610"
            />
            <path
              d="M13.9672 13.4921C12.1331 13.4921 10.6806 12.5713 10.6806 11.0701C10.6806 9.82975 11.2872 8.76906 11.8407 7.79107C12.7195 6.21356 13.939 4.2528 13.939 2.82477C13.939 2.02966 13.6435 1.31405 12.9524 0.741566C12.1456 0.0720782 10.9214 -0.148964 9.40943 0.102293L8.94974 0.177034L8.956 0.482358C10.2631 0.482358 11.8704 1.08824 11.8704 2.59101C11.8704 3.54356 10.9917 4.78712 10.1318 6.32328C9.29216 7.73541 8.52602 9.10619 8.52602 10.4134C8.52602 14.0948 12.1019 14.2999 14 13.799L13.9672 13.4905V13.4921Z"
              fill="#271610"
            />
          </svg>
        </div>
      </div>
      <div id="parallex" onMouseMove={(e) => handleMouseMove(e)} className={styles.container}>
        <Image clickHandler={(e) => setImageInfo("somethin")} className={styles.image} height={styles.image1} image={image} imageAltText={"image text"} />
        <Image  clickHandler={(e) => setImageInfo("somethin")} className={styles.image} height={styles.image2} image={image} imageAltText={"image text"} />
        <Image  clickHandler={(e) => setImageInfo("somethin")} className={styles.image} height={styles.image3} image={image} imageAltText={"image text"} />
        <Image  clickHandler={(e) => setImageInfo("somethin")} className={styles.image} height={styles.image4} image={image} imageAltText={"image text"} />
        <Image  clickHandler={(e) => setImageInfo("somethin")} className={styles.image} height={styles.image5} image={image} imageAltText={"image text"} />
        <Image  clickHandler={(e) => setImageInfo("somethin")} className={styles.image} height={styles.image6} image={image} imageAltText={"image text"} />
      </div>
    </div>
  );
};

export default IntroComponentDesktop;

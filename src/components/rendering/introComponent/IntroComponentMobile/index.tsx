import React, { useEffect, useRef, useState } from "react";
import styles from "./IntroComponentMobile.module.scss";
import { Image, Video } from "@components/module";
import IntroPopUp from "../introPopUp";
import { SeddiqiLogoBlack } from "@assets/images/svg";
import IntroComponentCarousel from "../introComponentCarousel";
import SearchInputField from "../searchInputField";

const IntroComponentMobile = ({ content }) => {
  const [imageInfo, setImageInfo] = useState(null);
  const [isCarousel, setIsCarousel] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  if (imageInfo) {
    return <IntroPopUp imageInfo={imageInfo} setImageInfo={setImageInfo} />;
  }

  const items = [
    content?.topLeftItem,
    content?.topMiddleItem,
    content?.topRightItem,
    content?.bottomLeftItem,
    content?.bottomMiddleItem,
    content?.bottomRightItem,
  ];

  const parallexRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const threshold = 2; // min movement required
    const deltaX =
      Math.abs(touch.clientX - touchStartRef.current.x) > threshold
        ? (touch.clientX - touchStartRef.current.x) * 0.5
        : 0;
    const deltaY =
      Math.abs(touch.clientY - touchStartRef.current.y) > threshold
        ? (touch.clientY - touchStartRef.current.y) * 0.5
        : 0;

    if (parallexRef.current) {
      parallexRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (parallexRef.current) {
      parallexRef.current.style.transform = `translate(0px, 0px)`;
    }
  };

  useEffect(() => {
    const node = parallexRef.current;
    if (!node) return;

    node.addEventListener("touchstart", handleTouchStart, { passive: true });
    node.addEventListener("touchmove", handleTouchMove, { passive: false });
    // node.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      node.removeEventListener("touchstart", handleTouchStart);
      node.removeEventListener("touchmove", handleTouchMove);
      // node.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  if (isCarousel) {
    return <IntroComponentCarousel setIsCarousel={setIsCarousel} content={content} />;
  } else {
    return (
      <div className={styles.introContainer}>
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
        <div onClick={() => setIsCarousel(true)} className={styles.toggleBtn}>
          Carousel View
        </div>
        <div
          ref={parallexRef}
          id="parallex"
          className={styles.container}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          // onTouchEnd={handleTouchEnd}
        >
          {items.map((item, index) => {
            const commonProps = {
              key: index + 1,
              className: `${styles[`image${index + 1}`]} ${styles.image}`,
              clickHandler: () => setImageInfo(item),
            };

            if (item?.media?.image) {
              return <Image {...commonProps} image={item.media.image} imageAltText={item.title || "image"} />;
            }

            if (item?.media?.video) {
              return <Video {...commonProps} video={item.media.video} />;
            }

            return null;
          })}
        </div>
      </div>
    );
  }
};

export default IntroComponentMobile;

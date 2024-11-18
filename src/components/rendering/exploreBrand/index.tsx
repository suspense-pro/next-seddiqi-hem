import React, { useRef, useEffect } from "react";
import styles from "./exploreBrand.module.scss";
import Typography from "../../module/typography";
import { Image, Button } from "@components/module";
import { ExploreBrandProps } from "@utils/models/exploreBrand";

const ExploreBrand: React.FC<ExploreBrandProps> = ({ cta, exploreBrandItems, primaryTitle, secondaryDescription }) => {
  const logoTrackRef = useRef<HTMLDivElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    let start = 0;
    const speed = 0.5;
    let totalWidth = 0;

    const updateTotalWidth = () => {
      if (logoTrackRef.current) {
        totalWidth = logoTrackRef.current.scrollWidth / 2;
      }
    };

    updateTotalWidth();

    const animate = () => {
      if (logoTrackRef.current && !isHoveredRef.current) {
        start -= speed;
        if (-start >= totalWidth) {
          start = 0;
        }
        logoTrackRef.current.style.transform = `translateX(${start}px)`;
      }
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", updateTotalWidth);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener("resize", updateTotalWidth);
    };
  }, []);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  };

  return (
    <div className={styles.exploreBrandContainer}>
      {primaryTitle && (
        <Typography variant="h2" className={styles.title}>
          {primaryTitle?.toUpperCase()}
        </Typography>
      )}
      {secondaryDescription && (
        <div className={styles.description}>
          <Typography variant="p">{secondaryDescription}</Typography>
        </div>
      )}

      <div className={styles.logoCarousel} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className={styles.logoTrack} ref={logoTrackRef}>
          {exploreBrandItems.concat(exploreBrandItems).map((item, index) => (
            <a href="#" key={index} className={styles.logoItem}>
              <div className={styles.logoContainer}>
                <Image
                  image={item.logoIcon.image.image}
                  imageAltText={item.logoIcon.image.altText || `Brand Logo ${index + 1}`}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
      {cta && cta.label && (
        <div className={styles.viewAllButton}>
          <Button title={cta.label || "View all Brands"} type={cta.type || "solid"} color={cta.color || "green_dark"} />
        </div>
      )}
    </div>
  );
};

export default ExploreBrand;

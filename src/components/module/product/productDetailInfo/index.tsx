import React, { useMemo, useState } from "react";
import styles from "./productDetailInfo.module.scss";
import { ArrowRight, CalendarIcon, CubeIcon, HeartIcon, PlusIcon, ShareIcon } from "@assets/images/svg";
import { Button } from "@components/module";
import Carousel from "@components/module/carousel";
import CarouselBtns from "@components/module/carouselBtns";
import { useDeviceWidth } from "@utils/useCustomHooks";
import Image from "next/image";
import ProductImageFullScreen from "../productImageFullScreen";
import {SizeGuide, SizeSelector} from "@components/module";

const ProductDetailInfo = ({ product, content }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const [showZoom, setShowZoom] = useState(false);
  const isMobile = !useDeviceWidth()[0];
  const handleSizeSelectorClose = () => setSizeSelectorOpen(false);
  const [isSizeSelectorOpen, setSizeSelectorOpen] = useState(false); // Default to true to open SizeSelector initially
  const [isSizeGuideOpen, setSizeGuideOpen] = useState(false);

  const handleSizeSelectorOpen = () => {
    setSizeSelectorOpen(true);
    setSizeGuideOpen(false);
  };

  const handleSizeGuideOpen = () => {
    setSizeSelectorOpen(false); // Close SizeSelector
    setSizeGuideOpen(true);    // Open SizeGuide
  };

  const handleSizeGuideClose = () => {
    setSizeGuideOpen(false);  // Close SizeGuide
    setSizeSelectorOpen(true); // Reopen SizeSelector
  };


  if(!product) return null

  const ImageSlide = ({ item }) => {
    return (
      <div className={styles.imgContainer}>
        <Image fill className={styles.image} alt={item?.alt} src={item?.disBaseLink} />
      </div>
    );
  };
  const VideoSlide = ({ item }) => {
    return (
      <div className={styles.imgContainer}>
        <video
          loop
          muted
          autoPlay
          className={styles.videoPlayer}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src={item?.videoLink1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };

  const slides = product?.imageGroups[0]?.images?.map((item, index) =>
    item?.videoLink1 ? <VideoSlide item={item} key={index} /> : <ImageSlide item={item} key={index} />
  );

  
  // Getting Variants in Size Selector Pop up
  const sizeSelectorVariants = product.variants
    .map(item => item.variationValues?.size)
    .filter(size => size) // Filter out any undefined sizes
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10)); // Sort numerically
  
  //Size Guide Props
  const sizeGuideInfo = content?.page?.components[1].sizeGuide;

  return (
    <div className={styles.container}>
      {showZoom && <ProductImageFullScreen listitems={product?.imageGroups[0]?.images} setShowZoom={setShowZoom} />}
      {isMobile && (
        <div className={styles.backBtn}>
          <ArrowRight /> Back
        </div>
      )}
      <div className={styles.carousel}>
        <Carousel
          setTransition={""}
          setSpeed={500}
          isAnimated={"no"}
          slides={slides}
          setSwiper={setSwiper}
          setActiveIndex={setActiveIndex}
        />

        {!isMobile && <div className={styles.exclusive}>Exclusive</div>}
        <div onClick={() => setShowZoom(true)} className={styles.plus}>
          <PlusIcon />
        </div>
        <div className={styles.threesixty}>
          <CubeIcon />
          <span className={styles.degree}>360°</span>
        </div>

        <div className={styles.carouselBtns}>
          <CarouselBtns slides={slides} activeIndex={activeIndex} swiper={swiper} />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.productDetails}>
          <div className={styles.productHead}>
            <div className={styles.brand}>
              {isMobile && <div className={styles.exclusive}>Exclusive</div>}
              <span>{product?.brand}</span>
            </div>
            <div className={styles.title}>{product?.name}</div>
            <div className={styles.price}>
              {product?.currency} {product?.price}
            </div>
          </div>
          <div className={styles.size}>
            <div className={styles.label} onClick={handleSizeSelectorOpen}>Select Size</div>
            <ArrowRight />
          </div>
          <Button
            isLink={true}
            link={"/"}
            className={styles.boutiqueBtn}
            title={"Find in BOUTIQUE"}
            color="metallic"
            type={"solid"}
          />
          <div className={styles.appointment}>
            <div className={styles.appointmentLeft}>
              <CalendarIcon fill="#" />
              <Button
                isLink={true}
                link={"/"}
                className={styles.appointmentBtn}
                title={"Book An Appointment"}
                color="green_dark"
                type={"Plain"}
              />
            </div>
            <ShareIcon />
          </div>
          <div className={styles.productText}>
            <div className={styles.productLabel}>Product Description</div>
            <div className={styles.productDesc}>
              {product?.shortDescription}
              <Button
                isLink={true}
                link={"/"}
                className={styles.readMore}
                title={"Read More"}
                color="green_dark"
                type={"Plain"}
              />
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.tab}>Editors View</div>
            <div className={styles.vline}>&nbsp;</div>
            <div className={styles.tab}>Warranty & Care</div>
            <div className={styles.vline}>&nbsp;</div>
            <div className={styles.tab}>Shipping</div>
          </div>
        </div>
        <div className={styles.save}>
          <HeartIcon fill="#" />
        </div>
      </div>
      {/* Size Guide  */}
      {isSizeGuideOpen && (
        <div className={styles.sizeGuide}>
            <SizeGuide
              isOpen={isSizeGuideOpen} 
              onClose={handleSizeGuideClose}
              primaryTitle={sizeGuideInfo.primaryTitle}
              primaryDescription= {sizeGuideInfo.primaryDescription}
              secondaryTitle={sizeGuideInfo.secondaryTitle}
              secondaryDescription= {sizeGuideInfo.secondaryDescription} 
              items={sizeGuideInfo.listItems}        
            />  
        </div>)}
      {/* Size Selector */}
      {isSizeSelectorOpen && (
        <div className={styles.sizeSelector}>
            <SizeSelector
              isOpen={isSizeSelectorOpen} 
              onClose={handleSizeSelectorClose}
              title={"SIZE"}
              description= {`"Frivole ring, 8 flowers, 18K rose gold, rhodium-plated 18K white gold, round diamonds; diamond quality DEF, IF to VVS."`}
              sizes={sizeSelectorVariants}
              onSizeGuideClick={handleSizeGuideOpen}              
            />  
        </div>)}
    </div>
  );
};

export default ProductDetailInfo;

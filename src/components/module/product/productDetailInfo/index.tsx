import React, { useMemo, useState, useContext, useEffect } from "react";
import styles from "./productDetailInfo.module.scss";
import {
  ArrowRight,
  CalendarIcon,
  CubeIcon,
  HeartIcon,
  PlusIcon,
  ShareIcon,
} from "@assets/images/svg";
import { Button } from "@components/module";
import Carousel from "@components/module/carousel";
import CarouselBtns from "@components/module/carouselBtns";
import { useDeviceWidth } from "@utils/useCustomHooks";
import Image from "next/image";
import ProductImageFullScreen from "../productImageFullScreen";
import { SizeGuide, SizeSelector } from "@components/module";
import { SizeGuideProvider } from "@contexts/sizeGuideSelectorContext";

const ProductDetailInfo = ({
  product,
  content,
  sizeGuideData
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const [showZoom, setShowZoom] = useState(false);
  const isMobile = !useDeviceWidth()[0];
  const handleSizeSelectorClose = () => setSizeSelectorOpen(false);
  const [isSizeSelectorOpen, setSizeSelectorOpen] = useState(false);
  const [isSizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleSizeSelectorOpen = () => {
    setSelectedProductId(product.id);
    setSizeSelectorOpen(true);
    setSizeGuideOpen(false);
  };

  const handleSizeGuideOpen = () => {
    setSizeSelectorOpen(false);
    setSizeGuideOpen(true);
  };

  const handleSizeGuideClose = () => {
    setSelectedProductId(null);
    setSizeGuideOpen(false);
    setSizeSelectorOpen(false);
  };

  if (!product) return null;
  
  const ImageSlide = ({ item }) => {
    return (
      <div onClick={() => setShowZoom(true)} className={styles.imgContainer}>
        <Image
          fill
          className={styles.image}
          alt={item?.alt}
          src={item?.link}
        />
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
    item?.videoLink1 ? (
      <VideoSlide item={item} key={index} />
    ) : (
      <ImageSlide item={item} key={index} />
    )
  );

  return (
    <div className={styles.container}>
      {showZoom && (
        <ProductImageFullScreen
          listitems={product?.imageGroups[0]?.images}
          setShowZoom={setShowZoom}
        activeImage={activeIndex} />
      )}
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
          <CarouselBtns
            slides={slides}
            activeIndex={activeIndex}
            swiper={swiper}
          />
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
            <div className={styles.label} onClick={handleSizeSelectorOpen}>
              Select Size
            </div>
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
      {/* Size Selector  */}

      {isSizeSelectorOpen && (
        <SizeGuideProvider
        sizeGuideData={sizeGuideData}
        >
          <SizeSelector
            isOpen={isSizeSelectorOpen}
            onClose={handleSizeGuideClose}
            productId={product.id}
            title={"SIZE"}
            description={""}
          />
        </SizeGuideProvider>
      )}
    </div>
  );
};

export default ProductDetailInfo;

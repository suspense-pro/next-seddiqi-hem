import React, { useMemo, useState, useEffect} from "react";
import { useRouter } from 'next/router';
import styles from "./productDetailInfo.module.scss";
import { ArrowRight, CalendarIcon, CubeIcon, HeartIcon, PlusIcon, ShareIcon } from "@assets/images/svg";
import { Button, SideDrawer } from "@components/module";
import Carousel from "@components/module/carousel";
import CarouselBtns from "@components/module/carouselBtns";
import { useDeviceWidth } from "@utils/useCustomHooks";
import Image from "next/image";
import ProductImageFullScreen from "../productImageFullScreen";
import { SizeGuide, SizeSelector, StoreLocationDetails, ColorSelector  } from "@components/module";
import StoreLocator from "@components/module/storeLocator";
import { SizeGuideProvider } from "@contexts/sizeGuideSelectorContext";
import ProductDescriptionFlyoutCard from "../productDescriptionFlyoutCard";
import ProductCareAndWarrantyFlyoutCard from "../productCareAndWarrantyFlyoutCard";
import ProductShippingDetailsFlyoutCard from "../productShippingDetailsFlyoutCard";

const ProductDetailInfo = ({
  product,
  content,
  sizeGuideData,
  shippingData,
  warrantyData,
  editorsView,
  sizeGuideDataMenWatches,
  sizeGuideDataWomenWatches,
}) => {
  const router = useRouter();  
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const [showZoom, setShowZoom] = useState(false);
  const [storeLocatorPopup, showStoreLocatorPopup] = useState(false);
  const isMobile = !useDeviceWidth()[0];
  const [isSizeSelectorOpen, setSizeSelectorOpen] = useState(false);
  const [isColorSelectorOpen, setColorSelectorOpen] = useState(false);
  const [isCardOpen, setCardOpen] = useState(null);
  const productInfo = content?.page?.components[1];
  const [isSizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isBoutiqueLocationDetailsOpen, setBoutiqueLocationDetailsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  if (!product) return null;

  const handleSizeSelectorOpen = () => {
    setSizeSelectorOpen(true);
    setCardOpen(null);
  };

  const handleColorSelectorOpen = () => {
    setColorSelectorOpen(true);

  };

  const handleColorSelectorClose = () => {
    setColorSelectorOpen(false);

  };

  const handleCardToggle = (card) => {
    setCardOpen((prev) => (prev === card ? null : card));
  };

  const handleSizeGuideClose = () => {
    setSelectedProductId(null);
    setSizeGuideOpen(false);
    setSizeSelectorOpen(false);
  };

  const handleBoutiqueLocationDetailsOpen = () => {
    setBoutiqueLocationDetailsOpen(true); // Close Boutique Location Details Popup
  };

  const handleBoutiqueLocationDetailsClose = () => {
    setBoutiqueLocationDetailsOpen(false); // Close Boutique Location Details Popup
  };

  useEffect(() => {
    if (product) {
      const productDetails = {
        name: product.name,
        brand: product.brand,
      };
      localStorage.setItem("selectedProductDetails", JSON.stringify(productDetails));
    }
    return () => {
      localStorage.removeItem("selectedProductDetails");
    };
  }, [product]);
    

  const handleBookAppointment = () => {
    if (!selectedSize || !selectedColor) {
      setErrorMessage("Please select both size and color before booking an appointment.");
      return;
    }
    
    setErrorMessage(""); 
    router.push({
      pathname: "/book-an-appointment",
    });
  };

  const getColorVariations = (product) => {
    const colorAttribute = product.variationAttributes.find(attr => attr.id === "color");
    if (!colorAttribute) return [];
  
    return colorAttribute.values.map(value => value.name);
  };
  
  const colorVariations = getColorVariations(product);


  const ImageSlide = ({ item }) => {
    return (
      <div onClick={() => setShowZoom(true)} className={styles.imgContainer}>
        <Image fill className={styles.image} alt={item?.alt} src={item?.link} />
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

  const openStoreLocator = () => {
    showStoreLocatorPopup(true);
  };
  return (
    <>
      <div className={styles.container}>
        {showZoom && (
          <ProductImageFullScreen
            listitems={product?.imageGroups[0]?.images}
            setShowZoom={setShowZoom}
            activeImage={activeIndex}
          />
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
            <div className={styles.Variant}>
            <div className={styles.size}>
              <div className={styles.label} onClick={handleSizeSelectorOpen}>
                Select Size
              </div>
              <ArrowRight />
            </div>
            <div className={styles.color}>
              <div className={styles.label} onClick={handleColorSelectorOpen}>
                Select Color
              </div>
              <ArrowRight />
            </div>
            </div>
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
            <Button
              isLink={false}
              link={""}
              className={styles.boutiqueBtn}
              title={"Find in BOUTIQUE"}
              color="metallic"
              type={"solid"}
              clickHandler={openStoreLocator}
            />
            {(product.c_storeId && (product.c_storeId.trim() !== "")) && ( 
            <div className={styles.appointment}>
              <div className={styles.appointmentLeft}>
                <CalendarIcon fill="#" />
                <Button
                  isLink={false}
                  link={"/"}
                  className={styles.appointmentBtn}
                  title={"Book An Appointment"}
                  color="green_dark"
                  type={"Plain"}
                  clickHandler={handleBookAppointment}
                />
              </div>
              <ShareIcon />
            </div>)}
            <div className={styles.productText}>
              <div className={styles.productLabel}>Product Description</div>
              <div className={styles.productDesc}>
                {product?.shortDescription}
                <Button
                  link={"/"}
                  className={styles.readMore}
                  title={"Read More"}
                  color="green_dark"
                  type={"Plain"}
                  clickHandler={() => handleCardToggle("description")}
                />
              </div>
            </div>
            {(editorsView || product?.longDescription) && isCardOpen === "description" && (
              <ProductDescriptionFlyoutCard
                isDescriptionCardOpen={isCardOpen === "description"}
                setDescriptionCardOpen={() => handleCardToggle("description")}
                editorsView={editorsView}
                product={product}
              />
            )}

            {warrantyData && isCardOpen === "careAndWarranty" && (
              <ProductCareAndWarrantyFlyoutCard
                isCareAndWarrantyCardOpen={isCardOpen === "careAndWarranty"}
                setCareAndWarrantyCardOpen={() => handleCardToggle("careAndWarranty")}
                warrantyAndCare={warrantyData}
              />
            )}
            {shippingData && isCardOpen === "shipping" && (
              <ProductShippingDetailsFlyoutCard
                isShippingCardOpen={isCardOpen === "shipping"}
                setShippingCardOpen={() => handleCardToggle("shipping")}
                shippingDetails={shippingData}
              />
            )}
            <div className={styles.bottom}>
              {editorsView && (
                <>
                  <div onClick={() => handleCardToggle("description")} className={styles.tab}>
                    Editors View
                  </div>
                  <div className={styles.vline}>&nbsp;</div>
                </>
              )}

              <div onClick={() => handleCardToggle("careAndWarranty")} className={styles.tab}>
                Warranty & Care
              </div>
              <div className={styles.vline}>&nbsp;</div>
              <div onClick={() => handleCardToggle("shipping")} className={styles.tab}>
                Shipping
              </div>
            </div>
          </div>
          <div className={styles.save}>
            <HeartIcon fill="#" />
          </div>
        </div>
        {/* Size Selector  */}

        <SizeGuideProvider sizeGuideData={sizeGuideData}>
          <SizeSelector
            isOpen={isSizeSelectorOpen}
            onClose={handleSizeGuideClose}
            productId={product.id}
            title={"SIZE"}
            description={""}
          />
        </SizeGuideProvider>

         {/* Color Selector  */}
        <ColorSelector
            isOpen={isColorSelectorOpen}
            onClose={handleColorSelectorClose}
            title={"COLOR"}
            description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque bibendum, velit sit amet consequat volutpat, nisl mauris mollis elit, nec gravida erat enim at tellus."}
            colorVariations={colorVariations} 
          />
      </div>

      <SideDrawer
        isOpen={storeLocatorPopup}
        onClose={() => showStoreLocatorPopup(false)}
        showFooter={false}
        onSubmit={null}
        onClearAll={null}
        showBackButton={false}
        title="Find product in Boutique"
        position={"right"}
      >
        <StoreLocator
          productImgAlt={product?.imageGroups[0]?.images[0].alt}
          productImgSrc={product?.imageGroups[0]?.images[0].disBaseLink}
          productBrand={product?.brand}
          productName={product?.name}
          productPrice={product?.price}
          productCurrency={product?.currency}
        />
      </SideDrawer>
    </>
  );
};

export default ProductDetailInfo;

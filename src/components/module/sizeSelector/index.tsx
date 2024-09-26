import React, { useEffect, useState, useContext } from "react";
import styles from "./sizeSelector.module.scss";
import Typography from "../typography";
import SideDrawer from "../sideDrawer";
import { Button } from "@components/module";
import { getProducts } from "@utils/sfcc-connector/dataService";
import SizeGuide from "@components/module/sizeGuide";
import {SizeSelectorProps} from "@utils/models/sizeSelector"
import { SizeGuideProviderContext } from "@contexts/sizeGuideSelectorContext";


const SizeSelector: React.FC<SizeSelectorProps> = ({
  title,
  description,
  onClose,
  isOpen,
  productId,
}) => {
  const { sizeGuideDataMenWatches, sizeGuideDataWomenWatches } = useContext(
    SizeGuideProviderContext
  );

  const [gender, setGender] = useState<"Gents" | "Ladies" | "Unisex" | null>(
    null
  );
  const [longDescription, setLongDescription] = useState<string>("");
  const [sizeSelectorVariants, setSizeSelectorVariants] = useState<string[]>(
    []
  );
  const [productCategory, setProductCategory] = useState<string | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeGuideInfo, setSizeGuideInfo] = useState({
    primaryTitle: "",
    primaryDescription: "",
    secondaryTitle: "",
    secondaryDescription: "",
    items: [],
    category: "Watches",
    gender: "Gents",
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (productId) {
        try {
          const data = await getProducts({ pids: productId, method: "GET" });
          const product = data?.data?.find((p: any) => p.id === productId);

          if (product) {
            const productGender = product?.c_gender;
            const category = product?.c_categoryName;

            setGender(productGender);
            setProductCategory(category);
            setLongDescription(product?.longDescription || "");

            const sizes = product.variants
              .map((item) => item.variationValues?.size)
              .filter((size) => size)
              .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

            setSizeSelectorVariants(sizes);
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      }
    };

    fetchProductDetails();
  }, [productId]);

  const openSizeGuide = (gender: "Gents" | "Ladies") => {
    let sizeGuideData;

    // Assign sizeGuideData based on gender using context data
    if (gender === "Gents") {
      sizeGuideData = sizeGuideDataMenWatches;
    } else {
      sizeGuideData = sizeGuideDataWomenWatches;
    }

    if (!sizeGuideData) {
      console.error("Size guide data is undefined for gender:", gender);
      return;
    }

    const { content } = sizeGuideData;
    if (!content) {
      console.error("Content is undefined in size guide data:", sizeGuideData);
      return;
    }

    const { page } = content;

    // Extract data from size guide page
    const {
      primaryTitle,
      primaryDescription,
      secondaryTitle,
      secondaryDescription,
      productSizes: items,
    } = page;

    // Set the SizeGuide data and open it
    setSizeGuideInfo({
      primaryTitle,
      primaryDescription,
      secondaryTitle,
      secondaryDescription,
      items,
      category: productCategory,
      gender,
    });
    setIsSizeGuideOpen(true);
  };

  const renderSizeGuideLinks = () => {
    if (productCategory === "Watches" || productCategory === "Jewellery") {
      return (
        <>
          {gender === "Gents" && (
            <Button
              className={styles.sizeGuideBtn}
              title={"Size Guide"}
              color="green_dark"
              type={"Plain"}
              clickHandler={() => openSizeGuide("Gents")}
            />
          )}
          {gender === "Ladies" && (
            <Button
              className={styles.sizeGuideBtn}
              title={"Size Guide"}
              color="green_dark"
              type={"Plain"}
              clickHandler={() => openSizeGuide("Ladies")}
            />
          )}
        </>
      );
    }
    return null;
  };

  return (
    <div className={styles.sizeSelectorWrapper}>
      <SideDrawer
        isOpen={isOpen}
        onClose={onClose}
        showFooter={false}
        showBackButton={false}
        title={title || "Size Selector"}
        onSubmit={null}
        onClearAll={null}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <Typography variant="p" className={styles.longDescription}>
              {longDescription}
            </Typography>
          </div>
          <div className={styles.sizeTabWrapper}>
            {sizeSelectorVariants.length > 0 &&
              sizeSelectorVariants.map((size, index) => (
                <span key={index} className={styles.sizeTab}>
                  {size}
                </span>
              ))}
          </div>
          <div className={styles.sizeInfoWrapper}>
            <span className={styles.findMySizeBtnWrapper}>
              <Button
                isLink={true}
                link={"/"}
                className={styles.findMySizeBtn}
                title={"Find My Size"}
                color="green_dark"
                type={"Plain"}
              />
            </span>
            <span className={styles.sizeGuideBtnWrapper}>
              {renderSizeGuideLinks()}
            </span>
          </div>
          <hr className={styles.sizeSelectorDivider} />
        </div>
      </SideDrawer>

      {/* SizeGuide component */}
      <SizeGuide
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        primaryTitle={sizeGuideInfo.primaryTitle}
        primaryDescription={sizeGuideInfo.primaryDescription}
        secondaryTitle={sizeGuideInfo.secondaryTitle}
        secondaryDescription={sizeGuideInfo.secondaryDescription}
        items={sizeGuideInfo.items}
      />
    </div>
  );
};

export default SizeSelector;

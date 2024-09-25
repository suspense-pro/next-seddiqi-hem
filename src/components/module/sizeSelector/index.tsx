import React, { useState } from "react";
import styles from "./sizeSelector.module.scss";
import Typography from "../typography";
import RichText from "../richText";
import SideDrawer from "../sideDrawer";
import { Button } from "@components/module";

interface SizeSelectorProps {
  title: string;
  description: string;
  sizes: [];
  onClose: () => void;
  isOpen:boolean;
  onSizeGuideClick: () => void; 
}

interface sizeItems {
  size: string;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  title,
  description,
  sizes,
  onClose,
  isOpen,
  onSizeGuideClick,
}) => {


  return (
    <div className={styles.sizeSelectorWrapper}>
      <SideDrawer
        isOpen={isOpen}
        onClose={onClose}
        showFooter={false}
        onSubmit={null}
        onClearAll={null}
        showBackButton={false}
        title={title}
        position={""}
        >
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <Typography variant="p" className={styles.description}>
              {description}
            </Typography>
          </div>
          <div className={styles.sizeTabWrapper}>
            {sizes.length > 0 && (
              sizes.map((size, index) => (
                <span key={index} className={styles.sizeTab}>
                  {size}
                </span>
              ))
            )}
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
              <Button
                isLink={false}
                className={styles.sizeGuideBtn}
                title={"Size Guide"}
                color="green_dark"
                type={"Plain"}
                clickHandler={onSizeGuideClick}
              />
            </span>
            </div>
          <hr className={styles.sizeSelectorDivider} />
        </div>
      </SideDrawer>
    </div>
  );
};

export default SizeSelector;

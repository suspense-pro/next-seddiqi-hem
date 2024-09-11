import React, { useState } from "react";
import styles from "./sizeSelector.module.scss";
import Typography from "../typography";
import RichText from "../richText";
import SideDrawer from "../sideDrawer";

interface SizeSelectorProps {
  title: string;
  description: string;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({...SizeSelectorProps}) => {


  return (
    <SideDrawer
      isOpen={true}
      onClose={() => console.log("Closed")}
      showFooter={false}
      showBackButton={false}
      title = {SizeSelectorProps.title}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <Typography variant="p" className={styles.description}>
            {SizeSelectorProps.description}
          </Typography>
        </div>
      </div>
    </SideDrawer>
  );
};

export default SizeSelector;

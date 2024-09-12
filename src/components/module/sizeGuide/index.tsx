import React, { useState } from "react";
import styles from "./sizeGuide.module.scss";
import Typography from "../typography";
import RichText from "../richText";
import SideDrawer from "../sideDrawer";

interface SizeGuideProps {
  primaryTitle: string;
  primaryDescription: string;
  secondaryTitle: string;
  secondaryDescription: string;
  items: ListItems[];
  onClose: () => void;
  isOpen:boolean;
}

interface ListItems {
  size: string;
  measurement: string;
}
const SizeGuide: React.FC<SizeGuideProps> = ({primaryTitle,
  primaryDescription,
  secondaryTitle,
  secondaryDescription,
  items,
  isOpen,
  onClose
}) => {


  return (
    <SideDrawer
      isOpen={isOpen}
      showFooter={false}
      showBackButton={true}
      onClose={onClose}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <Typography variant="p" className={styles.title}>
            {primaryTitle}
          </Typography>
          <Typography variant="p" className={styles.description}>
            {primaryDescription}
          </Typography>
        </div>

        <div className={styles.tableWrapper}>
          <Typography variant="p" className={styles.sizeGuidetableTitle}>
            {secondaryTitle}
          </Typography>
          <Typography variant="p" className={styles.sizeGuidetableDesc}>
            {secondaryDescription}
          </Typography>
        </div>
        <table className={styles.tableContent}>
      <thead>
        <tr>
          <th>Size</th>
          <th>Measurement</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{item.size}</td>
            <td>{item.measurement}</td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
    </SideDrawer>
  );
};

export default SizeGuide;

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
}

interface ListItems {
  size: string;
  measurement: string;
}
const SizeGuide: React.FC<SizeGuideProps> = ({...SizeGuideProps}) => {

const sizeMeasurement = SizeGuideProps.items;

  return (
    <SideDrawer
      isOpen={true}
      onClose={() => console.log("Closed")}
      showFooter={false}
      showBackButton={true}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <Typography variant="p" className={styles.title}>
            {SizeGuideProps.primaryTitle}
          </Typography>
          <Typography variant="p" className={styles.description}>
            {SizeGuideProps.primaryDescription}
          </Typography>
        </div>

        <div className={styles.tableWrapper}>
          <Typography variant="p" className={styles.sizeGuidetableTitle}>
            {SizeGuideProps.secondaryTitle}
          </Typography>
          <Typography variant="p" className={styles.sizeGuidetableDesc}>
            {SizeGuideProps.secondaryDescription}
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
        {sizeMeasurement.map((item, index) => (
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

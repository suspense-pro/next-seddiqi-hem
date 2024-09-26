import React from "react";
import styles from "./sizeGuide.module.scss";
import Typography from "../typography";
import SideDrawer from "../sideDrawer";

interface SizeGuideProps {
  primaryTitle: string;
  primaryDescription: string;
  secondaryTitle: string;
  secondaryDescription: string;
  items: ProductSize[];
  onClose: () => void;
  isOpen: boolean;
}

interface ProductSize {
  label: string;
  listItems: string[];
}

const SizeGuide: React.FC<SizeGuideProps> = ({
  primaryTitle,
  primaryDescription,
  secondaryTitle,
  secondaryDescription,
  items,
  isOpen,
  onClose,
}) => {
  return (
    <SideDrawer
      isOpen={isOpen}
      showFooter={false}
      showBackButton={true}
      onClose={onClose}
      onSubmit={null}
      onClearAll={null}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <Typography variant="h4" className={styles.title}>
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
              <th>{items[0]?.label}</th>
              <th>{items[1]?.label}</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 &&
            items[0].listItems.length > 0 &&
            items[1]?.listItems.length > 0 ? (
              items[0].listItems.map((_, index) => (
                <tr key={index}>
                  <td>{items[0].listItems[index]}</td>{" "}
                  <td>{items[1].listItems[index]}</td>{" "}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>No size information available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </SideDrawer>
  );
};

export default SizeGuide;

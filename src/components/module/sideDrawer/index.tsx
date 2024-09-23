import React, { ReactNode } from "react";
import styles from "./sideDrawer.module.scss";
import { CloseIconV2 } from "@assets/images/svg";
import Button from "../button";
import Typography from "../typography";
import { ArrowRight } from "@assets/images/svg";

interface SideDrawerProps {
  children: ReactNode;
  isOpen: boolean;
  showFooter: boolean;
  showBackButton: boolean;
  onClose: () => void;
  title?: string; 
  position: string;
}

const SideDrawer: React.FC<SideDrawerProps> = ({
  children,
  isOpen,
  onClose,
  showFooter = true,
  showBackButton = false,
  title = "SORT & FILTER", // Default title
  position
}) => {
  return (
    <div className={`${isOpen ? `${styles.drawer} ${styles.open}` : styles.drawer} ${position === "right" ? styles.right : ""}`}>
      <div className={styles.header}>
      {showBackButton? (
          <span onClick={onClose} className={styles.backButton}>
            <Typography align="left" variant="span" className={styles.backButtonText}>
            <span className={styles.arrowLeftWrapper}><ArrowRight fill="black" className={styles.arrowLeft} /></span>
              Back
            </Typography>
          </span>
        ) : 
        (<Typography align="left" variant="h5" className={styles.sortFilterText}>
         {title} 
        </Typography>)}
        <span onClick={onClose} className={styles.closeButton}>
          <CloseIconV2 />
        </span>
      </div>
      <div className={styles.content}>{children}</div>
      {showFooter && 
      <div className={styles.footer}>
        <Button title="Clear all" type="transparent" />
        <Button title="Done" type="solid green_dark" />
      </div>
      }
    </div>
  );
};

export default SideDrawer;

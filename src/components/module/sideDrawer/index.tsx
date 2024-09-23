import React, { ReactNode } from "react";
import styles from "./sideDrawer.module.scss";
import { CloseIconV2 } from "@assets/images/svg";
import Button from "../button";
import Typography from "../typography";

interface SideDrawerProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onClearAll: () => void;
}

const SideDrawer: React.FC<SideDrawerProps> = ({
  children,
  isOpen,
  onClose,
  onSubmit,
  onClearAll,
}) => {
  return (
    <div className={isOpen ? `${styles.drawer} ${styles.open}` : styles.drawer}>
      <div className={styles.header}>
        <Typography align="left" variant="h5" className={styles.sortFilterText}>
          SORT & FILTER
        </Typography>
        <span onClick={onClose} className={styles.closeButton}>
          <CloseIconV2 />
        </span>
      </div>
      <div className={styles.content}>{children}</div>
      <div className={styles.footer}>
        <Button title="Clear all" type="transparent" clickHandler={onClearAll} />
        <Button title="Done" type="solid green_dark" clickHandler={onSubmit} />
      </div>
    </div>
  );
};

export default SideDrawer;

 
import React, { useState, ReactNode } from 'react';
import styles from './sideDrawer.module.scss';
import { CloseIconV2 } from '@assets/images/svg';

interface SideDrawerProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ children, isOpen, onClose }) => {
  return (
    <div className={isOpen ? `${styles.drawer} ${styles.open}` : styles.drawer}>
      <span onClick={onClose} className={styles.closeButton}><CloseIconV2 /></span>
      {children}
    </div>
  );
};

export default SideDrawer;

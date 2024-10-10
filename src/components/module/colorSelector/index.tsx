import React from "react";
import styles from "./colorSelector.module.scss";
import Typography from "../typography";
import SideDrawer from "../sideDrawer";
import { ColorSelectorProps } from "@utils/models/colorSelector";

const ColorSelector: React.FC<ColorSelectorProps> = ({
  title,
  description,
  onClose,
  isOpen,
  colorVariations,
}) => {
  return (
    <div className={styles.colorSelectorWrapper}>
      <SideDrawer
        isOpen={isOpen}
        onClose={onClose}
        showFooter={false}
        showBackButton={false}
        position={"right"}
        title={title || "COLOR"}
        onSubmit={null}
        onClearAll={null}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <Typography variant="p" className={styles.description}>
              {description}
            </Typography>
          </div>

          <div className={styles.colorTabWrapper}>
            {colorVariations.map((color, index) => (
              <div key={index} className={styles.outerCircle}>
                <div
                  className={styles.innerCircle}
                  style={{ backgroundColor: color }}
                />
              </div>
            ))}
          </div>

          <hr className={styles.sizeSelectorDivider} />
        </div>
      </SideDrawer>
    </div>
  );
};

export default ColorSelector;

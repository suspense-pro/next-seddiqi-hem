import React from "react";

const GridWrapper = ({ cols, children }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(348px, 1fr))`,
      }}
    >
      {children && children}
    </div>
  );
};

export default GridWrapper;

import React from "react";

const ArrowRightThick = ({ fill, className }: { fill?: string; className?: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clip-path="url(#clip0_210_5165)">
        <path d="M12.5 8L11.2 9.4L5.1 15.5L3.6 14L9.7 7.9L3.5 1.9L5 0.5L11.1 6.6L12.5 8Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_210_5165">
          <rect width="15" height="15" fill="white" transform="translate(0.5 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowRightThick;

import ArrowRight from "@assets/images/svg/ArrowRight";
import classNames from "classnames";
import Link from "next/link";
import React from "react";
import styles from "./navigationLink.module.scss";

interface NavigationLinkProps {
  url?: string;
  title: string;
  className?: string;
  arrow?: boolean;
  hover?: boolean;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  url,
  title,
  className,
  arrow,
  hover = true,
}) => {
  if (url) {
    return (
      <Link
        className={`${hover && styles.navigationLink} ${className}`}
        href={url || "/"}
      >
        <span>{title}</span>
        {arrow && <ArrowRight />}
      </Link>
    );
  } else {
    return (
      <div className={`${hover && styles.navigationLink} ${className}`}>
        <span>{title}</span>
      </div>
    );
  }
};

export default NavigationLink;

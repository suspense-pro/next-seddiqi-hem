import classNames from "classnames";
import Link from "next/link";
import React from "react";

interface NavigationLinkProps {
  url?: string;
  title: string;
  className?: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  url,
  title,
  className,
}) => {
  if (url) {
    return (
      <Link className={className} href={url || "/"}>
        <span>{title}</span>
      </Link>
    );
  } else {
    return (
      <div className={className}>
        <span>{title}</span>{" "}
      </div>
    );
  }
};

export default NavigationLink;

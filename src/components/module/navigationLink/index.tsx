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
      <Link
        onMouseEnter={() => console.log("hello")}
        className={className}
        href={url || "/"}
      >
        <span>{title}</span>
      </Link>
    );
  } else {
    return (
      <div onMouseEnter={() => console.log("hello")} className={className}>
        <span>{title}</span>{" "}
      </div>
    );
  }
};

export default NavigationLink;

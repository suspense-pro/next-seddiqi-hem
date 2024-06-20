import React from "react";
import Link from "next/link";

interface NavigationLinkProps {
  url?: string;
  label: string;
}
 

const NavigationLink: React.FC<NavigationLinkProps> = ({ url, label }) => {
 
  if (url) {
    return (
      <Link href={url} passHref>
        {label}
      </Link>
    );
  } else {
    return (
      <div>
        <span>{label}</span>
      </div>
    );
  }
};

export default NavigationLink;

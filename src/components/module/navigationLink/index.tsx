import React from "react";
import Link from "next/link";

interface NavigationLinkProps {
  url?: string;
  text: string;
}
 

const NavigationLink: React.FC<NavigationLinkProps> = ({ url, text }) => {
 
  if (url) {
    return (
      <Link href={url} passHref>
        {text}
      </Link>
    );
  } else {
    return (
      <div>
        <span>{text}</span>
      </div>
    );
  }
};

export default NavigationLink;

import React from "react";
import styles from "./headerFooter.module.scss";
import NavigationLink from "@components/module/navigationLink";

const footerLinks = [
  { id: 1, label: "Contact" },
  { id: 2, label: "store locator" },
  { id: 3, label: "About Us" },
];

const HeaderFooter = ({ className }: { className?: any }) => {
  return (
    <div className={`${className} ${styles.container}`}>
      {footerLinks.map((data) => (
        <NavigationLink title={data.label} key={data.id} />
      ))}
    </div>
  );
};

export default HeaderFooter;

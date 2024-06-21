import React from "react";
import Image from "next/image";
import styles from "./footer.module.scss";
import NavigationLink from "@components/module/navigationLink";
import { TwitterIcon, InstaIcon, FBIcon } from "@assets/images/svg";
import { FooterPropType } from "@utils/models";

const commonLinks = [
  { label: "Watches", url: "" },
  { label: "Jewellery", url: "" },
  { label: "Accessories", url: "/accessories" },
  { label: "Brands", url: "/brands" },
  { label: "Explore", url: "" },
  { label: "Services", url: "/services" },
  { label: "Contact Us", url: "/contact" },
  { label: "Store Locator", url: "/stores" },
];

const distinctLinks = [
  { label: "Boutique Locators", url: "/boutique-locators" },
  { label: "FAQs", url: "/faqs" },
  { label: "Warranty", url: "/warranty" },
  { label: "Return Policy", url: "/return-policy" },
  { label: "Terms & Conditions", url: "/terms-conditions" },
];

export default function Footer({
  logoUrl = "/images/Seddiqi-Logo-Text-Only.svg",
  logoAltText = "Seddiqi Logo",
  copyRightText = "© 2024 - Seddiqi Holding. All rights reserved",
}: FooterPropType) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column} style={{ gridArea: "logo" }}>
          <Image src={logoUrl} alt={logoAltText} width={150} height={50} />
        </div>
        {[0, 4].map((offset) => (
          <div
            key={offset}
            className={styles.column}
            style={{ gridArea: `links${offset / 4 + 1}` }}
          >
            {commonLinks.slice(offset, offset + 4).map((link) => (
              <NavigationLink
                key={link.label}
                title={link.label}
                url={link.url}
              />
            ))}
          </div>
        ))}
        <div className={styles.column} style={{ gridArea: "links3" }}>
          {distinctLinks.map((link) => (
            <NavigationLink
              key={link.label}
              title={link.label}
              url={link.url}
            />
          ))}
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.footer_bottom}>
        <div className={styles.copy_right}>{copyRightText}</div>
        <div className={styles.social_icons}>
          <TwitterIcon />
          <InstaIcon />
          <FBIcon />
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import Image from "next/image";
import styles from "./footer.module.scss";
import NavigationLink from "@components/module/navigationLink";
import { TwitterIcon, InstaIcon, FBIcon } from "@assets/images/svg";
import { FooterPropType } from "@utils/models";

const commonLinks = [
  { text: "Watches", url: "" },
  { text: "Jewellery", url: "" },
  { text: "Accessories", url: "/accessories" },
  { text: "Brands", url: "/brands" },
  { text: "Explore", url: "" },
  { text: "Services", url: "/services" },
  { text: "Contact Us", url: "/contact" },
  { text: "Store Locator", url: "/stores" },
];

const distinctLinks = [
  { text: "Boutique Locators", url: "/boutique-locators" },
  { text: "FAQs", url: "/faqs" },
  { text: "Warranty", url: "/warranty" },
  { text: "Return Policy", url: "/return-policy" },
  { text: "Terms & Conditions", url: "/terms-conditions" },
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
              <NavigationLink key={link.text} text={link.text} url={link.url} />
            ))}
          </div>
        ))}
        <div className={styles.column} style={{ gridArea: "links3" }}>
          {distinctLinks.map((link) => (
            <NavigationLink key={link.text} text={link.text} url={link.url} />
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

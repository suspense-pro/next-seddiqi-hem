import React from "react";
import Image from "next/image";
import styles from "./footer.module.scss";
import NavigationLink from "@components/module/navigationLink";
import { TwitterIcon, InstaIcon, FBIcon } from "@assets/images/svg";
import { FooterPropType } from "@utils/models";
import LanguageSelector from "@components/module/languageSelector";
import { useDeviceWidth } from "@utils/useCustomHooks";

const getLogoUrl = (logoData) => {
  if (logoData?.image) {
    const { defaultHost, endpoint, name } = logoData.image;
    return `https://${defaultHost}/i/${endpoint}/${name}`;
  }
  return "/images/Seddiqi-Logo-Text-Only.svg";
};
const renderLinks = (links, offset) => {
  return links
    .slice(offset, offset + 4)
    .map((link) => (
      <NavigationLink
        key={link.content._meta.deliveryId}
        title={link.content._meta.name}
        url={link.content._meta.name}
      />
    ));
};

export default function Footer({ footerData }: FooterPropType) {
  const isDesktop = useDeviceWidth()[0];
  const mainLinks =
    footerData?.children?.find((child) => child.content.title === "Main Menu")
      ?.children || [];
  const secondaryLinks =
    footerData?.children?.find(
      (child) => child.content.title === "Secondary Menu"
    )?.children || [];
  const logoUrl = getLogoUrl(footerData?.content?.logo?.logo);
  const logoAltText =
    footerData?.content?.logo?.logo?.altText || "Seddiqi Logo";

  // console.log("footerData---", footerData);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column} style={{ gridArea: "logo" }}>
          <Image
            src={logoUrl}
            alt={logoAltText}
            width={300}
            height={30}
            className={styles.logo}
          />
          {isDesktop && <LanguageSelector />}
        </div>
        <div className={styles.linkContainer}>
          <div className={styles.mainLinks}>
            {mainLinks.length > 0 && (
              <>
                {[0, 4].map((offset) => (
                  <div
                    key={offset}
                    className={styles.column}
                    style={{ gridArea: `links${offset / 4 + 1}` }}
                  >
                    {renderLinks(mainLinks, offset)}
                  </div>
                ))}
              </>
            )}
          </div>
          <div className={styles.secondaryLinks}>
            {secondaryLinks.length > 0 && (
              <div className={styles.column} style={{ gridArea: "links3" }}>
                {renderLinks(secondaryLinks, 0)}
              </div>
            )}
          </div>
        </div>
      </div>
      {!isDesktop && <LanguageSelector />}
      <hr className={styles.divider} />
      <div className={styles.footer_bottom}>
        <div className={styles.copy_right}>
          {footerData?.content?.copyright}
        </div>
        <div className={styles.social_icons}>
          <TwitterIcon />
          <InstaIcon />
          <FBIcon />
        </div>
      </div>
    </footer>
  );
}

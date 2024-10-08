import React from "react";
import Image from "next/image";
import styles from "./footer.module.scss";
import NavigationLink from "@components/module/navigationLink";
import { TwitterIcon, InstaIcon, FBIcon } from "@assets/images/svg";
import { FooterPropType } from "@utils/models";
import LanguageSelector from "@components/module/languageSelector";
import { useDeviceWidth } from "@utils/useCustomHooks";
import { Typography } from "@components/module";
import NewsletterSignup from "@components/module/newsletterSignup";

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
        title={link.content.link.label}
        url={link.content.link.url}
        isNewTab={link.content.link.isNewTab}
      />
    ));
};

export default function Footer({ footerData }: FooterPropType) {
  const isDesktop = useDeviceWidth()[0];

  const mainLinks =
    footerData?.children?.filter(
      (child) => child.content.link && child.content.link.type === "Primary"
    ) || [];
  const secondaryLinks =
    footerData?.children?.filter(
      (child) => child.content.link && child.content.link.type === "Secondary"
    ) || [];

  const logoUrl = getLogoUrl(footerData?.content?.logo?.logo);
  const logoAltText =
    footerData?.content?.logo?.logo?.altText || "Seddiqi Logo";

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

          {isDesktop && (
            <>
              <NewsletterSignup />
              <LanguageSelector />
            </>
          )}
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
      {!isDesktop && (
        <>
          <NewsletterSignup />
          <LanguageSelector />
        </>
      )}
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

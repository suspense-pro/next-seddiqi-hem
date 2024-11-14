import { Image } from "@components/module";

import styles from "./threeCompactImageText.module.scss";
import RolexSmallLink from "../rolexSmallLink";

const ThreeCompactImageText = ({ ...content }) => {
  if (!content) return null;

  const components = content?.components;

  const backgroundClass = content?.backgroundColor?.toLowerCase();

  return (
    <div className={`${[styles.container]} ${styles[backgroundClass]}`}>
      <div className={styles.containerCover}>
      <h3 className={styles.mainTitle}>{content.mainTitle}</h3>
        <div className={styles.imageTextsWrapper}>
          {components.map((data, index) => (
            <div key={index} className={`${[styles.imageTextsContainer]}`}>
              <a href={data.linkUrl} className={styles.imageContainer}>
                <Image imgWidth="100%" height={"auto"} image={data.media?.image} imageAltText={data.media?.altText} />
              </a>

              <div className={styles.textsContainer}>
                <p className={styles.subtitle}>{data.subtitle}</p>
                <h6 className={styles.title}>{data.title}</h6>
                <RolexSmallLink
                  href={data.linkUrl}
                  className={`${[styles.link]} rolex-text-button`}
                  linkText={data.linkText}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreeCompactImageText;

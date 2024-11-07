import { Image } from "@components/module";

import styles from "./threeGrid.module.scss";

const ThreeGrid = ({ ...content }) => {

  if (!content) return null;

  const oneGrid = content?.oneGrid[0];
  const twoGrids = content?.twoGrids[0];

  const backgroundClass = content?.backgroundColor.toLowerCase();

  return (
    <div className={`${[styles.container]} ${styles[backgroundClass]}`}>
      <div className={styles.oneGridContainer}>
        <h3 className={styles.mainTitle}>{oneGrid.mainTitle}</h3>

        <div className={styles.imageTextsWrapper}>
          <div className={`${[styles.imageTextsContainer]}`}>
            <a href={oneGrid.contents[0].linkUrl} className={styles.imageContainer}>
              <Image
                imgWidth="100%"
                height={"auto"}
                image={oneGrid.contents[0].media?.image}
                imageAltText={oneGrid.contents[0].media?.altText}
              />
            </a>

            <div className={styles.textsContainer}>
              <p className={styles.subtitle}>{oneGrid.contents[0].subtitle}</p>
              <h6 className={styles.title}>{oneGrid.contents[0].title}</h6>
              <a href={oneGrid.contents[0].linkUrl} className={`${[styles.link]} rolex-text-button`}>{oneGrid.contents[0].linkText}</a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.twoGridsContainer}>
      <h3 className={styles.mainTitle}>{twoGrids.mainTitle}</h3>

        <div className={styles.imageTextsWrapper}>
          {twoGrids.contents.map((data, index) => (
          <div key={index} className={`${[styles.imageTextsContainer]}`}>
              <a href={data.linkUrl} className={styles.imageContainer}>
                <Image
                  imgWidth="100%"
                  height={"auto"}
                  image={data.media?.image}
                  imageAltText={data.media?.altText}
                />
              </a>

              <div className={styles.textsContainer}>
                <p className={styles.subtitle}>{data.subtitle}</p>
                <h6 className={styles.title}>{data.title}</h6>
                <a href={data.linkUrl} className={`${[styles.link]} rolex-text-button`}>{data.linkText}</a>
              </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default ThreeGrid;

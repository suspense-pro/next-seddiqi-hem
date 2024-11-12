import { Image } from "@components/module";
import styles from "./twoColumnImageText.module.scss";

const TwoColumnImageText = ({ ...content }) => {

  if (!content) return null;

  const contentRow = content?.row;

  return (
    <div className={styles.container}>
      {contentRow.map((data, index) => (
        <div key={index} className={`${[styles.imageTextsWrapper]}`}>
          <Image
            className={styles.image}
            imgWidth="100%"
            height={"auto"}
            image={data.media?.image}
            imageAltText={data.media?.altText}
          />

          <div className={styles.textsContainer}>
            <h6 className={styles.subtitle}>{data.subtitle}</h6>
            <h3 className={styles.title}>{data.title}</h3>
            <p className={styles.description}>{data.description}</p>
            {data?.linkText && (
              <a href={data?.linkUrl} className={`rolex-button solid`}>
                {data?.linkText}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TwoColumnImageText;

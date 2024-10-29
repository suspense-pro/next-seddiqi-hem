import styles from "./twoColumnImageText.module.scss";

const TwoColumnImageText = () => {

  const componentData = [
    {
      imageUrl: "/images/png/rolex-two-column-component-image1.png", 
      subtitle: "A unique experience", 
      title: "EXCLUSIVE ROLEX CERTIFIED PRE-OWNED SHOWROOMS", 
      description: "Enjoy a unique experience at one of our elegant Rolex Certified Pre-Owned showrooms, beautifully designed to exhibit a large selection of timepieces, including Rolex’s most iconic models.", 
      linkText: "Find A Showroom", 
      linkUrl: "/"
    },
    {
      imageUrl: "/images/png/rolex-two-column-component-image2.png", 
      subtitle: "The Rolex Certification", 
      title: "THE TWO-YEAR INTERNATIONAL ROLEX GUARANTEE", 
      description: "Delivered at the time of sale, the Rolex Certified Pre-Owned guarantee card officially confirms that the watch is genuine on the date of purchase and guarantees its proper functioning for a period of two years from this date, in accordance with the guarantee manual.", 
      linkText: "Find Out More", 
      linkUrl: "/"
    }
  ];

  return (
    <div className={styles.container}>
      {componentData.map((data, index) => (
      <div key={index} className={`${[styles.imageTextsWrapper]}`}>
          <img src={data.imageUrl} className={styles.image} />

          <div className={styles.textsContainer}>
            <h6 className={styles.subtitle}>{data.subtitle}</h6>
            <h3 className={styles.title}>{data.title}</h3>
            <p className={styles.description}>{data.description}</p>
            <a href={data.linkUrl} className={styles.link}>{data.linkText}</a>
          </div>
      </div>
      ))}
    </div>
  )
};

export default TwoColumnImageText;

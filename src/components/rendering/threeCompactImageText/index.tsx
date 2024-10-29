import styles from "./threeCompactImageText.module.scss";

const ThreeCompactImageText = () => {

  const componentData = [
    {imageUrl: "/images/png/discover-rolex1.png", subtitle: "A commitment to excellence", title: "World of Rolex", linkText: "Learn More", linkUrl: "/"},
    {imageUrl: "/images/png/discover-rolex2.png", subtitle: "Excellence in the making", title: "Watchmaking", linkText: "Learn More", linkUrl: "/"},
    {imageUrl: "/images/png/discover-rolex3.png", subtitle: "our servicing philosophy", title: "Servicing", linkText: "Learn More", linkUrl: "/"},
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.mainTitle}>Discover Rolex</h3>

      <div className={styles.imageTextsWrapper}>
        {componentData.map((data, index) => (
        <div key={index} className={`${[styles.imageTextsContainer]}`}>
            <a href={data.linkUrl} className={styles.imageContainer}>
              <img src={data.imageUrl} />
            </a>

            <div className={styles.textsContainer}>
              <p className={styles.subtitle}>{data.subtitle}</p>
              <h6 className={styles.title}>{data.title}</h6>
              <a href={data.linkUrl} className={styles.link}>{data.linkText}</a>
            </div>
        </div>
        ))}
      </div>
    </div>
  )
};

export default ThreeCompactImageText;

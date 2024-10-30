import styles from "./threeGrid.module.scss";

const ThreeGrid = () => {

  const componentData = [{
    oneGrid: [
      {
        mainTitle: "Rolex Watches",
        gridData: [
          {
          imageUrl: "/images/png/rolex-watches-image.png", 
          subtitle: "Find your Rolex", 
          title: "Discover the Rolex collections", 
          linkText: "Learn More", 
          linkUrl: "/"
          }
        ]
      }
    ],
    twoGrids: [
      {
        mainTitle: "Contact Us",
        gridData: [
          {
            imageUrl: "/images/png/appointment-image.png", 
            subtitle: "", 
            title: "World of Rolex", 
            linkText: "Book an appointment", 
            linkUrl: "/"
          },
          {
            imageUrl: "/images/png/message-image.png", 
            subtitle: "", 
            title: "Message", 
            linkText: "Send a Message", 
            linkUrl: "/"
          }
        ]
      }
    ]
  }];

  return (
    <div className={styles.container}>
      <div className={styles.oneGridContainer}>
        <h3 className={styles.mainTitle}>{componentData[0].oneGrid[0].mainTitle}</h3>

        <div className={styles.imageTextsWrapper}>
          <div className={`${[styles.imageTextsContainer]}`}>
            <a href={componentData[0].oneGrid[0].gridData[0].linkUrl} className={styles.imageContainer}>
              <img src={componentData[0].oneGrid[0].gridData[0].imageUrl} />
            </a>

            <div className={styles.textsContainer}>
              <p className={styles.subtitle}>{componentData[0].oneGrid[0].gridData[0].subtitle}</p>
              <h6 className={styles.title}>{componentData[0].oneGrid[0].gridData[0].title}</h6>
              <a href={componentData[0].oneGrid[0].gridData[0].linkUrl} className={`${[styles.link]} rolex-text-button`}>{componentData[0].oneGrid[0].gridData[0].linkText}</a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.twoGridsContainer}>
      <h3 className={styles.mainTitle}>{componentData[0].twoGrids[0].mainTitle}</h3>

        <div className={styles.imageTextsWrapper}>
          {componentData[0].twoGrids[0].gridData.map((data, index) => (
          <div key={index} className={`${[styles.imageTextsContainer]}`}>
              <a href={data.linkUrl} className={styles.imageContainer}>
                <img src={data.imageUrl} />
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

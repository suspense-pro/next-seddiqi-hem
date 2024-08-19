import Button from "../button";
import CollectionsCard from "../cards/collectionsCard";
import ProductCard from "../cards/productCard";
import Image from "../image";
import Video from "../video";
import styles from "./collectionsTabDesktop.module.scss"


const CollectionsTabDesktop = ({ content, cta, ind }) => {
  return (
    <div className={styles.containerGrid}>
      <div className={styles.containerGridItems}>
        {content?.tabItem[ind]?.collectionItems?.map((item) => {
          return <CollectionsCard item={item} />
        })}
      </div>
      <Button isLink={true} link={cta?.url} title={cta?.label} color={cta?.color} type={cta?.type} />
    </div>
  );
};

export default CollectionsTabDesktop;

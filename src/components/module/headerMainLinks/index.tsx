import { useContext } from "react";
import styles from "./headerMainLinks.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import NavigationLink from "../navigationLink";
import {
  AccountIcon,
  MapIcon,
  SearchIcon,
  WishlistIcon,
} from "@assets/images/svg";
import { generateUniqueId } from "@utils/helpers/uniqueId";

const HeaderMainLinks = () => {
  const { updateCurrent, headerData } = useContext(HeaderContext);
  const headerMainLinks = headerData?.children;
  const cta = headerData?.content?.bookingCTA?.image;

  if (!headerMainLinks) return null;

  return (
    <div className={styles.linksContainer}>
      <div className={styles.appointmentBtn}>
        <NavigationLink hover={false} title={cta?.label} url={cta?.url} />
      </div>
      <div className={styles.links}>
        {headerMainLinks?.map((item, ind) => (
          <div
            key={generateUniqueId()}
            onMouseEnter={() => updateCurrent(ind)}
          >
            <NavigationLink
              hover={false}
              className={styles.headerLink}
              title={item?.content?.commonProps?.item_title}
              url={item?.content?.commonProps?.url}
            />
          </div>
        ))}
      </div>
      <div className={styles.navIcons}>
        {[SearchIcon, AccountIcon, MapIcon, WishlistIcon].map((Icon, index) => (
          <Icon key={generateUniqueId()} fill="#" />
        ))}
      </div>
    </div>
  );
};

export default HeaderMainLinks;

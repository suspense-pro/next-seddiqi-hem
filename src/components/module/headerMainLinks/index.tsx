import { useContext, useState } from "react";
import styles from "./headerMainLinks.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import NavigationLink from "../navigationLink";
import { AccountIcon, CalendarIcon, SearchIcon, WishlistIcon, MapIcon } from "@assets/images/svg";
import { generateUniqueId } from "@utils/helpers/uniqueId";
import Link from "next/link";
import Image from "next/image";
import PrivateLink from "../privateLink";
import { SideDrawer } from "@components/module";
import { Search } from "@components/module";
import { SearchProvider } from "@contexts/searchContext";

const HeaderMainLinks = () => {
  const { updateCurrent, headerData } = useContext(HeaderContext);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const headerMainLinks = headerData?.children;
  if (!headerMainLinks) return null;

  const openSearchPopup = () => {
    setIsPopupVisible(true);
  };

  const closeSearchPopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className={styles.linksContainer}>
      <div className={styles.logoContainer}>
        <Link href={headerData?.content?.patekLogo}>
          <Image src={"/images/png/RolexLogo.png"} width={91.57} height={42} alt="rolex logo" />
        </Link>
        <Link href={headerData?.content?.rolexLogo}>
          <Image src={"/images/png/PatekLogo.png"} width={71.81} height={42} alt="patek logo" />
        </Link>
      </div>
      <div className={styles.links}>
        {headerMainLinks?.map((item, ind) => (
          <div key={generateUniqueId()} onMouseEnter={() => updateCurrent(ind)}>
            <NavigationLink
              hover={false}
              className={styles.headerLink}
              title={item?.content?.commonProps?.item_title}
              url={item?.content?.commonProps?.url}
              isNewTab={item?.content?.commonProps?.isNewTab}
            />
          </div>
        ))}
      </div>
      <div className={styles.navIcons}>
        <div onClick={openSearchPopup}>
          <SearchIcon fill="#" />
        </div>
        <Link target="_blank" href="/book-an-appointment">
          <CalendarIcon fill="#" />
        </Link>
        <PrivateLink url="/profile">
          <AccountIcon fill="#" />
        </PrivateLink>
        <WishlistIcon fill="#" />
        {/* {[SearchIcon, CalendarIcon, MapIcon, WishlistIcon].map((Icon, index) => (
          <div key={generateUniqueId()} onClick={Icon === SearchIcon ? openSearchPopup : undefined}>
          <Icon key={generateUniqueId()} fill="#" />
          </div>
        ))} */}
      </div>
      <div className={`${styles.drawerStyle} ${isPopupVisible ? styles.visible : ""}`}>
        <SearchProvider>
          <Search closeSearch={closeSearchPopup}></Search>
        </SearchProvider>
      </div>
    </div>
  );
};

export default HeaderMainLinks;

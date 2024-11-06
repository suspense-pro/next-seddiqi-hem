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
import { useSearchContext } from "@contexts/searchContext";

const HeaderMainLinks = () => {
  const { updateCurrent, headerData } = useContext(HeaderContext);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { openSearch } = useSearchContext();

  const headerMainLinks = headerData?.children;
  if (!headerMainLinks) return null;

  const openSearchPopup = () => {
    setIsPopupVisible(true);
    openSearch();
  };

  const closeSearchPopup = () => {
    setIsPopupVisible(false);
  };

  const RolexScript = 
    ` <div id="rolex-retailer-clock">
        <div class="LinkEnabler">
        <!-- Container div for scaling -->
        <div class="clockContainer">
        <iframe id="rolex_retailer" title="Rolex Official Retailer" src="
        https://static.rolex.com/retailers/clock/?colour=gold&amp;apiKey=fd5d8663fc8674a9ffab32649c3e39bf&amp;lang=en" scrolling="no" frameborder="no"></iframe>
        </div>
      </div>`
  

  return (
    <div className={styles.linksContainer}>
      <div className={styles.logoContainer}>
        <Link href={headerData?.content?.rolexLogo} dangerouslySetInnerHTML={{__html: RolexScript}}>
          {/* <Image src={"/images/png/RolexLogo.png"} width={91.57} height={42} alt="rolex logo" /> */}
          {/* <div></div> */}
        </Link>
        <Link href={headerData?.content?.patekLogo}>
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
      <div className={`${styles.drawerStyle} ${isPopupVisible ? styles.visible : ''}`}>
        <Search closeSearch={closeSearchPopup} ></Search>
      </div>
    </div>
  );
};

export default HeaderMainLinks;

import { useContext, useState } from "react";
import { useRouter } from 'next/router';
import styles from "./headerMainLinks.module.scss";
import { HeaderContext } from "@contexts/headerContext";
import NavigationLink from "../navigationLink";
import { AccountIcon, CalendarIcon, SearchIcon, WishlistIcon, MapIcon } from "@assets/images/svg";
import { generateUniqueId } from "@utils/helpers/uniqueId";
import Link from "next/link";
import Image from "next/image";
import PrivateLink from "../privateLink";

const HeaderMainLinks = () => {
  const { updateCurrent, headerData } = useContext(HeaderContext);

  const headerMainLinks = headerData?.children;
  if (!headerMainLinks) return null;
  const router = useRouter(); 
  //Redirect to Search Page
  const handleSearchClick = () => {
    router.push('/search'); // Redirect to search page
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
            />
          </div>
        ))}
      </div>
      <div className={styles.navIcons}>
        <SearchIcon fill="#" />
        <CalendarIcon fill="#" />
        <PrivateLink url="/profile">
          <AccountIcon fill="#" />
        </PrivateLink>
        <WishlistIcon fill="#" />
        {[SearchIcon, CalendarIcon, MapIcon, WishlistIcon].map((Icon, index) => (
          <div key={generateUniqueId()} onClick={Icon === SearchIcon ? handleSearchClick : undefined}>
          <Icon key={generateUniqueId()} fill="#" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeaderMainLinks;

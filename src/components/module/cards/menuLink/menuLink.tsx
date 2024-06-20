import ArrowRight from "@assets/images/svg/ArrowRight";
import Link from "next/link";
import React from "react";
import styles from "./menuLink.module.scss";

interface MenuLinkProps {
  expand?: boolean;
  title: string;
  url?: string;
  className?: string;
}

const MenuLink: React.FC<MenuLinkProps> = ({ title, expand, url }) => {
  return (
    <Link className={styles.menuLink} href={"/"}>
      <div>{title}</div>
      {expand && <ArrowRight />}
    </Link>
  );
};

export default MenuLink;

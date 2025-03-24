import React from "react";
import styles from "./searchPopUp.module.scss";
import { Image } from "@components/module";
import { CloseIconV2, SeddiqiLogoBlack } from "@assets/images/svg";
import Link from "next/link";

const SearchPopUp = ({ content, setSearchOpen }) => {
  console.log("searchList", content[0]);

  return (
    <div className={styles.container}>
      <div onClick={() => setSearchOpen(false)} className={styles.closeIcon}>
        <CloseIconV2 />
      </div>
      <div className={styles.textContainer}>
        <div
          onClick={() => setSearchOpen(true)}
          className={styles.searchContainer}
        >
          <input
            type="text"
            placeholder="Tell me about the Ahmed Seddiqi legacy"
            className={styles.input}
          />
          <button className={styles.iconButton}>
            <span className={styles.icon}></span>
          </button>
          <div className={styles.seddiqiLogo}>
            <SeddiqiLogoBlack />
          </div>
        </div>
      </div>
      {/* Added Seddiqi text list here */}
      <div className={styles.legacyContainer}>
        <ul className={styles.legacyList}>
          {content?.map((item) => {
            return (
              <li>
                <Link onClick={() => setSearchOpen(false)} href={item?.url}>
                  {item?.title}
                </Link>
              </li>
            );
          })}

          {/* <li>Seddiqi legacy of excellence</li>
          <li>Ahmed Seddiqi Family</li>
          <li>The Seddiqi Museum</li>
          <li>Latest Stories from Ahmed Seddiqi</li> */}
        </ul>
      </div>
    </div>
  );
};

export default SearchPopUp;

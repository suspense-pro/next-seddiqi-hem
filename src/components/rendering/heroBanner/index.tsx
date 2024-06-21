import React, { useRef } from "react";
import styles from "./heroBanner.module.scss";
import classNames from "classnames";
import { useDeviceWidth } from "@utils/useCustomHooks";
import Image from "@components/module/image"
import { Button } from "@components/module";

export default function HeroBanner({
  _meta,
  banner,
  title,
  description
}: any) {
  const [isDesktop] = useDeviceWidth();

  // console.log({_meta});
  

  return (
    <div className={classNames(styles.hero_banner_main, styles.container)}>
      <div className={classNames(styles.hero_banner)} id="heroBanner">
        <div className={classNames(styles[`hero_banner_wrapper`])}>
          <div className={classNames(styles.hero_banner_media_container)}>

              <Image
                image={banner}
                className={styles.heroImage}
              />
              <br /><br />
              <Button title="Shop Now" type="solid " /> <br /><br />
              <Button title="Shop transparent" type="transparent" /> <br /><br />
              <Button title="Shop plain" type="plain" />
          </div>
          <div className={`${styles.hero_banner_text_container}`}>

          </div>
        </div>
      </div>
    </div>
  );
}

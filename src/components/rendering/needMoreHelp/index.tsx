import { CallIcon, MailIcon, WhatsappIcon2 } from "@assets/images/svg";
import React from "react";
import styles from "./needMoreHelp.module.scss";


const NeedMoreHelp = () => {
  return (
    <div className={`${[styles.needMoreHelpContainer]}`}>
      <h3>Need more help?</h3>

      <ul className={styles.paragraphsContainer}>
        <li>
          <p>Find the answer to your questions on our</p>
          <p><a href="">FAQs section.</a></p>
        </li>

        <li>
          <p>Contact our Customer Service support centre from</p>
          <p>Monday to Saturday 9:00 am - 6:00 pm</p>
        </li>
      </ul>

      <div className={styles.contactIcons}>
        <a href="">
          <MailIcon />
        </a>

        <a href="">
          <CallIcon />
        </a>

        <a href="">
          <WhatsappIcon2 />
        </a>
      </div>
    </div>
  );
};

export default NeedMoreHelp;

import React from "react";
import styles from "./newsletterSignup.module.scss";
import Typography from "../typography";

const NewsletterSignup: React.FC = () => {
  return (
    <div className={styles.newsletter}>
      <Typography variant="h6" className={styles.newsletterTitle}>
        SUBSCRIBE TO NEWSLETTER
      </Typography>
      <div className={styles.newsletterContent}>
        <div className={styles.newsletterInputContainer}>
          <input
            type="email"
            placeholder="Email"
            className={`${styles.newsletterInput} ${styles.languageDropdown}`}
          />
          <button className={styles.newsletterButton}>Subscribe</button>
        </div>
        <div className={styles.newsletterCheckboxContainer}>
          <input type="checkbox" id="privacyPolicy" />
          <label htmlFor="privacyPolicy">
            I have read and understood{" "}
            <a href="/privacy-policy">Privacy Policy</a> and I agree to receive
            the newsletter.
          </label>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;

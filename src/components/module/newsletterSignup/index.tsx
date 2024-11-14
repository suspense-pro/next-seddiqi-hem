import React, { useState } from "react";
import styles from "./newsletterSignup.module.scss";
import Typography from "../typography";
import Loader from "../loader";
import { subscribedToNewsletter } from "@utils/sfcc-connector/dataService";

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async () => {
    if (!validateEmail(email)) {
      setStatusMessage("Please enter a valid email address.");
      setIsError(true);
      return;
    }

    if (!isChecked) {
      setStatusMessage("Please agree to the Privacy Policy.");
      setIsError(true);
      return;
    }

    setIsLoading(true);

    try {
      const formData = {
        email,
        isSubscribed,
      };

      const response = await subscribedToNewsletter({
        userData: formData,
        method: "POST",
      });
      // console.log("response------", response);

      if (!response?.isError && response?.response?.code === 200) {
        setStatusMessage("You have successfully subscribed to the Newsletter!");
        setIsError(false);
      } else {
        setStatusMessage("Failed to subscribe. Please try again.");
        setIsError(true);
      }
    } catch (error) {
      console.error("error----", error);
      setStatusMessage("An error occurred. Please try again.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.newsletter}>
      {isLoading ? <Loader /> : null}
      <Typography variant="h6" className={styles.newsletterTitle}>
        SUBSCRIBE TO NEWSLETTER
      </Typography>
      <div className={styles.newsletterContent}>
        <div className={styles.newsletterInputContainer}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={`${styles.newsletterInput} ${styles.languageDropdown}`}
          />
          <button className={styles.newsletterButton} onClick={handleSubscribe} disabled={isLoading}>
            {"Subscribe"}
          </button>
        </div>
        <div className={styles.newsletterCheckboxContainer}>
          <input
            type="checkbox"
            id="privacyPolicy"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          {/* <label htmlFor="privacyPolicy">
            I have read and understood <a href="/privacy-policy">Privacy Policy</a> and I agree to receive the
            newsletter.
          </label> */}
          <label htmlFor="privacyPolicy">
            I consent to receive occasional marketing communications and event invitation from Ahmed Seddiqi & Sons, its
            affiliates, and group companies via phone, email, SMS, or WhatsApp channels.
          </label>
        </div>
        {statusMessage && (
          <p className={`${styles.statusMessage} ${isError ? styles.error : styles.success}`}>{statusMessage}</p>
        )}
      </div>
    </div>
  );
};

export default NewsletterSignup;

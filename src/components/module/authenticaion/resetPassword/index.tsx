import { useState, ChangeEvent } from "react";
import styles from "./resetPassword.module.scss"; // Using CSS Modules for local styling
import InputField from "@components/module/inputField";
import Button from "@components/module/button";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(""); // Clear error when user types
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email");
    } else {
      // Handle submit logic, e.g., API call
      console.log("Submitting email:", email);
    }
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <h2 className={styles.heading}>Reset your password</h2>
      <p className={styles.description}>
        In order to reset your password, please provide us with your email. We will send you an email momentarily.
        Contact Customer Service for further assistance.
      </p>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <InputField
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          errorMessage={error}
          required={true}
        />
        <div className={styles.submitButton}>
          <Button
            clickHandler={() => console.log("")}
            className={styles.signInBtn}
            title="Send"
            isLink={false}
            type="solid"
            color="metallic"
          />
        </div>
      </form>
    </div>
  );
}

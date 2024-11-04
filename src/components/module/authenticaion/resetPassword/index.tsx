import { useState, ChangeEvent } from "react";
import styles from "./resetPassword.module.scss"; // Using CSS Modules for local styling
import InputField from "@components/module/inputField";
import Button from "@components/module/button";

interface ResetPasswordProps {
  title?: string; // Optional prop
  subTitle?: string; // Optional prop
  step?: number; // Optional prop
}

export default function ResetPassword({ title = "", subTitle = "", step = 1 }: ResetPasswordProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(""); // Clear error when user types
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!email) {
        setError("Email is required");
      } else if (!validateEmail(email)) {
        setError("Please enter a valid email");
      } else {
        // Handle submit logic for email, e.g., API call
        console.log("Submitting email:", email);
      }
    } else if (step === 3) {
      if (!password || !confirmPassword) {
        setError("Both password fields are required");
      } else if (password !== confirmPassword) {
        setError("Passwords do not match");
      } else {
        // Handle submit logic for passwords
        console.log("Submitting new password:", password);
      }
    }
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <h2 className={styles.heading}>{title}</h2>
      {subTitle && <p className={styles.description}>{subTitle}</p>}

      {step !== 2 && (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          {step === 1 && (
            <InputField
              name="email"
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              errorMessage={error}
              required={true}
            />
          )}
          
          {step === 3 && (
            <>
              <InputField
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required={true}
              />
              <InputField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                errorMessage={password !== confirmPassword ? "Passwords do not match" : ""}
                required={true}
              />
            </>
          )}
          
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
      )}
    </div>
  );
}

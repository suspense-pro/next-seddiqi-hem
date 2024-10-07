import { useState } from "react";
import styles from "./auth.module.scss"; // Assuming you are using a CSS module
import Button from "@components/module/button";
import InputField from "./inputField";

interface Errors {
  email?: string;
  phone?: string;
  password?: string;
}

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});

  const validateForm = (): Errors => {
    const validationErrors: Errors = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      validationErrors.email = "Please enter a valid email.";
    }

    const phonePattern = /^[0-9]{6,15}$/;
    if (!phonePattern.test(phone)) {
      validationErrors.phone = "Please enter a valid phone number.";
    }

    if (!password) {
      validationErrors.password = "Password is required.";
    }

    return validationErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form is valid. Submitting...");
    } else {
      setErrors(validationErrors);
    }
  };

  const handleSendOTP = () => {
    if (phone) {
      console.log("Sending OTP...");
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Phone number is required to send OTP.",
      }));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <form className={styles.signin} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <InputField
              name="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              errorMessage={errors.email}
              required={true}
            />

            <InputField
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              errorMessage={errors.password}
              required={true}
            />
          </div>
          <Button
            className={styles.forgotBtn}
            title="Forgot your password?"
            isLink={true}
            type="Plain"
            color="green_darK"
          />

          <div className={styles.submitBtnContainer}>
            <Button className={styles.submitBtn} title="Sign In" isLink={true} type="solid" color="metallic" />
          </div>
        </form>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.orDivider}>
          <span>OR</span>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.phoneWrapper}>
            <select required>
              <option value="+971">+971</option>
              <option value="+1">+1</option>
            </select>
            <div className={styles.inputGroup}>
              <input
                type="tel"
                value={password}
                onChange={(e) => setPhone(e.target.value)}
                className={errors.phone ? styles.inputError : ""}
                placeholder=" "
                required
              />
              <label>Phone*</label>
              {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
            </div>
          </div>
        </div>
        <div onClick={handleSendOTP}>
          <Button
            className={styles.oneBtn}
            title="Send One Time Password"
            isLink={false}
            type="transparent"
            color="green_darK"
          />
        </div>
      </div>
    </div>
  );
}

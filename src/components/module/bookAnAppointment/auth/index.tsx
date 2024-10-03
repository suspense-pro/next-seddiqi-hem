import { useState } from "react";
import styles from "./auth.module.scss"; // Assuming you are using a CSS module

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

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      validationErrors.email = "Please enter a valid email.";
    }

    // Phone validation (basic validation assuming 6-15 digits)
    const phonePattern = /^[0-9]{6,15}$/;
    if (!phonePattern.test(phone)) {
      validationErrors.phone = "Please enter a valid phone number.";
    }

    // Password validation
    if (!password) {
      validationErrors.password = "Password is required.";
    }

    return validationErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Submit the form logic here
      console.log("Form is valid. Submitting...");
    } else {
      setErrors(validationErrors);
    }
  };

  const handleSendOTP = () => {
    if (phone) {
      // Logic to send OTP
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
      {/* Left Side: Email and Password */}
      <div className={styles.leftSide}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Email*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? styles.inputError : ""}
              required
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label>Password*</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? styles.inputError : ""}
              required
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
          </div>

          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>

      {/* Right Side: OR and Phone Number */}
      <div className={styles.rightSide}>
        <div className={styles.orDivider}>
          <span>OR</span>
        </div>

        <div className={styles.inputGroup}>
          <label>Phone*</label>
          <div className={styles.phoneWrapper}>
            <select required>
              <option value="+971">+971</option>
              <option value="+1">+1</option>
            </select>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={errors.phone ? styles.inputError : ""}
              placeholder="Phone*"
              required
            />
          </div>
          {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
        </div>

        <button type="button" className={styles.otpButton} onClick={handleSendOTP}>
          Send One Time Password
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import styles from "./signIn.module.scss"; // Assuming you are using a CSS module
import Button from "@components/module/button";
import InputField from "../inputField";
import OtpComponent from "../../opt";
import { loginCustomer } from "@utils/sfcc-connector/dataService";

interface Errors {
  email?: string;
  phone?: string;
  password?: string;
}

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState<string>("+91"); // Default phone code
  const [password, setPassword] = useState<string>("");
  const [otpForm, setOtpForm] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const validateForm = (): Errors => {
    const validationErrors: Errors = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      validationErrors.email = "Please enter a valid email.";
    }

    if (!password) {
      validationErrors.password = "Password is required.";
    }

    return validationErrors;
  };

  const validatePhoneNumber = () => {
    const validationErrors: Errors = {};

    const phonePattern = /^[0-9]{6,15}$/;
    if (!phonePattern.test(phone)) {
      validationErrors.phone = "Please enter a valid phone number.";
    }

    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form is valid. Logging in...");

      // Prepare userData
      const userData = {
        username: email,
        password,
      };

      try {
        // Call loginCustomer API
        const response = await loginCustomer({
          userData: JSON.stringify(userData), // userData as a JSON string
          method: "POST",
        });

        // Log the response
        console.log("Login response:", response);
      } catch (error) {
        console.error("Login error:", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleSendOTP = () => {
    const validationErrors = validatePhoneNumber();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Phone number is valid. Sending OTP...");
      setOtpForm(true);
    } else {
      setErrors(validationErrors);
    }
  };

  if (otpForm) {
    return <OtpComponent />;
  }

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
            <Button
              clickHandler={(e) => handleSubmit(e)}
              className={styles.submitBtn}
              title="Sign In"
              isLink={false}
              type="solid"
              color="metallic"
            />
          </div>
        </form>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.orDivider}>
          <span>OR</span>
        </div>
        <div className={styles.formGroupPhone}>
          <InputField
            name="phone code"
            label=""
            value={phoneCode}
            onChange={(e) => setPhoneCode(e.target.value)}
            options={["+91", "+44", "+61"]}
            required
          />
          <InputField
            name="phone"
            label="Phone"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            errorMessage={errors.phone}
            required={true}
          />
        </div>

        <div>
          <Button
            clickHandler={() => handleSendOTP()}
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

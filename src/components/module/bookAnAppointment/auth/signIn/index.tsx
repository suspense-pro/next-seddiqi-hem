import { useState } from "react";
import styles from "./signIn.module.scss"; // Assuming you are using a CSS module
import Button from "@components/module/button";
import OtpComponent from "../../otp";
import { loginCustomer } from "@utils/sfcc-connector/dataService";
import InputField from "@components/module/inputField";

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

  const validateEmail = (value: string): string | undefined => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      return "Please enter a valid email.";
    }
  };

  const validatePassword = (value: string): string | undefined => {
    if (!value) {
      return "Password is required.";
    }
  };

  const validatePhoneNumber = (value: string): string | undefined => {
    const phonePattern = /^[0-9]{6,15}$/;
    if (!phonePattern.test(value)) {
      return "Please enter a valid phone number.";
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    setErrors((prev) => ({ ...prev, phone: validatePhoneNumber(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    if (!validationErrors.email && !validationErrors.password) {
      console.log("Form is valid. Logging in...");

      const userData = {
        username: email,
        password,
      };

      try {
        const response = await loginCustomer({
          userData: JSON.stringify(userData),
          method: "POST",
        });

        console.log("Login response:", response);
      } catch (error) {
        console.error("Login error:", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleSendOTP = () => {
    const validationErrors = {
      phone: validatePhoneNumber(phone),
    };

    if (!validationErrors.phone) {
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
              onChange={handleEmailChange}
              errorMessage={errors.email}
              required={true}
            />

            <InputField
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
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
              clickHandler={handleSubmit}
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
            onChange={handlePhoneChange}
            errorMessage={errors.phone}
            required={true}
          />
        </div>

        <div>
          <Button
            clickHandler={handleSendOTP}
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

import { useState } from "react";
import styles from "./signIn.module.scss";
import Button from "@components/module/button";
import { getCustomer, loginCustomer } from "@utils/sfcc-connector/dataService";
import InputField from "@components/module/inputField";
import { SignInFormErrors } from "@utils/models";
import { validateEmail, validateLoginPassword, validatePhoneNumber } from "@utils/helpers/validations";
import OtpComponent from "../otp";
import { useRouter } from "next/router";
import Link from "next/link";
import { countryCodes } from "@utils/data/countryCodes";

export default function SignIn({ direction = "row" }) {
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState<string>("+971");
  const [password, setPassword] = useState<string>("");
  const [otpForm, setOtpForm] = useState(false);
  const [errors, setErrors] = useState<SignInFormErrors>({});

  const router = useRouter();
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validateLoginPassword(value) }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhone(value);
      setErrors((prev) => ({ ...prev, phone: validatePhoneNumber(value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = {
      email: validateEmail(email),
      password: validateLoginPassword(password),
    };

    if (!validationErrors.email && !validationErrors.password) {
      console.log("Form is valid. Logging in...");

      const userData = {
        username: email,
        password,
      };

      try {
        const data = await loginCustomer({
          userData: JSON.stringify(userData),
          method: "POST",
        });
        if (!data?.isError) {
          localStorage.setItem("tokenInfo", JSON.stringify(data?.response));
          const profile = await getCustomer(data?.response?.customer_id, data?.response?.access_token);
          if (!profile?.isError) {
            localStorage.setItem("userInfo", JSON.stringify(profile?.response));
            router.push("/");
          }
        } else {
          throw new Error("Login Failed Try Again");
        }
      } catch (error) {
        alert(error?.message);
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

  const containerStyles: React.CSSProperties = {
    flexDirection: direction as "row" | "row-reverse" | "column" | "column-reverse",
  };

  return (
    <div style={containerStyles} className={styles.container}>
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
            link="/forgot-password"
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
            options={countryCodes}
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
            color="midnight_brown"
          />
        </div>
      </div>
    </div>
  );
}

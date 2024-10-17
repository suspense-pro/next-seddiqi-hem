import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./register.module.scss";
import Button from "@components/module/button";
import SlidingRadioSwitch from "@components/module/slidingRadioSwitch";
import { GreenTick } from "@assets/images/svg";
import InputField from "@components/module/inputField";
import {
  passwordCriteria,
  validateConfirmEmail,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validatePhone,
  validateTitle,
} from "@utils/helpers/validations";
import { SignUpFormErrors } from "@utils/models";
import { getCustomer, registerCustomer } from "@utils/sfcc-connector/dataService";
import AccountConfirmationBox from "../accountConfirmationBox";

const Register = ({ gridColumn = "1fr 1fr" }) => {
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const [errors, setErrors] = useState<SignUpFormErrors>({});
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setEmail(value);
        setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
        break;
      case "confirmEmail":
        setConfirmEmail(value);
        setErrors((prev) => ({
          ...prev,
          confirmEmail: validateConfirmEmail(email, value),
        }));
        break;
      case "password":
        setPassword(value);
        setPasswordValidations({
          length: passwordCriteria.length(value),
          uppercase: passwordCriteria.uppercase(value),
          number: passwordCriteria.number(value),
          specialChar: passwordCriteria.specialChar(value),
        });
        setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
        break;
      case "firstName":
        setFirstName(value);
        setErrors((prev) => ({ ...prev, firstName: validateFirstName(value) }));
        break;
      case "lastName":
        setLastName(value);
        setErrors((prev) => ({ ...prev, lastName: validateLastName(value) }));
        break;
      case "phone":
        setPhone(value);
        setErrors((prev) => ({ ...prev, phone: validatePhone(value) }));
        break;
      case "title":
        setTitle(value);
        setErrors((prev) => ({ ...prev, title: validateTitle(value) }));
        break;
      default:
        break;
    }
  };

  const validateForm = (): boolean => {
    setErrors({
      email: validateEmail(email),
      confirmEmail: validateConfirmEmail(email, confirmEmail),
      password: validatePassword(password),
      firstName: validateFirstName(firstName),
      lastName: validateLastName(lastName),
      phone: validatePhone(phone),
      title: validateTitle(title),
    });

    return !Object.values(errors).some((error) => error !== "");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form is valid. Registering...");

      const userData = {
        email,
        password,
        fname: firstName,
        lname: lastName,
        phone,
        salutation: title,
      };

      try {
        const data = await registerCustomer({
          userData: JSON.stringify(userData),
          method: "POST",
        });

        console.log("Registration successful", data);
        if (!data?.isError) {
          setIsRegistered(true);
        } else {
          throw new Error("Registration failed. Please try again.");
        }
      } catch (error) {
        alert(error?.message || "An error occurred during registration.");
      }
    }
  };

  const containerStyles: React.CSSProperties = {
    gridTemplateColumns: gridColumn,
  };

  if (isRegistered) {
    return (
      <AccountConfirmationBox
        title="Your account has been confirmed"
        subtitle1="Your account has been confirmed. "
        subtitle2="Please sign in to access your account!"
        showButton={true}
      />
    );
  }

  return (
    <div className={styles.container}>
      <form className={styles.signin} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <div style={containerStyles} className={styles.doubleForm}>
            {/* Title and First Name */}
            <div className={styles.optionSelector}>
              <InputField
                name="title"
                label="Title"
                value={title}
                onChange={handleInputChange}
                options={["Mr", "Mrs", "Ms"]}
                errorMessage={errors.title}
                required
              />
              <InputField
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleInputChange}
                label="First Name"
                errorMessage={errors.firstName}
                required
              />
            </div>
            {/* Last Name */}
            <InputField
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleInputChange}
              label="Last Name"
              errorMessage={errors.lastName}
              required
            />
          </div>

          <div style={containerStyles} className={styles.doubleForm}>
            {/* Email */}
            <InputField
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              label="Email"
              errorMessage={errors.email}
              required
            />
            {/* Confirm Email */}
            <InputField
              type="email"
              name="confirmEmail"
              value={confirmEmail}
              onChange={handleInputChange}
              label="Repeat Email"
              errorMessage={errors.confirmEmail}
              required
            />
          </div>

          <div style={containerStyles} className={styles.doubleForm}>
            {/* Password Field */}
            <div>
              <InputField
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                label="Password"
                errorMessage={errors.password}
                required
              />
              {/* Password Validation Indicators */}
              <div className={styles.passwordCriteria}>
                {passwordValidations?.length && (
                  <div className={passwordValidations?.length ? styles.valid : styles.invalid}>
                    <GreenTick /> <span>At least 8 characters</span>
                  </div>
                )}
                {passwordValidations?.uppercase && (
                  <div className={passwordValidations?.uppercase ? styles.valid : styles.invalid}>
                    <GreenTick /> Contain 1 uppercase letter
                  </div>
                )}
                {passwordValidations?.number && (
                  <div className={passwordValidations?.number ? styles.valid : styles.invalid}>
                    <GreenTick /> Contain 1 number
                  </div>
                )}
                {passwordValidations?.specialChar && (
                  <div className={passwordValidations?.specialChar ? styles.valid : styles.invalid}>
                    <GreenTick /> At least 1 special character (!@#$%^&*)
                  </div>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <InputField
              type="tel"
              name="phone"
              value={phone}
              onChange={handleInputChange}
              label="Phone Number"
              errorMessage={errors.phone}
              required
            />
          </div>

          <div style={containerStyles} className={styles.doubleForm}>
            <div className={`${gridColumn === "1fr" && styles.slidingSwitchReverse} ${styles.slidingSwitch}`}>
              <SlidingRadioSwitch toggleLabel={""} onToggle={(value) => console.log(value)} />
              <p className={styles.switchLabel}>
                I have read and agree to Ahmed Seddiqi’ Terms of Service and Privacy Policy*
              </p>
            </div>
            <div className={`${gridColumn === "1fr" && styles.slidingSwitchReverse} ${styles.slidingSwitch}`}>
              <SlidingRadioSwitch toggleLabel={""} onToggle={(value) => console.log(value)} />
              <p className={styles.switchLabel}>
                I would also like to receive marketing information about AS&S products or services. We may send you this
                information using e-mail, text, telephone, post, social media or through online advertising. You can ask
                us to stop marketing at any time.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.submitBtnContainer}>
          <Button
            clickHandler={validateForm}
            className={styles.submitBtn}
            title="Register"
            isLink={false}
            type="solid"
            color="metallic"
          />
        </div>
      </form>
    </div>
  );
};

export default Register;

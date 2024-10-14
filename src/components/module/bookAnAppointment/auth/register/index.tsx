import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./register.module.scss"; // Assuming you're importing this
import Button from "@components/module/button";
import SlidingRadioSwitch from "@components/module/slidingRadioSwitch";
import { GreenTick } from "@assets/images/svg";
import InputField from "@components/module/inputField";

// Define types for the form errors
interface FormErrors {
  email?: string;
  confirmEmail?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  title?: string;
}

const passwordCriteria = {
  length: (password: string) => password.length >= 8,
  uppercase: (password: string) => /[A-Z]/.test(password),
  number: (password: string) => /\d/.test(password),
  specialChar: (password: string) => /[!@#$%^&*]/.test(password),
};

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  // Handle input change and validation
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setEmail(value);
        validateEmail(value);
        break;
      case "confirmEmail":
        setConfirmEmail(value);
        validateConfirmEmail(email, value);
        break;
      case "password":
        setPassword(value);
        validatePassword(value);
        break;
      case "firstName":
        setFirstName(value);
        validateFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        validateLastName(value);
        break;
      case "phone":
        setPhone(value);
        validatePhone(value);
        break;
      case "title":
        setTitle(value);
        validateTitle(value);
        break;
      default:
        break;
    }
  };

  // Password Validation Feedback
  const validatePassword = (password: string) => {
    setPasswordValidations({
      length: passwordCriteria.length(password),
      uppercase: passwordCriteria.uppercase(password),
      number: passwordCriteria.number(password),
      specialChar: passwordCriteria.specialChar(password),
    });

    let error = "";
    if (!password) {
      error = "Password is required.";
    } else if (
      !passwordCriteria.length(password) ||
      !passwordCriteria.uppercase(password) ||
      !passwordCriteria.number(password) ||
      !passwordCriteria.specialChar(password)
    ) {
      error =
        "Password must be at least 8 characters, contain one uppercase letter, one number, and one special character.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, password: error }));
  };

  const validateEmail = (email: string) => {
    let error = "";
    if (!email) {
      error = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      error = "Invalid email format.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, email: error }));
  };

  const validateConfirmEmail = (email: string, confirmEmail: string) => {
    let error = "";
    if (email !== confirmEmail) {
      error = "Emails do not match.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, confirmEmail: error }));
  };

  const validateFirstName = (firstName: string) => {
    let error = "";
    if (!firstName) {
      error = "First Name is required.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, firstName: error }));
  };

  const validateLastName = (lastName: string) => {
    let error = "";
    if (!lastName) {
      error = "Last Name is required.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, lastName: error }));
  };

  const validatePhone = (phone: string) => {
    let error = "";
    if (!phone) {
      error = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phone)) {
      error = "Phone number must be 10 digits.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, phone: error }));
  };

  const validateTitle = (title: string) => {
    let error = "";
    if (!title) {
      error = "Title is required.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, title: error }));
  };

  const validateForm = (): boolean => {
    validateEmail(email);
    validateConfirmEmail(email, confirmEmail);
    validatePassword(password);
    validateFirstName(firstName);
    validateLastName(lastName);
    validatePhone(phone);
    validateTitle(title);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    return !hasErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log({ email, password, firstName, lastName, phone });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.signin} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <div className={styles.doubleForm}>
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

          <div className={styles.doubleForm}>
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

          <div className={styles.doubleForm}>
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

          <div className={styles.doubleForm}>
            <div className={styles.slidingSwitch}>
              <SlidingRadioSwitch onToggle={() => console.log("")} />
              <p className={styles.switchLabel}>
                I have read and agree to Ahmed Seddiqi’s Terms of Service and Privacy Policy*{" "}
              </p>
            </div>
            <div className={styles.slidingSwitch}>
              <SlidingRadioSwitch onToggle={() => console.log("")} />
              <p className={styles.switchLabel}>
                I would also like to receive marketing information about Ahmed Seddiqi’s products or services.
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

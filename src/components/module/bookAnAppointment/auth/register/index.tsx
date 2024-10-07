import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./register.module.scss"; // Assuming you're importing this
import InputField from "../inputField"; // Make sure this path is correct
import Button from "@components/module/button";
import SlidingRadioSwitch from "@components/module/slidingRadioSwitch";

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

const Register: React.FC = () => {
  // State variables with appropriate types
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [title, setTitle] = useState<string>(""); // Added state for title

  const [errors, setErrors] = useState<FormErrors>({}); // Using the FormErrors type

  // Handle input change with type annotations
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "confirmEmail":
        setConfirmEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "title": // Added case for title
        setTitle(value);
        break;
      default:
        break;
    }
  };

  // Form validation with type annotations
  const validateForm = (): boolean => {
    const formErrors: FormErrors = {};

    if (!email) {
      formErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      formErrors.email = "Invalid email format.";
    }

    if (email !== confirmEmail) {
      formErrors.confirmEmail = "Emails do not match.";
    }

    if (!password) {
      formErrors.password = "Password is required.";
    } else if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
      formErrors.password =
        "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.";
    }

    if (!firstName) {
      formErrors.firstName = "First Name is required.";
    }

    if (!lastName) {
      formErrors.lastName = "Last Name is required.";
    }

    if (!phone) {
      formErrors.phone = "Phone number is required.";
    }

    if (!title) {
      formErrors.title = "Title is required."; // Validation for title
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Form submission logic
      console.log({ email, password, firstName, lastName, phone });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.signin} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <div className={styles.doubleForm}>
            {/* First Name */}
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
              name="repeatEmail"
              value={confirmEmail}
              onChange={handleInputChange}
              label="Repeat Email"
              errorMessage={errors.confirmEmail}
              required
            />
          </div>
          <div className={styles.doubleForm}>
            {/* Password */}
            <InputField
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              label="Password"
              errorMessage={errors.password}
              required
            />

            {/* Phone Number */}

            {/* First Name */}
            <div className={styles.optionSelector}>
              <InputField
                type="tel"
                name="phone"
                value={phone}
                onChange={handleInputChange}
                // label="Phone Number"
                errorMessage={errors.phone}
                required
                options={["+91"]}
              />
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
            <Button className={styles.submitBtn} title="Register" isLink={true} type="solid" color="metallic" />
          </div>
      </form>
    </div>
  );
};

export default Register;

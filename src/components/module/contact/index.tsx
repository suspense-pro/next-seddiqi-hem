import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./contact.module.scss";
import InputField from "../inputField";
import Button from "../button";
import { countryCodes } from "./countryCodes";
import { validateEmail, validateFirstName, validateLastName, validatePhone } from "@utils/helpers/validations";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    topic: "Returns & Refunds",
    orderNumber: "",
    firstName: "",
    lastName: "",
    phoneCode: "+971",
    phoneNumber: "",
    email: "",
    description: "",
  });

  type FormErrors = {
    topic: string;
    orderNumber?: string;
    firstName: string;
    lastName: string;
    phoneCode?: string;
    phoneNumber?: string;
    email: string;
    description: string;
  };

  const [errors, setErrors] = useState<FormErrors>({
    topic: "",
    orderNumber: "",
    firstName: "",
    lastName: "",
    phoneCode: "",
    phoneNumber: "",
    email: "",
    description: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Check for form errors before submission
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };
    if (name === "phoneNumber") {
      if (/^\d*$/.test(value) && value.length <= 10) {
        updatedFormData = { ...formData, [name]: value };
      }
    }

    // Auto-populate phoneCode based on phoneNumber prefix
    if (name === "phoneNumber") {
      const prefix = value.slice(0, 3);
      for (const [code, prefixes] of Object.entries(countryCodes)) {
        if (prefixes.some((p) => value.startsWith(p))) {
          updatedFormData.phoneCode = code;
          break;
        }
      }
    }

    setFormData(updatedFormData);
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let errorMessage = "";

    switch (name) {
      case "firstName":
        errorMessage = validateFirstName(value);
        break;
      case "lastName":
        if (/\d/.test(value)) {
          errorMessage = "Last Name should not contain numbers.";
        } else {
          errorMessage = validateLastName(value);
        }
        break;
      case "phoneNumber":
        errorMessage = validatePhone(value);
        break;
      case "email":
        errorMessage = validateEmail(value);
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const validateForm = (): boolean => {
    const updatedErrors: FormErrors = {
      topic: "",
      orderNumber: "",
      firstName: validateFirstName(formData.firstName),
      lastName: validateLastName(formData.lastName),
      phoneCode: "",
      phoneNumber: validatePhone(formData.phoneNumber),
      email: validateEmail(formData.email),
      description: "",
    };

    setErrors(updatedErrors);
    return !Object.values(updatedErrors).some((error) => error !== "");
  };

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Contact Us</h2>

      <div className={styles.doubleForm}>
        <InputField
          name="topic"
          showLabel={true}
          label="Select a topic"
          value={formData.topic}
          onChange={handleChange}
          options={["Returns & Refunds", "Order Issue", "General Inquiry"]}
          required
          optionFull
        />

        <InputField
          name="orderNumber"
          label="Order Number"
          type="text"
          value={formData.orderNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.doubleForm}>
        <InputField
          name="firstName"
          label="First Name"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          errorMessage={errors.firstName}
          required
        />

        <InputField
          name="lastName"
          label="Last Name"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          errorMessage={errors.lastName}
          required
        />
      </div>
      <div className={styles.doubleForm}>
        <div className={styles.optionSelector}>
          <InputField
            name="phoneCode"
            label=""
            value={formData.phoneCode}
            onChange={handleChange}
            options={Object.keys(countryCodes)}
            // required
          />

          <InputField
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            errorMessage={errors.phoneNumber}
            // required
          />
        </div>
        <InputField
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          errorMessage={errors.email}
          required
        />
      </div>

      <InputField
        name="description"
        label="Description"
        type="textarea"
        value={formData.description}
        onChange={handleChange}
        required
      />

      {/* Attachment Input (placeholder) */}
      <div className={styles.attachmentField}>
        <label>Attachments</label>
        <div className={styles.attachment}>
          <input type="file" accept="image/*,application/pdf" />
          <div className={styles.fileInfo}>Upload (Max 10 MB)</div>
        </div>
      </div>

      <div className={styles.btnContainer}>
        <Button
          clickHandler={handleSubmit}
          className={styles.submitBtn}
          title="Submit"
          isLink={false}
          type="solid"
          color="metallic"
        />
      </div>
    </form>
  );
};

export default ContactForm;

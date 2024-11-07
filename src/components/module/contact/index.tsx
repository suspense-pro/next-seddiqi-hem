import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./contact.module.scss";
import InputField from "../inputField";
import Button from "../button";

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

  const [errors, setErrors] = useState({
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Simple email registration error check
    if (name === "email") {
      if (value === "aareza@gmail.com") {
        setErrors((prev) => ({ ...prev, email: "This account is already registered, please sign in" }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log("Form submitted:", formData);
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
          required
        />

        <InputField
          name="lastName"
          label="Last Name"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
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
            options={["+971", "+44", "+61"]}
            required
          />

          <InputField
            name="phoneNumber"
            // label="Phone Number"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
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
        type="text"
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

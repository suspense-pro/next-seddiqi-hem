import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./contactForm.module.scss";
import InputField from "../inputField";
import Button from "../button";
import {
  validateDescription,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePhone,
} from "@utils/helpers/validations";
import { contactUs } from "@utils/sfcc-connector/dataService";
import { useRouter } from "next/router";
import { ContactUsFormErrors } from "@utils/models/errors";
import { countryCodes } from "@utils/data/countryCodes";
import SlidingRadioSwitch from "../slidingRadioSwitch";

const ContactForm = () => {
  const router = useRouter();
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    topic: "Suggestion",
    orderNumber: "",
    firstName: "",
    lastName: "",
    phoneCode: "+971",
    phoneNumber: "",
    email: "",
    description: "",
  });
  const [errors, setErrors] = useState<ContactUsFormErrors>({
    topic: "",
    orderNumber: "",
    firstName: "",
    lastName: "",
    phoneCode: "",
    phoneNumber: "",
    email: "",
    description: "",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      const userData = {
        type: formData.topic,
        orderReferenceNumber: formData.orderNumber,
        message: formData.description,
        phoneNumber: `${formData.phoneCode} ${formData.phoneNumber}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        privacyPolicy: agreedToTerms,
        emailMarketing: marketingOptIn,
      };
      const data = new FormData();
      Object.keys(userData).forEach((key) => {
        data.append(key, userData[key as keyof typeof userData] as string);
      });

      if (attachment) {
        data?.append("attachment", attachment);
      }
      try {
        const response = await contactUs({
          method: "POST",
          userData: data,
        });

        if (!response?.isError) {
          router.push("/contact-us/confirmation");
        } else {
          alert("Failed to send email");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };
    if (name === "phoneNumber") {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      }
      return;
    }
    if (name === "lastName" && /\d/.test(value)) {
      return;
    }

    setFormData(updatedFormData);
    validateField(name, value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.size <= 10 * 1024 * 1024) {
        // 10 MB limit
        setAttachment(file);
      } else {
        alert("Please select a file smaller than 10 MB.");
      }
    }
  };

  const validateField = (name: string, value: string) => {
    let errorMessage = "";

    switch (name) {
      case "firstName":
        errorMessage = validateFirstName(value);
        break;
      case "lastName":
        errorMessage = validateLastName(value);
        break;
      case "phoneNumber":
        errorMessage = validatePhone(value);
        break;
      case "email":
        errorMessage = validateEmail(value);
        break;
      case "description":
        errorMessage = validateDescription(value);
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const validateForm = (): boolean => {
    const updatedErrors: ContactUsFormErrors = {
      topic: "",
      orderNumber: "",
      firstName: validateFirstName(formData.firstName),
      lastName: validateLastName(formData.lastName),
      phoneCode: "",
      phoneNumber: validatePhone(formData.phoneNumber),
      email: validateEmail(formData.email),
      description: validateDescription(formData.description),
    };

    setErrors(updatedErrors);
    return !Object.values(updatedErrors).some((error) => error !== "");
  };

  return (
    <form className={styles.contactForm}>
      <h2 className={styles.heading}>Contact Us</h2>

      <div className={`${styles.singleForm} ${styles.doubleForm}`}>
        <InputField
          name="topic"
          showLabel={true}
          label="Select a topic"
          value={formData.topic}
          onChange={handleChange}
          options={["Suggestion", "Query", "Warranty", "Complaint"]}
          required
          optionFull
        />

        {/* <InputField
          name="orderNumber"
          label="Order Number"
          type="text"
          value={formData.orderNumber}
          onChange={handleChange}
          required
        /> */}
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
            options={countryCodes}
          />

          <InputField
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            errorMessage={errors.phoneNumber}
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
        errorMessage={errors.description}
        required
      />

      {/* Attachment Input */}
      <div className={styles.attachmentField}>
        <label>Attachments</label>
        <div className={styles.attachment}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <div onChange={handleFileChange} className={styles.fileInfo}>
            {attachment?.name ? `Selected File: ${attachment?.name}` : "Upload (Max 10 MB)"}
          </div>
        </div>
      </div>

      <div className={styles.doubleForm}>
        <div className={`${styles.slidingSwitch}`}>
          <SlidingRadioSwitch toggleLabel={""} onToggle={(value) => setAgreedToTerms(!value)} value={agreedToTerms} />
          <p className={styles.switchLabel}>I agree to Ahmed Seddiqi & Sons Terms & Conditions and Privacy Policy.</p>
        </div>
        <div className={`${styles.slidingSwitch}`}>
          <SlidingRadioSwitch toggleLabel={""} onToggle={(value) => setMarketingOptIn(!value)} value={marketingOptIn} />
          <p className={styles.switchLabel}>
            I consent to receiving occasional marketing communications and event invitations from Ahmed Seddiqi & Sons,
            its affiliates, and group companies via phone, email, SMS, or WhatsApp channels.
          </p>
        </div>
      </div>

      <div className={styles.btnContainer}>
        <Button
          clickHandler={(e) => handleSubmit(e)}
          className={styles.submitBtn}
          title={isLoading ? "Submitting" : "Submit"}
          isLink={false}
          type="transparent"
          color="metallic"
          disabled={isLoading}
        />
      </div>
    </form>
  );
};

export default ContactForm;

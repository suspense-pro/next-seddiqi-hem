import { useState, ChangeEvent } from "react";
import styles from "./inputField.module.scss";

interface InputFieldProps {
  name?: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  required?: boolean;
}

export default function InputField({
  name,
  label,
  type,
  value,
  onChange,
  errorMessage,
  required = false,
}: InputFieldProps) {
  return (
    <div className={styles.inputGroup}>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={errorMessage ? styles.inputError : ""}
        placeholder=" "
        required={required}
      />
      <label>
        {label}
        {required && "*"}
      </label>
      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
}

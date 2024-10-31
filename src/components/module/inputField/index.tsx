import { useState, ChangeEvent } from "react";
import styles from "./inputField.module.scss";

interface InputFieldProps {
  name?: string;
  label?: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errorMessage?: string;
  required?: boolean;
  optionFull?: boolean;
  options?: string[];
}

export default function InputField({
  name,
  label,
  type,
  value,
  onChange,
  errorMessage,
  required = false,
  options,
  optionFull = false,
}: InputFieldProps) {
  if (optionFull) {
    return (
      <div className={`${styles.selectGroupFull} ${styles.selectGroup}`}>
        <select
          value={value || options[0]}
          name={name}
          onChange={onChange}
          className={errorMessage ? styles.inputError : ""}
          required={required}
        >
          <option value="" disabled hidden>
            {required ? `${label} *` : label}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      <div className={`${!options ? styles.inputGroup : styles.selectGroup}`}>
        {options ? (
          <>
            <label>
              {label}
              {/* {required && "*"} */}
            </label>
            <select
              value={value || options[0]}
              name={name}
              onChange={onChange}
              className={errorMessage ? styles.inputError : ""}
              required={required}
            >
              <option value="" disabled hidden>
                {required ? `${label} *` : label}
              </option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
}

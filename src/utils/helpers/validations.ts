// validationUtils.ts

export interface FormErrors {
  email?: string;
  confirmEmail?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  title?: string;
}

export const passwordCriteria = {
  length: (password: string) => password.length >= 8,
  uppercase: (password: string) => /[A-Z]/.test(password),
  number: (password: string) => /\d/.test(password),
  specialChar: (password: string) => /[!@#$%^&*]/.test(password),
};

export const validatePassword = (password: string): string => {
  if (!password) {
    return "Password is required.";
  } else if (
    !passwordCriteria.length(password) ||
    !passwordCriteria.uppercase(password) ||
    !passwordCriteria.number(password) ||
    !passwordCriteria.specialChar(password)
  ) {
    return "Password must be at least 8 characters, contain one uppercase letter, one number, and one special character.";
  }
  return "";
};

export const validateLoginPassword = (value: string): string | undefined => {
  if (!value) {
    return "Password is required.";
  }
};

export const validatePhoneNumber = (value: string): string | undefined => {
  const phonePattern = /^[0-9]{6,15}$/;
  if (!phonePattern.test(value)) {
    return "Please enter a valid phone number.";
  }
};

export const validateEmail = (email: string): string => {
  if (!email) {
    return "Email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Invalid email format.";
  }
  return "";
};

export const validateConfirmEmail = (email: string, confirmEmail: string): string => {
  if (!email) {
    return "Repeat email is required.";
  } else if (email !== confirmEmail) {
    return "Emails do not match.";
  }
  return "";
};

export const validateFirstName = (firstName: string): string => {
  if (!firstName) {
    return "First Name is required.";
  }
  return "";
};

export const validateLastName = (lastName: string): string => {
  if (!lastName) {
    return "Last Name is required.";
  }
  return "";
};

export const validatePhone = (phone: string): string => {
  if (!phone) {
    return "Phone number is required.";
  } else if (!/^\d{10}$/.test(phone)) {
    return "Phone number must be 10 digits.";
  }
  return "";
};

export const validateTitle = (title: string): string => {
  if (!title) {
    return "Title is required.";
  }
  return "";
};

import React, { useState, useRef, useEffect } from "react";
import styles from "./otp.module.scss";
import CustomCheckbox from "../auth/customCheckbox";

const OtpComponent = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30); // Countdown timer for resend button
  const inputRefs = useRef([]);

  // Handle input change and update OTP state
  const handleChange = (element, index) => {
    const value = element.value;

    if (value.match(/^[0-9]{1}$/)) {
      // Allow only numbers
      const newOtp = [...otp];
      newOtp[index] = value; // Update OTP value
      setOtp(newOtp);

      // Auto-focus the next input field
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace to move focus backward and clear input
  const handleBackspace = (e, index) => {
    const element = e.target;

    // If Backspace is pressed and the input is empty, move to the previous input
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = ""; // Clear the current input
      setOtp(newOtp);

      if (element.value === "" && index > 0) {
        inputRefs.current[index - 1]?.focus(); // Move focus to the previous input
      }
    }
  };

  // Timer countdown for resend button
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    setTimer(30); // Reset the timer
    // Logic to resend OTP
    console.log("Resend OTP triggered");
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");
    console.log("Submitted OTP:", otpValue);
    // Handle OTP submission logic here
  };

  return (
    <div className={styles.otpContainer}>
      <h2>Enter your OTP</h2>
      <p>Please enter the code we have sent to your phone +971 ********57.</p>
      <div className={styles.otpInputs}>
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>
      <div className={styles.resendSection}>
        {timer === 0 ? (
          <button className={styles.resendBtn} onClick={handleResend}>
            Send Again
          </button>
        ) : (
          <span className={styles.timer}>Send Again In {timer}s</span>
        )}
      </div>
      <button className={styles.submitBtn} onClick={handleSubmit}>
        SIGN IN
      </button>
      <CustomCheckbox
        label="I have read and agree to Ahmed Seddiqi's Terms of Service and Privacy Policy"
        subText=""
      />
      <CustomCheckbox
        label="I would also like to receive marketing information about Ahmed Seddiqi's products or services."
        subText=""
      />
    </div>
  );
};

export default OtpComponent;

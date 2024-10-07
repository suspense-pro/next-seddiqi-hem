import React, { useState, useRef, useEffect } from "react";
import styles from "./otp.module.scss";
import CustomCheckbox from "../auth/customCheckbox";
import Button from "@components/module/button";

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
      <div>
        <p>Please enter the code we have sent to your phone</p>
        <p>+971 *********57. This is a one time verification.</p>
      </div>
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
          <div className={styles.timer}>
            <span onClick={handleResend} className={styles.optTimer}>
              Send Again
            </span>
          </div>
        ) : (
          <span className={styles.timer}>
            Didn’t receive a come? <span className={styles.optTimer}>Send again in {timer}s</span>
          </span>
        )}
      </div>

      <div className={styles.submitBtn}>
        <Button className={styles.signinBtn} color={"metallic"} isLink={false} clickHandler={handleSubmit} title="Sign In" type={'solid'}  />
      </div>
      {/* <CustomCheckbox
        label="I have read and agree to Ahmed Seddiqi's Terms of Service and Privacy Policy"
        subText=""
      />
      <CustomCheckbox
        label="I would also like to receive marketing information about Ahmed Seddiqi's products or services."
        subText=""
      /> */}
    </div>
  );
};

export default OtpComponent;

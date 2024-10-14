import { useContext, useState } from "react";
import styles from "./bookAnAppointment.module.scss";
import { BookAppointmentContext } from "@contexts/bookAppointmentContext";
import { CloseIconV2 } from "@assets/images/svg";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepFour from "./stepFour";

const Step3 = () => <div>Content for Step 3</div>;
const Step4 = () => <div>Content for Step 4</div>;
const Step5 = () => <div>Content for Step 5</div>;

const BookAnAppointment = ({ content }) => {
  const { completedSteps, currentStep, handleStepChange, setSelectedCard } = useContext(BookAppointmentContext);

  const steps = [1, 2, 3, 4, 5];
  const stepOne = content?.page?.setpOne;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepOne content={stepOne} />;
      case 2:
        return <StepTwo />;
      case 3:
        return <Step3 />;
      case 4:
        return <StepFour />;
      case 5:
        return <Step5 />;
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.title}>Book an appointment</div>
        <CloseIconV2 />
      </div>

      {/* Breadcrumb Navigation */}
      <div className={styles.breadcrumb}>
        {steps.map((step, index) => (
          <div key={index} className={styles.breadcrumbItem}>
            <div
              onClick={() => {
                if (completedSteps[index]) {
                  handleStepChange(index + 1);
                }
              }}
            >
              <span
                className={`${styles.circle} ${completedSteps[index] && styles.completed} ${
                  index + 1 === currentStep ? styles.active : ""
                }`}
              >
                {index + 1}
              </span>
            </div>
            {index < steps.length - 1 && <span className={styles.line}></span>}
          </div>
        ))}
      </div>
      <div className={styles.stepContent}>{renderStepContent()}</div>
    </div>
  );
};

export default BookAnAppointment;

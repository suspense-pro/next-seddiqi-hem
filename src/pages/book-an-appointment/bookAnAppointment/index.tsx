import { useContext, useState } from "react";
import StepOne from "../stepOne";
import StepTwo from "../stepTwo";
import styles from "./index.module.scss";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { BookAppointmentContext } from "@contexts/bookAppointmentContext";
import { CloseIconV2 } from "@assets/images/svg";

// Step Components
const Step3 = () => <div>Content for Step 3</div>;
const Step4 = () => <div>Content for Step 4</div>;
const Step5 = () => <div>Content for Step 5</div>;

const BookAnAppointment = ({ content }) => {
  console.log("CONTENT", content);
  const { selectedCard, completedSteps, currentStep, handleStepChange, setSelectedCard } =
    useContext(BookAppointmentContext);
  const steps = [
    { href: "/step1", label: "Step 1" },
    { href: "/step2", label: "Step 2" },
    { href: "/step3", label: "Step 3" },
    { href: "/step4", label: "Step 4" },
    { href: "/step5", label: "Step 5" },
  ];

  const stepOne = content?.page?.setpOne;
  const Step1 = () => (
    <StepOne content={stepOne} />
  );

  const Step2 = () => (
    <StepTwo />
  );

  // State for the current step and loading state
  const [loading, setLoading] = useState(false);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Step5 />;
      default:
        return <div>Invalid step</div>;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
            <div onClick={() => handleStepChange(index + 1)}>
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

      {/* Render the current step's content */}
      <div className={styles.stepContent}>{renderStepContent()}</div>
    </div>
  );
};

export default BookAnAppointment;

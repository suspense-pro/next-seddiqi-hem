import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./index.module.scss";
import StepOne from "./stepOne";
import { CloseIconV2 } from "@assets/images/svg";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import StepTwo from "./stepTwo";

// Step Components
const Step3 = () => <div>Content for Step 3</div>;
const Step4 = () => <div>Content for Step 4</div>;
const Step5 = () => <div>Content for Step 5</div>;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "book-an-appointment" },
      },
    },
    context
  );

  // if (isEmpty(data.page)) {
  //   return {
  //     redirect: {
  //       destination: "/page-not-found",
  //     },
  //   };
  // }
  return {
    props: {
      ...data,
    },
  };
}

const BookAnAppointment = ({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log("CONTENT", content);
  const [selectedCard, setSelectedCard] = useState(null);
  const steps = [
    { href: "/step1", label: "Step 1" },
    { href: "/step2", label: "Step 2" },
    { href: "/step3", label: "Step 3" },
    { href: "/step4", label: "Step 4" },
    { href: "/step5", label: "Step 5" },
  ];

  // Function to handle navigation between steps
  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const stepOne = content?.page?.setpOne;
  const Step1 = () => (
    <StepOne content={stepOne} handleStepChange={handleStepChange} setSelectedCard={setSelectedCard} />
  );
  const Step2 = () => (
    <StepTwo item={selectedCard} handleStepChange={handleStepChange} setSelectedCard={setSelectedCard} />
  );

  // State for the current step and loading state
  const [currentStep, setCurrentStep] = useState(null); // Set to null initially
  const [loading, setLoading] = useState(true);

  // On component mount, check if there's a saved step in localStorage
  useEffect(() => {
    const savedStep = localStorage.getItem("currentStep");
    if (savedStep) {
      setCurrentStep(Number(savedStep));
    } else {
      setCurrentStep(1); // Default to step 1 if nothing is in localStorage
    }
    setLoading(false); // Finished loading
  }, []);

  // Save the current step in localStorage whenever it changes
  useEffect(() => {
    if (currentStep !== null) {
      localStorage.setItem("currentStep", JSON.stringify(currentStep));
    }
  }, [currentStep]);

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
              <span className={`${styles.circle} ${index + 1 === currentStep ? styles.active : ""}`}>{index + 1}</span>
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

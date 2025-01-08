import React from "react";
import "./Stepper.css";

const Stepper = ({ currentStep }) => {
  const steps = ["Details", "AI Magic", "Plan"];

  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={`stepper-step ${
              currentStep === index + 1
                ? "active"
                : currentStep > index + 1
                ? "completed"
                : "inactive"
            }`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-label">{step}</div>
          </div>
          {index < steps.length - 1 && <div className="step-line"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;

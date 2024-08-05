import { CheckIcon } from "@heroicons/react/24/solid";
import React from "react";
import "app/styles/breadcrumb.css";

interface BreadcrumbProps {
  step: number;
  setStep: (step: number) => void;
  completedSteps?: boolean[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  step,
  setStep,
  completedSteps = [],
}) => {
  const steps = ["Horse Transport Details", "Contact Information"];

  return (
    <div className="breadcrumb-container">
      {steps.map((title, index) => (
        <div
          key={index}
          className={`breadcrumb-item ${step === index + 1 ? "active" : ""}`}
          onClick={() => setStep(index + 1)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && setStep(index + 1)}
        >
          <div className="breadcrumb-title text-xs md:text-sm whitespace-nowrap items-center gap-2">
            <div>
              {completedSteps[index] && (
                <CheckIcon className="w-5 h-5 text-primary ml-2" />
              )}
            </div>
            <div>{title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
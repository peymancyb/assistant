import React from "react";
import Done from "../../assets/done.svg";
import Step from "../../assets/step.svg";
import WhiteLogo from "../../assets/hoory/logo_white.png";

const stepItems = [
  "Name your assistant",
  "Select styles",
  "Create your account",
];

interface ISidebarProps {
  step: number;
}

function Sidebar({ step }: ISidebarProps) {
  return (
    <div className="sidebar-container">
      <div className="sidebar-logo-container">
        <img src={WhiteLogo} alt="white_logo" />
      </div>
      <div className="sidebar-content">
        {stepItems.map((currentStep, index) => {
          const stepIndex = index + 1;
          const isCurrentStep = step === stepIndex;
          const isStepPassed = step > stepIndex;
          const itemIcon = isStepPassed ? Done : Step;
          const itemStyle = isCurrentStep
            ? "sidebar-item-text-active"
            : "sidebar-item-text";
          return (
            <div
              key={`step-description-${index}`}
              className="sidebar-item-container"
            >
              <img src={itemIcon} alt="" />
              <p className={itemStyle}>{currentStep}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;

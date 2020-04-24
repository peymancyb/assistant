import React from "react";
import Text, { TextType, TextSize, TextAlign } from "../../components/Text";
import Button, { ButtonSize } from "../../components/Button";

interface ICongratulationProps {
  onNext: () => void;
  loading: boolean;
}

function Congratulation({ onNext, loading }: ICongratulationProps) {
  return (
    <div className="congratulation-container">
      <img src={require("../../assets/logos/female-1.svg")} alt="" />
      <Text type={TextType.bold} size={TextSize.large}>
        Fantastico{" "}
        <span role="img" aria-label="success-emoji">
          {" "}
          🎉
        </span>
      </Text>
      <Text align={TextAlign.center}>
        You have successfully setup the Hoory widget on your website! Proceed to
        Admin Dashboard to start training "name"
      </Text>
      <Button loading={loading} size={ButtonSize.large} onClick={onNext}>
        Go to Admin Dashboard
      </Button>
    </div>
  );
}

export default Congratulation;

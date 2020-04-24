import React from "react";
import HooryGrey from "../../assets/hoory/icon_grey.svg";
import Text, { TextType, TextSize, TextAlign } from "../../components/Text";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

interface IAssistantNameProps {
  onNext: () => void;
  name: string;
  onNameChange: (assistantName: string) => void;
}

function AssistantName({ onNext, name, onNameChange }: IAssistantNameProps) {
  return (
    <>
      <div className="flex-center">
        <img src={HooryGrey} alt="Hoory" />
        <Text
          type={TextType.bold}
          size={TextSize.large}
          align={TextAlign.center}
        >
          hoory
        </Text>
      </div>
      <div className="assistant-input-container">
        <Text type={TextType.bold}>Name your assistant</Text>
        <TextInput
          value={name}
          onChangeText={(assistantName) => onNameChange(assistantName)}
        />
        <Button onClick={onNext}>
          <p>Start</p>
        </Button>
      </div>
    </>
  );
}

export default AssistantName;

import React from "react";
import Text, { TextType, TextSize } from "../../components/Text";
import Button from "../../components/Button";
import { AssistantGender } from "./index";
import Skins from "./Skins";

const getIcon = (
  gender: AssistantGender,
  isSelected: boolean,
  index: number
) => {
  const iconName = isSelected
    ? `${gender}-selected-${index}`
    : `${gender}-${index}`;
  return require("../../assets/logos/" + iconName + ".svg");
};

interface ISchemeColorProps {
  onNext: () => void;
  onColorSchemeChange: (colorSheme: number) => void;
  onGenderChange: (gender: AssistantGender) => void;
  assistantName: string;
  gender: AssistantGender;
  colorScheme: number;
}

function SchemeColor({
  onNext,
  onColorSchemeChange,
  onGenderChange,
  assistantName,
  gender,
  colorScheme,
}: ISchemeColorProps) {
  const isMale = gender === AssistantGender.male;
  const femaleIconPath = getIcon(AssistantGender.female, !isMale, colorScheme);
  const maleIconPath = getIcon(AssistantGender.male, isMale, colorScheme);

  return (
    <>
      <Text type={TextType.bold} size={TextSize.large}>
        Select {assistantName}'s icon
      </Text>
      <div className="assistant-selector-container">
        <img
          onClick={() => onGenderChange(AssistantGender.female)}
          src={femaleIconPath}
          alt="female-hoory-assistant"
        />
        <img
          onClick={() => onGenderChange(AssistantGender.male)}
          src={maleIconPath}
          alt="male-hoory-assistant"
        />
      </div>
      <Text type={TextType.bold} size={TextSize.medium}>
        Select color scheme
      </Text>
      <Skins
        colorScheme={colorScheme}
        onColorSchemeChange={onColorSchemeChange}
      />
      <Button onClick={onNext}>
        <p>Next</p>
      </Button>
    </>
  );
}

export default SchemeColor;

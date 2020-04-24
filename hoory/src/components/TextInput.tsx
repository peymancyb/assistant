import React from "react";

export enum InputType {
  TEXT = "text",
  PASSWORD = "password",
}

export enum Align {
  left = "left",
  center = "center",
}

interface ITextInput {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  aling?: Align;
  className?: string;
  type?: InputType;
}

function TextInput({
  value,
  onChangeText,
  placeholder = "",
  aling = Align.left,
  className = "",
  type = InputType.TEXT,
}: ITextInput) {
  const _handleOnChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const { value } = event.target;
    onChangeText(value);
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={_handleOnChangeText}
      className={`text-input-${aling} ${className}`}
    />
  );
}

export default TextInput;

import React from "react";
import TextInput, { InputType } from "../../components/TextInput";
import Button, { ButtonSize, ButtonTypes } from "../../components/Button";
import Text, { TextType, TextSize } from "../../components/Text";
import { Link } from "react-router-dom";
interface ICreateAccountProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  onFirstNameChange: (firstName: string) => void;
  onLastNameChange: (lastName: string) => void;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onNext: () => void;
}

function CreateAccount({
  firstName,
  lastName,
  email,
  password,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPasswordChange,
  onNext,
}: ICreateAccountProps) {
  return (
    <div className="create-account-container">
      <Text type={TextType.bold} size={TextSize.medium}>
        Create your account
      </Text>
      <Button
        size={ButtonSize.large}
        type={ButtonTypes.tertiary}
        onClick={() => {}}
      >
        <div className="flex-center-row">
          <img
            className="google-icon"
            src={require("../../assets/google_icon.svg")}
            alt=""
          />
          <Text>Sign Up with Google</Text>
        </div>
      </Button>
      <Text>------or------</Text>
      <div className="flex-center-row">
        <TextInput
          placeholder={"First name"}
          value={firstName}
          onChangeText={onFirstNameChange}
          className="small-input"
        />
        <TextInput
          placeholder={"Last name"}
          value={lastName}
          onChangeText={onLastNameChange}
          className="small-input"
        />
      </div>
      <TextInput
        placeholder={"Email"}
        value={email}
        onChangeText={onEmailChange}
      />
      <TextInput
        type={InputType.PASSWORD}
        placeholder={"Password"}
        value={password}
        onChangeText={onPasswordChange}
      />
      <Text size={TextSize.small}>
        By registering an account with us you agree to the PP and T&C
      </Text>
      <Button size={ButtonSize.medium} onClick={onNext}>
        <p>Create account</p>
      </Button>
      <Text size={TextSize.small}>
        Have an account? <Link to="/login">Sign In</Link>
      </Text>
    </div>
  );
}

export default CreateAccount;

import React, { useState } from "react";
import If from "../../components/If";
import AssistantName from "./AssistantName";
import SchemeColor from "./SchemeColor";
import CreateAccount from "./CreateAccount";
import Congratulation from "./Congratulation";
import Sidebar from "./Sidebar";
import { useHistory } from "react-router-dom";
import { Routes } from "../routes";
import {
  createUserWorkspace,
  createUserAccount,
  ICreateUserData,
  IWorkspaceData,
  loginUser,
} from "../../store/actions";
import { connect } from "react-redux";

enum Step {
  ASSISTANT_NAME = 1,
  SCHEME_COLOR,
  CREATE_ACCOUNT,
  CONGRATULATION,
}

export enum AssistantGender {
  male = "male",
  female = "female",
}

interface IFormState {
  step: number;
  assistantName: string;
  gender: AssistantGender;
  colorScheme: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IWizardProps {
  createUserWorkspace: (workspaceData: IWorkspaceData) => Promise<any>;
  createUserAccount: (userData: ICreateUserData) => Promise<any>;
  loginUser: (email: string, password: string) => Promise<any>;
}

function Wizard(props: IWizardProps) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<IFormState>({
    step: Step.ASSISTANT_NAME,
    assistantName: "",
    gender: AssistantGender.female,
    colorScheme: 1,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleValueChange = (key: string) => (value: string | number) => {
    setForm((prevState) => ({ ...prevState, [key]: value }));
  };

  const onNextStep = () => {
    setForm((prevState) => ({ ...prevState, step: prevState.step + 1 }));
  };

  const _onNavigate = () => {
    history.push(Routes.DASHBOARD);
  };

  const submit = async () => {
    if (loading) {
      return;
    }

    const {
      firstName,
      lastName,
      email,
      password,
      assistantName,
      gender,
      colorScheme,
    } = form;

    try {
      setLoading(true);
      await props.createUserAccount({
        firstName,
        lastName,
        email,
        password,
      });
      await props.loginUser(email, password);
      await props.createUserWorkspace({
        assistantName,
        gender,
        colorScheme,
      });
      _onNavigate();
    } catch (error) {
      console.log("Wizard: submit: error -> ", error);
      alert("Oops! something went wrong please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wizard-layout">
      <div className="sidebar">
        <Sidebar step={form.step} />
      </div>
      <div className="wizard-content">
        <If condition={form.step === Step.ASSISTANT_NAME}>
          <AssistantName
            onNext={onNextStep}
            name={form.assistantName}
            onNameChange={handleValueChange("assistantName")}
          />
        </If>
        <If condition={form.step === Step.SCHEME_COLOR}>
          <SchemeColor
            assistantName={form.assistantName}
            gender={form.gender}
            colorScheme={form.colorScheme}
            onGenderChange={handleValueChange("gender")}
            onColorSchemeChange={handleValueChange("colorScheme")}
            onNext={onNextStep}
          />
        </If>
        <If condition={form.step === Step.CREATE_ACCOUNT}>
          <CreateAccount
            firstName={form.firstName}
            lastName={form.lastName}
            email={form.email}
            password={form.password}
            onFirstNameChange={handleValueChange("firstName")}
            onLastNameChange={handleValueChange("lastName")}
            onEmailChange={handleValueChange("email")}
            onPasswordChange={handleValueChange("password")}
            onNext={onNextStep}
          />
        </If>
        <If condition={form.step === Step.CONGRATULATION}>
          <Congratulation onNext={submit} loading={loading} />
        </If>
      </div>
    </div>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  createUserWorkspace,
  createUserAccount,
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wizard);

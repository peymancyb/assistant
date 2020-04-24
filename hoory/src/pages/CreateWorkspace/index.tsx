import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import AssistantName from "../Wizard/AssistantName";
import SchemeColor from "../Wizard/SchemeColor";
import If from "../../components/If";
import { Routes } from "../routes";
import { createUserWorkspace, IWorkspaceData } from "../../store/actions";

enum Step {
  ASSISTANT_NAME = 1,
  SCHEME_COLOR,
}

enum AssistantGender {
  male = "male",
  female = "female",
}

interface IFormState {
  step: number;
  assistantName: string;
  gender: AssistantGender;
  colorScheme: number;
}

interface ICreateWorkspaceProps {
  createUserWorkspace: (workspaceData: IWorkspaceData) => Promise<any>;
}

function CreateWorkspace({ createUserWorkspace }: ICreateWorkspaceProps) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<IFormState>({
    step: Step.ASSISTANT_NAME,
    assistantName: "",
    gender: AssistantGender.female,
    colorScheme: 1,
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

    const { assistantName, gender, colorScheme } = form;

    try {
      setLoading(true);
      await createUserWorkspace({
        assistantName,
        gender,
        colorScheme,
      });
      _onNavigate();
    } catch (error) {
      console.log("Create workspace: submit: error -> ", error);
      alert("Oops! something went wrong please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wizard-layout">
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
            onNext={submit}
          />
        </If>
      </div>
    </div>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  createUserWorkspace,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateWorkspace);

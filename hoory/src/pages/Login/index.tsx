import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../../assets/hoory/logo.svg";
import GoogleLogo from "../../assets/google_icon.svg";
import Text, { TextSize, TextAlign, TextType } from "../../components/Text";
import Button, { ButtonTypes, ButtonSize } from "../../components/Button";
import TextInput, { InputType } from "../../components/TextInput";
import { loginUser } from "../../store/actions";
import { Routes } from "../../pages/routes";

interface ILogin {
  loginUser: (email: string, password: string) => Promise<any>;
}

function Login(props: ILogin) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const _handleOnSubmit = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    props
      .loginUser(email, password)
      .then(() => {
        history.push(Routes.DASHBOARD);
      })
      .catch(() => {
        setLoading(false);
        alert("Email or Password is incorrect, please try again");
      });
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <img src={logo} className="App-logo" alt="logo" />
        <Text
          size={TextSize.medium}
          align={TextAlign.center}
          type={TextType.bold}
        >
          Sign to your account
        </Text>
        <Button
          type={ButtonTypes.tertiary}
          size={ButtonSize.large}
          onClick={() => {}}
        >
          <div className="flex-center-row">
            <img src={GoogleLogo} className="google-icon" alt="google-icon" />
            <Text size={TextSize.medium} align={TextAlign.center}>
              Sign In with Google
            </Text>
          </div>
        </Button>
        <Text size={TextSize.medium} align={TextAlign.center}>
          ------------or------------
        </Text>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput
          type={InputType.PASSWORD}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <Button loading={loading} onClick={_handleOnSubmit}>
          <Text size={TextSize.medium} align={TextAlign.center}>
            Sign In
          </Text>
        </Button>
        <div>
          <Text size={TextSize.small} align={TextAlign.center}>
            Don't have an account yet? <Link to="/wizard">Sign Up</Link>
          </Text>
          <Text size={TextSize.small} align={TextAlign.center}>
            <Link to="/login">Forgot password?</Link>
          </Text>
        </div>
      </div>
      <div className="login-footer" />
    </div>
  );
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

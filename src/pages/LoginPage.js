import React from "react";
import { Container } from "reactstrap";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

class LoginPage extends React.Component {
  state = {
    isLogin: true // true : loginForm | false : signupForm
  };

  // function to change the isLogin to true/false
  handleLogin = () => {
    this.setState({
      isLogin: !this.state.isLogin
    });
  };

  render() {
    const { isLogin } = this.state;
    return (
      <>
        <Container>
          {isLogin ? (
            <LoginForm
              handleLogin={this.handleLogin}
              loginUser={this.props.loginUser}
            />
          ) : (
            <SignUpForm
              handleLogin={this.handleLogin}
              signUpNewUser={this.props.signUpNewUser}
            />
          )}
        </Container>
      </>
    );
  }
}

export default LoginPage;

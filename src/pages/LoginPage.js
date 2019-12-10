import React from "react";
import { Container } from "reactstrap";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

class LoginPage extends React.Component {
  state = {
    isLogin: true // true : loginForm | false : signupForm
  };

  // function to change the isLogin to true/false
  signupOrLogin = () => {
    this.setState({
      isLogin: !this.state.isLogin
    });
    console.log(this.state.isLogin);
  };

  render() {
    const { isLogin } = this.state;
    return (
      <>
        <Container>
          {isLogin ? (
            <LoginForm
              signupOrLogin={this.signupOrLogin}
              handleLogin={this.props.handleLogin}
            />
          ) : (
            <SignUpForm
              signupOrLogin={this.signupOrLogin}
              signUpNewUser={this.props.signUpNewUser}
            />
          )}
        </Container>
      </>
    );
  }
}

export default LoginPage;

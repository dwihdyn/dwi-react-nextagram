import React from "react";

class LoginForm extends React.Component {
  state = {
    username: ``,
    password: ``
  };

  submitDataToAppJs = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.handleLogin(username, password);
  };

  // handle both username & password onChange
  handleTypedInData = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    const { username, password } = this.state;
    return (
      <>
        <h1 className="text-center">Login Form : Your Account</h1>

        <form onSubmit={e => this.submitDataToAppJs(e)}>
          <input
            className="form-control"
            type="text"
            name="username"
            placeholder="Enter username ...."
            value={username}
            onChange={e => {
              this.handleTypedInData(e.target.name, e.target.value);
            }}
          />
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Enter password ...."
            value={password}
            onChange={e => {
              this.handleTypedInData(e.target.name, e.target.value);
            }}
          />
          <button>Login</button>
        </form>

        <button className="btn btn-link" onClick={this.props.signupOrLogin}>
          {" "}
          No account ? sign up now!{" "}
        </button>
      </>
    );
  }
}

export default LoginForm;

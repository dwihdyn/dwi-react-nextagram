import React from "react";

class LoginForm extends React.Component {
  state = {
    userName: ``,
    passWord: ``
  };

  // function that sends the user credentials to app.js
  handleSubmitOldUser = e => {
    e.preventDefault();
    const { userName, passWord } = this.state;
    // sends username & password data to app.js
    this.props.loginUser(userName, passWord);
  };

  handleTypedInData = (name, value) => {
    this.setState({
      [name]: value // [name] will change to `userName` when user entering data in username, and same idea for `passWord`
    });
  };

  render() {
    const { userName, passWord } = this.state;
    return (
      <>
        <h1 className="text-center">Login Form : Your Account</h1>
        {/* direct form submit to app.js using handleSubmitOldUser */}
        <form onSubmit={e => this.handleSubmitOldUser(e)}>
          <input
            className="form-control"
            type="text"
            name="userName" // must be same as your state name. to let computer know, that this input is the `userName`
            placeholder="Enter username ...."
            value={userName}
            onChange={e => {
              this.handleTypedInData(e.target.name, e.target.value); // update to state when event is happening (user typing input)
            }}
          />
          <input
            className="form-control"
            type="password"
            name="passWord" // must be same as your state name. to let computer know, that this input is the `passWord`
            placeholder="Enter password ...."
            value={passWord}
            onChange={e => {
              this.handleTypedInData(e.target.name, e.target.value); // update to state when event is happening (user typing input)
            }}
          />
          <button>Login</button>
        </form>

        {/* want to direct user to SignUpForm page when clicked the link below  */}
        <button className="btn btn-link" onClick={this.props.handleLogin}>
          {" "}
          No account ? sign up now!{" "}
        </button>
      </>
    );
  }
}

export default LoginForm;

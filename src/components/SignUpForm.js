import React from "react";
import { Input, FormFeedback, FormGroup } from "reactstrap";
import axios from "axios";

class SignUpForm extends React.Component {
  state = {
    userName: ``,
    email: ``,
    passWord: ``,
    usernameValid: null,
    reEnterPassWord: ``
  };

  // function to submit new user credentials to app.js
  handleSubmitNewUser = e => {
    e.preventDefault();
    const { userName, email, passWord } = this.state;

    // upload new user data into the current state to LoginPage.js, and then from LoginPage.js(parent) send to App.js(grandparent)
    this.props.signUpNewUser(userName, email, passWord);
  };

  // check whether the username entered is taken or not
  handleUsernameAvailable = e => {
    if (e.target.value.length >= 6) {
      axios
        .get(
          `https://insta.nextacademy.com/api/v1/users/check_name?username=${e.target.value}`
        )
        .then(response => {
          // console.log(response.data);
          // console.log(`username exist ? ${response.data.exists}`);
          // console.log(`username can be used ? ${response.data.valid}`);
          if (response.data.exists === false && response.data.valid === true) {
            this.setState({
              usernameValid: true
            });
            // console.log(this.state.usernameValid);
          } else {
            this.setState({
              usernameValid: false
            });
            // console.log(`this username is taken, skipped line 38 code`);
          }
        });
    } else {
      this.setState({
        usernameValid: false
      });
    }
  };

  // function to let user finish typing first before checking the usename availability. (reduce backend work)
  handleInputAndDelay = e => {
    let enterredData = { ...e }; //  e = userName | {...e} = {0: "u", 1: "s", 2: "e", 3: "r", 4: "N", 5: "a", 6: "m", 7: "e"}

    // use setTimeout() to give 0.5 milisecond delay on every username check
    let delay = setTimeout(
      () => this.handleUsernameAvailable(enterredData),
      500
    );
    // implement the delay (the handleTypedInData() function)

    this.setState({
      [e.target.name]: e.target.value,
      delay
    });
  };

  render() {
    const {
      userName,
      email,
      passWord,
      usernameValid,
      reEnterPassWord
    } = this.state;

    let emailValid;
    if (/.+@.+\..+/.test(email)) {
      emailValid = true;
    }

    // strong password : have lowercase, have uppercase, have number, minimal 8 characted
    let passWordStrong;
    if (/[a-zA-Z0-9]{8,}/.test(passWord)) {
      passWordStrong = true;
    }

    let isFormComplete;
    if (usernameValid && emailValid && passWord === reEnterPassWord) {
      isFormComplete = true;
    }

    return (
      <>
        <h1 className="text-center">Sign Up Form</h1>
        <div className="w-50 mx-auto d-block">
          {/* below onsubmit is to avoid auto refresh & delete the new user data, and update the new user data using signUpNewUser() function from App.js */}
          <form onSubmit={e => this.handleSubmitNewUser(e)}>
            {/* =====USERNAME===== */}
            <FormGroup>
              <Input
                className="form-control"
                type="text"
                placeholder="Enter your username"
                name="userName" // must be same as your state name. to let computer know, that this input is the `userName`
                value={userName}
                onChange={e => {
                  // enforce if the user still typing, dont run the delay, by using clearTimeout() | truty : any numerical | falsy : null. `if else` will run only one of the scenario, just `if` will run this.handleInputAndDelay(e) all the time, which is what you want
                  if (this.state.delay) {
                    clearTimeout(this.state.delay); // make sure that when user type in new things, it will keep waiting again until there is no tying happen in 0.5 seconds to actually send data to user
                  }
                  this.handleInputAndDelay(e);
                }}
                // glowing box style
                {...(usernameValid == null
                  ? ""
                  : usernameValid
                  ? { valid: true }
                  : { invalid: true })}
              />

              {/* TODO : try to combine the <FormFeedback> if rule into one */}
              <FormFeedback
                // logic
                {...(usernameValid == null
                  ? ""
                  : usernameValid
                  ? { valid: true }
                  : { valid: false })}
              >
                {/* message warning  */}
                {userName.length >= 6
                  ? usernameValid === true
                    ? `available, you can have this username`
                    : `nope, username taken`
                  : `name too short`}
              </FormFeedback>
            </FormGroup>

            {/* =====EMAIL===== */}
            <FormGroup>
              <Input
                className="form-control"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => {
                  this.handleInputAndDelay(e);
                }}
                name="email"
                // glowing box style
                {...(email === ``
                  ? ""
                  : emailValid
                  ? { valid: true }
                  : { invalid: true })}
              />

              <FormFeedback
                // logic
                {...(emailValid == null
                  ? ""
                  : emailValid
                  ? { valid: true }
                  : { valid: false })}
              >
                {/* message warning  */}
                {emailValid
                  ? `correct format of email`
                  : `need to pass proper email format`}
              </FormFeedback>
            </FormGroup>

            {/* =====PASSWORD===== */}
            <FormGroup>
              <Input
                className="form-control"
                type="password"
                placeholder="Enter your password"
                value={passWord}
                onChange={e => {
                  this.handleInputAndDelay(e);
                }}
                name="passWord"
                // glowing box style

                {...(passWord.length !== 0
                  ? passWord.length >= 6
                    ? { valid: true }
                    : { invalid: true }
                  : { invalid: false })}
              />

              {/* TODO enforce uppercase & number inside password */}
              <FormFeedback
                // logic
                {...(passWord.length > 0 && passWord.length >= 6
                  ? { valid: true }
                  : { valid: false })}
              >
                {/* message warning  */}
                {passWord.length >= 6
                  ? `strong password`
                  : `password too short`}
              </FormFeedback>
            </FormGroup>

            {/* =====RETYPE PASSWORD===== */}
            <FormGroup>
              <Input
                className="form-control"
                type="password"
                placeholder="Re-enter password"
                value={reEnterPassWord}
                onChange={e => {
                  this.handleInputAndDelay(e);
                }}
                name="reEnterPassWord"
                // glowing box style
                // if reeneterpass.length = 0 : `` : if password === reenterpass : enable button , `password matched` : disable button, `password doesnt match`

                {...(reEnterPassWord.length === 0
                  ? ``
                  : reEnterPassWord === passWord
                  ? { valid: true }
                  : { invalid: true })}
              />

              <FormFeedback
                // logic
                {...(reEnterPassWord === passWord
                  ? { valid: true }
                  : { invalid: "true" })}
              >
                {/* message warning  */}
                {reEnterPassWord === passWord
                  ? `password matched`
                  : `does not match, make sure you retype password correctly`}
              </FormFeedback>
            </FormGroup>

            <button disabled={!isFormComplete}>Sign Up</button>
          </form>

          {/* direct user who has account already to login page  */}
          <button className="btn btn-link" onClick={this.props.handleLogin}>
            {" "}
            already have an account ? login now!{" "}
          </button>
        </div>
      </>
    );
  }
}

export default SignUpForm;

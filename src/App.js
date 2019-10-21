import React from "react";
import axios from "axios";
import "./App.css";
import { ReactComponent as Loader } from "./Spinner-1s-200px.svg";
import HomePage from "./pages/HomePage";
import { Route, Switch, withRouter } from "react-router-dom";
import UserProfilePage from "./pages/UserProfilePage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";

class App extends React.Component {
  state = {
    users: [],
    loading: true,
    currentUser: { loggedIn: false }
  };

  componentDidMount() {
    // make sure that user that is still logged in, will stay logged in when the browser is being refreshed or closed
    // when new user has done signUp, run below currentNewUser. if
    let checkLoggedInOrNot = localStorage.getItem("userData");
    // if there exist the new user
    if (checkLoggedInOrNot === true) {
      checkLoggedInOrNot = JSON.parse(checkLoggedInOrNot); // convert back the user data (line 54) from string to JSON
      this.setState({
        currentUser: { ...checkLoggedInOrNot, loggedIn: true }
      });
    }

    // get all users data from API call
    axios
      .get("https://insta.nextacademy.com/api/v1/users")
      .then(result => {
        // console.log(result); // good practice, to help visualise the output
        this.setState({
          users: [...result.data],
          loading: false
        });
      })
      .catch(error => console.log(error));
  }

  // function for old user logging in
  loginUser = (oldUser, oldPassword) => {
    axios
      .post("https://insta.nextacademy.com/api/v1/login", {
        username: oldUser,
        password: oldPassword
      })
      .then(result => {
        // pull the user data and store it in local storage
        let JWT = result.data.auth_token;
        localStorage.setItem("userToken", JWT);
        localStorage.setItem("userData", JSON.stringify(result.data.user));

        // log the user in
        this.setState(
          {
            currentUser: { ...result.data.user, loggedIn: true }
          },

          // direct them to the homepage
          () => {
            this.props.history.push("/");
          }
        );
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  // function to post the new user credentials to the API & create the token. data source comes ALL the way to SignUpUser.js(grandchild)
  signUpNewUser = (newUserName, newEmail, newPassWord) => {
    axios
      .post("https://insta.nextacademy.com/api/v1/users/", {
        // save the new credential & user data to this API above link

        // username, email , password are build-in by nextacademy API | newUserName, newEmail, newPassWord is the input entered by user, and the data coming from SignUpForm.js
        username: newUserName, // character between 5 to 20 character
        email: newEmail, // must email format
        password: newPassWord // password min 8 letter
      })
      .then(result => {
        // now we need to explicitly tell the computer that this is a new user, by saving the JWT auth_token that has new user credential in it to localstorage
        let JWT = result.data.auth_token; // this is the JWT encrypted auth_token
        localStorage.setItem("userToken", JWT); // save the JWT token inside localStorage
        localStorage.setItem("userData", JSON.stringify(result.data.user)); // save the JSON new user credentials by converting it to string first, in order to be able to localstorage. checked the
        // now the new user has been succesfully saved, we log in with that new user immediately by using setState & let login as true
        this.setState(
          {
            currentUser: { ...result.data.user, loggedIn: true } // {...} to include that new user into the whole user database
          },
          () => {
            this.props.history.push("/"); // redirect user to homepage when they done sign up
          }
        );
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  // localStorage.setItem() save the new user token

  render() {
    let { users, loading } = this.state;
    return (
      <div className="App-header">
        {/* <h1>Home Page</h1> */}

        {loading ? (
          <>
            <Loader alt="loading gif" />
          </>
        ) : (
          <>
            {/* method1 : separate file (good practice) */}
            <Navbar />

            {/* method2 : direct  */}
            {/* <Link to="/">Home</Link>
            <Link to="/users/2">My Profile</Link> */}

            {/* for <Switch>, the arrangement <Route> list matters when one of the path has a wildcard (:) eg path="/:username"  */}
            <Switch>
              {/* Path to mainpage, need to load ALL users data using `childUsers={users} `*/}
              <Route
                exact
                path="/"
                component={() => {
                  return <HomePage childUsers={users} />; // parent(app.js) send users data to child(HomePage.js), and child can use data by calling `props`
                }}
              />
              {/* {...props} path to selected user, no need to load all user data, BUT we need to send the user data to UserProfilePage using 'props' */}
              <Route
                path="/users/:id"
                component={props => (
                  // {users} below connect username database to UserProfilePage.js
                  <UserProfilePage childUsers={users} {...props} /> // parent(app.js) send users & ...props data to child(UserProfilePage.js), and child can use data by calling `props` . {...props} comes from grandfather(axios all user data line 17-28)
                )}
              />

              <Route
                path="/login"
                component={props => (
                  <LoginPage
                    {...props}
                    signUpNewUser={this.signUpNewUser}
                    loginUser={this.loginUser}
                  />
                )} // {...props} to take in all user database | signUpNewUser retrieve new user credentials
              />
            </Switch>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(App);

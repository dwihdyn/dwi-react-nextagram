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
    // Ensure current user still logged in when browser are refrshed/closed
    let checkLoggedInOrNot = localStorage.getItem("userData");
    if (checkLoggedInOrNot === true) {
      checkLoggedInOrNot = JSON.parse(checkLoggedInOrNot);
      this.setState({
        currentUser: { ...checkLoggedInOrNot, loggedIn: true }
      });
    }

    // Get all users data
    axios
      .get("https://insta.nextacademy.com/api/v1/users") // default
      // .get("http://localhost:5000/api/v1/users/show") // self-made (flask run nextagram API)
      .then(result => {
        this.setState({
          users: [...result.data],
          loading: false
        });
      })
      .catch(error => console.log(error));
  }

  // Function for old user to log in
  loginUser = (oldUser, oldPassword) => {
    axios
      .post("https://insta.nextacademy.com/api/v1/login", {
        username: oldUser,
        password: oldPassword
      })
      .then(result => {
        let JWT = result.data.auth_token;
        localStorage.setItem("userToken", JWT);
        localStorage.setItem("userData", JSON.stringify(result.data.user));

        this.setState(
          {
            currentUser: { ...result.data.user, loggedIn: true }
          },

          () => {
            this.props.history.push("/");
          }
        );
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  // Function for new sign up user
  signUpNewUser = (newUserName, newEmail, newPassWord) => {
    axios
      .post("https://insta.nextacademy.com/api/v1/users/", {
        username: newUserName,
        email: newEmail,
        password: newPassWord
      })
      .then(result => {
        let JWT = result.data.auth_token;
        localStorage.setItem("userToken", JWT);
        localStorage.setItem("userData", JSON.stringify(result.data.user));
        this.setState(
          {
            currentUser: { ...result.data.user, loggedIn: true }
          },
          () => {
            this.props.history.push("/");
          }
        );
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    let { users, loading } = this.state;
    if (loading) {
      return <Loader className="loading" alt="loading gif" />;
    }

    return (
      <>
        <Navbar />
        <div className="App-header">
          <Switch>
            <Route
              exact
              path="/"
              component={() => {
                return <HomePage childUsers={users} />;
              }}
            />
            <Route
              path="/users/:id"
              component={props => (
                <UserProfilePage childUsers={users} {...props} />
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
              )}
            />
          </Switch>
        </div>
      </>
    );
  }
}

export default withRouter(App);

import React from "react";
import axios from "axios";

import { ReactComponent as Loader } from "./Spinner-1s-200px.svg";
import { Route, Switch, withRouter } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";

class App extends React.Component {
  state = {
    users: [],
    loading: true,
    currentUser: { loggedIn: false }
  };

  componentDidMount() {
    let checkLoggedInOrNot = localStorage.getItem("userData");
    if (checkLoggedInOrNot === true) {
      checkLoggedInOrNot = JSON.parse(checkLoggedInOrNot);
      this.setState({
        currentUser: { ...checkLoggedInOrNot, loggedIn: true }
      });
    }

    axios
      .get("https://insta.nextacademy.com/api/v1/users")
      // .get("http://localhost:5000/api/v1/users/show") // self-made (flask run nextagram API)
      .then(result => {
        this.setState({
          users: [...result.data],
          loading: false
        });
      })
      .catch(error => console.log(error));
  }

  loginUser = (username, password) => {
    axios
      .post("https://insta.nextacademy.com/api/v1/login", {
        username: username,
        password: password
      })
      .then(result => {
        let authToken = result.data.auth_token;
        localStorage.setItem("authToken", authToken);
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

  signUpNewUser = (newUserName, newEmail, newPassWord) => {
    axios
      .post("https://insta.nextacademy.com/api/v1/users/", {
        username: newUserName,
        email: newEmail,
        password: newPassWord
      })
      .then(result => {
        let authToken = result.data.auth_token;
        localStorage.setItem("authToken", authToken);
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

  handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    this.setState({
      currentUser: { loggedIn: false }
    });
    return (window.location = "/");
  };

  render() {
    let { users, loading } = this.state;
    if (loading) {
      return <Loader className="loading" alt="loading gif" />;
    }

    return (
      <>
        <Navbar handleLogout={this.handleLogout} />
        <div className="App-header">
          <Switch>
            <Route
              exact
              path="/"
              component={() => {
                if (localStorage.getItem("authToken")) {
                  return <HomePage users={users} />;
                } else {
                  return <LandingPage />;
                }
              }}
            />
            <Route
              path="/users/:id"
              component={props => <UserProfilePage users={users} {...props} />}
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

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
    currentUser: { loggedIn: false },
    setAlarm: false,
    errorMessage: false
  };

  componentDidMount() {
    // store all current user info into currentUser state
    if (localStorage.getItem("userData")) {
      this.setState({
        currentUser: {
          ...JSON.parse(localStorage.getItem("userData")),
          loggedIn: true
        }
      });
    }

    axios
      .get("https://insta.nextacademy.com/api/v1/users")
      // .get("http://localhost:5000/api/v1/users/show") // self-made (flask run nextagram API)
      .then(res => {
        this.setState({
          users: [...res.data],
          loading: false,
          errorMessage: false
        });
      })
      .catch(err => console.log(err));
  }

  handleLogin = (username, password) => {
    axios
      .post("https://insta.nextacademy.com/api/v1/login", {
        username: username,
        password: password
      })
      .then(res => {
        let authToken = res.data.auth_token;
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("userData", JSON.stringify(res.data.user));

        this.setState(
          {
            currentUser: { ...res.data.user, loggedIn: true }
          },

          () => {
            this.props.history.push("/");
          }
        );
      })
      .catch(err => {
        console.log(err.response);
        this.setState({
          errorMessage: true
        });
      });
  };

  signUpNewUser = (newUserName, newEmail, newPassWord) => {
    axios
      .post("https://insta.nextacademy.com/api/v1/users/", {
        username: newUserName,
        email: newEmail,
        password: newPassWord
      })
      .then(res => {
        let authToken = res.data.auth_token;
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        this.setState(
          {
            currentUser: { ...res.data.user, loggedIn: true }
          },
          () => {
            this.props.history.push("/");
          }
        );
      })
      .catch(err => {
        console.log(err.response);
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

  clearError = e => {
    this.setState({
      error: e
    });
  };

  render() {
    let { users, loading, errorMessage } = this.state;
    if (loading) {
      return <Loader className="loading" alt="loading gif" />;
    }

    return (
      <>
        <Navbar
          loggedIn={this.state.currentUser.loggedIn}
          handleLogout={this.handleLogout}
          errorMessage={errorMessage}
          clearError={this.clearError}
        />
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
                  handleLogin={this.handleLogin}
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

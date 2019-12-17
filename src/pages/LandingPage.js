import React from "react";
import "../App.css";

class LandingPage extends React.Component {
  render() {
    return (
      <>
        <div className="display-1 mb-5">Welcome to Nextagram!</div>
        <div>So far you can do : </div>
        <ul>
          <li>Create new user / login existing user</li>
          <li>
            See all users that ever existed, and see each of their profile
          </li>
          <li>Upload images to your feed</li>
        </ul>
      </>
    );
  }
}

export default LandingPage;

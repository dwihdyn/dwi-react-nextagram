import React from "react";
import axios from "axios";
import { ReactComponent as Loader } from "../Spinner-1s-200px.svg";
import Image from "react-graceful-image";

class UserProfilePage extends React.Component {
  state = {
    images: [],
    profilePic: ``,
    selectedUserName: ``,
    loading: true
  };

  componentDidMount() {
    const selUser = this.props.match.params.id;
    const allUsers = this.props.users;
    allUsers.forEach(oneUser => {
      if (oneUser.id === parseInt(selUser)) {
        this.setState({
          profilePic: oneUser.profileImage,
          selectedUserName: oneUser.username,
          loading: false
        });
      }
    });
    axios
      .get(`https://insta.nextacademy.com/api/v1/images?userId=${selUser}`)
      .then(resultFromLink => {
        this.setState({
          images: resultFromLink.data
        });
      });
  }

  render() {
    const { images, selectedUserName, loading, profilePic } = this.state;

    return (
      <>
        <Image className="w-25 w-25" src={profilePic} />
        <h4>
          #{this.props.match.params.id} : {selectedUserName}{" "}
        </h4>

        {loading ? (
          <Loader alt="loading gif" />
        ) : (
          <div className="d-flex flex-wrap w-75" style={{ height: "100%" }}>
            {images.map((everyImage, index) => {
              return (
                <div key={index} style={{ width: "25%", height: "50%" }}>
                  <Image className="h-100 w-100" src={everyImage} />
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }
}

export default UserProfilePage;

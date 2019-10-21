import React from "react";
import axios from "axios";
import { ReactComponent as Loader } from "../Spinner-1s-200px.svg";
import Image from "react-graceful-image";

class UserProfilePage extends React.Component {
  state = {
    images: [],
    selectedUserName: ``,
    loading: true
  };

  // load the selected user profile pic using API
  componentDidMount() {
    // console.log(this.props);
    const currentUser = this.props.match.params.id;
    const allUsers = this.props.childUsers;
    allUsers.forEach(oneUser => {
      console.log(oneUser);
      console.log(currentUser);
      if (oneUser.id === parseInt(currentUser)) {
        this.setState({
          selectedUserName: oneUser.username,
          loading: false
        });
      }
    });
    axios
      .get(`https://insta.nextacademy.com/api/v1/images?userId=${currentUser}`)
      .then(resultFromLink => {
        console.log(resultFromLink); // good practice, to help visualise the output
        this.setState({
          images: resultFromLink.data
        });
        // console.log(this.state);
      });
  }

  render() {
    const { images, selectedUserName, loading } = this.state;

    return (
      <>
        {/* {console.log(this.props.childUsers[1].profileImage)} */}
        {/* below hard code to user id `1` */}
        <Image
          className="w-25 w-25"
          src={this.props.childUsers[1].profileImage}
        />
        <h4>
          #{this.props.match.params.id} : {selectedUserName}{" "}
        </h4>

        {/* since there are multiple images owned by every user, need to use .map */}

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

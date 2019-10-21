import React from "react";
import axios from "axios";
import { ReactComponent as Loader } from "../Spinner-1s-200px.svg";
import Image from "react-graceful-image";

class UserImages extends React.Component {
  state = {
    images: [],
    loading: true
  };
  // load the selected user profile pic using API
  componentDidMount() {
    // console.log(this.props);
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/images?userId=${this.props.userId}`
      )
      .then(resultFromLink => {
        console.log(resultFromLink); // good practice, to help visualise the output
        this.setState({
          images: resultFromLink.data,
          loading: false
        });

        // console.log(resultFromLink.data);
      });
  }

  render() {
    const { images, loading } = this.state;
    return (
      <>
        {loading ? (
          <Loader alt="loading gif" />
        ) : (
          <div className="d-flex flex-wrap" style={{ height: "100%" }}>
            {images.map((everyImage, index) => {
              return (
                <div key={index} style={{ width: "25%", height: "50%" }}>
                  <Image className="h-100 w-100" src={everyImage} fluid />
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }
}

export default UserImages;

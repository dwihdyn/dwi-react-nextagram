import React from "react";
import axios from "axios";

import Image from "react-graceful-image";
import { ReactComponent as Loader } from "../Spinner-1s-200px.svg";

class MyProfilePage extends React.Component {
  state = {
    images: [],
    loading: true
  };

  componentDidMount() {
    // following postman API documentation
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`
    };
    axios
      .get("https://insta.nextacademy.com/api/v1/images/me", {
        headers: headers
      })
      .then(res => {
        this.setState({
          images: res.data,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { images, loading } = this.state;
    let myData = JSON.parse(localStorage.getItem("userData"));
    if (loading) {
      return <Loader className="loading" alt="loading gif" />;
    }

    return (
      <>
        <Image className="w-25 w-25" src={myData.profile_picture} />

        <h4>
          #{myData.id} : {myData.username}{" "}
        </h4>

        {Array.isArray(images) && images.length ? (
          <div className="d-flex flex-wrap w-75" style={{ height: "100%" }}>
            {images.map((image, index) => {
              return (
                <div key={index} style={{ width: "25%", height: "50%" }}>
                  <Image className="h-100 w-100" src={image} />
                </div>
              );
            })}
          </div>
        ) : (
          `Feed your gram now!`
        )}
      </>
    );
  }
}
export default MyProfilePage;

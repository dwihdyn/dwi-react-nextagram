import React from "react";
import { FormGroup, Button, Input, FormText } from "reactstrap";
import { ReactComponent as Loader } from "../Spinner-1s-200px.svg";
import axios from "axios";

import uploadImageDefault from "../upload.svg";

import "../App.css";

class UploadPage extends React.Component {
  state = {
    message: ``,
    previewImage: null,
    uploadImage: null,
    imageFile: null,
    loading: false
  };

  handleFile = e => {
    // hardcode to upload first picture only [0]
    this.setState({
      imageFile: e.target.files[0],
      previewImage: URL.createObjectURL(e.target.files[0])
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    // following nextagram API doc, need `header` & `form` input
    // header
    let authToken = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${authToken}`
    };

    // form
    let formData = new FormData();
    formData.append("image", this.state.imageFile);

    this.setState({
      loading: true
    });
    // debugger;
    axios
      .post("https://insta.nextacademy.com/api/v1/images/", formData, {
        headers: headers
      })
      .then(res => {
        if (res.data.success) {
          this.setState({
            message: "Image Uploaded Successfully!",
            previewImage: ``,
            imageFile: null,
            loading: false
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { message, previewImage, imageFile, loading } = this.state;
    return (
      <div>
        <h3>{message ? message : "Upload your picture"}</h3>

        <form onSubmit={e => this.handleSubmit(e)}>
          <FormGroup>
            <Input
              id="uploadHandler"
              className="d-none"
              type="file"
              name="image-file"
              onChange={e => {
                this.handleFile(e);
              }}
            ></Input>
            <label for="uploadHandler">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="previewImage"
                  width="50%"
                  height="80%"
                />
              ) : (
                <>
                  <img src={uploadImageDefault} alt="" />
                  <p>Click to choose a file to post....</p>
                </>
              )}
            </label>

            <FormText color="muted">
              Make sure the image being uploaded is a supported format.
            </FormText>
          </FormGroup>
          <Button
            type="submit"
            color="light"
            disabled={imageFile ? false : true}
          >
            {loading ? <Loader /> : "Upload"}
          </Button>
        </form>
      </div>
    );
  }
}

export default UploadPage;

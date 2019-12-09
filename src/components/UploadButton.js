import React from "react";

import { Link } from "react-router-dom";

import camera from "../camera.png";

const UploadButton = () => {
  return (
    <Link className="upload-button-container" to="/uploadpage">
      <img className="upload-button-inside" src={camera} alt="uploadButton" />
    </Link>
  );
};
export default UploadButton;

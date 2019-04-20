import React from "react";
import "./FaceRecognition.css";

const FaceRecogniton = ({ imageURL, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputimage" alt="" src={imageURL} width="500px" heigh="auto" />
        <div
          className="bounding-box"
          style={{
            bottom: box.br,
            top: box.tr,
            right: box.rc,
            left: box.lc
          }}
        />
      </div>
    </div>
  );
};

export default FaceRecogniton;

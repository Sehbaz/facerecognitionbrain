import React, { Component } from "react";
import Particles from "react-particles-js";
import "./App.css";
import Clarifai from "clarifai";
import Register from "./components/Register/Register";
import Signin from "./components/SignIn/Signin";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkform";

const app = new Clarifai.App({
  apiKey: "147b29df2e2646748110a33f5dfa6251"
});
const particleOptions = {
  polygon: {
    enable: true,
    density: {
      enable: true,
      value_area: 800
    },
    type: "inside",
    move: {
      radius: 10
    },
    url: "path/to/svg.svg"
  }
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: {},
      route: "signin",
      isSignedIn: false
    };
  }
  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      lc: clarifaiFace.left_col * width,
      tr: clarifaiFace.top_row * height,
      rc: width - clarifaiFace.right_col * width,
      br: height - clarifaiFace.bottom_row * height
    };
  };
  displayFaceBox = box => {
    this.setState({ box: box });
    console.log(box);
  };
  onInputChange = event => {
    this.setState({ input: event.target.value });
  };
  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      );
  };
  onRouteChange = route => {
    this.setState({ route: route });
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
  };

  render() {
    return (
      <div className="App helvetica">
        <Particles className="particles" params={{ particleOptions }} />
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />

            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageURL={this.state.imageURL}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;

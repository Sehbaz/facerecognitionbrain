import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("signout")}
          className="f3  dim  pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  }
  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <p
        onClick={() => onRouteChange("register")}
        className="f3  dim  pa3 pointer"
      >
        Register
      </p>
      <p
        onClick={() => onRouteChange("signin")}
        className="f3  dim  pa3 pointer"
      >
        Sign In
      </p>
    </nav>
  );
};

export default Navigation;

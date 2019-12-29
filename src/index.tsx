import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "./react-auth0-spa";

ReactDOM.render(
  <Auth0Provider
    domain="nii.auth0.com"
    client_id="5CKK0oQW6utNG7aQLiwDrBUyiE0tSck6"
    redirect_uri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
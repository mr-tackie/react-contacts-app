import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "./react-auth0-spa";
import auth0Config from './config.json';

ReactDOM.render(
  <Auth0Provider
    domain={auth0Config.auth0_domain}
    client_id={auth0Config.auth0_client_id}
    redirect_uri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
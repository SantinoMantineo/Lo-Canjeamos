/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import  App  from "./App";
import { Provider } from "react-redux";
import "./index.css";
import store from "./redux/store";
// import { UserProvider } from './Context/UserContext';
//? Auth0

import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-fftn86hwwtilpcpz.us.auth0.com"
    clientId="AhbaGFIsI6WQf2e1SPeRAuemhB4DMApJ"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </Auth0Provider>
);

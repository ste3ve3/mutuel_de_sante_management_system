

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { AuthProvider } from "./auth-context/auth.context";
import { Provider } from 'react-redux';
import { store } from 'store';

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

let user = localStorage.getItem("user");
user = JSON.parse(user);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <SoftUIControllerProvider>
        <AuthProvider userData={user}>
          <App />
        </AuthProvider>
      </SoftUIControllerProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

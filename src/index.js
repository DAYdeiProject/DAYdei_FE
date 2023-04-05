import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/config/configStore";
import { GlobalStyle } from "./shared/style/GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from "./shared/style/Theme";
import { RouterProvider } from "react-router-dom";
import router from "./shared/router/Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);

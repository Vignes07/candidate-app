import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";
import store from "./store/store.js";
import { Provider } from "react-redux";

const theme = createTheme({
  typography: {
    fontFamily: "Lexend",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

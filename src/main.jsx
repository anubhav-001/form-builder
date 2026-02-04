import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1E88E5"
    },
    background: {
      default: "#050816",
      paper: "#0B1020"
    }
  },
  shape: {
    borderRadius: 10
  },
  typography: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);


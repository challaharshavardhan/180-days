// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Main from "./main";  // Note that we now import main.jsx as the entry point

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>
);

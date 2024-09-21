import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth.context.jsx";
import { ModeProvider } from "./contexts/mode.context.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchProvider } from "./contexts/search.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ModeProvider>
        <AuthProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
          <ToastContainer />
        </AuthProvider>
      </ModeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

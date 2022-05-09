import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./Context/AuthContext";
import { FirebaseProvider } from "./Context/FirebaseContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <FirebaseProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </FirebaseProvider>
  // </React.StrictMode>
);

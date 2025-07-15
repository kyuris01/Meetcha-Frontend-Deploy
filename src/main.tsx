import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/styles/main.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="124678612470-l0adtvcmdc1664nvmsovqoa7qtc0peoh.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);

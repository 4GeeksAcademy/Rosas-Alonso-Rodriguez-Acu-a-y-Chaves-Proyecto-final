import React from "react";
import ReactDOM from "react-dom";
import { PasswordResetProvider } from "./context/PasswordResetContext";
import Formulario from "./component/Formulario";

ReactDOM.render(
  <PasswordResetProvider>
    <Formulario />
  </PasswordResetProvider>,
  document.getElementById("root")
);


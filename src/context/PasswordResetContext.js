import React, { createContext, useState } from "react";

// Crear el contexto
const PasswordResetContext = createContext();

// Proveedor del contexto
export const PasswordResetProvider = ({ children }) => {
  const [email, setEmail] = useState(""); // Estado para el email ¿Hace falta?
  const [password, setPassword] = useState(""); // Estado para la nueva contraseña

  // Función para actualizar el email
  const updateEmail = (newEmail) => {
    setEmail(newEmail);
  };

  // Función para actualizar la contraseña
  const updatePassword = (newPassword) => {
    setPassword(newPassword);
  };

  return (
    <PasswordResetContext.Provider value={{ email, updateEmail, password, updatePassword }}>
      {children}
    </PasswordResetContext.Provider>
  );
};

export default PasswordResetContext;

import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const PasswordResetContext = createContext();

// Crear un proveedor del contexto
export const PasswordResetProvider = ({ children }) => {
  const [email, setEmail] = useState(""); // Estado para almacenar el correo electrónico

  const updateEmail = (newEmail) => {
    setEmail(newEmail); // Función para actualizar el correo electrónico
  };

  return (
    <PasswordResetContext.Provider value={{ email, updateEmail }}>
      {children}
    </PasswordResetContext.Provider>
  );
};

// Hook para usar el contexto
export const usePasswordReset = () => {
  return useContext(PasswordResetContext);
};


import React, { useState } from "react";
import { usePasswordReset } from "./PasswordResetContext";

const ResetPassword = () => {
  const { email, updateEmail } = usePasswordReset(); // Usamos el contexto
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Llamada a la API
      const response = await fetch("https://miapi.com/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || "Correo enviado correctamente.");
        setError("");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Ocurrió un error. Intenta nuevamente.");
        setMessage("");
      }
    } catch (err) {
      setError("Error al conectar con el servidor.");
      setMessage("");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email} // Usamos el email del contexto
            onChange={(e) => updateEmail(e.target.value)} // Actualizamos el email en el contexto
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ResetPassword;

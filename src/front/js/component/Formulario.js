import React, { useContext } from "react";
import PasswordResetContext from "../context/PasswordResetContext";

const Formulario = () => {
  const { email, updateEmail, password, updatePassword } = useContext(PasswordResetContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Correo:", email);
    console.log("Nueva contraseña:", password);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <h2 style={styles.title}>Recuperar Contraseña</h2>
      
      <label style={styles.label}>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => updateEmail(e.target.value)}
        style={styles.input}
        required
      />

      <label style={styles.label}>Nueva Contraseña:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => updatePassword(e.target.value)}
        style={styles.input}
        required
      />

      <button type="submit" style={styles.button}>
        Enviar
      </button>
    </form>
  );
};

// Estilos en línea
const styles = {
  formContainer: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    color: "#05315b",
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#05315b",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#05315b",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Formulario;

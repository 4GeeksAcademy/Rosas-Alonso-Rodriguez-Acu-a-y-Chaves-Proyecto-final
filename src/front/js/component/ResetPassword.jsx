import React, { useState } from "react";


const ResetPassword = () => {
  // const { email, updateEmail } = usePasswordReset(); // Usamos el contexto
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

    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-7 border border-light  bg-white p-4">
          <h2> ¿Olvidó su contraseña?</h2>

          <form>
            <div className="form-group">
              <label>¿CÚAL ES MI ANIMAL FAVORITO?</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa tu respuesta"
              />
            </div>

            <div className="form-group">
              <label>NUEVA CONTRASEÑA</label>
              <input
                type="password"
                className="form-control"
                placeholder="Ingresa tu respuesta"
              />
            </div>
            <div className="form-group">
              <label>NUEVA CONTRASEÑA</label>
              <input
                type="password"
                className="form-control"
                placeholder="Ingresa tu respuesta"
              />
            </div>
          </form>

          <div className="reset-password-container">

            <form onSubmit={handleSubmit} className="text-center">
              <button type="submit" className="btn btn-primary">
                Cambiar contraseña
              </button>
            </form>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
    </div>

  );
};

export default ResetPassword;

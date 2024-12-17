import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

const Signup = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [security_questions, setSecurity_questions] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [phone, setPhone] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, password, security_question, phone, facebook, instagram) //BORRAR LUEGO
        if (password !== password2) {
            actions.setMessage("Las contraseñas no coinciden");
            return;
        }

        if (!name || !email || !password || !security_questions || !securityAnswer|| !phone) {
            actions.setMessage("Por favor, completa todos los campos obligatorios.");
            return;
        }
        const security_question = `${security_questions} - ${securityAnswer}`
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    //"Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    //is_active,
                    security_question,
                    phone,
                    facebook,
                    instagram
                }),
            });

            const data = await response.json();
            if (response.ok) {
                navigate("/login"); //va al login
            } else {
                actions.setMessage(data.msg || "Hubo un error al procesar la solicitud");
            }
        } catch (err) {
            actions.setMessage("Error de conexión: " + err.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center pt-4 pb-4" style={{ minHeight: 'calc(100vh - 56px)' }}>
            <div className="text-center">
                <div className="container p-5 bg-white shadow rounded" style={{ width: "550px" }}>
                    <h1 className="user-title adlam-display-regular mb-4">Regístrate</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Nombre Apellido"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor="name">NOMBRE <span className="text-danger">*</span></label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="floatingInput"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="floatingInput">EMAIL <span className="text-danger">*</span></label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="floatingPassword">CONTRASEÑA <span className="text-danger">*</span></label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword2"
                                placeholder="Repetir contraseña"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                            <label htmlFor="floatingPassword2">REPETIR CONTRASEÑA <span className="text-danger">*</span></label>
                        </div>
                        <div className="form-floating questions mb-3">
                            <select class="form-select" id="floatingInput2" aria-label="Default select example" required  onChange={(e) => setSecurity_questions(e.target.value)}>
                                <option value="">ESTABLEZCA UNA PREGUNTA DE SEGURIDAD <span className="text-danger">*</span></option>
                                <option value="1">¿Como se llamaba tu primera mascota?</option>
                                <option value="2">¿Cual es tu ciudad favorita?</option>
                                <option value="3">¿Cual es tu película favorita?</option>
                                <option value="4">¿En qué calle vivías cuando eras niño/a?</option>
                            </select>
                            {/* <input
                                type="text"
                                className="form-control"
                                id="floatingInput2"
                                placeholder="EJ: '¿CUÁL ES MI ANIMAL FAVORITO?'"
                                value={security_question}
                                onChange={(e) => setSecurity_question(e.target.value)}
                            /> 
                            <label htmlFor="floatingInput2">ESTABLEZCA UNA PREGUNTA DE SEGURIDAD <span className="text-danger">*</span></label>*/}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput3"
                                placeholder="RESPUESTA"
                                value={securityAnswer}
                                onChange={(e) => setSecurityAnswer(e.target.value)}
                            />
                            <label htmlFor="floatingInput3">RESPUESTA: <span className="text-danger">*</span></label>
                        </div>
                        <div className="mb-3 user-title adlam-display-regular">
                            <h5>Información de contacto</h5>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingPhone"
                                placeholder="Teléfono"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <label htmlFor="floatingPhone">TELÉFONO <span className="text-danger">*</span></label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingFacebook"
                                placeholder="Facebook URL"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                            />
                            <label htmlFor="floatingFacebook">FACEBOOK</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInstagram"
                                placeholder="Instagram URL"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                            />
                            <label htmlFor="floatingInstagram">INSTAGRAM</label>
                        </div>

                        <button type="submit" className="adlam-display-regular btn btn-primary ms-2 rounded-pill btnStart" style={{ width: "100%" }}>
                            Registrarme
                        </button>
                    </form>

                    {/* Mostrar mensaje si existe */}
                    {store.message && (
                        <div className="alert alert-danger mt-3">
                            {store.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Signup;

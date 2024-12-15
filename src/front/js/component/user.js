import React, { useState } from 'react';

const User = () => {
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const togglePasswordFields = () => {
        setShowPasswordFields(!showPasswordFields);
    };

    const [isEditable, setIsEditable] = useState(false);
    const toggleEditMode = () => {
        setIsEditable(!isEditable);
    }

    return (
        <div className="container mt-4">
            <div className="row md-5 p-4 bg-success rounded-1 align-items-start">

                {/* Título y Tabla de Mi Perfil */}
                <div className="col-12 col-md-6 mb-4">
                    <div className="row">
                        {/* Título "Mi perfil" */}
                        <div className="col-12 d-flex justify-content-between align-items-center pb-2">
                            <h4 className="user-title adlam-display-regular">Mi perfil</h4>

                            {/* Contenedor para el lápiz y el texto */}
                            <div className="position-relative">
                                <h6
                                    className="fa-solid fa-pencil mt-2 user-title"
                                    style={{ cursor: 'pointer' }}
                                    onClick={toggleEditMode}
                                ></h6>

                                {/* Texto "Editar perfil" solo visible cuando el cursor pasa por encima */}
                                <span className="hover-text position-absolute end-100 top-50 translate-middle-y ms-2 text-primary">
                                    Editar perfil
                                </span>
                            </div>

                        </div>
                    </div>
                    {/* Tabla de Mi Perfil */}
                    <div className="card shadow-sm p-4 rounded-5">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input type="text" id="nombre" className="form-control" placeholder="Nombre de usuario" disabled={!isEditable} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" id="email" className="form-control" placeholder="Ingresa tu email" disabled={!isEditable} />
                            </div>
                            <div className="mb-3">
                                <a className="text-primary nunito" onClick={togglePasswordFields} style={{ cursor: 'pointer' }}>Cambiar contraseña</a>
                            </div>
                            {/* solo se muestran los campos de contraseña si showPasswordFields es true */}
                            {showPasswordFields && (
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="current-password" className="form-label">Contraseña actual</label>
                                        <input type="password" id="current-password" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="new-password" className="form-label">Nueva contraseña</label>
                                        <input type="password" id="new-password" className="form-control" />
                                    </div>
                                </>
                            )}
                            <div className="mb-3 user-title adlam-display-regular">
                                <h5>Información de contacto</h5>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Teléfono</label>
                                <input type="text" id="phone" className="form-control" placeholder="Ingresa tu teléfono" disabled={!isEditable} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="instagram" className="form-label">Instagram</label>
                                <input type="text" id="instagram" className="form-control" placeholder="Ingresa tu Instagram" disabled={!isEditable} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="facebook" className="form-label">Facebook</label>
                                <input type="text" id="facebook" className="form-control" placeholder="Ingresa tu Facebook" disabled={!isEditable} />
                            </div>
                            <div className="d-grid gap-2 col-6 mx-auto">
                                <button type="submit" className="btn btn-primary rounded-pill btnStart">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Título y Tabla de Mis Publicaciones */}
                <div className="col-12 col-md-6 mb-4">
                    <div className="row pb-2">
                        {/* Título "Mis publicaciones" */}
                        <div className="col-12">
                            <h4 className="user-title adlam-display-regular">Mis publicaciones</h4>
                        </div>
                    </div>
                    {/* Tabla de Mis Publicaciones */}
                    <div className="card shadow-sm p-4 rounded-5">
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Mascota encontrada: OS...
                                <span>
                                    <i className="fa-solid fa-pencil me-2"></i>
                                    <i className="fa-regular fa-trash-can"></i>
                                </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Mascota perdida: Canela
                                <span>
                                    <i className="fa-solid fa-pencil me-2"></i>
                                    <i className="fa-regular fa-trash-can"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default User;

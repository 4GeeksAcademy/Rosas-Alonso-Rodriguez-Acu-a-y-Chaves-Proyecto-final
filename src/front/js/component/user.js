import React, { useState, useEffect } from 'react';

const User = () => {
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const togglePasswordFields = () => {
        setShowPasswordFields(!showPasswordFields);
    };

    const [isEditable, setIsEditable] = useState(false);
    const toggleEditMode = () => {
        setIsEditable(!isEditable);
    }

    const [userPets, setUserPets] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [petToDelete, setPetToDelete] = useState(null);

    const [userData, setUserData] = useState({
        email: '',
        phone: '',
        instagram: '',
        facebook: ''
    });

    useEffect(() => {
        fetch(`${process.env.BACKEND_URL}/logged_user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.msg === 'ok') {
                    setUserData(data.usuario); // Establece los datos del usuario en el estado
                } else {
                    console.error("Error al obtener los datos del usuario:", data.msg);
                }
            })
            .catch(error => {
                console.error("Error al cargar los datos del usuario:", error);
            });
        }, []); 

        useEffect(() => {
            fetch(`${process.env.BACKEND_URL}/pet_post`)
                .then(response => response.json())
                .then(data => {
                    setUserPets(data.data);
                })
                .catch(error => {
                    console.error("Hubo un error al cargar las publicaciones:", error);
                });
        }, []);

        // Función para manejar el cambio de estado de la mascota (encendido/apagado)
        const handleSwitchChange = (petId, newStatus) => {
            fetch(`${process.env.BACKEND_URL}/pet/${petId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pet_status: newStatus }),  // cambia el pet status según el switch
            })
                .then(response => response.json())
                .then(data => {
                    // Verificamos si la respuesta fue exitosa
                    if (data.msg === 'Mascota actualizada exitosamente') {
                        // Actualizamos el estado de la mascota en el frontend
                        setUserPets(prevPets => prevPets.map(pet =>
                            pet.pet_id === petId ? { ...pet, pet_status: newStatus } : pet
                        ));
                        console.log("Estado actualizado exitosamente")
                    } else {
                        console.error('Error al actualizar el estado:', data.msg);
                    }
                })
                .catch(error => {
                    console.error("Error al cambiar el estado de la mascota:", error);
                });
        };

        // Función para abrir el modal de eliminación
        const handleDeleteClick = (pet) => {
            setPetToDelete(pet);
            setShowDeleteModal(true);
        };

        // Función para confirmar la eliminación de la mascota
        const handleDeleteConfirm = () => {
            if (petToDelete) {
                fetch(`${process.env.BACKEND_URL}/pet/${petToDelete.pet_id}`, {
                    method: 'DELETE',
                })
                    .then(() => {
                        // Filtramos la mascota eliminada de la lista de publicaciones
                        setUserPets(prevPets => prevPets.filter(pet => pet.pet_id !== petToDelete.pet_id));
                        setShowDeleteModal(false);  // Cerramos el modal
                    })
                    .catch(error => {
                        console.error("Error al eliminar la mascota:", error);
                    });
            }
        };

        // Función para cancelar la eliminación
        const handleDeleteCancel = () => {
            setShowDeleteModal(false);
        };

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
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" id="email" className="form-control" placeholder="Ingresa tu email" value={userData.email} disabled={!isEditable} />
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
                                    <input type="text" id="phone" className="form-control" placeholder="Ingresa tu teléfono" value={userData.phone} disabled={!isEditable} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="instagram" className="form-label">Instagram</label>
                                    <input type="text" id="instagram" className="form-control" placeholder="Ingresa tu Instagram" value={userData.instagram !== undefined && userData.instagram !== null ? userData.instagram : ''} disabled={!isEditable} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="facebook" className="form-label">Facebook</label>
                                    <input type="text" id="facebook" className="form-control" placeholder="Ingresa tu Facebook" value={userData.facebook !== undefined && userData.facebook !== null ? userData.facebook : ''} disabled={!isEditable} />
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
                                {userPets.map(pet => (
                                    <li className="list-group-item d-flex justify-content-between align-items-center" key={pet.pet_id}>
                                        <span className="adlam-display-regular">{pet.name}</span>

                                        <span className="d-flex align-items-center">
                                            {/* Switch de estado (Checkbox) */}
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`switch-${pet.pet_id}`}
                                                    style={{ cursor: 'pointer' }}
                                                    checked={pet.pet_status !== "Encontrado"}  // Si no está encontrado, el switch está encendido
                                                    onChange={(e) => handleSwitchChange(pet.pet_id, e.target.checked ? "Estoy perdido" : "Encontrado")}
                                                />
                                                <label className="form-check-label" htmlFor={`switch-${pet.pet_id}`}>
                                                    {pet.pet_status === "Encontrado" ? "Mascota encontrada" : "Mascota perdida"}
                                                </label>
                                            </div>

                                            {/* Íconos de acción */}
                                            <i className="fa-regular fa-trash-can" style={{ cursor: 'pointer', paddingLeft: '10px' }} onClick={() => handleDeleteClick(pet)}></i>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Modal para confirmar eliminación */}
                {showDeleteModal && (
                    <div className="modal fade show" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: 'block' }} aria-hidden="false">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title adlam-display-regular" id="exampleModalLabel">Eliminar publicación</h5>
                                    <button type="button" className="btn-close" onClick={handleDeleteCancel}></button>
                                </div>
                                <div className="modal-body">
                                    ¿Estás seguro de que deseas eliminar esta publicación?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleDeleteCancel}>Cancelar</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    export default User;

import React, { useState, useEffect } from 'react';
import mapaIconoVerde from "../../img/mapa_icono_verde.png";

const User = () => {

    const [isEditable, setIsEditable] = useState(false);
    const [userPets, setUserPets] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [petToDelete, setPetToDelete] = useState(null);
    const [petToChange, setPetToChange] = useState(null);
    const [showChangeModal, setShowChangeModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [validationError, setValidationError] = useState('');
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
                // Añadir switchVisible: true a cada mascota
                const petsWithSwitchVisible = data.data.map(pet => ({
                    ...pet,
                    switchVisible: true, // Por defecto, el switch está visible
                }));
                setUserPets(petsWithSwitchVisible);
            })
            .catch(error => {
                console.error("Hubo un error al cargar las publicaciones:", error);
            });
    }, []);

    // Función para manejar el cambio de estado de la mascota (encendido/apagado)
    const handleSwitchChange = async (petId, newStatus) => {
        // Guardamos la mascota cuyo estado va a cambiar y mostramos el modal de confirmación
        setPetToChange({ petId, newStatus });
        setShowChangeModal(true);
    };

    // Función para manejar la confirmación del cambio
    const handleConfirmChange = () => {
        if (petToChange) {
            const { petId, newStatus } = petToChange;

            // Realizamos el cambio en el backend
            fetch(`${process.env.BACKEND_URL}/pet/${petId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pet_status: newStatus }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.msg === 'Mascota actualizada exitosamente') {
                        // Actualizamos el estado en el frontend
                        setUserPets(prevPets => prevPets.map(pet =>
                            pet.pet_id === petId ? { ...pet, pet_status: newStatus, switchVisible: false } : pet
                        ));
                        setShowChangeModal(false);  // Cerramos el modal
                    } else {
                        console.error('Error al actualizar el estado:', data.msg);
                    }
                })
                .catch(error => {
                    console.error("Error al cambiar el estado de la mascota:", error);
                });
        }
    };

    // Función para cancelar el cambio
    const handleCancelChange = () => {
        setShowChangeModal(false);  // Cerramos el modal sin realizar el cambio
    };

    // Función para manejar el envío del formulario de actualización
    const handleSave = (e) => {
        e.preventDefault();

        // Validación de campos obligatorios
        if (!userData.email || !userData.phone) {
            setValidationError('Por favor, completa todos los campos obligatorios (Email, Teléfono)');
            return;
        } else {
            setValidationError('');
        }

        const updatedData = {
            email: userData.email,
            phone: userData.phone,
            instagram: userData.instagram,
            facebook: userData.facebook
        };

        fetch(`${process.env.BACKEND_URL}/update_user/${userData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.msg === 'Usuario actualizado correctamente') {
                    setUserData(data.user); // Actualizamos el estado con los datos actualizados
                    setShowSuccessModal(true);
                } else {
                    console.error('Error al actualizar el perfil:', data.msg);
                }
            })
            .catch(error => {
                console.error('Error al realizar la solicitud:', error);
            });
    };

    // Función para cerrar el modal de éxito
    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
    };

    // Función para abrir el modal de eliminación
    const handleDeleteClick = (pet) => {
        setPetToDelete(pet);
        setShowDeleteModal(true);
    };

    // Función para manejar el cambio en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
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
            <div className="row md-5 p-4 bg-success rounded-1 align-items-start" style={{ marginBottom: '20px' }}>

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
                                    onClick={() => setIsEditable(!isEditable)}
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
                        <form onSubmit={handleSave}>
                            {/* Error de validación */}
                            {validationError && (
                                <div className="alert alert-danger" role="alert">
                                    {validationError}
                                </div>
                            )}
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label adlam-display-regular">Email</label>
                                <input type="email" id="email" name="email" className="form-control" placeholder="Ingresa tu email" value={userData.email} onChange={handleChange} disabled={!isEditable} />
                            </div>
                            {/* Redes sociales */}
                            <div className="mb-3 user-title adlam-display-regular">
                                <h5>Información de contacto</h5>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label adlam-display-regular">Teléfono</label>
                                <input type="text" id="phone" name="phone" className="form-control" placeholder="Ingresa tu teléfono" value={userData.phone} onChange={handleChange} disabled={!isEditable} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="instagram" className="form-label adlam-display-regular">Instagram</label>
                                <input type="text" id="instagram" name="instagram" className="form-control" placeholder="Ingresa tu Instagram" value={userData.instagram !== undefined && userData.instagram !== null ? userData.instagram : ''} onChange={handleChange} disabled={!isEditable} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="facebook" className="form-label adlam-display-regular">Facebook</label>
                                <input type="text" id="facebook" name="facebook" className="form-control" placeholder="Ingresa tu Facebook" value={userData.facebook !== undefined && userData.facebook !== null ? userData.facebook : ''} onChange={handleChange} disabled={!isEditable} />
                            </div>
                            <div className="d-grid gap-2 col-6 mx-auto">
                                <button type="submit" className="btn btn-primary adlam-display-regular rounded-pill btnStart">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Modal de éxito */}
                {showSuccessModal && (
                    <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} aria-hidden="false">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title adlam-display-regular" id="exampleModalLabel">Perfil actualizado exitosamente</h5>
                                    <button type="button" className="btn-close" onClick={handleCloseSuccessModal}></button>
                                </div>
                                <div className="modal-body">
                                    Los datos de tu perfil han sido actualizados correctamente.
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary adlam-display-regular" onClick={handleCloseSuccessModal}>Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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
                        {
                                userPets.filter(fItem => fItem.user_details.email == sessionStorage.getItem("usuario logueado")).map(pet => (
                                    <li className="list-group-item d-flex justify-content-between align-items-center" key={pet.pet_id}>
                                        <span className="adlam-display-regular" style={{ color: "darkblue" }}>{pet.name}</span>
                                        <span className="d-flex align-items-center">
                                            {/* Mostrar el switch solo si la mascota está perdida */}
                                            {pet.pet_status !== "Encontrado" && pet.switchVisible && (
                                                <div className="form-check form-switch">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`switch-${pet.pet_id}`}
                                                        style={{ cursor: 'pointer' }}
                                                        checked={pet.pet_status !== "Encontrado"}  // Si no está encontrado, el switch está encendido
                                                        onChange={(e) => handleSwitchChange(pet.pet_id, e.target.checked ? "lost" : "joined")}
                                                    />
                                                    <label className="form-check-label adlam-display-regular" htmlFor={`switch-${pet.pet_id}`}>
                                                        {pet.pet_status === "joined" ? "Mascota encontrada" : "Mascota perdida"}
                                                    </label>
                                                </div>
                                            )}
                                            {/* Si la mascota ya está encontrada, solo mostramos el texto */}
                                            {pet.pet_status === "Encontrado" && (
                                                <span className="ms-2">
                                                    Mascota encontrada
                                                </span>
                                            )}
                                            {/* Íconos de acción */}
                                            <i className="fa-regular fa-trash-can" style={{ cursor: 'pointer', paddingLeft: '10px' }} onClick={() => handleDeleteClick(pet)}></i>
                                        </span>
                                    </li>
                                ))
                            }
                            {/*{userPets.map(pet => (
                                <li className="list-group-item d-flex justify-content-between align-items-center" key={pet.pet_id}>
                                    <span className="adlam-display-regular" style={{ color: "darkblue" }}>{pet.name}</span>

                                    <span className="d-flex align-items-center">
                                        {/* Mostrar el switch solo si la mascota está perdida }
                                        {pet.pet_status !== "Encontrado" && pet.switchVisible && (
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`switch-${pet.pet_id}`}
                                                    style={{ cursor: 'pointer' }}
                                                    checked={pet.pet_status !== "Encontrado"}  // Si no está encontrado, el switch está encendido
                                                    onChange={(e) => handleSwitchChange(pet.pet_id, e.target.checked ? "lost" : "joined")}
                                                />
                                                <label className="form-check-label adlam-display-regular" htmlFor={`switch-${pet.pet_id}`}>
                                                    {pet.pet_status === "joined" ? "Mascota encontrada" : "Mascota perdida"}
                                                </label>
                                            </div>
                                        )}

                                        {/* Si la mascota ya está encontrada, solo mostramos el texto }
                                        {pet.pet_status === "Encontrado" && (
                                            <span className="ms-2">
                                                Mascota encontrada
                                            </span>
                                        )}

                                        {/* Íconos de acción 
                                        <i className="fa-regular fa-trash-can" style={{ cursor: 'pointer', paddingLeft: '10px' }} onClick={() => handleDeleteClick(pet)}></i>
                                    </span>
                                </li>
                            ))}*/ }
                        </ul>
                    </div>

                    {/* Card Informativa */}
                    <div className="col-12 mt-4">
                            <div className="card shadow-sm p-4 rounded-5 border-primary" style={{ width: '100%' }}>
                                <h5 className="adlam-display-regular">Si ya encontraste a tu mascota:</h5>
                                <p>Deshabilita el switch de su publicación. <strong>¡Cuidado! Una vez confirmado que tu mascota fue encontrada, ya no puedes deshacer la acción.</strong></p>
                                <p>Luego, <strong>¡no hace falta que elimines la publicación!</strong></p>
                                <p>Tu mascota aparecerá en nuestro mapa como un símbolo verde, ¡que significa que ya te has reunido con ella!</p>
                                <img src={mapaIconoVerde} alt="Símbolo verde en el mapa" className="img-fluid" />
                            </div>
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
                                <button type="button" className="btn adlam-display-regular btn-secondary" onClick={handleDeleteCancel}>Cancelar</button>
                                <button type="button" className="btn adlam-display-regular btn-danger" onClick={handleDeleteConfirm}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para confirmar cambio de estado */}
            {showChangeModal && (
                <div className="modal fade show" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: 'block' }} aria-hidden="false">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title adlam-display-regular" id="exampleModalLabel">Confirmar cambio de estado</h5>
                                <button type="button" className="btn-close" onClick={handleCancelChange}></button>
                            </div>
                            <div className="modal-body">
                                ¿Estás seguro de que deseas cambiar el estado de esta mascota? Esto confirma que tu mascota ya no está perdida.
                                <hr />
                                <p>Este cambio no podrá deshacerse.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn adlam-display-regular btn-secondary" onClick={handleCancelChange}>Cancelar</button>
                                <button type="button" className="btn adlam-display-regular  btn-primary" onClick={handleConfirmChange}>Confirmar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default User;

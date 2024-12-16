import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logoTransparentePNG.png";
import publicarMascota from "../../img/gif_publicar_mascota.gif";

const Que_es = () => {

    return (
        <div className="container mt-4">
            {/* Sección 1: Introducción */}
            <div className="row md-5 bg-light bg-opacity-75 rounded-1 mb-4 p-4">
                <div className="col-md-6">
                    <h2 className="adlam-display-regular user-title">¿Qué es Patas Perdidas?</h2>
                    <p className='texto-grande'>
                        Patas Perdidas es una plataforma digital diseñada para ayudar a las personas a encontrar o reportar
                        mascotas perdidas y encontradas en su zona.
                    </p>
                    <p className='texto-grande'>
                        Nuestro objetivo es conectar a las personas con mascotas que
                        se han extraviado, facilitando la comunicación entre los usuarios y aumentando las posibilidades de
                        reunirse con sus queridos animales.
                    </p>
                </div>
                <div className="col-md-6">
                    <img src={logo} alt="Patas Perdidas logo" className="img-fluid rounded" />
                </div>
            </div>

            {/* Sección 2: Cómo publicar una mascota */}
            <div className="par row md-5 bg-light bg-opacity-75 rounded-1 mb-4 p-4">
                <div className="col-md-6 order-md-2">
                    <h3 className="adlam-display-regular user-title">¿Cómo publicar una mascota perdida o encontrada?</h3>
                    <div>
                        <p className='texto-grande'>Para publicar una mascota perdida o encontrada, solo necesitas seguir estos simples pasos:</p>
                        <ol className='texto-grande'>
                            <li>Accede a tu cuenta o crea una nueva.</li>
                            <li>Haz clic en el botón "Publicar una mascota" en la página principal.</li>
                            <li>Llena el formulario con los detalles de la mascota, incluyendo su ubicación, foto y descripción.</li>
                            <li>Una vez enviado el formulario, tu publicación aparecerá en el mapa y la lista de mascotas.</li>
                        </ol>
                    </div>
                </div>
                <div className="col-md-6 order-md-1">
                    <img src={publicarMascota} alt="Publicar mascota, proceso" className="img-fluid rounded" />
                </div>
            </div>

            {/* Sección 3: Interacción con el mapa */}
            <div className="row md-5 bg-light bg-opacity-75 rounded-1 mb-4 p-4">
                <div className="col-md-6">
                    <h3 className="adlam-display-regular user-title">Interactuar con el mapa</h3>
                    <div>
                        <p className='texto-grande'>El mapa es una de las herramientas principales en Patas Perdidas. Te permite visualizar las mascotas
                            perdidas y encontradas cerca de tu ubicación. Para interactuar con el mapa:</p>
                        <ul className='texto-grande'>
                            <li>Haz zoom para explorar áreas más amplias o cerca de tu localidad.</li>
                            <li>Haz clic en los íconos para ver más detalles de cada mascota reportada.</li>
                            <li>Los íconos en rojo significan que se reportó una mascota fuera de su hogar, en ese lugar.</li>
                            <li>¡Los íconos en verde significan que una mascota perdida pudo regresar con su dueño!</li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-6">
                    <img src="/path/to/your/screenshot3.png" alt="Mapa Patas Perdidas" className="img-fluid rounded" />
                </div>
            </div>

            {/* Sección 4: Contacto con los usuarios */}
            <div className="par row md-5 bg-light bg-opacity-75 rounded-1 mb-4 p-4">
                <div className="col-md-6 order-md-2">
                    <h3 className="adlam-display-regular user-title">¿Cómo contactar con el usuario?</h3>
                    <div>
                        <p className='texto-grande'>Si has encontrado una mascota que está reportada en el mapa, o si has visto una publicación de tu mascota perdida, puedes contactar
                            al usuario que la publicó. Para hacerlo:</p>
                        <ul className='texto-grande'>
                            <li>Haz clic en la publicación de la mascota para ver más detalles.</li>
                            <li>En la página de detalles, encontrarás la información de contacto del usuario que la reportó.</li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-6 order-md-1">
                    <img src="/path/to/your/screenshot4.png" alt="Contactar usuario" className="img-fluid rounded" />
                </div>
            </div>
        </div>
    );
}

export default Que_es;
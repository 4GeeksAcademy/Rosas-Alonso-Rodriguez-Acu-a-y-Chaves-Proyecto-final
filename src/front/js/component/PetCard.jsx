import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import logo from "../../img/logoTransparentePNG.png";

const PetCard = () => {
  const { store } = useContext(Context);
  const { theid } = useParams();
  console.log("Pet ID from URL:", theid);
  const [detail, setDetail] = useState(null);
  const [mainImage, setMainImage] = useState({ logo }); // Imagen principal inicial
  const [userInfo, setUserInfo] = useState(null);


  // Función para obtener los datos de la mascota desde el backend
  const fetchPetData = async (petId) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/pet/${petId}`);
      const data = await response.json();

      if (data.msg === 'ok') {
        const petDetails = data.data;
        const userDetails = petDetails.user_details;
        setDetail(petDetails); // Actualiza el estado con los detalles de la mascota
        setMainImage(petDetails?.photo_1 || { logo }); // Usa la primera foto o la de por defecto
        setUserInfo(userDetails);

      } else {
        console.error('Error fetching pet data:', data.msg);
      }
    } catch (error) {
      console.error('Error fetching pet data:', error);
    }
  };

  // useEffect que se ejecuta cuando el componente se monta o cuando cambia el `theid`
  useEffect(() => {
    if (theid) {
      fetchPetData(theid); // Llama a la API para obtener los detalles de la mascota
    }
  }, [theid]); // Solo se vuelve a ejecutar si cambia el ID

  if (!detail) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cargando...</span> {/* spinner amarillo mientras carga la card */}
        </div>
      </div>
    );
  }

  //para darle formato a la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="pet-card-container">
      {/* Navigation path */} {/* Arreglé links rotos   -Flor 17/12 */}
      <div className="d-flex justify-content-end navigation-path mb-3">
        <a href="/" className="text-secondary mx-2">
          Home </a>{" > "}
        <a href="/PetView" className="text-secondary mx-2">
          Mascotas </a>{" > Más información"}
      </div>

      <div className="row">
        {/* Imagen y carrousel */}
        <div className="col-md-6 image-section">
          {/* Imagen principal */}
          <div className="main-image-container">
            <img
              className="main-image img-fluid rounded"
              src={mainImage}
              alt="Main Pet"
            />
          </div>

          {/* Miniaturas debajo de la imagen principal */}
          <div className="image-thumbnails mt-3 ">
            <img
              className="thumbnail img-fluid m-2"
              src={detail?.photo_1}
              alt="Thumbnail 1"
              style={{ width: "80px", height: "auto", cursor: "pointer" }}
              onClick={() => setMainImage(detail.photo_1)}
            />
            <img
              className="thumbnail img-fluid m-2"
              src={detail?.photo_2 || logo}
              alt="Thumbnail 2"
              style={{ width: "80px", height: "auto", cursor: "pointer" }}
              onClick={() => setMainImage(detail.photo_2)}
            />
            <img
              className="thumbnail img-fluid m-2"
              src={detail?.photo_3 || logo}
              alt="Thumbnail 3"
              style={{ width: "80px", height: "auto", cursor: "pointer" }}
              onClick={() => setMainImage(detail.photo_3)}
            />
            <img
              className="thumbnail img-fluid m-2"
              src={detail?.photo_4 || logo}
              alt="Thumbnail 4"
              style={{ width: "80px", height: "auto", cursor: "pointer" }}
              onClick={() => setMainImage(detail.photo_4)}  /* Puse que la imagen por defecto sea el logo */
            />
          </div>

          {/* Botón Share debajo de la carrousel */}
          <div className="share-section mt-3">
            <h5>Compartir</h5>
            <div className="social-share d-flex justify-content-start">
              <a href="https://www.facebook.com/sharer/sharer.php?u=https://your-website.com" target="_blank" className="btn btn-outline-secondary mx-2">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com/intent/tweet?url=https://your-website.com" target="_blank" className="btn btn-outline-secondary mx-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://wa.me/?text=https://your-website.com" target="_blank" className="btn btn-outline-secondary mx-2">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Pet details */}
        <div className="col-md-6 info-section">
          <h4 className="text-primary user-title adlam-display-regular">{detail?.name}</h4>
          <p className="text-danger" style={{ fontSize: "1.5rem" }}>
            {detail?.pet_status === "Estoy perdido" ? "Perdido el: " : "Encontrado el: "} {formatDate(detail?.event_date)}
          </p>
          <a
            href="#contactForm"
            className="btn btn-primary mb-3 adlam-display-regular"
            data-bs-toggle="modal"
            data-bs-target="#contactModal"
            style={{
              backgroundColor: "darkblue", // Azul marino
              borderRadius: "20px", // Bordes curvos
              color: "white", // Texto blanco
              padding: "10px 20px", // Espaciado interno
              border: "none", // Sin borde adicional
              fontSize: "16px", // Tamaño del texto
            }}
          >
            Comunicarse
          </a>
          <table className="table">
            <tbody>
              <tr><th scope="row">NOMBRE:</th><td>{detail?.name}</td></tr>
              <tr><th scope="row">ESPECIE:</th><td>{detail?.species}</td></tr>
              <tr><th scope="row">RAZA:</th><td>{detail?.breed}</td></tr>
              <tr><th scope="row">SEXO:</th><td>{detail?.gender}</td></tr>
              <tr><th scope="row">COLOR:</th><td>{detail?.color}</td></tr>
              <tr><th scope="row">SE PERDIÓ EN:</th><td>{detail?.zone}</td></tr>
            </tbody>
          </table>
          <div>
            <strong>INFORMACIÓN ADICIONAL:</strong> {detail?.description}
          </div>
        </div>
      </div>

      {/* Modal para contacto */}
      {/* Modal para contacto */}
      <div
        className="modal fade"
        id="contactModal"
        tabIndex="-1"
        aria-labelledby="contactModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="contactModalLabel">
                Medios de contacto:
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className=" nunito modal-body container">
              <form>
                <div className=" align-items-start container-fluid .adlam-display">
                  <i className="fa-regular fa-envelope mb-4"></i>{" "}<a>{userInfo?.email}</a>
                </div>
                <div className="align-items-start container-fluid ">
                  <i className="fa-brands fa-square-facebook mb-4"></i>{" "}<a className="text-decoration-none" href={`https://www.facebook.com/${userInfo?.facebook}`}>{userInfo?.facebook}</a>
                </div>
                <div className="align-items-start container-fluid ">
                  <i className="fa-brands fa-instagram mb-4"></i>{" "}<a className="text-decoration-none" href={`https://www.instagram.com/${userInfo?.instagram}`}>{userInfo?.instagram}</a>
                </div>

              </form>
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button type="button" className="btn btn-primary">
                Enviar
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
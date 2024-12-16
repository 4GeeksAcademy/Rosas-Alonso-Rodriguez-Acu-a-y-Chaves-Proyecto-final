import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

const PetCard = () => {
  const { store, actions } = useContext(Context);
  // const [petinfo, setPetInfo]  = useState(null);
  let pet = store.fetchedPet //IR CAMBIANDO
  const { theid } = useParams();
  const [detail, setDetail] = useState(null);
  const [mainImage, setMainImage] = useState(null); // Imagen principal inicial

  useEffect(() => {
    if (pet?.pet_details?.photo_1) {
      setMainImage(pet.pet_details.photo_1); // Establece la imagen inicial si está disponible
    }
  }, [pet]); // Este efecto se ejecutará cuando pet cambie
  

  useEffect(() => {
    actions.getPet(theid);
  }, []);
console.log("OBJETO PETCARD:",pet)
  return (
    <div className="pet-card-container">
      {/* Navigation path */}
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
{/* Miniaturas debajo de la imagen principal */}
<div className="image-thumbnails mt-3 d-flex">
  <img
    className="thumbnail img-fluid mx-2"
    src={pet.pet_details?.photo_1 || "https://via.placeholder.com/150x100"}
    alt="Thumbnail 1"
    style={{ width: "80px", height: "auto", cursor: "pointer" }}
    onClick={() => setMainImage(pet.pet_details?.photo_1 || "https://via.placeholder.com/600x400")}
  />
  <img
    className="thumbnail img-fluid mx-2"
    src={pet.pet_details?.photo_3 || "https://via.placeholder.com/150x100/ff7f7f"}
    alt="Thumbnail 2"
    style={{ width: "80px", height: "auto", cursor: "pointer" }}
    onClick={() => setMainImage(pet.pet_details?.photo_2 || "https://via.placeholder.com/600x400/ff7f7f")}
  />
  <img
    className="thumbnail img-fluid mx-2"
    src={pet.pet_details?.photo_4 || "https://via.placeholder.com/150x100/7fff7f"}
    alt="Thumbnail 3"
    style={{ width: "80px", height: "auto", cursor: "pointer" }}
    onClick={() => setMainImage(pet.pet_details?.photo_3 || "https://via.placeholder.com/600x400/7fff7f")}
  />
        <img
          className="thumbnail img-fluid mx-2"
    src={pet.pet_details?.photo_4 || "https://cdn.pixabay.com/photo/2023/11/12/17/12/puppy-8383633_1280.jpg"}
    alt="Thumbnail 4"
    style={{ width: "80px", height: "auto", cursor: "pointer" }}
    onClick={() => setMainImage(pet.pet_details?.photo_4 || "https://cdn.pixabay.com/photo/2023/11/12/17/12/puppy-8383633_1280.jpg")}
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
          <h2 className="text-primary fw-bolder">{pet.pet_details?.name}</h2>
          <p className="text-danger" style={{ fontSize: "1.5rem" }}>
            {pet.pet_status === "Estoy perdido" ? "Perdido el:" : "Encontrado el:"}{" "}
              <span className="text-dark">{pet.event_date}</span>
            </p>

          <a
            href="#contactForm"
            className="btn btn-primary mb-3"
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
              <tr>
                <th scope="row">NOMBRE:</th>
                <td>{pet.pet_details?.name || "No disponible"}</td>
              </tr>
              <tr>
                <th scope="row">SEXO:</th>
                <td>{pet.pet_details?.gender}</td>
              </tr>
              <tr>
                <th scope="row">COLOR:</th>
                <td>{pet.pet_details?.color}</td>
              </tr>
              <tr>
                <th scope="row">SE PERDIÓ EN:</th>
                <td>{pet.zone}</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>INFORMACIÓN ADICIONAL:</strong> {pet.description}
          </p>
        </div>
      </div>

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
          Contacta al usuario
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        <h5>Sigue al usuario en redes sociales:</h5>
        <div className="d-flex justify-content-start">
          <a
            href={pet.pet_details?.user_details.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary mx-2"
          >
            <i className="fab fa-facebook"></i> Facebook
          </a>
          <a
            href={`mailto:${pet.pet_details?.user_details.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-info mx-2"
          >
            <i className="fas fa-envelope"></i> {pet.pet_details?.user_details.email}
          </a>
          <a
            href={pet.pet_details?.user_details.instagram}
            rel="noopener noreferrer"
            className="btn btn-outline-danger mx-2"
          >
            <i className="fab fa-instagram"></i> Instagram
          </a>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default PetCard;

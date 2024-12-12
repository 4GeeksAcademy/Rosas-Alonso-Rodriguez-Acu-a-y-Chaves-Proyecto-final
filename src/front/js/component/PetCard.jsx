import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

const PetCard = () => {
  const { store } = useContext(Context);
  const { theid } = useParams();
  const [detail, setDetail] = useState(null);
  const [mainImage, setMainImage] = useState(null); // Estado para la imagen principal

  const findDetail = () => {
    const result = store.petData.find((item) => item.id == theid);
    setDetail(result);
    setMainImage(result?.image); // Establecemos la imagen principal
  };

  useEffect(() => {
    findDetail();
  }, []);

  return (
    <div className="pet-card-container">
      {/* Navigation path */}
      <div className="d-flex justify-content-end navigation-path mb-3">
        <a
          href="https://sturdy-space-invention-q7947gjpqj76fx57r-3000.app.github.dev/"
          className="text-secondary mx-2"
        >
          Home
        </a>{" "}
        /{" "}
        <a
          href="https://sturdy-space-invention-q7947gjpqj76fx57r-3000.app.github.dev/PetView"
          className="text-secondary mx-2"
        >
          Mascotas
        </a>{" "}
        / More Info
      </div>

      <div className="row">
        {/* Main image and gallery */}
        <div className="col-md-6 image-section">
          {/* Imagen principal */}
          <img
            className="main-image img-fluid rounded"
            src={mainImage}
            alt={detail?.name}
          />
          <div className="gallery d-flex mt-3 flex-wrap justify-content-center">
            {/* Galería de imágenes */}
            {detail?.gallery?.slice(0, 4).map((img, index) => (
              <img
                key={index}
                className="img-thumbnail mx-1 mt-3"
                src={img}
                alt={`Gallery ${index}`}
                style={{ width: "23%", height: "100px", cursor: "pointer" }}
                onClick={() => setMainImage(img)} // Cambia la imagen principal al hacer clic
              />
            ))}
          </div>
          <div className="share-icons mt-3">
            <span>Share:</span>
            <a
              href="https://www.facebook.com"
              className="text-secondary mx-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a
              href="https://www.twitter.com"
              className="text-secondary mx-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a
              href="https://www.instagram.com"
              className="text-secondary mx-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Pet details */}
        <div className="col-md-6 info-section">
          <h3 className="text-primary">{detail?.name}</h3>
          <p className="text-danger" style={{ fontSize: "1.5rem" }}>
              {/* Se va a manejar como un estado?*/}
            Perdido/Encontrado el {detail?.lostDate}
          </p>
          <a
            href="https://example.com/contact"
            className="btn btn-primary mb-3"
          >
            Comunicarse
          </a>
          <table className="table">
            <tbody>
              <tr>
                <th scope="row">Nombre:</th>
                <td>{detail?.name}</td>
              </tr>
              <tr>
                <th scope="row">Sexo:</th>
                <td>{detail?.gender}</td>
              </tr>
              <tr>
                <th scope="row">Edad:</th>
                <td>{detail?.age}</td>
              </tr>
              <tr>
                <th scope="row">
                  <span style={{ fontSize: "1.3rem" }}>Tamaño:</span>
                </th>
                <td>{detail?.size}</td>
              </tr>
              <tr>
                <th scope="row">Color:</th>
                <td>{detail?.color}</td>
              </tr>
              <tr>
                {/* Acá van a ir coordenadas? */}
                <th scope="row">Se perdió en:</th>
                <td>{detail?.location}</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>Información adicional:</strong> {detail?.additionalInfo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PetCard;

import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

const PetCard = () => {
  const { store } = useContext(Context);
  const { theid } = useParams();
  const [detail, setDetail] = useState(null);

  const findDetail = () => {
    const result = store.petData.find((item) => item.id == theid);
    setDetail(result);
  };

  useEffect(() => {
    findDetail();
  }, []);

  return (
    <div className="pet-card-container">
      {/* Navigation path */}
      <div className="navigation-path mb-2">
        <a href="/">Home</a> / <a href="/mascotas">Mascotas</a> / More Info
      </div>

      <div className="row">
        {/* Main image and gallery */}
        <div className="col-md-6 image-section">
          <img
            className="main-image img-fluid rounded"
            src={detail?.image}
            alt={detail?.name}
          />
          <div className="gallery d-flex mt-3 flex-wrap">
            {/* Main image */}
            <img
              className="main-image img-fluid rounded mt-3"
              src={detail?.image}
              alt={detail?.name}
              style={{ width: "33%", height: "100px" }}
            />
            {/* Additional photos from gallery */}
            {detail?.gallery?.slice(0, 4).map((img, index) => (
              <img
                key={index}
                className="img-thumbnail mx-1 mt-3"
                src={img}
                alt={`Gallery ${index}`}
                style={{ width: "33.33%", height: "100px" }}
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
          <p className="text-danger">
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
                <th scope="row">Género:</th>
                <td>{detail?.gender}</td>
              </tr>
              <tr>
                <th scope="row">Edad:</th>
                <td>{detail?.age}</td>
              </tr>
              <tr>
                <th scope="row">Tamaño:</th>
                <td>{detail?.size}</td>
              </tr>
              <tr>
                <th scope="row">Color:</th>
                <td>{detail?.color}</td>
              </tr>
              <tr>
                <th scope="row">Vacunado:</th>
                <td>{detail?.vaccinated}</td>
              </tr>
              <tr>
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
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

const PetCard = () => {
  const { store, actions } = useContext(Context);
  const { theid } = useParams();
  const [mainImage, setMainImage] = useState(null);
  const [editableFields, setEditableFields] = useState({
    name: "",
    gender: "",
    color: "",
    zone: "",
    description: "",
  });
  const [originalFields, setOriginalFields] = useState({});
  const [editMode, setEditMode] = useState({}); // Controla qué campo está en edición
  const [isEditing, setIsEditing] = useState(false); // Controla si se muestra Guardar/Cancelar
  const [editPet, setEditPet] = useState("");

  useEffect(() => {
    actions.getPet(theid);
  }, []);

  useEffect(() => {
    if (store.fetchedPet?.pet_details?.photo_1) {
      setMainImage(store.fetchedPet.pet_details.photo_1);
      console.log("ENTRE AL segundo USEFFECT")

    }
    if (store.fetchedPet) {
      const initialFields = {
        name: store.fetchedPet.pet_details?.name || "",
        gender: store.fetchedPet.gender || "",
        color: store.fetchedPet.pet_details?.color || "",
        zone: store.fetchedPet.zone || "",
        description: store.fetchedPet.description || "",
      };
      setEditableFields(initialFields);
      setOriginalFields(initialFields);
    }
  }, [store.fetchedPet]);

  const handleChange = (field, value) => {
    setEditableFields({
      ...editableFields,
      [field]: value,
    });
  };

  const toggleEditMode = (field) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
    setIsEditing(true); // Activa el estado de edición
  };

  const handleSave = () => {
    // Crea el objeto que contiene la información actualizada
    const updatedPet = {
      ...store.fetchedPet, // Mantiene los valores existentes
      pet_details: {
        ...store.fetchedPet.pet_details,
        name: editableFields.name,
        gender: editableFields.gender,
        color: editableFields.color,
      },
      zone: editableFields.zone,
      description: editableFields.description,
    };
    console.log(editableFields.gender)
    const newupdatedPet = {
        name: editableFields.name,
        gender: editableFields.gender,
        color: editableFields.color,
        zone: editableFields.zone,
        description: editableFields.description,
    }

    console.log("NEWUPDATEDPET: ",newupdatedPet)
  
    // Llama a la acción updatePet del Flux
    actions.updatePet(theid, newupdatedPet);
    setEditPet(true)
    setIsEditing(false); // Desactiva el modo edición
    setEditMode({});
  };
  

  const handleCancel = () => {
    setEditableFields(originalFields); // Revertir cambios
    setIsEditing(false);
    setEditMode({});
  };

  const pet = store.fetchedPet;

  return (
    <div className="pet-card-container">
      <div className="row">
        {/* Sección de imágenes */}
        <div className="col-md-6 image-section">
          <div className="main-image-container">
            <img
              className="main-image img-fluid rounded"
              src={mainImage || "https://via.placeholder.com/600x400"}
              alt="Main Pet"
            />
          </div>
          <div className="image-thumbnails mt-3 d-flex">
            {["photo_1", "photo_2", "photo_3", "photo_4"].map((photoKey, index) => (
              <img
                key={index}
                className="thumbnail img-fluid mx-2"
                src={pet?.pet_details?.[photoKey] || "https://via.placeholder.com/150x100"}
                alt={`Thumbnail ${index + 1}`}
                style={{ width: "80px", height: "auto", cursor: "pointer" }}
                onClick={() => setMainImage(pet?.pet_details?.[photoKey] || "https://via.placeholder.com/600x400")}
              />
            ))}
          </div>
        </div>

        {/* Información de la mascota con edición */}
        <div className="col-md-6 info-section">
          <h2 className="text-primary fw-bolder">Detalles de la Mascota</h2>

          {/* Campos editables */}
          {[
            { label: "Nombre", field: "name" },
            { label: "Sexo", field: "gender", isSelect: true },
            { label: "Color", field: "color" },
            { label: "Se perdió en", field: "zone" },
            { label: "Información adicional", field: "description", isTextarea: true },
          ].map(({ label, field, isSelect, isTextarea }) => (
            <div key={field} className="d-flex align-items-start mb-3">
              <strong className="me-2">{label}:</strong>
              {editMode[field] ? (
                isTextarea ? (
                  <textarea
                    rows="2"
                    value={editableFields[field]}
                    className="form-control"
                    onChange={(e) => handleChange(field, e.target.value)}
                  ></textarea>
                ) : isSelect ? (
                  <select
                    value={editableFields[field]}
                    className="form-select"
                    onChange={(e) => handleChange(field, e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    <option value="male">Macho</option>
                    <option value="female">Hembra</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={editableFields[field]}
                    className="form-control"
                    onChange={(e) => handleChange(field, e.target.value)}
                  />
                )
              ) : (
                <span>{editableFields[field] || "No disponible"}</span>
              )}
              <i
                className="fas fa-pencil-alt ms-2 text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => toggleEditMode(field)}
              ></i>
            </div>
          ))}

          {/* Botones Guardar y Cancelar */}
          {isEditing && (
            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-success" onClick={handleSave}>
                Guardar cambios
              </button>
              <button className="btn btn-danger" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetCard;
import React from "react";
import "../../styles/pets-view.css";

const PetCard = ({ pet }) => {
  return (
    <div className="pet-card">
      <img src={pet.image} alt={pet.name} className="pet-image" />
      <h3>{pet.name}</h3>
      <p>{pet.description}</p>
      <p className="pet-price">{pet.price}</p>
    </div>
  );
};

export default PetCard;

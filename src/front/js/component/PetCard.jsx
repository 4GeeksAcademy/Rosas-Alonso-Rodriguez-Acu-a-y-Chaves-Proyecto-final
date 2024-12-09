
import React from 'react';

const PetCard = ({ pet }) => {

  console.log(pet); // Esto nos ayudará a verificar si la mascota está llegando correctamente
  
  return (
    <div className="pet-card">
      <img src={pet.image} alt={pet.name} />
      <h3>{pet.name}</h3>
      <p>Tipo: {pet.type}</p>
      <p>Color: {pet.color}</p>
      <p>Tamaño: {pet.size}</p>
    </div>
  );
};
export default PetCard;






//import React from "react";
//import { useParams } from "react-router-dom";
//
const PetCard = ({ pets }) => {
  const { id } = useParams(); // Obtener el id de la mascota desde la URL
  const pet = pets.find((p) => p.id === parseInt(id)); // Buscar la mascota por su id

  if (!pet) {
    return <h2>Mascota no encontrada</h2>;
  }

  return (
    <div>
      <h1>{pet.name}</h1>
      <img src={pet.image} alt={pet.name} style={{ width: "300px", height: "300px" }} />
      <p>Tipo: {pet.type}</p>
      <p>Color: {pet.color}</p>
      <p>Tamaño: {pet.size}</p>
    </div>
  );
};

export default PetCard;

import React, { useState } from "react";
import Navbar from "./Navbar";
import PetCard from "./PetCard";
import Filters from "./Filters";
import "../../styles/pets-view.css";

const petsData = [
  { id: 1, name: "Chuchi", description: "Foodie Tiny Yellow", price: "$300", image: "url1" },
  { id: 2, name: "Bubu", description: "Foodie Tiny Sepia", price: "$350", image: "url2" },
  // Más datos de ejemplo...
];

const PetsView = () => {
  const [filters, setFilters] = useState({});
  const [filteredPets, setFilteredPets] = useState(petsData);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: checked ? value : "",
    }));
    // Aquí implementa la lógica para filtrar `petsData` en base a los filtros
  };

  return (
    <div>
      <Navbar />
      <div className="pets-view">
        <Filters onFilterChange={handleFilterChange} />
        <div className="pet-cards">
          {filteredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetsView;

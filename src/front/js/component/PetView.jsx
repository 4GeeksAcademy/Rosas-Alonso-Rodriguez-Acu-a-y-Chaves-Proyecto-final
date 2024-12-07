import React, { useState, useEffect } from "react";

const PetsView = () => {
  // Estado para los datos y los filtros
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [filters, setFilters] = useState({
    type: "", // Tipo de mascota (perro, gato, etc.)
    color: "", // Color de la mascota
    size: "",  // Tamaño de la mascota
  });

  // Simulación de datos o carga desde una API
  useEffect(() => {
    const petData = [
      { id: 1, name: "Max", type: "perro", color: "negro", size: "grande", image: "/img/max.jpg" },
      { id: 2, name: "Bella", type: "gato", color: "blanco", size: "pequeño", image: "/img/bella.jpg" },
      { id: 3, name: "Rocky", type: "conejo", color: "marrón", size: "mediano", image: "/img/rocky.jpg" },
      { id: 4, name: "Spike", type: "reptil", color: "verde", size: "pequeño", image: "/img/spike.jpg" },
      { id: 5, name: "Luna", type: "otro", color: "gris", size: "grande", image: "/img/luna.jpg" },
      // Más datos...
    ];
    setPets(petData);
    setFilteredPets(petData); // Mostrar todo inicialmente
  }, []);

  // Manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Filtrar mascotas
  useEffect(() => {
    const filtered = pets.filter((pet) => {
      return (
        (filters.type === "" || pet.type === filters.type) &&
        (filters.color === "" || pet.color === filters.color) &&
        (filters.size === "" || pet.size === filters.size)
      );
    });
    setFilteredPets(filtered);
  }, [filters, pets]);

  return (
    <div className="container mt-4">
      {/* Filtros */}
      <div className="row mb-4">
        {/* Filtro por tipo */}
        <div className="col-md-4">
          <label>Tipo:</label>
          <select name="type" className="form-control" onChange={handleFilterChange}>
            <option value="">Todos</option>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
            <option value="conejo">Conejo</option>
            <option value="reptil">Reptil</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        {/* Filtro por color */}
        <div className="col-md-4">
          <label>Color:</label>
          <select name="color" className="form-control" onChange={handleFilterChange}>
            <option value="">Todos</option>
            <option value="negro">Negro</option>
            <option value="blanco">Blanco</option>
            <option value="marrón">Marrón</option>
            <option value="verde">Verde</option>
            <option value="gris">Gris</option>
          </select>
        </div>

        {/* Filtro por tamaño */}
        <div className="col-md-4">
          <label>Tamaño:</label>
          <select name="size" className="form-control" onChange={handleFilterChange}>
            <option value="">Todos</option>
            <option value="pequeño">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
        </div>
      </div>

      {/* Tarjetas de mascotas */}
      <div className="row">
        {filteredPets.map((pet) => (
          <div className="col-md-4 mb-3" key={pet.id}>
            <div className="card">
              <img src={pet.image} className="card-img-top" alt={pet.name} />
              <div className="card-body">
                <h5 className="card-title">{pet.name}</h5>
                <p className="card-text">
                  Tipo: {pet.type} <br />
                  Color: {pet.color} <br />
                  Tamaño: {pet.size}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetsView;

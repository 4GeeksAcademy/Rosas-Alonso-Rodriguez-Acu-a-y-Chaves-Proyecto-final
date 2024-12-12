import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PetsView = () => {
  // Estado para los datos y los filtros
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [filters, setFilters] = useState({
    type: "", // Tipo de mascota (perro, gato, etc.)
    color: "", // Color de la mascota
    size: "",  // Tamaño de la mascota
    sex: "",   // Sexo de la mascota (macho o hembra)
  });

const BringAllPetsAPI = () => {
      fetch('https://super-duper-dollop-x5rqv9jj6pv7cvx4p-3001.app.github.dev/pets')
      .then((resp) => resp.json())
      .then((data) => {
        setPets(data.data);
        setFilteredPets(data.data); // Mostrar todo inicialmente      
        })
}


  // Simulación de datos o carga desde una API
  useEffect(() => {
    const petData = [
      { id: 1, name: "Max", type: "Perro", color: "negro", sex: "macho", size: "grande", image: "data:image/jpeg;base64,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" },
      { id: 2, name: "Bella", type: "Gato", color: "amarillo", sex: "hembra", size: "pequeño", image:"https://i.pinimg.com/originals/0e/91/e4/0e91e41c74453abb2730c718aa3814a5.jpg" },
      { id: 3, name: "Rocky", type: "Perro", color: "marrón", size: "Mediano", image: "https://i.pinimg.com/236x/3a/2a/bb/3a2abb553a0a8e46bfb03d3ade3e16a4.jpg" },
      { id: 4, name: "Spike", type: "gato", color: "verde", sex:"macho", size: "Pequeño", image: "https://images.unsplash.com/photo-1690214141978-3a038a437dec?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2F0aXRvJTIwZW4lMjBsYSUyMGNhbWF8ZW58MHx8MHx8fDA%3D" },
      { id: 5, name: "Luna", type: "otro", color: "gris", size: "Grande", image: "https://cdn.pixabay.com/photo/2017/01/16/19/54/ireland-1985088_1280.jpg" },
      { id: 6, name: "Chameleon", type: "reptil", color: "multicolor", size: "Pequeño", image: "https://mundoreptil.net/wp-content/uploads/primer-plano-increible-habilidad.webp" },
      { id: 7, name: "Blanquita", type: "otro", color: "Blanco y Negro", size: "Pequeño", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfkhMZAkUKlthC2a_1jMkEhoMzNakBrJcegQ&s" },
      { id: 8, name: "Bella", type: "gato", color: "blanco", size: "pequeño", image: "https://vitalcan.es/wp-content/uploads/kitty-2903812_1280.jpg" },
      { id: 9, name: "Bella", type: "gato", color: "blanco", size: "pequeño", image: "data:image/jpeg;base64,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" },
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
        (filters.size === "" || pet.size === filters.size) &&
        (filters.sex === "" || pet.sex === filters.sex)
      );
    });
    setFilteredPets(filtered);
  }, [filters, pets]);
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Columna de Filtros */}
        <div className="col-md-3">
          <div className="filters-container">
            <h5>Filtrar por:</h5>
            {/* Filtro por sexo */}
            <div className="filter mb-3">
              <label>Sexo:</label>
              <select name="type" className="form-control" onChange={handleFilterChange}>
                <option value="">Todos</option>
                <option value="perro">Macho</option>
                <option value="gato">Hembra</option>

              </select>
            </div>
            {/* Filtro por tipo */}
            <div className="filter mb-3">
              <label>Especie:</label>
              <select name="type" className="form-control" onChange={handleFilterChange}>
                <option value="">Todos</option>
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
                <option value="conejo">Conejo</option>
                <option value="reptil">Reptil</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {/* Filtro por color */}
            <div className="filter mb-3">
              <label>Color:</label>
              <div>
                <label className="d-flex align-items-center mb-2">
                  <input
                    type="radio"
                    name="color"
                    value=""
                    className="form-check-input"
                    onChange={handleFilterChange}
                  />
                  <span className="ms-2">Todos</span>
                </label>

                <label className="d-flex align-items-center mb-2">
                  <input
                    type="radio"
                    name="color"
                    value="negro"
                    className="form-check-input"
                    onChange={handleFilterChange}
                  />
                  <span
                    className="ms-2"
                    style={{
                      backgroundColor: 'black',
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                    }}
                  ></span>
                  <span className="ms-2">Negro</span>
                </label>

                <label className="d-flex align-items-center mb-2">
                  <input
                    type="radio"
                    name="color"
                    value="blanco"
                    className="form-check-input"
                    onChange={handleFilterChange}
                  />
                  <span
                    className="ms-2"
                    style={{
                      backgroundColor: 'white',
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                    }}
                  ></span>
                  <span className="ms-2">Blanco</span>
                </label>
                <label className="d-flex align-items-center mb-2">
                  <input
                    type="radio"
                    name="color"
                    value="gris"
                    className="form-check-input"
                    onChange={handleFilterChange}
                  />
                  <span
                    className="ms-2"
                    style={{
                      backgroundColor: 'grey',
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                    }}
                  ></span>
                  <span className="ms-2">Gris</span>
                </label>
                <label className="d-flex align-items-center mb-2">
                  <input
                    type="radio"
                    name="color"
                    value="multicolor"
                    className="form-check-input"
                    onChange={handleFilterChange}
                  />
                  <span
                    className="ms-2"
                    style={{
                      backgroundColor: "linear-gradient(45deg, #FF6347, #6A5ACD, #32CD32, #FFD700)",
                      border: '1px solid black',
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                    }}
                  ></span>
                  <span className="ms-2">Multicolor</span>
                </label>

                <label className="d-flex align-items-center mb-2">
                  <input
                    type="radio"
                    name="color"
                    value="marrón"
                    className="form-check-input"
                    onChange={handleFilterChange}
                  />
                  <span
                    className="ms-2"
                    style={{
                      backgroundColor: 'brown',
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                    }}
                  ></span>
                  <span className="ms-2">Marrón</span>
                </label>

                <label className="d-flex align-items-center mb-2">
                  <input
                    type="radio"
                    name="color"
                    value="blanco-negro"
                    className="form-check-input"
                    onChange={handleFilterChange}
                  />
                  <span
                    className="ms-2"
                    style={{
                      background: 'linear-gradient(45deg, black 50%, white 50%)',
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                      border: '1px solid black',
                    }}
                  ></span>
                  <span className="ms-2">Blanco y Negro</span>
                </label>
              </div>
            </div>
            {/* Filtro por tamaño */}
            <div className="filter mb-3">
              <label>Tamaño:</label>
              <select name="size" className="form-control" onChange={handleFilterChange}>
                <option value="">Todos</option>
                <option value="pequeño">Pequeño</option>
                <option value="mediano">Mediano</option>
                <option value="grande">Grande</option>
              </select>
            </div>
          </div>
        </div>

        {/* Columna de Tarjetas */}
        <div className="col-md-9">
          <div className="row">
            {filteredPets.map((pet) => (
              <div className="col-md-4 mb-3" key={pet.id}>
                <div className="card">
                  <img src={pet.photo_1} className="card-img-top" alt={pet.name} />
                  <div className="card-body">
                    <h5 className="card-title">{pet.name}</h5>
                    <p className="card-text">
                      Tipo: {pet.type} <br />
                      Color: {pet.color} <br />
                      Sexo: {pet.size}
                    </p>
                    <Link to={`/petcard/${pet.id}`}>Más información</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetsView;

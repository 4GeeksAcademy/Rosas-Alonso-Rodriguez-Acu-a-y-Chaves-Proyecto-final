import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const PetsView = () => {
  // Estado para los datos y los filtros
  const {store, actions} = useContext(Context);
  let pets = store.fetchedPetPosts
  // const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [filters, setFilters] = useState({
    type: "", // Tipo de mascota (perro, gato, etc.)
    color: "", // Color de la mascota
    size: "",  // Tamaño de la mascota
    sex: "",   // Sexo de la mascota (macho o hembra)
  });



  // Simulación de datos o carga desde una API
  useEffect(() => {
    actions.getAllPetPosts()
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
        (filters.type === "" || pet.species === filters.type) &&
        (filters.color === "" || pet.color === filters.color) &&
        (filters.size === "" || pet.size === filters.size) &&
        (filters.sex === "" || pet.gender === filters.sex)
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
              <select name="sex" className="form-control" onChange={handleFilterChange}> {/*No se por que aca decia name ="type" en lugar de "sex"*/}
                <option value="">Todos</option>
                <option value="macho">Macho</option> {/*No se por que aca decia "perro"*/}
                <option value="hembra">Hembra</option> {/*No se por que aca decia "gato"*/}

              </select>
            </div>
            {/* Filtro por tipo */}
            <div className="filter mb-3">
              <label>Especie:</label>
              <select name="type" className="form-control" onChange={handleFilterChange}>
                <option value="">Todos</option>
                <option value="1">Perro</option>
                <option value="2">Gato</option>
                <option value="3">Ave</option>
                <option value="4">Conejo</option>
                <option value="5">Reptil</option>
                <option value="6">Otro</option>
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
                      Tipo: {pet.species === "1"
                              ? "Perro"
                              : pet.species === "2"
                              ? "Gato"
                              : pet.species === "3"
                              ? "Ave"
                              : pet.species === "4"
                              ? "Conejo"
                              : pet.species === "5"
                              ? "Reptil"
                              : pet.species === "6"
                              ? "Otro"
                              : "Desconocido"} <br />
                      Color: {pet.color} <br />
                      Sexo: {pet.gender}
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

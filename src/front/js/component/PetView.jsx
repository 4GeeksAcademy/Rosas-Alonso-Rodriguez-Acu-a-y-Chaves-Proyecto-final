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

  const [loading, setLoading] = useState(true); // Agregué esto para el spinner  -Flor 17/12

  // Simulación de datos o carga desde una API
  useEffect(() => {
    actions.getAllPetPosts().then(()=> {  //modifiqué solo agregando el .then, para el spinner  -Flor 17/12
      setLoading(false);
    })
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

  // Spinner de carga   -Flor 17/12
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Columna de Filtros */}
        <div className="col-md-3">
          <div className="filters-container adlam-display-regular">
            <h5 className="text-primary">Filtrar por:</h5>
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
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
                <option value="Ave">Ave</option>
                <option value="Conejo">Conejo</option>
                <option value="Otro">Otro</option>
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
                    value="marron"
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
                  <div className="card-body adlam-display-regular">
                    <h5 className="card-title user-title">{pet.name}</h5>
                    <p className="card-text">
                      Tipo: {pet.species} <br />
                      Color: {pet.color} <br />
                      Sexo: {pet.gender}
                    </p>
                    <Link to={`/petcard/${pet.pet_id}`}>Más información</Link>
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

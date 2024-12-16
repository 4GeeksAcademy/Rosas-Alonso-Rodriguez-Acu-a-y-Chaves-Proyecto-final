import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Cloudinary from "../component/cloudinary";
import UbicationMap from "../component/ubication_map";

const EditFoundPet = () => {

  const navigate = useNavigate();
  const { store, actions } = useContext(Context)
  const { id } = useParams();

  const [petData, setPetData] = useState(null);
 
  useEffect(()=>{
    const existingPet= store.pets.find((pet) =>pet.id== id);
    if (existingPet) {
      setPetData(existingPet);
    } else {
     
      navigate("/error");
    }
  }, [id, store.pets, navigate]);

 const handleChange = (e) => {
   setPetData({
     ...petData,
   [e.target.id]: e.target.value,
  });
 };
  // const [newPet, setNewPet] = useState({
  //   "name": "Encontrado",
  //   "species": "",
  //   "breed": "",
  //   "color": "",
  //   "gender": "",
  //   "description": "",
  //   "photo_1": "",
  //   "photo_2": "",
  //   "photo_3": "",
  //   "photo_4": "",
  //   "event_date": "",
  //   "zone": "",
  //   "longitude": "-56.159328",
  //   "latitude": "-34.895992",
  //   "pet_status": "find"
  // });

//  console.log(newPet);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("editando mascota", petData);
    actions.editPet(petData, navigate);
     };
    

  return (
    <div className="container col-sm-10, col-md-8, col-lg-6 border rounded pet-form bg-light p-4">
      <div className="container ">
        <p className="post-title text-center">Editar mascota encontrada</p>
      </div>
      <div className=" container p-2 ">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Species" className="form-label">ESPECIE</label>
            <select className="form-select" id="Species" aria-label="select species" value={petData.species} required onChange={handleChange} >
              <option value="" disabled>Selecciona</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="conejo">Conejo</option>
              <option value="ave">Ave</option>
              <option value="reptil">Reptil</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="breed" className="form-label">RAZA</label>
            <input type="text" className="form-control" id="breed" placeholder="Ingresa la raza de tu mascota" value={petData.breed} required onChange={handleChange} />
          </div>
          <div className="row g-3 mb-3 ">
            <div className="col-md-6">
              <label htmlFor="gender" className="form-label">GENERO</label>
              <select className="form-select" id="gender" aria-label="Selecionar genero" value={petData.gender} required onChange={handleChange} >
                <option value="" disabled>Selecciona</option>
                <option value="male">Macho</option>
                <option value="female">Hembra</option>
                
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="color" className="form-label">COLOR</label>
              <input type="text" className="form-control" id="color" placeholder="Ingresa el color" value={petData.color} required onChange={handleChange} />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">DESCRIPCION</label>
            <textarea className="form-control" id="description" rows="3" value={petData.description} required onChange={handleChange}></textarea>
          </div>
          <Cloudinary
            updatePhotos={(image) => setPetData((prev) => ({
              ...prev,
              photo_1: image[0] || "",
              photo_2: image[1] || "",
              photo_3: image[2] || "",
              photo_4: image[3] || "",
            }))
            }
          />
          <div className="d-block mb-3">
            <label htmlFor="date" className="form-label ">¿CUANDO LO ENCONTRASTE?</label>
            <input type="date" className="form-control" id="event_date" value={petData.event_date} required onChange={handleChange} />
          </div>
          <div className="d-block mb-3">
            <label htmlFor="zone" className="form-label">¿DÓNDE LO ENCONTRASTE?</label>
            <input type="text" className="form-control" id="zone" placeholder="Barrio/zona" value={petData.zone} required onChange={handleChange} />
          </div>
          <div>
            <p className="form-label">Indica la ubicación en el mapa</p>
            <UbicationMap
              coordenates={(position) => setPetData((prev) => ({
                ...prev,
                latitude: position.lat || "",
                longitude: position.lng || "",
              }))} />
          </div>
          <div className="d-grid gap-2 col-6 mx-auto ">
            <button className="btn btn-primary btn-publicar rounded-pill m-2" type="submit">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div >
  );
};

export default EditFoundPet;
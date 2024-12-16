
import React, { useState, useEffect, useContext } from 'react'

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, divIcon, map } from "leaflet"
import MarkerClusterGroup from 'react-leaflet-cluster';

import { Link } from "react-router-dom";
import L from "leaflet";
import lostDogIcon from '/src/front/img/lost-dog-icon.png';
import foundDogIcon from '/src/front/img/found-dog-icon.png';
import {Context} from "../store/appContext"

/* 
Commands: 
 npm install 16 ~para bajar de version de node
 npm install react@^18.0.0 react-dom@^18.0.0 ~para bajar de version de react
 npm install react-leaflet
 npm i react-leaflet-cluster 
});
 */

//para recordar:
/*
class PetStatus(Enum):
lost = "Estoy perdido"
find = "Busco a mi familia"
joined = "Encontrado"
*/

//íconos perdido-encontrado.
const FoundIcon = new L.Icon({
  iconUrl: foundDogIcon, // imagen para perro encontrado
  iconSize: [52, 52], // Tamaño del ícono
  iconAnchor: [16, 32], // Ancla en el centro inferior del ícono
  popupAnchor: [0, -32] // Ubicación del popup cuando se hace clic
});

const LostIcon = new L.Icon({
  iconUrl: lostDogIcon, // imagen para perro perdido
  iconSize: [52, 52], // Tamaño del ícono
  iconAnchor: [16, 32], // Ancla en el centro inferior del ícono
  popupAnchor: [0, -32] // Ubicación del popup cuando se hace clic
});

const Map = () => {

    const getStatusClass = (status) =>{
      switch (status){
 //       case "Encontrado":
   //     return "bg-success";
        case "Estoy perdido":
          return "bg-danger"; // Rojo
     //   case "Buscando a su familia":
    //      return "bg-warning"; // Amarillo
   //     default:
    //      return "bg-secondary"; // Gris
      }
    };

  // const [pets, setPets] = useState([]);
  const {store, actions} = useContext(Context);


  useEffect(() => {
      actions.getAllPetPosts()
  }, []);


  return (
    <MapContainer center={[-34.91709426939976, -56.16318765994477]} zoom={13} style={{ width: "100vw", height: "100vh" }}> {/* //Asi se centra el mapa en un lugar: -34.91709426939976, -56.16318765994477 */}
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'
      >
      </TileLayer>
      <MarkerClusterGroup
        chunkedLoading
      // iconCreateFunction={createCustomClusterIcon}

 > {/* //Esto es para agrupar los markers. chunkedLoading es para la performance */}
        {store.fetchedPetPosts.map(pet => {
          //if para determinar el ícono según el estado de la mascota
          let petIcon;
          if (pet.pet_status === "Estoy perdido" || pet.pet_status === "Busco a mi familia") {
            petIcon = LostIcon; // Si está perdido, usa el ícono de perdido
          } else if (pet.pet_status === "Encontrado") {
            petIcon = FoundIcon; // Si está encontrado, usa el ícono de encontrado
          }

          return (
            <Marker key={pet.pet_id} position={[pet.latitude, pet.longitude]} icon={petIcon}>
          <Popup>
            <div className="card-body h-auto">
       <div classname="rounded" > 
            <img className="img-fluid" src='https://www.akc.org/wp-content/uploads/2020/07/Golden-Retriever-puppy-standing-outdoors-500x486.jpg'></img>
            <Link to="" style={{ textDecoration: 'none' }} ><p className={`mt-0 text-center text-light text-uppercase bold ${getStatusClass(pet.pet_status)}`}>{pet.pet_status}</p></Link>
            </div>
              <ul className="list adlam-display  ">
              <li>
                  <span className=' fw-bold'>Nombre: </span><span className="text-black">{pet.name}</span>
                </li>          
                   <li>
                  <span className='fw-bold'>Sexo: </span><span className="text-black">{pet.gender}</span>
                </li>
                <li>
                  <span className='fw-bold'>Raza: </span><span className="text-black">{pet.breed}</span>
                </li>
                <li>
                  <span className='fw-bold'>Color: </span><span className="text-black">{pet.color}</span>
                </li>
   
                <li>
                  <span className='fw-bold'>Especie: </span><span className="text-black">{pet.species}</span>
                </li>
              </ul>
              
            </div>
          </Popup>
        </Marker>
      ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default Map

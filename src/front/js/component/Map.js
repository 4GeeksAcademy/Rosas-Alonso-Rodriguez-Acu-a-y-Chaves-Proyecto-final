import React, { useState, useEffect } from 'react'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, divIcon, map } from "leaflet"
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from "leaflet";
import lostDogIcon from '/src/front/img/lost-dog-icon.png';
import foundDogIcon from '/src/front/img/found-dog-icon.png';

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

  const [pets, setPets] = useState([]);

  const MarcadorDePrueba = { geocode: [-34.90937546329044, -56.17280532526599], popUp: "Hola soy un marcador de prueba" }
  const MarcadorDePrueba2 = { geocode: [-34.91158014490245, -56.16774456039812], popUp: "Hola soy el  marcador de prueba 2" }


  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/pet_post`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPets(data.data);
      })
      .catch(error => console.error('Error fetching pets:', error));
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
        {pets.map(pet => {
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
                <h6>Se perdió: <span className='fw-bold'>{pet.name}</span></h6>
                <ul>
                  <img src={pet.photo_1} width={100} height={100} alt={pet.name} />
                  <li><span className='fw-bold'>Raza: </span><span>{pet.breed}</span></li>
                  <li><span className='fw-bold'>Color: </span><span>{pet.color}</span></li>
                  <li><span className='fw-bold'>Sexo: </span><span>{pet.gender}</span></li>
                  <li><span className='fw-bold'>Especie: </span><span>{pet.species}</span></li>
                </ul>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default Map

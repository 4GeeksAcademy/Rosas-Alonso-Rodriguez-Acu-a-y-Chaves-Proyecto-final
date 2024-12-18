import React from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { FaCloudUploadAlt, FaArrowUpFromBracket } from "react-icons/fa";


const Cloudinary = ({ updatePhotos }) => {
    const preset_name = "Patitas";
    const cloud_name = "dhho0qbsm";

    const { store, actions } = useContext(Context);
    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(false);

    const uploadPhoto = async (e) => {
        const files = e.target.files
        const uploadedImages = [];

        setLoading(true)

        try {
            for (let i = 0; i < files.length && i < 4; i++) {
                const data = new FormData();
                data.append("file", files[i]);
                data.append('upload_preset', preset_name);

                const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
                    { method: 'POST', body: data });

                const file = await response.json();
                uploadedImages.push(file.secure_url);
            }

            setImage(uploadedImages);
            setLoading(false);
            if (updatePhotos) {
                updatePhotos(uploadedImages); //para pasar las urls a los componentes newPet
            }

        }
        catch (error) {
            console.log("Error al cargar imagen:", error);
            setLoading(false);
        }


    };


    return (
        <div className="mb-3">
            <label htmlFor="formFileMultiple" className="form-label">¿TIENES FOTOS?</label>
            <input className="form-control d-none"
                type="file" id="formFileMultiple"
                multiple onChange={(e => uploadPhoto(e))} />
            <div>
                <label htmlFor="formFileMultiple" className="file-upload-icon d-inline">
                    <i className="fa-solid fa-arrow-up-from-bracket" style={{ fontSize: "40px", color: "#0056b3" }}></i>
                    {/* Icono personalizado */}
                </label>
                {loading ? (<h6>Cargando imágenes...</h6>) :
                    <div className="container d-inline mb-3 image-preview">
                        {image.map((url, index) => (<img key={index} src={url} alt={`imagen ${index + 1}`} />))}
                    </div>}
            </div>
        </div>)


}

export default Cloudinary
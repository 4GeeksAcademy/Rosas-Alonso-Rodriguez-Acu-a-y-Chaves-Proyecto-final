import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logotipo from "../../img/PatasperdidasPNG.png";
import "../../styles/navbar.css";
import "../../styles/home.css";


export const Navbar = () => {
	const [logged, setLogged] = useState(false)
	const [user, setUser] = useState(null);

	useEffect(() => {
		//comprueba si el usuario está logueado o no
		const checkAuthStatus = () => {
			const token = sessionStorage.getItem("token");
			if (token) {
				setLogged(true);
				/*fetchUserProfile(token)*/
			} else {
				setLogged(false);
				setUser("Usuario");
			}
		};

		checkAuthStatus(); //chequeo al inicio

		//revisa cada 1 segundo si el token cambió
		const intervalId = setInterval(checkAuthStatus, 1000); // 1 segundo

		return () => clearInterval(intervalId);
	}, []); // se ejecuta solo una vez cuando el componente se monta


	const handleLogout = () => {
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("usuario logueado")
		setLogged(false);
		setUser(null); // Limpiar el estado de usuario al cerrar sesión
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-white position-sticky fixed-top shadow-sm fixed-top py-0">
			<div className="container ">
				<Link to="/" className="nav-link">
					<img  src={logotipo} alt="logo" style={{ height: "90px", width: "auto", objectFit: "contain" }}/>
				</Link>
				<div className="d-lg-flex gap-2 mt-3 mt-lg-0">
                <Link to="/newpetlost">
                    <button className="btn custom-red-button adlam-display-regular rounded-pill btn-sm shadow">
                        Perdí a mi mascota
                    </button>
                </Link>
                <Link to="/newpetfound">
                    <button className="btn custom-green-button adlam-display-regular rounded-pill btn-sm shadow">
                        Encontré una mascota
                    </button>
                </Link>
            </div>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button> 
				
				<div className="adlam-display-regular collapse navbar-collapse" id="navbarNav">
				
					<ul className="navbar-nav ms-auto ">
						<li className="nav-item">
							<Link to="/" className="adlam-display-regular nav-link me-2" href="#">
								Inicio
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/map" className="adlam-display-regular nav-link  me-2" href="#">
								Mapa
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/PetView" className="adlam-display-regular nav-link  me-4">
								Mascotas
							</Link>
						</li>
					</ul>


					{/* PRUEBA NAVBAR EDITAR PERFIL Y CERRAR SESIÓN */}
					{logged ? (
						<li className= "nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Mi perfil
							</a>
							<ul className="dropdown-menu">
								<li><a className="dropdown-item" href="/user">Editar perfil</a></li>
								<li><hr className="dropdown-divider" /></li> 
								<li>
									<button className="adlam-display-regular btn nav-item dropdown-item" style={{ "color": "red" }} onClick={handleLogout}>Cerrar sesión</button>
								</li>
							</ul>
						</li>
					) : (
						<Link to="/login"><button className=" adlam-display-regular btn btn-primary ms-2 rounded-pill btnStart">Iniciar sesión</button></Link>
					)}
				</div>
			</div>
		</nav>
	);
}

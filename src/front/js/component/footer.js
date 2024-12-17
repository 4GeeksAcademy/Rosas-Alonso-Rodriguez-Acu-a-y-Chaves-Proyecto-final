import React, { Component } from "react";
import Logo from "../../img/PatasperdidasPNG.png";
import "../../styles/navbar.css";

export const Footer = () => (
	<footer className="footer mt-auto  text-center bg-white shadow-sm p-0 m-0">
		<h6 className="p-0 adlam-display-regular text-muted ">
			<img src={Logo} alt="logo" style={{ height: "60px", width: "auto", objectFit: "contain" }}/>
			 Miles de historias felices nos respaldan ♦
		</h6>
	</footer>
);

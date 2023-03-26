import React from "react";
import "./Header.css";
import logo from "../../logo.png";

/**
 * Header of the application
 * @component Header
 * @example
 * @returns {JSX.Element}
 **/

function Header() {
	return (
		<nav className="header-background">
			<div className="header-logo">
				<img src={logo} alt={"logo"}/>
			</div>
			<ul className="header-list">
				<li>Accueil</li>
				<li>Profil</li>
				<li>Réglage</li>
				<li>Communauté</li>
			</ul>
		</nav>


	);
}


export default Header;

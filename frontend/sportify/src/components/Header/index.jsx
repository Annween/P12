import React from "react";
import  "./Header.css";
import logo from "../../logo.png";


function Header() {
  return (
    <nav className="header-background">
      <ul className="header-list">
        <li className="header-logo"><img src={logo} /></li>
        <li>Accueil</li>
        <li>Profil</li>
        <li>Réglage</li>
        <li>Communauté</li>
        </ul>
    </nav>


  );
}



export default Header;

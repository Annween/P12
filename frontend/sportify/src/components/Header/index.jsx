import React from "react";
import  "./Header.css";


function Header() {
  return (
    <nav className="header-background">
      <ul className="header-list">
        <li>logo</li>
        <li>Accueil</li>
        <li>Profil</li>
        <li>Réglage</li>
        <li>Communauté</li>
        </ul>
    </nav>
  );
}



export default Header;
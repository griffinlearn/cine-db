import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { MenuData } from "../assets/MenuData";

const Navigation = () => {
  /* État des icons Menu Mobile & function click */
  const [iconMobile, setIconMobile] = useState(false);
  const handleClickMenu = () => {
    setIconMobile(!iconMobile);
  };
  /* Fermeture menu mobile au click sur un lien */
  const [clicked, setClicked] = useState(false);
  const isClicked = () => {
    setClicked(!clicked);
    iconMobile(false);
  };

  return (
    <div className="navbar">
      <div className="navigation">
        <Logo />
        {/* icon responsive menu */}
        <div className="menuIcone" onClick={() => handleClickMenu()}>
          <i className={iconMobile ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        {/* menu items avec map sur MenuData */}
        <ul className={iconMobile ? "menu active" : "menu"}>
          {MenuData.map((item, index) => (
            <NavLink to={item.url} key={index} onClick={() => isClicked()} end>
              <i className={item.icon}></i>
              {item.title}
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;

import React from "react";

const ListComplet = ({
  name,
  title,
  original_title,
  character,
  onClickFilm,
}) => {
  return (
    <div data-aos="zoom-in">
      <li className="text-center itemFilm" onClick={onClickFilm}>
        <b>Titre : </b>
        {title || original_title || name} <br />
        <b>À jouer le rôle de : </b>
        {character ? character : "Rôle inconnu"}
      </li>
    </div>
  );
};

export default ListComplet;

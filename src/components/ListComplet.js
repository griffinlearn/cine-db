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
        <b>Title : </b>
        {title || original_title || name} <br />
        <b>Played as : </b>
        {character ? character : "Rôle inconnu"}
      </li>
    </div>
  );
};

export default ListComplet;

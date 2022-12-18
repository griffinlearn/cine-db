import React from "react";

const ActeurCard = ({ profile_path, name, onClickActeur }) => {
  const urlImgActeur = "https://image.tmdb.org/t/p/w200/";

  return (
    <div className="acteurCard pt-3">
      <div className="wrapper d-inline-flex p-1">
        <div className="cards row" data-aos="zoom-in">
          <div className="containerCard">
            <div
              onClick={onClickActeur}
              className="card"
              style={{
                backgroundImage: profile_path
                  ? `url(${urlImgActeur + profile_path})`
                  : `url(notfound.jpg)`,
              }}
            >
              <div>
                <h2>{name}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActeurCard;

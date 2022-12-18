import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const MovieCard = ({
  title,
  poster_path,
  vote_average,
  onClickFilm,
  idCategorie,
}) => {
  //back end
  const apiImg = "https://image.tmdb.org/t/p/w200";

  return (
    <>
      <div className="wrapper d-inline-flex">
        <div className="cards row" data-aos="zoom-in">
          <figure className="card m-0 p-0 border-0" onClick={onClickFilm}>
            <div className="rate" style={{ width: 50, height: 0 }}>
              <CircularProgressbar
                value={Math.floor(vote_average / 0.1)}
                text={`${Math.floor(vote_average / 0.1)}%`}
                background
                backgroundPadding={6}
                styles={buildStyles({
                  backgroundColor: "#051937",
                  textColor: "#fff",
                  pathColor: `${
                    Math.floor(vote_average / 0.1) >= 75
                      ? "green"
                      : Math.floor(vote_average / 0.1) >= 50
                      ? "yellow"
                      : "red"
                  }`,
                  trailColor: "transparent",
                })}
              />
            </div>
            <img
              src={poster_path ? apiImg + poster_path : "notfound.jpg"}
              alt={title}
            />
          </figure>
        </div>
      </div>
    </>
  );
};

export default MovieCard;

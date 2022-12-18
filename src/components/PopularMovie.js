import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Section from "./Section";
import { useNavigate } from "react-router-dom";
import TitleWave from "../components/TitleWave";

const PopularMovie = () => {
  // movie state
  const [movies, setMovies] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=476f1098f88d57106479e06870fbbaf1`
      )
      .then((res) => {
        setMovies(res.data.results);
      });
  }, []);

  return (
    <div>
      <div className="text-3xl font-bold pt-5 px-12" data-aos="zoom-in">
        <TitleWave title={"Popular Movies"} />
      </div>
      <Section>
        {movies
          .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
          .map((movie) => (
            <MovieCard
              {...movie}
              key={movie.id}
              onClickFilm={() =>
                navigation("/filmdetail", {
                  state: { id: movie.id },
                })
              }
            />
          ))}
      </Section>
    </div>
  );
};

export default PopularMovie;

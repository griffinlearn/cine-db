import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Section from "./Section";
import { useNavigate } from "react-router-dom";
import TitleWave from "./TitleWave";

const PopularSerie = () => {
  // movie state
  const [series, setSeries] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/popular?api_key=476f1098f88d57106479e06870fbbaf1`
      )
      .then((res) => {
        setSeries(res.data.results);
      });
  }, []);

  return (
    <div>
      <div className="text-3xl font-bold pt-5 px-12" data-aos="zoom-in">
        <TitleWave title={"Popular Tv-Show"} />
      </div>
      <Section>
        {series
          .sort(
            (a, b) => new Date(b.first_air_date) - new Date(a.first_air_date)
          )
          .map((serie) => (
            <MovieCard
              {...serie}
              key={serie.id}
              onClickFilm={() =>
                navigation("/seriedetail", {
                  state: { id: serie.id },
                })
              }
            />
          ))}
      </Section>
    </div>
  );
};

export default PopularSerie;

import axios from "axios";
import React, { useEffect, useState } from "react";
import TrailerCard from "./TrailerCard";
import Section from "./Section";
import TitleWave from "./TitleWave";

const PopularTrailers = ({ categorie }) => {
  //fetch movie data
  const urlPopular = `https://api.themoviedb.org/3/movie/${categorie}?api_key=476f1098f88d57106479e06870fbbaf1&language=en-US`;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(urlPopular).then((res) => {
      setData(res.data.results);
    });
  }, [urlPopular]);

  return (
    <div className="popularTrailers mb-5" data-aos="zoom-in">
      <div className="text-3xl font-bold pt-5 px-12" data-aos="zoom-in">
        <TitleWave title={"Popular Trailers"} />
      </div>
      <Section>
        {data
          .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
          .slice(0, 10)
          .map((data) => {
            return <TrailerCard {...data} key={data.id} />;
          })}
      </Section>
    </div>
  );
};

export default PopularTrailers;

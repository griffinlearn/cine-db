import React, { useState, useEffect } from "react";
import ActeurCard from "./ActeurCard";
import Section from "./Section";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TitleWave from "./TitleWave";

const ActeurPopulaire = () => {
  // useNavigate
  const navigation = useNavigate();
  // acteur populaire
  const acteurPopulaire =
    "https://api.themoviedb.org/3/person/popular?api_key=476f1098f88d57106479e06870fbbaf1&language=en-US&page=2";
  const [acteurs, setActeurs] = useState([]);

  useEffect(() => {
    axios.get(acteurPopulaire).then((res) => {
      setActeurs(res.data.results);
    });
  }, []);

  return (
    <div className="acteurPolulaire">
      <div className="text-3xl font-bold pt-5 px-12" data-aos="zoom-in">
        <TitleWave title={"Populare Actor"} />
      </div>
      <Section>
        {acteurs.map((acteur) => {
          return (
            <ActeurCard
              {...acteur}
              key={acteur.id}
              onClickActeur={() =>
                navigation("/acteurdetail", {
                  state: { id: acteur.id },
                })
              }
            />
          );
        })}
      </Section>
    </div>
  );
};

export default ActeurPopulaire;

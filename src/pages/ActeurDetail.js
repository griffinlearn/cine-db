import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Section from "../components/Section";
import MovieCard from "../components/MovieCard";
import ListComplet from "../components/ListComplet";

const ActeurDetail = () => {
  const location = useLocation();
  const navigation = useNavigate();
  // urlImg
  const urlImg = "https://image.tmdb.org/t/p/w300";
  // state acteur details
  const urlActeur = `https://api.themoviedb.org/3/person/${location.state.id}?api_key=476f1098f88d57106479e06870fbbaf1&language=en-US`;
  const [acteur, setActeur] = useState([]);
  // state acteur celebre pour
  const urlFilmActeur = `https://api.themoviedb.org/3/person/${location.state.id}/combined_credits?api_key=476f1098f88d57106479e06870fbbaf1&sort_by=release_date.desc`;
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios.get(urlActeur).then((res) => {
      setActeur(res.data);
    });
    axios.get(urlFilmActeur).then((res) => {
      setFilms(res.data.cast);
    });
    window.scrollTo(0, 0);
  }, [urlActeur, urlFilmActeur]);

  //state voir plus liste complete film
  const [visibleItem, setVisibleItem] = useState(6);
  // function voirPLus de items
  const voirPlus = () => {
    setVisibleItem((visibleItems) => visibleItems + 6);
  };

  return (
    <div className="acteurDetail">
      <div className="container-fluid m-0 p-0 bgActeur">
        <div className="container-fluid px-0 py-5 bgFilter">
          <div className="row m-0">
            {/* profil pictures */}
            <div className="col-12 col-lg-5 imgBox" data-aos="zoom-in-up">
              <img
                src={
                  acteur.profile_path
                    ? urlImg + acteur.profile_path
                    : "notfound.jpg"
                }
                alt={acteur.name}
              />
            </div>
            {/* information acteur */}
            <div className="col-12 col-lg-7 infoBox" data-aos="zoom-in">
              <h1 className="pb-0">{acteur.name}</h1>
              <h4 className="pt-2">
                {acteur.gender === 2 ? "Actor" : "Actress"}
              </h4>
              <p>
                <b>Date of Birth : </b>
                {acteur.birthday ? acteur.birthday : "Unknown"}
              </p>
              <p>
                <b>Place of birth : </b>
                {acteur.place_of_birth ? acteur.place_of_birth : "Unknown"}
              </p>
              <p>
                <b>Gender : </b> {acteur.gender === 2 ? "Man" : "Woman"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Biography */}
      <div className="mx-3">
        <div className="container-xl biography boxBio p-5" data-aos="zoom-in">
          <h2 className="text-3xl font-bold text-center pb-5">Biography</h2>
          {acteur.biography ? (
            <div>
              <input type="checkbox" className="read-more-state" id="post-1" />
              <p className="read-more-wrap">
                {acteur.biography.slice(0, 350)}
                <span className="read-more-target">
                  {acteur.biography.substring(350)}
                </span>
              </p>
              <label for="post-1" className="read-more-trigger p-2"></label>
            </div>
          ) : (
            <div>
              <h5 className="text-center text-xl font-bold">
                The biography is not available at the moment.
              </h5>
            </div>
          )}
        </div>
      </div>
      {/* film dans lequel il a joué */}
      <div className="container-xxl filmBox">
        <h2
          className="text-3xl font-bold text-center py-5 titleStyle"
          data-aos="zoom-in"
        >
          Famous for
        </h2>
        <Section>
          {films
            .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
            .slice(0, 20)
            .map((film) => {
              return (
                <MovieCard
                  {...film}
                  key={film.id}
                  onClickFilm={() =>
                    navigation(
                      film.media_type === "movie"
                        ? "/filmdetail"
                        : "/seriedetail",
                      {
                        state: { id: film.id },
                      }
                    )
                  }
                />
              );
            })}
        </Section>
      </div>
      {/* section liste films */}
      <div className="container-xl filmographie">
        <h2
          className="text-3xl font-bold text-center py-5 mt-5 titleStyle"
          data-aos="zoom-in"
        >
          Filmography
        </h2>
        <ul>
          {films
            .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
            .slice(0, visibleItem)
            .map((film) => {
              return (
                <ListComplet
                  {...film}
                  key={film.id}
                  onClickFilm={() =>
                    navigation("/filmdetail", {
                      state: { id: film.id },
                    })
                  }
                />
              );
            })}
        </ul>
        {/* btn voir plus */}
        <div className="btnBox mb-5">
          <div className="btnVoirPlus font-bold p-3 m-5" onClick={voirPlus}>
            See More
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActeurDetail;

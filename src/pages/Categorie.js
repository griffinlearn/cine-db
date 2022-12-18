import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
// import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { EffectFade, Autoplay, Navigation } from "swiper";

const Categorie = () => {
  //useNavigate
  const navigation = useNavigate();
  // useLocation
  const location = useLocation();
  const idMovieCard = location.state?.id;
  // location choix
  const choice = location.state?.choix;
  // link backdrop img
  const urlImg = "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/";
  // image backdrop state
  const [img, setImg] = useState([]);
  // state id genre
  const [id, setId] = useState();
  // ternaire choix des id pour les catégorie
  const idChoice = idMovieCard ? idMovieCard : id;
  // state pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  // state series et movie
  const [choix, setChoix] = useState("");

  //fetch films et serie pour categorie depuis les page film et séries
  const urlApi = `https://api.themoviedb.org/3/discover/${choice}?api_key=476f1098f88d57106479e06870fbbaf1&page=${currentPage}&with_genres=${idChoice}`;
  const [films, setFilms] = useState([]);
  console.log(urlApi);
  //fetch avec choix sur page categorie
  const urlChoix = `https://api.themoviedb.org/3/discover/${choix}?api_key=476f1098f88d57106479e06870fbbaf1&page=${currentPage}&with_genres=${idChoice}`;
  const [data, setData] = useState([]);
  //fetch categorie film
  const urlGenresMovie = `https://api.themoviedb.org/3/genre/movie/list?api_key=476f1098f88d57106479e06870fbbaf1&language=en-US`;
  const [genresMovie, setGenresMovie] = useState([]);
  //fetch categorie séries
  const urlGenresTv = `https://api.themoviedb.org/3/genre/tv/list?api_key=476f1098f88d57106479e06870fbbaf1&language=en-US`;
  const [genresTv, setGenresTv] = useState([]);

  useEffect(() => {
    /* axios pour categori clicable */
    axios.get(urlApi).then((res) => {
      setFilms(res.data.results);
    });
    /* axios pour choix categori depuis la page choix */
    axios.get(urlChoix).then((res) => {
      setData(res.data.results);
    });
    /* axios list categorie films */
    axios.get(urlGenresMovie).then((res) => {
      setGenresMovie(res.data.genres);
    });
    /* axios list categorie series */
    axios.get(urlGenresTv).then((res) => {
      setGenresTv(res.data.genres);
    });
    /* axios img backdrop*/
    axios.get(urlChoix).then((res) => {
      setImg(res.data.results);
    });
  }, [urlApi, urlGenresMovie, urlGenresTv, urlChoix]);

  // function onChange
  const handleOnChange = (e) => {
    setId(e.target.value);
    // reset pagination
    setCurrentPage(1);
  };

  // function pagination
  const handlePagination = (e) => {
    if (e.target.value === "suivante") {
      setCurrentPage((currentPage) => currentPage + 1);
      e.preventDefault();
      window.scrollTo(0, 700);
    }
    if (e.target.value === "precedent") {
      setCurrentPage((currentPage) => currentPage - 1);
      e.preventDefault();
      window.scrollTo(0, 700);
    }
  };

  //function handleChoix
  const handleChoix = (e) => {
    setChoix(e.target.value);
  };

  return (
    <div className="container1920 categorie">
      {/* hero section */}
      <div className="hero">
        <Swiper
          rewind={true}
          navigation={false}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          effect={"slide"}
          modules={[EffectFade, Autoplay, Navigation]}
          className="mySwiper"
        >
          {/* ternaire backdrop dynamique */}
          {choix ? (
            img.slice(0, 8).map((image, index) => {
              return (
                <SwiperSlide key={index}>
                  <img
                    src={
                      image.backdrop_path
                        ? urlImg + image.backdrop_path
                        : "bg-category.jpg"
                    }
                    alt={image.title}
                  />
                </SwiperSlide>
              );
            })
          ) : (
            <SwiperSlide>
              <img src={"bg-category.jpg"} alt={"bg"} />
            </SwiperSlide>
          )}

          <div className="contentSlider" data-aos="flip-up">
            <img className="logoHero" src="cine-db.png" alt="logo srmflix" />
            <h1>Categories</h1>
            <h4 className="p-0">Your favorite movies and series</h4>
          </div>
        </Swiper>
      </div>
      {/* choix series et films */}
      {!idMovieCard && (
        <div
          className="radioBtn boxBtn radio"
          onChange={handleChoix}
          data-aos="zoom-in"
        >
          <input label="Movies" type="radio" value="movie" name="gender" />
          <input label="Tv Shows" type="radio" value="tv" name="gender" />
          <input
            label="Cancel"
            type="radio"
            id="other"
            name="gender"
            value=""
            onClick={() => {
              setId("");
            }}
          />
        </div>
      )}

      {/* select categorie */}
      {choix && (
        <div className="selectBox">
          <select value={id} onChange={handleOnChange}>
            <option value="">Select a category</option>
            {choix === "movie"
              ? genresMovie.map((genreMovie) => {
                  return (
                    <option value={genreMovie.id} key={genreMovie.id}>
                      {genreMovie.name}
                    </option>
                  );
                })
              : genresTv.map((genreTv) => {
                  return (
                    <option value={genreTv.id} key={genreTv.id}>
                      {genreTv.name}
                    </option>
                  );
                })}
          </select>
        </div>
      )}
      {/* result  */}
      {idChoice ? (
        <div className="MovieCardCategory m-0 p-0">
          <div className="container-fluid mt-3 px-0 px-lg-5 pt-3 pb-5 mx-auto">
            <div className="row mx-auto">
              <div className="col-12 d-flex flex-wrap justify-content-center wrap mx-auto px-0">
                {/* ternaire choix des affichage depuis page categori ou page filmDetail || serieDetail */}
                {choix
                  ? data.map((film) => {
                      return (
                        <MovieCard
                          {...film}
                          key={film.id}
                          idCategorie={idMovieCard}
                          onClickFilm={() =>
                            navigation(
                              choix === "movie"
                                ? "/filmdetail"
                                : "/seriedetail",
                              {
                                state: { id: film.id },
                              }
                            )
                          }
                        />
                      );
                    })
                  : films.map((film) => {
                      return (
                        <MovieCard
                          {...film}
                          key={film.id}
                          onClickFilm={() =>
                            navigation(
                              choice === "movie"
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
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* si aucune categorie a ete choissie depuis la pages categorie */
        <div>
          <h5
            className="text-center text-xl font-bold my-5 py-3"
            data-aos="zoom-in"
          >
            No category selected for the moment.
          </h5>
        </div>
      )}
      {/* btn pagination */}
      {idChoice && (
        <div className="boxBtn mb-5 pb-5">
          {currentPage === 1 ? null : (
            <button
              className="paginationBtn p-3"
              value={"precedent"}
              onClick={handlePagination}
            >
              Previous
            </button>
          )}
          {/* btn for category from filmdetail or seriedetail */}
          {data.length < 20 ? null : (
            <button
              className="paginationBtn p-3"
              value={"suivante"}
              onClick={handlePagination}
            >
              Next
            </button>
          )}
          {/* btn from catogory page */}
          {films.length < 20 ? null : (
            <button
              className="paginationBtn p-3"
              value={"suivante"}
              onClick={handlePagination}
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Categorie;

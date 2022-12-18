import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ReactPlayer from "react-player/youtube";
import { Swiper, SwiperSlide } from "swiper/react";
import ActeurCard from "../components/ActeurCard";
import Section from "../components/Section";

// import required modules swiper
import { Pagination, Navigation } from "swiper";
import MovieCard from "../components/MovieCard";

const FilmDetail = () => {
  const location = useLocation();
  // useNavigate Acteur
  const navigation = useNavigate();

  // backdrop Img
  const urlBackdrop =
    "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/";
  // state movie
  const URL = `https://api.themoviedb.org/3/movie/${location.state.id}?api_key=476f1098f88d57106479e06870fbbaf1`;
  const [detail, setDetail] = useState({});
  const [category, setCategory] = useState([]);
  // state video
  const urlVideo = `https://api.themoviedb.org/3/movie/${location.state.id}/videos?api_key=476f1098f88d57106479e06870fbbaf1`;
  const [trailers, setTrailers] = useState([]);
  // youtube link
  const youtubeUrl = "https://www.youtube.com/watch?v=";

  // acteur state
  const urlActeur = `https://api.themoviedb.org/3/movie/${location.state.id}/credits?api_key=476f1098f88d57106479e06870fbbaf1`;
  const [acteurs, setActeurs] = useState([]);

  // fetch movie similaire
  const urlFilmSimilaire = `https://api.themoviedb.org/3/movie/${location.state.id}/similar?api_key=476f1098f88d57106479e06870fbbaf1&page=1`;
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios.get(URL).then((res) => {
      setDetail(res.data);
      setCategory(res.data.genres);
    });
    axios.get(urlVideo).then((res) => {
      setTrailers(res.data.results);
    });
    axios.get(urlActeur).then((res) => {
      setActeurs(res.data.cast);
    });
    axios.get(urlFilmSimilaire).then((res) => {
      setFilms(res.data.results);
    });
    window.scrollTo(0, 0);
  }, [URL, urlVideo, urlActeur, urlFilmSimilaire]);

  return (
    <div className="filmDetail">
      {/* div bg */}
      <div
        className="headerBG"
        style={{
          backgroundImage: `url(${
            detail.backdrop_path
              ? urlBackdrop + detail.backdrop_path
              : "bg-category.jpg"
          })`,
        }}
      >
        {/* div content sur le bg*/}
        <div className="infoSection">
          <div className="row m-0 p-5">
            <div className="col-12 col-lg-3" data-aos="flip-left">
              {/* cover-movie */}
              <img
                src={
                  detail.poster_path
                    ? `https://image.tmdb.org/t/p/w300${detail.poster_path}`
                    : "notfound.jpg"
                }
                alt={detail.title}
                className="rounded float-center float-lg-end mx-auto img-fluid"
              />
            </div>
            {/* title */}
            <div
              className="col-12 col-lg-9 flex-column align-self-center"
              data-aos="zoom-in"
            >
              <h1 className="text-center">
                {detail.title || detail.original_title}
              </h1>
              {/* category */}
              <div className="d-flex justify-content-center">
                {category.slice(0, 3).map((cat) => {
                  return (
                    <h5
                      className="category"
                      key={cat.id}
                      onClick={() =>
                        navigation("/categorie", {
                          state: { id: cat.id, choix: "movie" },
                        })
                      }
                    >
                      {cat.name}
                    </h5>
                  );
                })}
              </div>
              {/* rating */}
              <div
                className="rate mx-auto mt-3"
                style={{ width: 75, height: 0 }}
              >
                <CircularProgressbar
                  value={Math.floor(detail.vote_average / 0.1)}
                  text={`${Math.floor(detail.vote_average / 0.1)}%`}
                  background
                  backgroundPadding={6}
                  styles={buildStyles({
                    backgroundColor: "#051937",
                    textColor: "#fff",
                    pathColor: `${
                      Math.floor(detail.vote_average / 0.1) >= 75
                        ? "green"
                        : Math.floor(detail.vote_average / 0.1) >= 50
                        ? "yellow"
                        : "red"
                    }`,
                    trailColor: "transparent",
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* fin header */}
      {/* content */}
      <div className="mx-3">
        <div className="container-xl boxStyleSynopsis" data-aos="zoom-in">
          <div className="row m-0">
            <div className="col-12 col-lg-8 p-4 p-lg-5">
              <h2 className="text-3xl font-bold mt-3 mb-4">Synopsis</h2>
              <p>
                {detail.overview ? (
                  detail.overview
                ) : (
                  <div>
                    <h5 className="text-left text-xl font-bold m-0 p-0 infoBox">
                      The Synopsis is not available at the moment.
                    </h5>
                  </div>
                )}
              </p>
            </div>
            <div className="col-12 col-lg-4 p-4 p-lg-5 flex-column align-self-start infoBox">
              <h2 className="text-3xl font-bold mt-3 mb-4">Informations</h2>
              {/* info section */}
              <p>
                <b>Status : </b>
                {detail.status ? detail.status : "Inconnue"}
              </p>
              <p>
                <b>Release date : </b>
                {detail.release_date ? detail.release_date : "Inconnue"}
              </p>
              <p>
                <b>Duration : </b>
                {detail.runtime ? detail.runtime : "Inconnue"} Min
              </p>
              <p className="text-uppercase">
                <b className="text-capitalize">Original language : </b>
                {detail.original_language
                  ? detail.original_language
                  : "Inconnue"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Distribution */}
      <div className="container-xl p-0">
        <div className="col-12 p-0">
          <div className="casting container-xl p-0">
            <h2
              className="text-3xl font-bold text-center pt-3 px-4 px-lg-5"
              data-aos="zoom-in"
            >
              Cast
            </h2>
            <Section>
              {acteurs.slice(0, 12).map((acteur) => {
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
        </div>
        <div className="col-12">
          {/* slider bande annonce */}
          <div className="bandeAnnonce" data-aos="zoom-in">
            <div className="container-xl p-4 p-lg-5">
              <h2
                className="text-3xl font-bold mb-5 text-center"
                data-aos="zoom-in"
              >
                Trailers
              </h2>
              {trailers.length ? (
                <div>
                  <Swiper
                    pagination={{
                      type: "progressbar",
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper boxStyle"
                  >
                    {trailers.slice(0, 3).map((trailer, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <ReactPlayer url={youtubeUrl + trailer.key} />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              ) : (
                <div>
                  <h5 className="text-center text-xl font-bold m-0 p-0">
                    The trailer is not available at this time.
                  </h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* film similaire */}
      <div className="container-xl mb-5">
        <h2 className="text-3xl font-bold mb-5 text-center" data-aos="zoom-in">
          Similar Movies
        </h2>
        <Section>
          {films
            .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
            .map((film) => {
              return (
                <MovieCard
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
        </Section>
      </div>
    </div>
  );
};

export default FilmDetail;

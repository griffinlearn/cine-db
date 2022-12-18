import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
// import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { EffectFade, Autoplay, Navigation } from "swiper";

const Search = () => {
  const navigation = useNavigate();
  // state pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  // image backdrop state
  const [img, setImg] = useState([]);
  // link backdrop img
  const urlImg = "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/";
  // state series et movie
  const [choix, setChoix] = useState("");
  //state query
  const [query, setQuery] = useState("");
  const urlSearch = `https://api.themoviedb.org/3/search/${choix}?api_key=476f1098f88d57106479e06870fbbaf1&language=en-US&page=${currentPage}&query=${query}`;
  console.log(urlSearch);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios.get(urlSearch).then((res) => {
      setFilms(res.data.results);
      setImg(res.data.results);
    });
  }, [urlSearch]);

  //function handleChange
  const handleOnChange = (e) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };

  //function handleChoix
  const handleChoix = (e) => {
    setChoix(e.target.value);
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

  return (
    <div className="container1920 search">
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
          {choix && query ? (
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
            <h1>Search</h1>
            <h4>Your search in one click !!!</h4>
          </div>
        </Swiper>
      </div>
      {/* choix series et films */}
      <div
        className="radioBtn boxBtn radio"
        onChange={handleChoix}
        data-aos="zoom-in"
      >
        <input label="Movies" type="radio" value="movie" name="gender" />
        <input label="Tv Show" type="radio" name="gender" value="tv" />
        <input
          label="Cancel"
          type="radio"
          name="gender"
          value=""
          onClick={() => {
            setQuery("");
          }}
        />
      </div>

      {choix && (
        <div className="searchBar mt-5" data-aos="zoom-in">
          <input
            placeholder={
              choix === "movie" ? "Find your movie" : "Find your series"
            }
            onChange={handleOnChange}
          />
        </div>
      )}

      {query ? (
        <div className="container-fluid mt-3 px-0 px-lg-5 pt-3 pb-5 mx-auto">
          <div className="row mx-auto">
            <div className="col-12 d-flex flex-wrap justify-content-center wrap mx-auto px-0">
              {films.map((film) => {
                return (
                  <MovieCard
                    {...film}
                    key={film.id}
                    onClickFilm={() =>
                      navigation(
                        choix === "movie" ? "/filmdetail" : "/seriedetail",
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
      ) : (
        <div>
          <h5
            className="text-center text-xl font-bold my-5 py-3 px-3"
            data-aos="zoom-in"
          >
            Choose your category and do your research.
          </h5>
        </div>
      )}
      {/* pagination btn */}
      {query && (
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

export default Search;

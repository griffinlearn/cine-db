import React, { useEffect, useState } from "react";
import axios from "axios";
import PopularMovie from "../components/PopularMovie";
import PopularSerie from "../components/PopularSerie";
import PopularTrailers from "../components/PopularTrailers";
// import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { EffectFade, Autoplay, Navigation } from "swiper";
import ActeurPopulaire from "../components/ActeurPopulaire";

const Accueil = () => {
  // link backdrop img
  const urlImg = "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/";

  const customAPI = () => {
    const apiKey = "476f1098f88d57106479e06870fbbaf1";
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-fr`;

    axios.get(apiUrl).then((res) => {
      setImg(res.data.results);
    });
  };
  // image backdrop state
  const [img, setImg] = useState([]);

  useEffect(() => {
    customAPI();
  }, []);

  return (
    <div className="container1920 accueil">
      {/* slider */}
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
        {img.slice(0, 8).map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={
                image.backdrop_path
                  ? urlImg + image.backdrop_path
                  : "bg-acteur.jpg"
              }
              alt={image.title}
            />
          </SwiperSlide>
        ))}
        <div className="contentSlider" data-aos="flip-up">
          <img className="logoHero" src="cine-db.png" alt="logo srmflix" />
          <h1>L'art du cinéma</h1>
          <h4>Des centaines de films et séries à découvrir</h4>
        </div>
      </Swiper>
      <PopularMovie />
      <PopularSerie />
      <ActeurPopulaire />
      <PopularTrailers categorie={"popular"} />
    </div>
  );
};

export default Accueil;

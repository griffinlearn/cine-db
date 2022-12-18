import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";

const TrailerCard = ({ id }) => {
  // state video
  const urlVideo = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=476f1098f88d57106479e06870fbbaf1`;
  console.log(urlVideo);
  const [trailers, setTrailers] = useState([]);
  // youtube link
  const youtubeUrl = "https://www.youtube.com/watch?v=";

  useEffect(() => {
    axios.get(urlVideo).then((res) => {
      setTrailers(res.data.results);
    });
  }, [urlVideo]);
  return (
    <div className="trailerCard mx-3 my-4">
      {trailers.slice(0, 1).map((trailer, index) => {
        return trailer.lenght === undefined ? (
          <ReactPlayer
            className="video"
            key={index}
            width="426px"
            height="240px"
            url={youtubeUrl + trailer.key}
          />
        ) : null;
      })}
    </div>
  );
};

export default TrailerCard;

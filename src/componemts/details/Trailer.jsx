import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  movieTrailerAction,
  seriesTrailerAction,
} from "../../redux/Redux-action";
import "./Trailer.css";

const Trailer = ({ id, typ }) => {
  let dispatch = useDispatch();
  let movieTrailers = useSelector((state) => state.movieTrailer);
  let seriesTrailers = useSelector((state) => state.seriesTrailer);

  let getTrailer = () => {
    if (typ === "movie") {
      let { movieTrailerLoading, movieTrailer } = movieTrailers;
      return [movieTrailerLoading, movieTrailer];
    } else if (typ === "series") {
      let { seriesTrailerLoading, seriesTrailer } = seriesTrailers;
      return [seriesTrailerLoading, seriesTrailer];
    }
  };
  let trailerCollections = getTrailer();
  let trailer = trailerCollections[1].filter((data) => data.type === "Trailer");

  useEffect(() => {
    if (typ === "movie") {
      dispatch(movieTrailerAction(id));
    } else if (typ === "series") {
      dispatch(seriesTrailerAction(id));
    }
  }, [id, typ, dispatch]);
  return (
    <div className="trailer-container">
      {trailer.map((data) => {
        return (
          <div key={data.id} className="trailer">
            <span>{data.name}</span>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${data.key}`}
              title="trailer"
              id='iframe'
            ></iframe>
          </div>
        );
      })}
    </div>
  );
};

export default Trailer;

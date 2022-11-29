import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  movieCastsAction,
  movieDetailsAction,
  seriesCastsAction,
  seriesDetailsAction,
} from "../../redux/Redux-action";

import "./Details.css";
import Trailer from "./Trailer";
import Similar from "./Similar";

const Details = () => {
  let dispatch = useDispatch();
  let { typ, id } = useParams();

  let movieDetailss = useSelector((state) => state.movieDetails);
  let seriesDetailss = useSelector((state) => state.seriesDetails);

  let movieCredits = useSelector((state) => state.movieCasts);
  let seriesCredits = useSelector((state) => state.seriesCasts);

  let getCollections = () => {
    if (typ === "movie") {
      let { movieDetailsLoading, movieDetails } = movieDetailss;
      let { movieCasts } = movieCredits;
      return [movieDetailsLoading, movieDetails, movieCasts];
    }
     else if (typ === "series") {
      let { seriesDetailsLoading, seriesDetails } = seriesDetailss;
      let { seriesCasts } = seriesCredits;
      return [seriesDetailsLoading, seriesDetails, seriesCasts];
    }
  };
  let collections = getCollections();
  
  let imgBaseUrl = 'https://image.tmdb.org/t/p/w500/';
  let backgroundImage,poster,castsList=[];

  if(collections[0]===false){
    backgroundImage = `https://image.tmdb.org/t/p/w500/${collections[1].backdrop_path}`;
    poster = `https://image.tmdb.org/t/p/w500/${collections[1].poster_path}`;
    castsList = collections[2].slice(0,6);
  }

  let genres = collections[1].genres;

  useEffect(() => {
    if (typ === "movie") {
      dispatch(movieDetailsAction(id));
      dispatch(movieCastsAction(id));
    } 
    else if (typ === "series") {
      dispatch(seriesDetailsAction(id));
      dispatch(seriesCastsAction(id));
    }
  }, [id, dispatch, typ]);

  return (
    <div className="details-container">
      <div
        className="details"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="details-bg">
          <div className="left">
            <img className="poster" src={poster} alt="" />
          </div>
          <div className="right">
            <h2>{collections[1].title || collections[1].name}</h2>
            <ul className="genres-container">
              {genres !== undefined &&
                genres.map((data) => <li key={data.id}>{data.name}</li>)}
              <li id="min" >{collections[1].runtime || collections[1].episode_run_time}mins</li>
            </ul>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "5px",
              }}
            >
              <p>Overview</p>
              <p>{collections[1].overview}</p>
            </div>
            <ul className="casts-lists-container">
              {collections[0]===false&&castsList.map((data) => {
                return (
                  <li key={data.id} >
                    <img src={imgBaseUrl+data.profile_path} alt="profile null" />
                    <p>{data.name}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <Trailer id= {id} typ= {typ} />
      <Similar id= {id} typ= {typ} />
    </div>
  );
};

export default Details;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiLeftArrowCircle, BiRightArrowCircle } from "react-icons/bi";
import {
  topRatedMovieAction,
  topRatedSeriesAction,
  trendingMovieAction,
  trendingSeriesAction,
  upcommingGenresAction,
  upcommingMovieAction,
} from "../../redux/Redux-action";

import "./Homemovie.css";
import Home from "./Home";
import Searching from "../searching/Searching";

const Homemovie = ({ page }) => {
  let [index, setIndex] = useState(0);
  let genres = [];

  let upcommingMovies = useSelector((state) => state.upcommingMovie);
  let { upcommingGenres } = useSelector((state) => state.upcommingGenres);
  let { movieCasts } = useSelector((state) => state.movieCasts);

  let castsList = movieCasts.slice(0, 5);

  
  let {searching} = useSelector((state) => state.searching);

  let { upcommingMovieLoading, upcommingMovie } = upcommingMovies;

  

  let dispatch = useDispatch();

  let upcommingImagePath;

  if (upcommingMovieLoading === false) {
    upcommingImagePath = `https://image.tmdb.org/t/p/w500/${upcommingMovie[index].backdrop_path}`;
    let currentGenres = upcommingMovie[index].genre_ids;
    upcommingGenres.map((data) => {
      currentGenres.map((id) => {
        if (data.id === id) genres.push(data);
      });
    });
  }
  /******************************* Next/Previous Button ******************************/
  let leftArrow = () => {
    if (index === 0) {
      setIndex(upcommingMovie.length - 1);
    } else if (index !== 0) {
      setIndex(index - 1);
    }
  };
  let rightArrow = () => {
    if (index === upcommingMovie.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  /************* Data Fetching ****************/
  useEffect(() => {
    dispatch(upcommingMovieAction());
    dispatch(upcommingGenresAction());

    
  }, [dispatch]);

  return (
    <div className="home-movie-container">
      {/* <div className="upcoming" style={{backgroundImage:`url(${upcommingImagePath})`}} >
        <button className='left-arrow' onClick={leftArrow} >
          <BiLeftArrowCircle size='2em'/>
        </button>
        <div className="overwrite-poster-bg" >
            <div className="upcomming-text" >Upcomming movie</div>
            <div className="upcoming-details-container" >
              <div className="left">
                <div className="upcomming-img-container" >
                  <img src={upcommingMovieLoading===false?`https://image.tmdb.org/t/p/w500/${upcommingMovie[index].poster_path}`:''}alt="" />
                </div>  
              </div>
              <div className="right">
                <h4>{upcommingMovieLoading===false&&upcommingMovie[index].title}</h4>
                <ul className="upcomming-genres-ul">
                  {
                    upcommingMovieLoading===false&&genres.map(data => {
                      return(
                        <li key={data.id}>{data.name}</li>
                      )
                    })
                  }
                </ul>
                <div>
                  <span>Overview</span>
                  <p>{upcommingMovieLoading===false&&upcommingMovie[index].overview}</p>
                </div>
                <ul className="upcomming-cast-ul">
                  <li>
                    <div><img src="https://source.unsplash.com/random" alt="" /></div>
                  </li>
                  <li>
                    <div><img src="https://source.unsplash.com/random" alt="" /></div>
                  </li>
                  <li>
                    <div><img src="https://source.unsplash.com/random" alt="" /></div>
                  </li>
                  <li>
                    <div><img src="https://source.unsplash.com/random" alt="" /></div>
                  </li>
                  
                </ul>  
              </div>
            </div>
        </div>
        <button className='right-arrow' onClick={rightArrow} >
          <BiRightArrowCircle size='2em' />
        </button>
      </div> */}

      {searching ? <Searching searching={searching} /> : <Home/>}
    </div>
  );
};

export default Homemovie;

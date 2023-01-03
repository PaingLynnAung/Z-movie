import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
import Loader from "../Loader";
import Rating from "../Rating";
import { movieCastsAction } from './../../redux/Redux-action';


const Homepage = ({ page }) => {
  let [index, setIndex] = useState(0);
  let genres = [];

  let dispatch = useDispatch();
  let navigate = useNavigate();

  
  let upcommingMovies = useSelector((state) => state.upcommingMovie);
  let trendingMovies = useSelector((state) => state.trendingMovie);
  let topRatedMovies = useSelector((state) => state.topRatedMovie);
  let trendingSeriess = useSelector((state) => state.trendingSeries);
  let topRatedSeriess = useSelector((state) => state.topRatedSeries);
  let { movieCasts } = useSelector((state) => state.movieCasts);
  let { upcommingGenres } = useSelector((state) => state.upcommingGenres);

  let castsList = movieCasts.slice(0, 5);

  let { upcommingMovieLoading, upcommingMovie } = upcommingMovies;
  let { trendingMovieLoading, trendingMovie } = trendingMovies;
  let { topRatedMovieLoading, topRatedMovie } = topRatedMovies;
  let { trendingSeriesLoading, trendingSeries } = trendingSeriess;
  let { topRatedSeriesLoading, topRatedSeries } = topRatedSeriess;

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

  let movieTypeTextVariants = {
    hidden: {
      x : '-100vw'
    },
    visible: {
      x : 0,
      transition: {
        type: 'spring',
        stiffness: 60,
        duration: 0.5,
        ease: 'easeInOut'
      }
    }
  }
  let viewMoreVariants = {
    hidden: {
      x : '100vw'
    },
    visible: {
      x : 0,
      transition: {
        type: 'spring',
        stiffness: 60,
        duration: 0.5,
        ease: 'easeInOut'
      }
    },
    hover: {
      transition: {duration:3,ease:'easeInOut',yoyo:Infinity},
      scale: [1,1.1,1,1.1,1,1.1,1]
    }
  }
  /************* Data Fetching ****************/
  useEffect(() => {
    dispatch(upcommingMovieAction());
    dispatch(upcommingGenresAction());
    
    dispatch(trendingMovieAction(1));
    dispatch(topRatedMovieAction(1));
    dispatch(trendingSeriesAction(1));
    dispatch(topRatedSeriesAction(1));

  }, [dispatch]);

  return (
    <div className="homepage-container">
      {/* <Rating/> */}
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
                    <div><img src="https://source.unsplash.com/random" alt="" /><span>Cast</span></div>
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
      <div className="trending-movie-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <motion.span 
          variants={movieTypeTextVariants}
          animate='visible'
          initial='hidden'
           style={{ fontWeight: "bold", letterSpacing: '1.5px' }}>
             Trending Movies
          </motion.span>
          <motion.div
            variants={viewMoreVariants}
            initial='hidden'
            animate='visible'
            whileHover='hover'
            className="view-more"
            onClick={() => navigate("/trending-movie/page/1")}
          >
            View more
          </motion.div>
        </div>
    
        {trendingMovieLoading? <Loader/> 
        :
        (<div className="cards-container">
        <ul>
          {trendingMovie.map((data) => {
            return (
              <li
                key={data.id}
                onClick={() =>
                  navigate(
                    `/movie/${data.id}/${data.title || data.original_name}`
                  )
                }
              >
                <div className="img-container">
                  <img
                    className="img"
                    src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                    alt=""
                  />

                </div>
                <div style={{ fontSize: "14px" }}>{data.title}</div>
              </li>
            );
          })}
        </ul>
      </div>)
        }
        
      </div>

      <div className="trending-movie-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <motion.span 
            variants={movieTypeTextVariants}
            animate='visible'
            initial='hidden'
            style={{ fontWeight: "bold", letterSpacing: '1.5px' }}>Toprated movies</motion.span>
          <motion.div
            variants={viewMoreVariants}
            initial='hidden'
            animate='visible'
            whileHover='hover'
            className="view-more"
            onClick={() => navigate(`/toprated-movie/page/1`)}
          >
            View more
          </motion.div>
        </div>

        {topRatedMovieLoading?<Loader/>:
        (<div className="cards-container">
        <ul>
          {topRatedMovie.map((data) => {
            return (
              <li
                onClick={() =>
                  navigate(
                    `/movie/${data.id}/${data.title || data.original_name}`
                  )
                }
                key={data.id}
              >
                <div className="img-container">
                  <img
                    className="img"
                    src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                    alt=""
                  />
                </div>
                <div style={{ fontSize: "14px" }}>{data.title}</div>
              </li>
            );
          })}
        </ul>
      </div>)
        }
        
      </div>

      <div className="trending-movie-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <motion.span 
            variants={movieTypeTextVariants}
            animate='visible'
            initial='hidden'
            style={{ fontWeight: "bold", letterSpacing: '1.5px' }}>Trending Series</motion.span>
          <motion.div
            variants={viewMoreVariants}
            initial='hidden'
            animate='visible'
            whileHover='hover'
            className="view-more"
            onClick={() => navigate(`/trending-series/page/1`)}
          >
            View more
          </motion.div>
        </div>

        {trendingSeriesLoading?<Loader/>:
        (<div className="cards-container">
        <ul>
          {trendingSeries.map((data) => {
            return (
              <li
                onClick={() =>
                  navigate(
                    `/series/${data.id}/${data.name}||${data.original_name}`
                  )
                }
                key={data.id}
              >
                <div className="img-container">
                  <img
                    className="img"
                    src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                    alt=""
                  />
                </div>
                <div style={{ fontSize: "14px" }}>{data.original_name}</div>
              </li>
            );
          })}
        </ul>
      </div>)
        }
        
      </div>

      <div className="trending-movie-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <motion.span 
            variants={movieTypeTextVariants}
            animate='visible'
            initial='hidden'
            style={{ fontWeight: "bold", letterSpacing: '1.5px' }}>Toprated Series</motion.span>
          <motion.div
            variants={viewMoreVariants}
            initial='hidden'
            animate='visible'
            whileHover='hover'
            className="view-more"
            onClick={() => navigate(`/toprated-series/page/1`)}
          >
            View more
          </motion.div>
        </div>

        {topRatedSeriesLoading?<Loader/>:
        (<div className="cards-container">
        <ul>
          {topRatedSeries.map((data) => {
            return (
              <li
                onClick={() =>
                  navigate(
                    `/series/${data.id}/${data.name}||${data.original_name}`
                  )
                }
                key={data.id}
              >
                <div className="img-container">
                  <img
                    className="img"
                    src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                    alt=""
                  />
                </div>
                <div style={{ fontSize: "14px", userSelect: "none" }}>
                  {data.original_name}
                </div>
              </li>
            );
          })}
        </ul>
      </div>)
        }
        
      </div>
    </div>
  );
};

export default Homepage;

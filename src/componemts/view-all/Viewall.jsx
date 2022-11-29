import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Viewall.css";
import Navigationbar from "./Navigationbar";
import {
  discoverMovieAction,
  discoverSeriesAction,
  topRatedMovieAction,
  topRatedSeriesAction,
  trendingMovieAction,
  trendingSeriesAction,
} from "./../../redux/Redux-action";

const Viewall = () => {
  let [pages, setPages] = useState(1);
  let [inputValue, setInputValue] = useState("");
  let [navigation, setNavigation] = useState([1, 2, 3, "last"]);

  let { type } = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let trendingMovies = useSelector(state => state.trendingMovie);
  let topRatedMovies = useSelector(state => state.topRatedMovie);
  let trendingSeriess = useSelector(state => state.trendingSeries);
  let topRatedSeriess = useSelector(state => state.topRatedSeries);
  let discoverMovies = useSelector(state => state.discoverMovie);
  let discoverSeriess = useSelector(state => state.discoverSeries);


  let getCollections = () => {
    if (type === "trending-movie") {
      let { trendingMovieLoading, total_page, trendingMovie } = trendingMovies;
      return [trendingMovieLoading, total_page, trendingMovie];
    } else if (type === "toprated-movie") {
      let { topRatedMovieLoading, total_page, topRatedMovie } = topRatedMovies;
      return [topRatedMovieLoading, total_page, topRatedMovie];
    } else if (type === "trending-series") {
      let { trendingSeriesLoading, total_page, trendingSeries } = trendingSeriess;
      return [trendingSeriesLoading, total_page, trendingSeries];
    } else if (type === "toprated-series") {
      let { topRatedSeriesLoading, total_page, topRatedSeries } = topRatedSeriess;
      return [topRatedSeriesLoading, total_page, topRatedSeries];
    } else if (type === "discover-movie") {
      let { discoverMovieLoading, total_page, discoverMovie } = discoverMovies;
      return [discoverMovieLoading, total_page, discoverMovie];
    } else if (type === "discover-series") {
      let { discoverSeriesLoading, total_page, discoverSeries } = discoverSeriess;
      return [discoverSeriesLoading, total_page, discoverSeries];
    }
  };
  let collections = getCollections();

  /********************* Pagination Bar Action Function ***********************/
  let navigateFn = (pg, indx) => {
    let pgs = Navigationbar(pages, pg, indx, navigation, collections[1]);
    setPages(pgs);
    navigate(`/${type}/page/${pgs}`); // recalled current componemt URL
  };

/************************************* Handle Input Change ********************************************/
  let handleChange = e => {
    setInputValue(e.target.value);
  }

/**************************** Searching Btn Click Fn *******************************/
  let handleClick = () => {
    if(inputValue.length>0){
      navigate(`/movie?search=${inputValue}&page=1`)
    }
  };

  /************* Fetching Effect ************/
  useEffect(() => {
    if (type === "trending-movie") {
      dispatch(trendingMovieAction(pages));
    } else if (type === "toprated-movie") {
      dispatch(topRatedMovieAction(pages));
    } else if (type === "trending-series") {
      dispatch(trendingSeriesAction(pages));
    } else if (type === "toprated-series") {
      dispatch(topRatedSeriesAction(pages));
    } else if (type === "discover-movie") {
      dispatch(discoverMovieAction(pages));
    } else if (type === "discover-series") {
      dispatch(discoverSeriesAction(pages));
    }
  }, [dispatch, pages, type]);

  return (
    <div className="view-all-container">
      <div className="searching-container">
        <input
          className="input-ele"
          type="text"
          placeholder="Search"
          onChange={handleChange}
        />
        <button className="search-btn" onClick={handleClick}>
          Search
        </button>
      </div>
      <ul className="cards-container">
        {collections[2].map((data) => {
          return (
            <li
              key={data.id}
              onClick={() =>
                navigate(
                  `/${
                    type === "discover-movie" ||
                    type === "trending-movie" ||
                    type === "toprated-movie"
                      ? "movie"
                      : "series"
                  }/${data.id}/${data.title || data.original_name}`
                )
              }
            >
              <div className="img-container">
                <img
                  className="img"
                  src={`https://image.tmdb.org/t/p/w500/${
                    data.poster_path === null
                      ? data.backdrop_path
                      : data.poster_path
                  }`}
                  alt="Not have path !"
                />
              </div>
              <div>{data.title || data.original_name}</div>
            </li>
          );
        })}
      </ul>
      <ul className="navigation" style={{ display: "flex", margin: "auto" }}>
        {navigation !== undefined &&
          navigation.map((pg, index) => (
            <li
              className="list"
              onClick={() => navigateFn(pg, index)}
              key={index}
            >
              <button>{pg}</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Viewall;

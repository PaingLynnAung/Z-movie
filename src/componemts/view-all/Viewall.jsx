import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Viewall.css";
import Navigationbar from "./Navigationbar";
import Loader from "../Loader";

import {
  discoverMovieAction,
  discoverSeriesAction,
  topRatedMovieAction,
  topRatedSeriesAction,
  trendingMovieAction,
  trendingSeriesAction,
} from "./../../redux/Redux-action";


const Viewall = () => {
  let [pagination, setPagination] = useState([]);
  // let pagination = [];

  let { type, page } = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let trendingMovies = useSelector((state) => state.trendingMovie);
  let topRatedMovies = useSelector((state) => state.topRatedMovie);
  let trendingSeriess = useSelector((state) => state.trendingSeries);
  let topRatedSeriess = useSelector((state) => state.topRatedSeries);
  let discoverMovies = useSelector((state) => state.discoverMovie);
  let discoverSeriess = useSelector((state) => state.discoverSeries);
  
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
  let filter = collections[2].filter((data) => data.poster_path !== null);
 
  let paginationFn = (pg) => { // Pagination bar "Click" Url query "Page" change
    navigate(`/${type}/page/${pg === "first" ? 1 : pg === "last" ? collections[1] : pg}`); // recalled current componemt URL
  };


  let urlPageChangeFireFn = async() => {  // Url query "Page" change Fire
    let pagi = await Navigationbar(parseInt(page),pagination,collections[1]);
    let paginationLists = Array.from(document.querySelectorAll(".list"));
    pagi !== undefined && paginationLists.map((data) => {
      data.classList.contains('active')&&data.classList.remove('active');
      if (data.innerHTML === page) {
        data.classList.add('active');
      } 
      return null;
    });
  };
  urlPageChangeFireFn();

  useEffect(() => { //  Fetching and call urlPageChangeFireFn Function
      if (type === "trending-movie") {
        dispatch(trendingMovieAction(page));
      } else if (type === "toprated-movie") {
        dispatch(topRatedMovieAction(page));
      } else if (type === "trending-series") {
        dispatch(trendingSeriesAction(page));
      } else if (type === "toprated-series") {
        dispatch(topRatedSeriesAction(page));
      } else if (type === "discover-movie") {
        dispatch(discoverMovieAction(page));
      } else if (type === "discover-series") {
        dispatch(discoverSeriesAction(page));
      }
  }, [dispatch, type, page]);

  return (
    <div className="view-all-container">
      {collections[0]?<Loader/>:
      (<ul className="viewall-cards-container">
      {filter.map((data) => {
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
            <div className="viewall-img-container">
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
    </ul>)
      }
      <ul className="pagination" style={{ display: "flex", margin: "auto" }}>
        {pagination !== undefined &&
          pagination.map((pg, index) => (
            <li key={index}>
              <button className="list" onClick={() => paginationFn(pg, index)}>
                {pg}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Viewall;

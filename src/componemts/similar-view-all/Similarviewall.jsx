import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  similarMovieAction,
  similarSeriesAction,
} from "../../redux/Redux-action";
import Navigationbar from "../view-all/Navigationbar";

const Similarviewall = () => {
  let [pages, setPages] = useState(1);
  let [pagination, setPagination] = useState([1, 2, 3, "last"]);

  let { id, type } = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let similarMovies = useSelector((state) => state.similarMovie);
  let similarSeriess = useSelector((state) => state.similarSeries);

  let getSimilarCollections = () => {
    if (type === "similar-movie") {
      let { similarMovieLoading, total_page, similarMovie } = similarMovies;
      return [similarMovieLoading, total_page, similarMovie];
    } else if (type === "similar-series") {
      let { similarSeriesLoading, total_page, similarSeries } = similarSeriess;
      return [similarSeriesLoading, total_page, similarSeries];
    }
  };
  let collections = getSimilarCollections();

  let paginationFn = (pg, indx) => {
    let pgs = Navigationbar(pages, pg, indx, pagination, collections[1]);
    setPages(pgs);
    navigate(`/${id}/${type}/page/${pgs}`);
  };

  useEffect(() => {
    if (type === "similar-movie") {
      dispatch(similarMovieAction(pages, id));
    } else if (type === "similar-series") {
      dispatch(similarSeriesAction(pages, id));
    }
  }, [dispatch, id, type, pages]);

  return (
    <div className="view-all-container">  {/* This componemt extends from Viewall Componemt */}
      <div className="searching-container">
        <input className="input-ele" type="text" placeholder="Search" />
        <button className="search-btn">Search</button>
      </div>
      <ul className="cards-container">
        {collections[2].map((data) => {
          return (
            <li
              key={data.id}
              onClick={()=>navigate(
                `/${type === 'trending-movie'||type==='toprated-movie'||type==='similar-movie'?'movie':'series'}/${data.id}/${data.title||data.original_name}`
              )}
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
        {pagination.map((pg, index) => (
          <li
            className="list"
            onClick={() => paginationFn(pg, index)}
            key={index}
          >
            <button>{pg}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Similarviewall;

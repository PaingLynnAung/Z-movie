import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  similarMovieAction,
  similarSeriesAction,
} from "../../redux/Redux-action";
import Loader from "../Loader";
import Navigationbar from "../view-all/Navigationbar";

const Similarviewall = () => {
  let [pagination, setPagination] = useState([]);

  let { id, type, page } = useParams();
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
  let filter = collections[2].filter((data) => data.poster_path !== null);

  let paginationFn = (pg) => { // Pagination bar "Click" Url query "Page" change
    navigate(`/${id}/${type}/page/${pg === "first" ? 1 : pg === "last" ? collections[1] : pg}`); // recalled current componemt URL
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

  useEffect(() => {
    if (type === "similar-movie") {
      dispatch(similarMovieAction(page, id));
    } else if (type === "similar-series") {
      dispatch(similarSeriesAction(page, id));
    }
  }, [dispatch, page, id, type]);

  return (
    <div className="view-all-container">  {/* This componemt extends from Viewall Componemt */}
      {/* <div className="searching-container">
        <input className="input-ele" type="text" placeholder="Search" />
        <button className="search-btn">Search</button>
      </div> */}
      {collections[0]?<Loader/>:
        <ul className="viewall-cards-container">
        {filter.map((data) => {
          return (
            <li
              key={data.id}
              onClick={()=>navigate(
                `/${type === 'trending-movie'||type==='toprated-movie'||type==='similar-movie'?'movie':'series'}/${data.id}/${data.name||data.original_name}`
              )}
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
      </ul>
      }
      {!collections[0]&&
        <ul className="pagination" style={{ display: "flex", margin: "auto" }}>
        {pagination.map((pg, index) => (
          <li
            key={index}
          >
            <button className="list" onClick={() => paginationFn(pg, index)}>{pg}</button>
          </li>
        ))}
      </ul>
      }
    </div>
  );
};

export default Similarviewall;

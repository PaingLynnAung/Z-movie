import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import {
  similarMovieAction,
  similarSeriesAction,
} from "../../redux/Redux-action";
import "./Similar.css";

const Similar = ({ id, typ }) => {
  let similarMovies = useSelector((state) => state.similarMovie);
  let similarSeriess = useSelector((state) => state.similarSeries);

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();
  let currentUrl = location.pathname;
  

  let getSimilarCollections = () => {
    if (typ === "movie") {
      let { similarMovieLoading, similarMovie } = similarMovies;
      return [similarMovieLoading, similarMovie];
    } else if (typ === "series") {
      let { similarSeriesLoading, similarSeries } = similarSeriess;
      return [similarSeriesLoading, similarSeries];
    }
  };
  let similarCollections = getSimilarCollections();
  let collections = similarCollections[1];
  let loading = similarCollections[0];

  useEffect(() => {
    if (typ === "movie") {
      dispatch(similarMovieAction(1,id));
    } else if (typ === "series") {
      dispatch(similarSeriesAction(1,id));
    }
  }, [dispatch, typ, id]);


  return (
    <div className="similar-container">
      <div className="trending-movie-container">  {/* extends style from homemovie component */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "bold" }}>Similar {typ==='movie'?'movie':'series'}</span>
          <div
            style={{ cursor: "pointer" }}
            className="view-more"
            onClick={() => navigate(`/${id}/${typ==='movie'?'similar-movie':'similar-series'}/page/1`)}
          >
            View more
          </div>
        </div>

        <div className="cards-container">
          <ul>
            {collections.map((data) => {
              return (
                <li 
                onClick={()=>navigate(`/${typ==='movie'?'movie':'series'}/${data.id}/${data.title || data.original_name}`)}//if you click to Details Route
                key={data.id}>
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
        </div>
      </div>
    </div>
  );
};

export default Similar;

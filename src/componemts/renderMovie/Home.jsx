import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  trendingMovieAction,
  topRatedMovieAction,
  trendingSeriesAction,
  topRatedSeriesAction,
} from "../../redux/Redux-action";

const Home = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let trendingMovies = useSelector((state) => state.trendingMovie);
  let topRatedMovies = useSelector((state) => state.topRatedMovie);
  let trendingSeriess = useSelector((state) => state.trendingSeries);
  let topRatedSeriess = useSelector((state) => state.topRatedSeries);

  let { trendingMovieLoading, trendingMovie } = trendingMovies;
  let { topRatedMovieLoading, topRatedMovie } = topRatedMovies;
  let { trendingSeriesLoading, trendingSeries } = trendingSeriess;
  let { topRatedSeriesLoading, topRatedSeries } = topRatedSeriess;

  useEffect(() => {
    dispatch(trendingMovieAction(1));
    dispatch(topRatedMovieAction(1));
    dispatch(trendingSeriesAction(1));
    dispatch(topRatedSeriesAction(1));
  }, [dispatch]);
  return (
    <>
      <div className="trending-movie-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "bold" }}>Trending Movies</span>
          <div
            className="view-more"
            onClick={() => navigate("/trending-movie/page/1")}
          >
            View more
          </div>
        </div>

        <div className="cards-container">
          <ul>
            {trendingMovie.map((data) => {
              return (
                <li
                  key={data.id}
                  onClick={() =>
                    navigate(
                      `/movie/${data.id}/${data.title}||${data.original_name}`
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
        </div>
      </div>

      <div className="trending-movie-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "bold" }}>Top rated movies</span>
          <div
            className="view-more"
            onClick={() => navigate(`/toprated-movie/page/1`)}
          >
            View more
          </div>
        </div>

        <div className="cards-container">
          <ul>
            {topRatedMovie.map((data) => {
              return (
                <li
                  onClick={() =>
                    navigate(
                      `/movie/${data.id}/${data.title}||${data.original_name}`
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
        </div>
      </div>

      <div className="trending-movie-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "bold" }}>Trending Series</span>
          <div
            className="view-more"
            onClick={() => navigate(`/trending-series/page/1`)}
          >
            View more
          </div>
        </div>

        <div className="cards-container">
          <ul>
            {trendingSeries.map((data) => {
              return (
                <li
                  onClick={() =>
                    navigate(
                      `/series/${data.id}/${data.title}||${data.original_name}`
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
        </div>
      </div>

      <div className="trending-movie-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "bold" }}>Top rated Series</span>
          <div
            className="view-more"
            onClick={() => navigate(`/toprated-series/page/1`)}
          >
            View more
          </div>
        </div>

        <div className="cards-container">
          <ul>
            {topRatedSeries.map((data) => {
              return (
                <li
                  onClick={() =>
                    navigate(
                      `/series/${data.id}/${data.title}||${data.original_name}`
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
        </div>
      </div>
    </>
  );
};

export default Home;

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  discoverMovieReducer,
  discoverSeriesReducer,
  movieCastsReducer,
  movieDetailsReducer,
  movieTrailerReducer,
  searchingMovieReducer,
  // searchingReducer,
  searchingSeriesReducer,
  seriesCastsReducer,
  seriesDetailsReducer,
  seriesTrailerReducer,
  similarMovieReducer,
  similarSeriesReducer,
  topRatedMovieReducer,
  topRatedSeriesReducer,
  trendingMovieReducer,
  trendingSeriesReducer,
  upcommingGenresReducer,
  upcommingMovieReducer,
} from "./Redux-reudcer";

let reducer = combineReducers({

  upcommingMovie: upcommingMovieReducer,
  upcommingGenres: upcommingGenresReducer,

  discoverMovie: discoverMovieReducer,
  discoverSeries: discoverSeriesReducer,
  
  trendingMovie: trendingMovieReducer,
  topRatedMovie: topRatedMovieReducer,
  trendingSeries: trendingSeriesReducer,
  topRatedSeries: topRatedSeriesReducer,

  movieDetails: movieDetailsReducer,
  seriesDetails: seriesDetailsReducer,

  movieCasts: movieCastsReducer,
  seriesCasts: seriesCastsReducer,

  movieTrailer: movieTrailerReducer,
  seriesTrailer: seriesTrailerReducer,

  similarMovie: similarMovieReducer,
  similarSeries: similarSeriesReducer,

  searchingMovie: searchingMovieReducer,
  searchingSeries: searchingSeriesReducer,
  
  // searching: searchingReducer
});
let middleware = [thunk];
let initialState = {};

export const store = createStore(reducer, initialState, applyMiddleware(...middleware));

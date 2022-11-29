export const upcommingMovieReducer = (state={upcommingMovie:[]},action) => {
  switch (action.type) {
    case 'UPCOMMING_MOVIE_REQUEST':
      return { upcommingMovieLoading: true, upcommingMovie: [] }
    case 'UPCOMMING_MOVIE':
      return { upcommingMovieLoading: false, upcommingMovie: action.payload }
    default:
      return state;
  }
}

export const upcommingGenresReducer = (state={upcommingGenres:[]},action) => {
  switch (action.type) {
    case 'UPCOMMING_GENRES':
      return { upcommingGenres: action.payload }
    default:
      return state;
  }
}

/******************************* Discover Movie Reducer ***********************************/
export const discoverMovieReducer = (state={discoverMovie:[]},action) => {
  switch (action.type) {
    case 'DISCOVER_MOVIE_REQUEST':
      return { discoverMovieLoading: true, discoverMovie: []}
    case 'DISCOVER_MOVIE':
      return { discoverMovieLoading: false, total_page: 500, discoverMovie: action.payload.results  }
    default:
      return state;
  }
}

export const discoverSeriesReducer = (state={discoverSeries:[]},action) => {
  switch (action.type) {
    case 'DISCOVER_SERIES_REQUEST':
      return { discoverSeriesLoading: true, discoverSeries: []}
    case 'DISCOVER_SERIES':
      return { discoverSeriesLoading: false, total_page: action.payload.total_pages, discoverSeries: action.payload.results  }
    default:
      return state;
  }
}

/*********************************** Trending(Movie/Series) Toprated(Movie/Series) Reducer ********************************************/
export const trendingMovieReducer = (state = { trendingMovie: [] }, action) => {
  switch (action.type) {
    case "TRENDING_MOVIE_REQUEST":
      return { trendingMovieLoading: true, trendingMovie: [] };
    case "TRENDING_MOVIE":
      return { trendingMovieLoading: false,total_page: action.payload.total_pages, trendingMovie: action.payload.results };
    default:
      return state;
  }
};

export const topRatedMovieReducer = (state = { topRatedMovie: [] }, action) => {
  switch (action.type) {
    case "TOPRATED_MOVIE_REQUEST":
      return { topRatedMovieLoading: true, topRatedMovie: [] };
    case "TOPRATED_MOVIE":
      return { topRatedMovieLoading: false,total_page: 500, topRatedMovie: action.payload.results };
    default:
      return state;
  }
};

export const trendingSeriesReducer = (state = { trendingSeries: [] },action) => {
  switch (action.type) {
    case "TRENDING_SERIES_REQUEST":
      return { trendingSeriesLoading: true, trendingSeries: [] };
    case "TRENDING_SERIES":
      return { trendingSeriesLoading: false,total_page: action.payload.total_pages, trendingSeries: action.payload.results };
    default:
      return state;
  }
};

export const topRatedSeriesReducer = (state = { topRatedSeries: [] },action) => {
  switch (action.type) {
    case "TOPRATED_SERIES_REQUEST":
      return { topRatedSeriesLoading: true, topRatedSeries: [] };
    case "TOPRATED_SERIES":
      return { topRatedSeriesLoading: false,total_page: action.payload.total_pages, topRatedSeries: action.payload.results };
    default:
      return state;
  }
};

/******************************* Set Details Reducer *******************************/
export const movieDetailsReducer = (state={movieDetails:[]},action) => {
  switch (action.type) {
    case 'MOVIE_DETAILS_REQUEST':
      return { movieDetailsLoading: true, movieDetails:[] }
    case 'MOVIE_DETAILS':
      return { movieDetailsLoading: false, movieDetails: action.payload } 
    default:
      return state;
  }
}


export const seriesDetailsReducer = (state={seriesDetails:[]},action) => {
  switch (action.type) {
    case 'SERIES_DETAILS_REQUEST':
      return { seriesDetailsLoading: true, seriesDetails:[] }
    case 'SERIES_DETAILS':
      return { seriesDetailsLoading: false, seriesDetails: action.payload } 
    default:
      return state;
  }
}

/********************************* Casts List Reducer *************************************/
export const movieCastsReducer = (state={movieCasts:[]},action) => {
  switch (action.type) {
    case 'MOVIE_CASTS':
      return { movieCasts: action.payload }
    default:
      return state;
  }
}

export const seriesCastsReducer = (state={seriesCasts:[]},action) => {
  switch (action.type) {
    case 'SERIES_CASTS':
      return { seriesCasts: action.payload }
    default:
      return state;
  }
}

/******************************  Trailer Reducer  **********************************/
export const movieTrailerReducer = (state = {movieTrailer:[]},action) => {
  switch (action.type) {
    case 'MOVIE_TRAILER_REQUEST':
      return { movieTrailerLoading: true, movieTrailer:[] }
    case 'MOVIE_TRAILER':
      return { movieTrailerLoading: false, movieTrailer: action.payload }
    default:
      return state;
  }
}

export const seriesTrailerReducer = (state = {seriesTrailer:[]},action) => {
  switch (action.type) {
    case 'SERIES_TRAILER_REQUEST':
      return { seriesTrailerLoading: true, seriesTrailer:[] }
    case 'SERIES_TRAILER':
      return { seriesTrailerLoading: false, seriesTrailer: action.payload }
    default:
      return state;
  }
}

/*************************************** Fetching Similar Reducer **********************************/
export const similarMovieReducer = (state={similarMovie:[]},action) => {
  switch (action.type) {
    case 'SIMILAR_MOVIE_REQUEST':
      return { similarMovieLoading: true, similarMovie: [] }
    case 'SIMILAR_MOVIE':
      return { similarMovieLoading: false, total_page: action.payload.total_pages, similarMovie: action.payload.results }
    default:
      return state;
  }
}

export const similarSeriesReducer = (state={similarSeries:[]},action) => {
  switch (action.type) {
    case 'SIMILAR_SERIES_REQUEST':
      return { similarSeriesLoading: true, similarSeries: [] }
    case 'SIMILAR_SERIES':
      return { similarSeriesLoading: false,total_page: action.payload.total_pages, similarSeries: action.payload.results }
    default:
      return state;
  }
}


/*********************************** Searching Movie & Series *************************************/
export const searchingMovieReducer = (state={searchingMovie:[]},action) => {
  switch (action.type) {
    case 'SEARCHNG_MOVIE_REQUEST':
      return { searchingMovieLoading: true, searchingMovie: [] }
    case 'SEARCHING_MOVIE':
      return { searchingMovieLoading: false,total_page: action.payload.total_pages, searchingMovie: action.payload.results }
    default:
      return state;
  }
}

export const searchingSeriesReducer = (state={searchingSeries:[]},action) => {
  switch (action.type) {
    case 'SEARCHING_SERIES_REQUEST':
      return { searchingSeriesLoading: true, searchingSeries: [] }
    case 'SEARCHING_SERIES':
      return { searchingSeriesLoading: false,total_page: action.payload.total_pages, searchingSeries: action.payload.results }
    default:
      return state;
  }
}


export const searchingReducer = (state={searching:false},action) => {
  switch (action.type) {
    case 'SEARCHING':
      return { searching: true, value:action.payload };
    case 'SEARCHING_HIDE':
      return {searching:false}
    default:
      return state;
  }
}
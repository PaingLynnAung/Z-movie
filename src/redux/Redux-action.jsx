import axios from "axios";

/************************************ Fetching Upcomming Movie **************************************/
export const upcommingMovieAction = () => async(dispatch) => {
  dispatch({
    type: 'UPCOMMING_MOVIE_REQUEST',
  })

  axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=56067ba957841df4d73139c0d7759b19&language=en-US&page=1')
  .then(res=>{
    dispatch({
      type:'UPCOMMING_MOVIE',
      payload: res.data.results
    })
  })
}

export const upcommingGenresAction = () => async(dispatch) => {
  axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=56067ba957841df4d73139c0d7759b19&language=en-US')
  .then(res =>{
    dispatch({
      type: 'UPCOMMING_GENRES',
      payload: res.data.genres
    })
  })
}

/*************************************** Discover Movie&Series ************************************/
export const discoverMovieAction = (page) => async(dispatch) => {
  dispatch({
    type: 'DISCOVER_MOVIE_REQUEST'
  })

  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=56067ba957841df4d73139c0d7759b19&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`)
  .then(res=>{
    dispatch({
      type: 'DISCOVER_MOVIE',
      payload: res.data
    })
  })
}

export const discoverSeriesAction = (page) => async(dispatch) => {
  dispatch({
    type: 'DISCOVER_SERIES_REQUEST'
  })

  axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=56067ba957841df4d73139c0d7759b19&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`)
  .then(res=>{
    dispatch({
      type: 'DISCOVER_SERIES',
      payload: res.data
    })
  })
}


/************************************* Fetching (Trending,Toprated)(Movie,Series) ***************************************/
export const trendingMovieAction = (page) => async(dispatch,getState) => {
  dispatch({
    type: "TRENDING_MOVIE_REQUEST",
  });

  axios
    .get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=56067ba957841df4d73139c0d7759b19&page=${page}`
    )
    .then((res) =>
      dispatch({
        type: "TRENDING_MOVIE",
        payload: res.data,
      }),

    );
};

export const topRatedMovieAction = (page) => async (dispatch) => {
  dispatch({
    type: "TOPRATED_MOVIE_REQUEST",
  });

  axios
    .get(
      `
   https://api.themoviedb.org/3/movie/top_rated?api_key=56067ba957841df4d73139c0d7759b19&language=en-US&page=${page}`
    )
    .then((res) =>
      dispatch({
        type: "TOPRATED_MOVIE",
        payload: res.data
      })
    );
};

export const trendingSeriesAction = (page) => async (dispatch) => {
  dispatch({
    type: "TRENDING_SERIES_REQUEST",
  });

  axios
    .get(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=56067ba957841df4d73139c0d7759b19&page=${page}`
    )
    .then((res) =>
      dispatch({
        type: "TRENDING_SERIES",
        payload: res.data,
      })
    );
};

export const topRatedSeriesAction = (page) => async (dispatch) => {
  dispatch({
    type: "TOPRATED_SERIES_REQUEST",
  });

  axios
    .get(
      `
    https://api.themoviedb.org/3/tv/top_rated?api_key=56067ba957841df4d73139c0d7759b19&language=en-US&page=${page}`
    )
    .then((res) =>
      dispatch({
        type: "TOPRATED_SERIES",
        payload: res.data,
      })
    );
};


/************************** Fetching Details Action *********************************/
export const movieDetailsAction = (id) => async(dispatch) => {
  dispatch({
    type: 'MOVIE_DETAILS_REQUEST',
  })

  axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=56067ba957841df4d73139c0d7759b19&language=en-US`)
  .then(res => {
    dispatch({
      type: 'MOVIE_DETAILS',
      payload: res.data
    })
  })
}

export const seriesDetailsAction = (id) => async(dispatch) => {
  dispatch({
    type: 'SERIES_DETAILS_REQUEST',
  })

  axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=56067ba957841df4d73139c0d7759b19&language=en-US`)
  .then(res => {
    dispatch({
      type: 'SERIES_DETAILS',
      payload: res.data
    })
  })
}


/********************************  Fetching Casts Action  ***********************************/
export const movieCastsAction = (id) => async(dispatch) => {
  axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=56067ba957841df4d73139c0d7759b19&language=en-US`)
  .then(res => {
    dispatch({
      type: 'MOVIE_CASTS',
      payload: res.data.cast
    })
  })
}

export const seriesCastsAction = (id) => async(dispatch) => {
  axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=56067ba957841df4d73139c0d7759b19&language=en-US`)
  .then(res => {
    dispatch({
      type: 'SERIES_CASTS',
      payload: res.data.cast
    })
  })
}


/***************************** Fetching Trailer Action  *************************************/
export const movieTrailerAction = (id) => async(dispatch) => {
  dispatch({
    type: 'MOVIE_TRAILER_REQUEST'
  })

  axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=56067ba957841df4d73139c0d7759b19&language=en-US`)
  .then(res => {
        dispatch({
          type:'MOVIE_TRAILER',
          payload: res.data.results
        })
  })
}

export const seriesTrailerAction = (id) => async(dispatch) => {
  dispatch({
    type: 'SERIES_TRAILER_REQUEST'
  })

  axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=56067ba957841df4d73139c0d7759b19&language=en-US`)
      .then(res => {
        dispatch({
          type:'SERIES_TRAILER',
          payload: res.data.results
        })
      })
}


/***************************************  Fetching Similar Action  *****************************************/
export const similarMovieAction = (page,id) => async(dispatch) => {
  dispatch({
    type:'SIMILAR_MOVIE_REQUEST'
  })

  axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=56067ba957841df4d73139c0d7759b19&language=en-US&page=${page}`)
  .then(res => {
    dispatch({
      type: 'SIMILAR_MOVIE',
      payload: res.data
    })
  })
}

export const similarSeriesAction = (page,id) => async(dispatch) => {
  dispatch({
    type:'SIMILAR_SERIES_REQUEST'
  })

  axios.get(`
  https://api.themoviedb.org/3/tv/${id}/similar?api_key=56067ba957841df4d73139c0d7759b19&language=en-US&page=${page}`)
  .then(res => {
    dispatch({
      type: 'SIMILAR_SERIES',
      payload: res.data
    })
  })
}


/*********************************** Searching Movie & Series **********************************/
export const searchingMovieAction = (name,page) => async(dispatch) => {
  dispatch({
    type: 'SEARCHNG_MOVIE_REQUEST'
  })

  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=56067ba957841df4d73139c0d7759b19&language=en-US&query=${name}&page=${page}&include_adult=false`)
  .then(res => {
    dispatch({
      type: 'SEARCHING_MOVIE',
      payload: res.data
    })
  })
}

export const searchingSeriesAction = (name,page) => async(dispatch) => {
  dispatch({
    type: 'SEARCHNG_SERIES_REQUESET'
  })

  axios.get(`https://api.themoviedb.org/3/search/tv?api_key=56067ba957841df4d73139c0d7759b19&language=en-US&page=${page}&query=${name}&include_adult=false`)
  .then(res => {
    dispatch({
      type: 'SEARCHING_SERIES',
      payload: res.data
    })
  })
}


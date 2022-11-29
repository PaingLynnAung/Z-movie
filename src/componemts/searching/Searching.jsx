import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  searchingMovieAction,
  searchingSeriesAction,
} from "../../redux/Redux-action";
import Navigationbar from "../view-all/Navigationbar";
import './Searching.css'

const Searching = () => {
  let [page, setPage] = useState(1);
  let [showType,setShowType] = useState(['Movie',true]);
  let [pagination,setPagination] = useState([1,2,3,'last']);

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [searchParams] = useSearchParams();
  let value = searchParams.get('search');

  let searchingMovies = useSelector((state) => state.searchingMovie);
  let searchingSeriess = useSelector((state) => state.searchingSeries);
  let total_page_m = searchingMovies.total_page;
  let total_page_s = searchingSeriess.total_page;

  let getCollections = () => {
    if (showType[0]==='Movie'){
      let { searchingMovieLoading, total_page, searchingMovie } = searchingMovies;
      return [ searchingMovieLoading, total_page, searchingMovie ]
    }else if(showType[0]==='Series'){
      let { searchingSeriesLoading, total_page, searchingSeries } = searchingSeriess;
      return [ searchingSeriesLoading, total_page, searchingSeries ]
    }
  }
  let collections = getCollections();
  let totalPage = collections[1]

/********************************* Conditional set 'select' className *************************/  
  let handleClick = e => {
    pagination = [];
      if (e.target.innerText==='Movie') {
        setShowType([
            e.target.innerText,
            true
        ])
        let totalP = searchingMovies.total_page;
        totalP<3 && [...Array(totalP).keys()].map(data => setPagination([...pagination,data+1]))
        totalP>3&&setPagination([1,2,3,'last']);
      }else if (e.target.innerText==='Series'){
          setShowType([
              e.target.innerText,
              false
          ])
          let totalP = searchingSeriess.total_page;
          totalP<3 && [...Array(totalP).keys()].map(data => setPagination([...pagination,data+1]))
          totalP>3 && setPagination([1,2,3,'last'])
        }
  }

/********************************** Pagination Function **************************/
  let paginationFn = (pg, indx) => {
    let pgs = Navigationbar(page, pg, indx, pagination, totalPage);
    setPage(pgs);
    // navigate(`/${type}/page/${pgs}`); // recalled current componemt URL
  };

  let checkedTotalPage = () => {
     
    console.log(totalPage)
    // if (total_page_m<3||total_page_s<3){
    //   console.log('under 3')
    //   pagination = [];
    //   [...Array(totalPage).keys()].map(data => setPagination([...pagination,data+1]))

    // }
  }
  checkedTotalPage()

/******************************** Use Effect **************************************/
  useEffect(() => {
    dispatch(searchingMovieAction(value, page));
    dispatch(searchingSeriesAction(value, page));

  }, [dispatch, page, value, showType]);

  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <div className="choice-btn">
          <button className={`movie ${showType[1]===true&&'select'}` } onClick={handleClick} >Movie</button>
          <button className={`series ${showType[1]===false&&'select'}`} onClick={handleClick} >Series</button>
      </div>
      <ul className="cards-container">
        {(showType[0]==='Movie'?collections[2]:collections[2]).map((data) => {
          return (
            <li
              key={data.id}
              //   onClick={() =>
              //     navigate(
              //       `/${
              //         type === "discover-movie" ||
              //         type === "trending-movie" ||
              //         type === "toprated-movie"
              //           ? "movie"
              //           : "series"
              //       }/${data.id}/${data.title || data.original_name}`
              //     )
              //   }
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
        {
          pagination.length>0 && pagination.map((pg, index) => (
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

export default Searching;

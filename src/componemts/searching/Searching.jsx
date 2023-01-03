import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  searchingMovieAction,
  searchingSeriesAction,
} from "../../redux/Redux-action";
import Navigationbar from "../view-all/Navigationbar";
import Loader from "../Loader";
import "./Searching.css";

const Searching = () => {
  let [showType, setShowType] = useState(['Movie',true]);
  let [render,setRender] = useState(true);
  let [pagination, setPagination] = useState([]);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  let [searchParams, setSearchParams] = useSearchParams();
  let name = searchParams.get("name");
  let page = searchParams.get('page');

  let searchingMovies = useSelector((state) => state.searchingMovie);
  let searchingSeriess = useSelector((state) => state.searchingSeries);

  

  let getCollections = () => {
      if (showType[0] === "Movie") {
        let { searchingMovieLoading, total_page, searchingMovie } = searchingMovies;
        return [searchingMovieLoading, total_page, searchingMovie];
      } else if (showType[0] === "Series") {
        let { searchingSeriesLoading, total_page, searchingSeries } = searchingSeriess;
        return [searchingSeriesLoading, total_page, searchingSeries];
      }   
  };

  let collections = getCollections();
  
  let filter =collections[2].filter(data => data.poster_path !== null);

  let handleClick = (e) => { // Conditional rendering for Movie and Series options
    if (e.target.innerText === "Movie") {
      localStorage.setItem('showType',e.target.innerHTML);
      setShowType([e.target.innerHTML,true])
      setRender(!render)
    }
    if (e.target.innerText === "Series") {
      localStorage.setItem('showType',e.target.innerHTML);
      setShowType([e.target.innerHTML,false])
      setRender(!render)
      
    } 
    paginationFn('first'); // Chnage URI page=1
  };

  let paginationFn = (pg) => { // Pagination bar "Click" Url query "Page" change
    setSearchParams({ 'name': name, page: pg==='first'?1 : pg === 'last'? collections[1] : pg })
  }

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

  /******************************** Use Effect **************************************/
  useEffect(() => {
    let storage = localStorage.getItem('showType')?localStorage.getItem('showType'):localStorage.setItem('showType','Movie');
    setShowType([storage,storage==='Movie'?true:false])
    dispatch(searchingMovieAction(name, page));
    dispatch(searchingSeriesAction(name, page));

  }, [dispatch, page, name]);

  return (
    <>
    {collections[2].length===0&&collections[0]===false?
    <div className="search-not-found">
    <h3>Your search movie doesn't found :(</h3>
  </div>
    : 
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="choice-btn">
        <button
          className={`movie ${showType[1] === true && "select"}`}
          onClick={handleClick}
        >
          Movie
        </button>
        <button
          className={`series ${showType[1] === false && "select"}`}
          onClick={handleClick}
        >
          Series
        </button>
      </div>
      {collections[0]?<Loader/>:
      (<ul className="viewall-cards-container">
      {filter.map(
        (data) => {
          return (
            <li
              key={data.id}
              onClick={() =>
                navigate(
                  `/${showType[0] === "Movie" ? "movie" : "series"}/${
                    data.id
                  }/${data.title === undefined ? data.name : data.title}`
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
        }
      )}
    </ul>)
      }
      {
        !collections[0] &&
        <ul className="pagination" style={{ display: "flex", margin: "auto" }}>
        {pagination.length > 0 &&
          pagination.map((pg, index) => (
            <li key={index}>
              <button className="list" onClick={() => paginationFn(pg, index)}>
                {pg}
              </button>
            </li>
          ))}
      </ul>
      }
    </div> 
  }
    
    </>
  );
};

export default Searching;

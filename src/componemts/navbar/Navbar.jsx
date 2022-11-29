import React, { useState } from "react";
import { RiMovie2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {GrMenu} from 'react-icons/gr';
import "./Navbar.css";
import { useDispatch } from "react-redux";

const Navbar = ({getSearchBoxFn}) => {
  let [searchText,setSearchText] = useState('');
  let [showSearchBox,setShowSearchBox] = useState(false);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  let handleClick = () => {
    let container = document.querySelector('.navbar-container');
    let navbar_rightsite = document.querySelector('.navbar-rightsite');
    container.classList.toggle('height');
    navbar_rightsite.classList.toggle('visible')
  }

  let handleChange = e => {
    setSearchText(e.target.value)
  }

  let handleKeyDown = e => {
    if (e.keyCode === 13 && searchText.length>0) {
       dispatch({ type:'SEARCHING', payload:searchText });
       navigate(`/?search=${searchText}`)
       e.target.value = '';
       setTimeout(() => {
        setShowSearchBox(!showSearchBox)
       },2000)
    }
  }

/*************************** Searching Compoment Hide & Remove Query ************************/
  let reachHomeCompo = () => {
    dispatch({type:'SEARCHING_HIDE'});
    navigate('/')
  }
 
  return (
      <>
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-leftsite" onClick={reachHomeCompo}>
          <div className="logo">
            <RiMovie2Fill fontSize={20} />
          </div>
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>Zmovies</span>
        </div>
        <GrMenu onClick={handleClick} className="menu"/>
        <ul className="navbar-rightsite" >
          <li onClick={() => navigate("/discover-movie/page/1")}>Movies</li>
          <li onClick={() => navigate("/discover-series/page/1")}>TV Series</li>
          <li onClick={() => setShowSearchBox(!showSearchBox)}>Search</li>
        </ul>
      </div>
      <div className="search-box" >
        <input type="text" placeholder="Search" className={showSearchBox?'show-search-box':'hide-search-box'} onChange={handleChange} onKeyDown={handleKeyDown} />
      </div>
    </div>
    </>
  );
};

export default Navbar;

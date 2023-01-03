import React, { useState, createRef } from "react";
import { RiMovie2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {GrMenu} from 'react-icons/gr';
import { motion } from 'framer-motion'
import "./Navbar.css";
import { useDispatch } from "react-redux";

const Navbar = ({getSearchBoxFn}) => {
  let [searchText,setSearchText] = useState('');
  let [showSearchBox,setShowSearchBox] = useState(false);

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let inputRef = createRef();

  let handleClick = () => {
    let container = document.querySelector('.navbar-container');
    let navbar_rightsite = document.querySelector('.navbar-rightsite');
    container.classList.toggle('height');
    navbar_rightsite.classList.toggle('visible')
  }

  let handleSearchBtnClick = () => {
    setShowSearchBox(!showSearchBox)
    inputRef.current.focus()
  }

  let handleChange = e => {
    setSearchText(e.target.value)
  }

  let handleKeyDown = e => {
    if (e.keyCode === 13 && searchText.length>0) {
       navigate(`/search?name=${searchText}&page=1`);
       e.target.value = '';
       setTimeout(() => {
        setShowSearchBox(!showSearchBox)
       },2000)
    }
  }


  let navbarRightSiteVariant = {
    hidden:{
      x : 400
    },
    visible:{
      x : 0,
      transition:{when: "beforeChildren",staggerChildren : 0.4}
    }
  }
  let navbarRightSiteBtnsVariant = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
    }
  }


/*************************** Searching Compoment Hide & Remove Query ************************/
  let reachHomeCompo = () => {
    dispatch({type:'SEARCHING_HIDE'});
    navigate('/')
  }
 
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-leftsite" onClick={reachHomeCompo}>
          <div className="logo">
            <RiMovie2Fill fontSize={20} />
          </div>
          <span style={{ fontSize: "20px", fontWeight: "bold", letterSpacing: '1.5px', fontStyle:'italic' }}>Z-movies</span>
        </div>
        <GrMenu onClick={handleClick} className="menu"/>
        <motion.ul
        variants={navbarRightSiteVariant}
        initial='hidden'
        animate='visible'
        className="navbar-rightsite" >
          <motion.li variants={navbarRightSiteBtnsVariant} onClick={() => navigate("/discover-movie/page/1")}>Movies</motion.li>
          <motion.li variants={navbarRightSiteBtnsVariant} onClick={() => navigate("/discover-series/page/1")}>TV Series</motion.li>
          <motion.li variants={navbarRightSiteBtnsVariant} onClick={() => handleSearchBtnClick()}>Search</motion.li>
        </motion.ul>
      </div>
      <div className="search-box" >
        <input type="text" placeholder="Search" ref={inputRef} className={showSearchBox?'show-search-box':'hide-search-box'} onChange={handleChange} onKeyDown={handleKeyDown} />
      </div>
    </div>
  );
};

export default Navbar;

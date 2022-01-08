import react from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalCtx } from "../App";
import {MdFavorite} from 'react-icons/md'
import { FaBabyCarriage } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi"
import NavBtn from "./NavBtn";

const Navbar = (props) => {
  const navigate = useNavigate()
  const logout = () => {
    window.localStorage.removeItem("token");
    setGState({ ...gState, token: null })
    navigate("/")
  }
  const { gState, setGState } = react.useContext(GlobalCtx)

  
  const loginBtns = (
    <>
      <Link className="flex content-end" to="/signup">
        <button>Register</button>
      </Link>
      <Link className="flex content-end" to="/login">
        <button>Login</button>
      </Link>
    </>
  );
  
  const navBtns = (
    <>
      <NavBtn linkTo="/favorite" Icon={MdFavorite} label="My Favorites" />
      <NavBtn linkTo="/browse" Icon={FaBabyCarriage} label="Browse Names" />
      <div className="self-center hover:scale-110 transition-all cursor-pointer  " onClick={() => logout()}>Logout</div>
    </>
  );


  return (
    <header
      className=" h-12 z-30  fixed top-0 w-full bg-gradient-to-r from-pink-500 via-purple-600
     to-indigo-800 text-lg text-white mb-4 flex justify-between content-end shadow-md shadow-gray-500 transition-all duration-500 ease-linear group"
    >
      <Link className="flex content-end" to="/">
        <button className=" font-bold font-logo ease-linear hover:scale-110 ml-10 text-3xl transition">
          monikr
        </button>
      </Link>
      <nav className="pr-10 flex w-1/3 justify-around content-end ">
        {gState.token ? navBtns : loginBtns}
      </nav>
    </header>
  );
};

export default Navbar;

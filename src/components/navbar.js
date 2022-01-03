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
      <div className="self-center hover:shadow-md cursor-pointer " onClick={() => logout()}>Logout</div>
    </>
  );


  return (
    <header className="h-12 z-1 fixed top-0 w-full bg-purple-500 text-lg text-white mb-4 flex justify-between content-end shadow-md shadow-purple-800">
      <Link className="flex content-end" to="/">
        <button>monikr</button>
      </Link>
      <nav className="pr-10 flex w-1/4 justify-between content-end ">
        {gState.token ? (navBtns) : loginBtns}
      </nav>
    </header>
  );
};

export default Navbar;

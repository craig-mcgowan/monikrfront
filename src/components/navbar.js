import react from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalCtx } from "../App";
import {MdFavorite} from 'react-icons/md'

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
      <Link className="flex flex-col justify-center" to="/favorite">
        <button className="peer flex flex-grow  self-center ">
          <MdFavorite className="  relative top-6 text-white text-2xl hover:text-pink-400 hover:text-3xl transition-all duration-200 origin-center ease-linear" />
        </button>
        <span className="relative top-6 w-auto p-2 m-2 min-w-max rounded-md shadow-md text-xs font-bold transition-all duration-200 scale-0 origin-top text-slate-800 bg-white peer peer-hover:scale-100  ease-linear">
          Favorites
        </span>
      </Link>
      <Link className="flex content-end" to="/login">
        <button>Browse</button>
        <span className=""></span>
      </Link>
      <button onClick={() => logout()}>Logout</button>
    </>
  );


  return (
    <header className="h-12 bg-purple-500 text-lg text-blue-50 mb-4 flex justify-between content-end">
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

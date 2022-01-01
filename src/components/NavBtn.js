import React from "react";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

const NavBtn = ({ Icon, linkTo, label }) => {
  const CustomTag = Icon
  return (
  <Link className="flex flex-col justify-center" to={linkTo}>
    <button className="border-0 peer flex flex-grow  self-center ">
      <CustomTag className="  relative top-6 text-white text-2xl hover:text-pink-400 hover:text-3xl transition-all duration-200 origin-center ease-linear" />
    </button>
    <span className="relative top-6 w-auto p-2 m-2 min-w-max rounded-md shadow-md text-xs font-bold transition-all duration-200 scale-0 origin-top text-slate-800 bg-white peer peer-hover:scale-100  ease-linear">
      {label}
    </span>
  </Link>
  )
}

export default NavBtn
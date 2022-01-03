import React, {useState, useEffect} from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

const BrowseCard = ({thisName, createFav}) => {
  const [cStyle, setCStyle] = useState(null);
  useEffect(()=> setCStyle(null),[thisName])
  return (
    <div
      id={thisName.name}
      className={
          !cStyle
          ? `transition-all duration-250 ease-linear fixed z-20 left-[40%] top-[33%]`
          : cStyle === "left"
            ? "transition-all duration-250 ease-linear fixed top-[25%] left-[20%] -rotate-45 opacity-0"
            : "transition-all duration-250 ease-linear fixed top-[25%] left-[60%] rotate-45 opacity-0"
      }
    >
      <div className="border-2 border-black rounded-lg w-60 h-60 p-5    bg-white  ">
        <p>{thisName.name}</p>
        <p>{thisName.origin}</p>
        <p>{thisName.gender}</p>
        <button
          className=" bg-red-500 px-5 py-2 m-2 rounded-xl "
          onClick={() => setCStyle("left")}
        >
          <FaThumbsDown />
        </button>
        <button
          className=" bg-green-500 px-5 py-2 m-2 rounded-xl "
          onClick={() => {
            createFav(thisName)
            setCStyle("right")
          }}
        >
          <FaThumbsUp />
        </button>
      </div>
    </div>
  )
}

export default BrowseCard
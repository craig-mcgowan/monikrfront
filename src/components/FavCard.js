import React from "react";
import { MdEdit } from "react-icons/md";


const FavCard = ({favorite, favorite: {name, origin, gender, top_choice}, handleClick }) => {
  return (
    <div className={`border-black border-2 m-5 w-1/5 h-36 rounded-xl shadow shadow-black hover:shadow-l ${gender === "Feminine"? "hover:shadow-pink-300 hover:border-pink-300" : gender === "Masculine"? "hover:shadow-blue-300 hover:border-blue-300": "hover:shadow-purple-700 hover:border-purple-700" } transition-all duration-300 flex hover:bg-gradient-to-tl hover:from-gray-100 hover:to-white`}>
      <div className="h-full w-[95%]">
        <p className="font-bold text-xl my-4">{name}</p>
        <p>{origin}</p>
        <p>{gender}</p>
        <p>{top_choice}</p>
      </div>
      <button className = "edit-btn align-top h-6" onClick={() => handleClick(favorite)}>
        <MdEdit className=" hover:scale-125" />
      </button>
    </div>
  );
}
 
export default FavCard
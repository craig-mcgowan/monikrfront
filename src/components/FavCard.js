import React from "react";
import { MdEdit } from "react-icons/md";


const FavCard = ({favorite, favorite: {name, origin, gender, top_choice}, handleClick }) => {
  return (
    <div className=" border-black border-2 m-5 w-1/3  flex">
      <div className="h-full w-[95%]">
        <p>{name}</p>
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
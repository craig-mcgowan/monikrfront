import React from "react";

const FavCard = ({ favorite: {name, origin, gender, top_choice} }) => {
  return (
    <div className=" border-black border-2 m-5 w-1/3  ">
      <p>{ name }</p>
      <p>{ origin }</p>
      <p>{ gender}</p>
      <p>{ top_choice }</p>
    </div>
  )
}
 
export default FavCard
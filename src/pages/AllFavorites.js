import React, { useState, useEffect, useContext } from "react";
import { GlobalCtx } from "../App";
import FavCard from "../components/FavCard";

/*----------------------------------
   State and Other Variables
----------------------------------*/

function FavoritesIndex(props) {
  const { gState, setGState } = useContext(GlobalCtx)
  const { url, token } = gState

  console.log('gstate:', gState)
  console.log('token:', token)
  console.log('url:', url)

  // list of favorites state
  const [favorites, setFavorites] = useState(null);

  const nullFavorite = {
    user_id: null,
    name: "",
    origin: "",
    gender: "",
    top_choice: Boolean,
  };


  /*----------------------------------
     Functions  
  ----------------------------------*/
  const getFavorites = async () => {
    const response = await fetch(`${url}/favorites/`, {
      method: "get",
      headers: {
        Authorization: "bearer " + token
      },
    });
    const data = await response.json();
    console.log(`api data ${data}`)
    setFavorites(data);
    console.log(favorites)
  };




  useEffect(() => {
    console.log(`use effect token: ${token}`)
    if (!token) { return }
    getFavorites()
  }, [token])
  return (
    <>
      <h1>Favorites Index</h1>
      <div className="flex flex-wrap justify-center">
        {favorites?.map(fav => {
          return(
            <FavCard key={fav.id} favorite = {fav}/>
            )
          }) 
        }
      </div>
    </>
  );
}

export default FavoritesIndex;

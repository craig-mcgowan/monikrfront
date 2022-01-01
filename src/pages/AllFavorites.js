import React, { useState, useEffect, useContext } from "react";
import { GlobalCtx } from "../App";
import FavCard from "../components/FavCard";
import FavForm from "../components/FavForm";
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

  // sidebar visibility state
  const [isVisible, setIsVisible] = useState(false)

  const nullFavorite = {
    user_id: null,
    name: "",
    origin: "",
    gender: "",
    top_choice: Boolean,
  };
  
  const sbWidth = isVisible ? "80" : "0"

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
    await console.log(`api data ${data}`)
    setFavorites(data);
    
  };

  const toggleSidebar = (event) => {
    setIsVisible(!isVisible)
  };
  

  


  useEffect(() => {
    console.log(`use effect token: ${token}`)
    if (!token) { return }
    getFavorites()
  }, [token])
  return (
    <>
      <div
        className={`pt-${sbWidth} mr-${sbWidth} transition-all duration-150 ease-linear `}
        onClick={() => {
          if (isVisible) {
            setIsVisible(false);
          }
        }}
      >
        <h1>Favorites Index</h1>
        <button
          onClick={() => toggleSidebar()}
          className={`fixed top-14 right-4`}
        >
          Add New Favorite
        </button>
        <div className="flex flex-wrap justify-center">
          {favorites?.map((fav) => {
            return <FavCard key={fav.id} favorite={fav} />;
          })}
        </div>
      </div>
      <div className={`w-${sbWidth} fixed  top-12 right-0 bg-gray-200 flex flex-wrap h-full transition-all duration-300 ease-linear origin-right"`} >
        <FavForm
          toggleSidebar= {toggleSidebar}
          currentFav={nullFavorite}
          btnText="New Favorite"
          getFavorites= {getFavorites}
        />
      </div>
    </>
  );
}

export default FavoritesIndex;

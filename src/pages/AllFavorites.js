import React, { useState, useEffect, useContext } from "react";
import { GlobalCtx } from "../App";
import FavCard from "../components/FavCard";
import FavForm from "../components/FavForm";

function FavoritesIndex(props) {
  
  /*----------------------------------
     State and Other Variables
  ----------------------------------*/
  const { gState: {url, token}, setGState } = useContext(GlobalCtx)

  console.log('token:', token)
  console.log('url:', url)

  // list of favorites state
  const [favorites, setFavorites] = useState(null);

  // sidebar visibility state
  const [sbWidth, setSbWidth] = useState("0")

  const nullFav = {
    name: "",
    origin: "",
    gender: "",
    top_choice: null,
  };
  
  
  const [formData, setFormData] = useState(nullFav);
  const [formType, setFormType] = useState("new");

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
    setSbWidth(sbWidth==="0" ? "60" : "0") 
  };
  
  const openEditPane = (targetFav) => {
    setFormData(targetFav)
    setFormType("update")
    setSbWidth("60")
    console.log(formData)
    
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    console.log(`use effect token: ${token}`)
    if (!token) { return }
    getFavorites()
  }, [token])

   const createFav = (event) => {
     const fav = JSON.stringify(formData);

     console.log(fav);
     fetch(`${url}/favorites/`, {
       method: "post",
       headers: {
         "Content-Type": "application/json",
         Authorization: "bearer " + token,
       },
       body: fav,
     })
       .then((response) => response.json())
       .then((data) => {
         console.log(data);
       });
   };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      //     if (props.page === "Register") {
      createFav(event);
      getFavorites();
      toggleSidebar();
      setFormData(nullFav);
      //      } else if (props.page === "Login") {
      //        console.log("wazzup")
      //     }
    };
  
  const deleteFavorite = async (favorite) => {
    console.log(favorite)
    const response = await fetch(`${url}/favorites/${favorite.id}/`, {
      method: "delete",
      headers: {
        Authorization: "bearer " + token, 
      }
    })
      getFavorites();
      toggleSidebar()
  }

  return (
    <>
      <div
        className={`transition-all duration-150 ease-linear h-full ${
          sbWidth === "60" ? "blur-[1px]" : "blur-none"
        }`}
        onClick={(e) => {
          console.log("sbWidth:", sbWidth);
          if (sbWidth === "60") {
            toggleSidebar();
          }
          console.log(e);
        }}
      >
        <h1>Favorites Index</h1>
        <button
          onClick={() => {
            setFormType("new")
            toggleSidebar()
          }
          }
          className={`fixed top-14 right-4`}
        >
          Add New Favorite
        </button>
        <div className="flex flex-wrap justify-center">
          {favorites?.map((fav) => {
            return (
              <FavCard key={fav.id} favorite={fav} handleClick={openEditPane} />
            );
          })}
        </div>
      </div>
      <div
        className={`${
          sbWidth === "60" ? "w-60 justify-center" : "w-0"
        } fixed  top-12 right-0 bg-gray-100  flex flex-wrap h-full transition-all duration-150 ease-linear origin-right shadow-md shadow-black `}
      >
        <FavForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          toggleSidebar={toggleSidebar}
          page={formType}
          formData={formData}
          getFavorites={getFavorites}
          deleteFavorite={deleteFavorite}
        />
      </div>
    </>
  );
}

export default FavoritesIndex;

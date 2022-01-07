import React, { useState, useEffect, useContext } from "react";
import { CgSpinner } from "react-icons/cg";
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
  const [sbVisible, setSbVisible] = useState(false)

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
    setSbVisible(!sbVisible) 
  };
  
  const openEditPane = (targetFav) => {
    setFormData(targetFav)
    setFormType("update")
    setSbVisible(true)
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

   const createFav = () => {
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
   const updateFav = () => {
     console.log();
     fetch(`${url}/favorites/${formData.id}`, {
       method: "put",
       headers: {
         "Content-Type": "application/json",
         Authorization: "bearer " + token,
       },
       body: JSON.stringify(formData),
     })
       .then((response) => response.json())
       .then((data) => {
         console.log(data);
       });
   };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      formType === "new" ?
        createFav() :
        updateFav()
      getFavorites();
      toggleSidebar();
      setFormData(nullFav);
      //      } else if (props.page === "Login") {
      //        console.log("wazzup")
      //     }
    };
  
  const deleteFavorite = async (favorite) => {
    console.log(favorite)
    await fetch(`${url}/favorites/${favorite.id}/`, {
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
        className={`transition-all pt-4 duration-150 ease-linear h-full ${
          sbVisible? "blur-[1px] brightness-80 bg-cover bg-fixed" : "blur-none"
        }`}
        onClick={(e) => {
          console.log("sbVisible:", sbVisible);
          if (sbVisible) {
            toggleSidebar();
          }
          console.log(e);
        }}
      >
        <h1 className=" font-logo font-medium text-4xl  ">Favorites </h1>
        <button
          onClick={() => {
            setFormData(nullFav)
            setFormType("new")
            toggleSidebar()
          }
        }
          className={`fixed top-5 right-4 hover:w-48 w-14 purple-btn group flex content-center h-14 justify-around bg-purple-700 duration-500 text-white`}
        >
           <span className="text-2xl font-extrabold">+</span> <div className=" whitespace-nowrap self-center scale-x-0 overflow-hidden clip transition-transform group origin-right group-hover:scale-x-100 duration-2000  opacity-0 group-hover:opacity-100">Add New Favorite</div>
        </button>
        {favorites ? (

          favorites.length === 0 ? (
            <div className="animate-bounce mt-20">
              <h2 className = "text-4xl text-purple-700">You Don't Have Any Favorites Yet</h2>
              <h2 className="text-2xl text-gray-700">Start Browsing to Find Your Perfect Match!</h2>
            </div>
          ) : (
              
            
            <div className=" mt-5 flex flex-wrap justify-center">
          {favorites.map((fav) => {
            return (
              <FavCard key={fav.id} favorite={fav} handleClick={openEditPane} />
              );
            })}
        </div>
          )
        ) : <div className="w-screen h-screen flex justify-center content-center ">
          <CgSpinner className="animate-spin text-blue-400 text-8xl h-30 w-30 mt-40 " />
        </div>
      }
      </div>
      <div
      className={`${
        sbVisible? "w-60 justify-center" : "w-0"
      } fixed  top-12 right-0 bg-white flex flex-col flex-wrap h-full transition-all duration-150 ease-linear origin-right shadow-md shadow-black `}
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

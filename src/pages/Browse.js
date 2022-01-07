import React, {useState, useContext} from "react";
import FormField from "../components/FormField";
import origins from "../data/origins";
import { useNavigate } from "react-router-dom";
import BrowseCard from "../components/BrowseCard";

import { GlobalCtx } from "../App";




const Browse = (props) => {
  /*----------------------------------
     State and Variables
  ----------------------------------*/
  const { gState: {url, token}, setGState } = useContext(GlobalCtx)
  
  const [names, setNames] = useState(null)
  const [currentNames, setCurrentNames] = useState(null)

  const navigate = useNavigate()

  const API_KEY = process.env.REACT_APP_API_KEY

  console.log(API_KEY)

  const [formData, setFormData] = useState({});


  /*----------------------------------
     Functions
  ----------------------------------*/
  
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const getNames = async (e) => {
    e.preventDefault()
    const [searchKey, language] = formData.origin.split("%%%")
    let gen
    if (formData.gender === "m") {
      gen = "Masculine"
    } else if (formData.gender === "f") {
      gen = "Feminine"
    } else {
      gen = "Neutral"
    }

    const searchUrl = `https://www.behindthename.com/api/random.json?usage=${searchKey}&gender=${formData.gender}&number=6&key=${API_KEY}`
    console.log("SearchUrl " + searchUrl)
    const response = await fetch(searchUrl,
      {
        method: "get"
      }
    )
    const data = await response.json()
    console.log(data)
    const namesArr = await data.names.map(ele => {
      return { name: ele, origin: language, gender: gen }
    })
    setNames(namesArr)
  }

  const createFav = (thisName) => {
       const fav = JSON.stringify(thisName);
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

  
  




  return names ? (
    <div className="flex  ">
      {names?.map((name) => (
        <BrowseCard thisName={name} createFav={createFav}/>
      ))}
      <div className="w-60 h-60 fixed left-[40%] top-[33%] flex flex-wrap align-center justify-around content-center">
      <button
        className="orange-btn w-2/3 h-1/4 mb-4"
        onClick={(e) => {
          setFormData(null);
          setNames(null);
        }}
        >
        Try Another Category
      </button>
      <button
        className="green-btn w-2/3 h-1/4"
        onClick={(e) => getNames(e)}
        >
        Keep Going
      </button>
      </div>
    </div>
  ) : (
    <div className="flex justify-center w-screen pt-10">
      <h1>Choose Your Your Categories to Start Browsing</h1>
        <form
        className="w-[60%]"
        onSubmit={(e) => {
          getNames(e);
        }}
        >
        <fieldset>
        <legend>Gender</legend>    
        <FormField
          type="radio"
          onChange={handleChange}
          value="m"
          name="gender"
          label="Masculine"
          required
          />
        <FormField
          type="radio"
          onChange={handleChange}
          value="f"
          name="gender"
          label="Feminine"
          required
          />
        <FormField
          type="radio"
          onChange={handleChange}
          value="u"
          name="gender"
          label="Neutral"
          required
          />
          </fieldset>
        {origins.map((continent) => (
          <details className="rounded-lg open:bg-gray-100">
            <summary className=" cursor-pointer hover:scale-110 list-none ">
              {continent.continent}
            </summary>
            {continent.languageArr.map(({ searchKey, language }) => (
              <FormField
                type="radio"
                onChange={handleChange}
                name="origin"
                value={searchKey + "%%%" + language}
                label={language}
                required
              />
            ))}
          </details>
        ))}
        <input
          type="submit"
          value="Start"
          className="border-2 border-blue-600 rounded-lg px-4 py-1 m-5 bg-blue-600 text-white hover:scale-105 transition-all duration-75 ease-linear shadow-black shadow"
        />
      </form>
    </div>
  );
};

export default Browse;

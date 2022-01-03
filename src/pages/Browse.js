import React, {useState, useContext} from "react";
import FormField from "../components/FormField";
import origins from "../data/origins";
import { useNavigate } from "react-router-dom";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { GlobalCtx } from "../App";




const Browse = (props) => {
  /*----------------------------------
     State and Variables
  ----------------------------------*/
  const { gState: {url, token}, setGState } = useContext(GlobalCtx)
  
  const [names, setNames] = useState(null)

  const navigate = useNavigate()

  const API_KEY = process.env.REACT_APP_API_KEY

  console.log(API_KEY)

  const [formData, setFormData] = useState({});

  const cardStyle = [
    "transition-all fixed z-50 left-[38.5%] top-[30%]",
    "transition-all fixed z-40 left-[39%] top-[31%]",
    "transition-all fixed z-30 left-[39.5%] top-[32%]",
    "transition-all fixed z-20 left-[40%] top-[33%]",
    "transition-all fixed z-10 left-[40.5%] top-[34%]",
    "transition-all fixed z-00 left-[41%] top-[35%]",
  ]
  const swipedLeft = `fixed top-[20%] -left-60 -rotate-45`;

  /*----------------------------------
     Functions
  ----------------------------------*/
  
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const getNames = async (e) => {
    e.preventDefault()
    console.log(e)
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
    console.log("SearchUrl "+ searchUrl)
    const response = await fetch(searchUrl, 
      {
        method: "get"
      }
    )
    const data = await response.json()
    console.log(data)
    const namesArr = data.names.map(ele => {
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
    <div className="flex ">
      
    {
      names.map((name, index) => {
        
        return (
            <div
              id={name.name}
              className={cardStyle[index]}
            >
              <div className="border-2 border-black rounded-lg w-60 h-60 p-5    bg-white  ">
                <p>{name.name}</p>
                <p>{name.origin}</p>
                <p>{name.gender}</p>
                <button className=" bg-red-500 px-5 py-2 m-2 rounded-xl "
                 onClick= {()=>cardStyle[index] = swipedLeft}>
                  <FaThumbsDown />
                </button>
                <button className=" bg-green-500 px-5 py-2 m-2 rounded-xl ">
                  <FaThumbsUp />
                </button>
              </div>
          </div>
        );
      }
      )
    }
    </div>
    ) : (
      <div className="flex justify-center w-screen">
      <form
        className="w-[60%]"
        onSubmit={(e) => {
          getNames(e);
        }}
      >
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
        {origins.map((continent) => (
          <details>
            <summary>{continent.continent}</summary>
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

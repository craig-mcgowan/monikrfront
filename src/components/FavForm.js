import FormField from "../components/FormField";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalCtx } from "../App";

const FavForm = (props) => {
  
  /*----------------------------------
  Variables and State
  ----------------------------------*/
  const { btnText, toggleSidebar, getFavorites, handleSubmit, handleChange, formData, page, deleteFavorite} = props
  
  
  /*----------------------------------
     Functions
  ----------------------------------*/


  const loaded = (
    <>
      {page === "update" && (
        <button
          className="red-btn h-10 self-center whitespace-nowrap overflow-hidden mt-6"
          onClick={() => {
            deleteFavorite(formData);
          }}
        >
          Delete Favorite
        </button>
      )}
      <form
        className=" max-w-56 h-max flex-grow "
        onSubmit={(event) => handleSubmit(event)}
      >
        <FormField
          type="text"
          onChange={handleChange}
          value={formData.name}
          name="name"
          placeholder="name"
          required
        />
        <FormField 
          className= "empty:hidden empty:bg-red-500"
          type="text"
          onChange={handleChange}
          value={formData.origin}
          name="origin"
          // placeholder="origin"
          required
        />
        <fieldset className=" rounded-xl w-full flex-col content-center ">
          <legend>Gender</legend>
          <FormField
            className=""
            type="radio"
            onChange={handleChange}
            value="Masculine"
            name="gender"
            label="Masculine"
            required
          />
          <FormField
            className=""
            type="radio"
            onChange={handleChange}
            value="Feminine"
            name="gender"
            label="Feminine"
          />
          <FormField
            className=""
            type="radio"
            onChange={handleChange}
            value="Gender Neutral"
            name="gender"
            label="Neutral"
          />
        </fieldset>
        <br />
        <br />
        <div className="h-12 whitespace-nowrap overflow-hidden ">
          <FormField
            className="whitespace-nowrap overflow-hidden "
            type="checkbox"
            onChange={handleChange}
            value="top-choice"
            name="top_choice"
            label="Top Choice?"
          />
        </div>
        <br />
        <br />
        <input
          type="submit"
          value="submit"
          className="border-2 py-1 px-2 rounded-lg bg-blue-400
       border-blue-600 text-white hover:bg-blue-600 "
        />
      </form>
    </>
  );

  const loading = <h4>loading</h4>



  /*----------------------------------
     Returned JSX
  ----------------------------------*/
  
  return  formData? loaded: loading  ;
}

export default FavForm

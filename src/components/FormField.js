import React from "react"

const FormField = ({ name, value, type, placeholder, onChange }) => {
  
  return (
    <input type={type}
      value={value} 
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className= "rounded border-black border bg-slate-100 mx-4 shadow-md hover:border-green-400"
    />
  )

}

export default FormField
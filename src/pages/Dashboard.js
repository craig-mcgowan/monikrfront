import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard(props) {
  /*----------------------------------
     State and Variables
  ----------------------------------*/

  /*----------------------------------
     Functions  
  ----------------------------------*/


  return (
    <div className="dashboard px-[30%]">
      <Link to="/favorite">
        <div className="purple-btn h-40 my-10">
          <h3 className="text-xl mt-14">View Your Favorite Names</h3>
        </div>
      </Link>

      <Link to="/browse">
        <div className="blue-btn h-40 ">
          <h3 className="text-xl mt-14">Find a New Favorite Name</h3>
        </div>
      </Link>
    </div>
  );
}

export default Dashboard;

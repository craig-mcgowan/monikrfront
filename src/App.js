import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import { useEffect, useState, createContext } from "react";
import { Route, Routes, Outlet, useLocation, useNavigate } from "react-router-dom"
import AllFavorites from './pages/AllFavorites';
import Login from './pages/Login';
import Home from './pages/Home';
import SingleFavorite from './pages/SingleFavorite';
import Register from './pages/Register';
import Browse from './pages/Browse';
import Dashboard from './pages/Dashboard';

/*----------------------------------
   Global Context
----------------------------------*/
export const GlobalCtx = createContext(null)

/*----------------------------------
   Variables
----------------------------------*/

function App() {
/*----------------------------------
   Global State
----------------------------------*/
  const [gState, setGState] = useState({
    url: "https://cm-ringo-monikr-api.herokuapp.com",
    token: null
  });

  
  //Logged in State
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    console.log("local storage token" + token)
    if (token) setGState({...gState, token: token})
  },[])
  
  return (
    <GlobalCtx.Provider value={{ gState, setGState }}>
      <div className="App">
        <Navbar />
        <main
          className="absolute top-12 h-full w-full"
        >
          <Routes>
            <Route
              path="/"
              element={gState.token ? <Dashboard /> : <Home />}
            />
            <Route
              path="favorite"
              element={
                <>
                  <Outlet />
                </>
              }
            >
              <Route path="" element={<AllFavorites />} />
              <Route path="new" element={<h1>New Form Here</h1>} />
              <Route path=":id" element={<SingleFavorite />} />
            </Route>
            <Route path="browse" element={<Browse />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Register />} />
          </Routes>
        </main>
      </div>
    </GlobalCtx.Provider>
  );
}

export default App;

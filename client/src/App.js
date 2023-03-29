import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams
} from "react-router-dom";
import axios from 'axios';

import Home from './pages/Home';
import Card from './pages/Card';
import Generate from './pages/Generate';
import useDarkMode from './Components/useDarkMode';
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  // - - - VARIABLES - - - - - - - -
  // const baseURL = 'http://localhost:3000/';
  const baseURL = 'https://businesscard-backend.onrender.com/';
  let { cardId } = useParams();

  // - - - STATES - - - - - - - - - -
  const [darkTheme, setDarkTheme] = useDarkMode();

  // - - - USE EFFECT - - - - - - - - 
  useEffect(()=>{
    // this is a simple route just to "wake up" the server (the site I used for deployment takes a while - 30s - for the first call after a period of inactivity
    getAPI();
  }
  ,[]);

  // - - - FUNCTIONS - - - - - - - - 
  const getAPI = () =>{    
    axios.get(baseURL + 'api')
    .then((response)=>console.log(response.data), (err) => console.log(err))
    .catch((error) => console.log(error));
  };

  const handleMode = () => {
    setDarkTheme(!darkTheme)
  };


  // - - - RENDER - - - - - - - - - 
  return (
    <Router>
      <div className='min-h-screen min-w-screen bg-zinc-100 dark:bg-zinc-800 transition-all duration-500 ease-in-out text-zinc-700 dark:text-zinc-200'>
        {/* Topbar/Navbar */}
        <nav className='fixed top-0 bg-zinc-100 dark:bg-zinc-800 w-full h-16 items-center flex justify-between px-8 md:px-4 border-b-red-400 dark:border-b-red-500 border-b-4 border-double shadow-2xl shadow-zinc-200 dark:shadow-zinc-700'>
          <Link to='/' className='bg-zinc-200 dark:bg-zinc-600 px-2 py-1 rounded-md hover:animate-ping'> 
            <i className="fa-solid fa-qrcode text-2xl sm:text-xl"></i>
          </Link>
          <h1 className='text-2xl sm:text-xl flex-1 text-center'>Business Card QR Coder</h1>
          <div onClick={handleMode} className='text-center cursor-pointer'>
            <i className={"fa-solid "+(darkTheme?"fa-moon":"fa-sun")+' text-xl sm:text-lg w-8 h-auto transition-all duration-500 ease-in-out hover:rotate-180'}></i>
          </div>
        </nav>
        {/* Always Scroll to the Top when changing urls */}
        <ScrollToTop />
        {/* Differente paths */}
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/generate" element={<Generate/>} />
            <Route exact path="/businessCard/:cardId" element={<Card cardId={cardId}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

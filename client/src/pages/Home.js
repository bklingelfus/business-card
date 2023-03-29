import { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import axios from 'axios';
import pile from '../Images/pile.png';
import cell from '../Images/cell.png';
import options from '../Images/options.png';

const Home =(props)=>{
    // - - - VARIABLES - - - - - - - -
        // const baseURL = 'http://localhost:3000/';
        const baseURL = 'https://businesscard-backend.onrender.com/';
        
    // - - - STATES - - - - - - - - - -

    // - - - USE EFFECT - - - - - - - - 

    // - - - FUNCTIONS - - - - - - - - 

    // - - - RENDER - - - - - - - - - -
    return (
        <div className='text-center pt-28 pb-5 text-2xl md:text-xl sm:text-lg'>
            <div className='flex sm:flex-col items-center justify-around mb-10'>
                <img src={pile} alt='home-image' className='h-auto w-1/3 sm:w-2/3 max-w-md'></img>
                <p className='w-1/3 sm:w-2/3 sm:my-5'>Cras accumsan <span className='text-red-500 font-bold mt-10 mb-20'>sollicitudin</span> pretium. Donec eu scelerisque ligula. Sed eget ultrices quam. </p>
            </div>
            <div className='flex sm:flex-col-reverse items-center justify-around my-10'>
                <p className='w-1/3 sm:w-2/3 sm:my-5'>Proin placerat aliquam neque ut eleifend. Aenean accumsan arcu eu tristique aliquet. Suspendisse lobortis diam vitae nibh posuere posuere. Suspendisse nisi quam, rhoncus ut rutrum eu, congue quis odio.</p>
                <img src={cell} alt='home-image' className='h-auto w-1/2 sm:w-2/3 max-w-md'></img>
            </div>
            <Link to='/generate' className='bg-red-500 text-zinc-50 font-bold text-3xl px-4 py-2 shadow-md shadow-zinc-500 hover:bg-red-700'> Get Started! </Link>
            <img src={options} alt='home-image' className='h-auto w-1/2 sm:w-2/3 max-w-xl md:max-w-md mx-auto mt-8'></img>
        </div>
    );
}

export default Home;
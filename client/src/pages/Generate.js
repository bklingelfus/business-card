import { useState, useEffect, useRef } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import axios from 'axios';
import { QRCodeCanvas } from "qrcode.react";
import * as htmlToImage from 'html-to-image';
import html2canvas from "html2canvas";

const Generate =(props)=>{
    // - - - STATES - - - - - - - - - -
    const [card, setCard] = useState({
        _id: 0,
        name: '',
        photo: '',
        profession: '',
        github: '',
        linkedin: '',
    })
        // giving an error when the form is incomplete
    const [error, setError] = useState(0);
        // loading screen when performing actions
    const [loading, setLoading] = useState(false);
    
    // - - - VARIABLES - - - - - - - -
    // const baseURL = 'http://localhost:3000/';
    const baseURL = 'https://businesscard-backend.onrender.com/';
    const navigate = useNavigate();

    const qrcode = (
        <QRCodeCanvas
        id="qrCode"
        value={'https://businesscard-qr-coder.netlify.app/businessCard/'+card._id}
        // value={'http://localhost:3000/businessCard/'+card._id}
        size={250}
        bgColor={"#ffffff"}
        level={"H"}
        className='mx-auto'
        />
    );
    const domEl = useRef();

    // - - - USE EFFECT - - - - - - - -   
        // removing load screen after data has been fetched (aka card info has changed)
    useEffect(()=>{
        setLoading(false)
    },[card])

        // removing error from screen after notification
    useEffect(() => {
        const timer = setTimeout(() => {
            setError(0);
        }, 3000)

        return () => clearTimeout(timer)
    }, [error])

    // - - - FUNCTIONS - - - - - - - - 
        // 
    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        // getting new info card from form
        let newCard = {
            name: event.target[0].value,
            profession:  event.target[1].value,
            photo:  (event.target[2].value.length<1?event.target[2].placeholder:event.target[2].value),
            github:  (event.target[3].value.length<1?event.target[3].placeholder:event.target[3].value),
            linkedin:  (event.target[4].value.length<1?event.target[4].placeholder:event.target[4].value),
        }
        // checking if required fields have been filled for generating card
        if (newCard.name.length <1 && newCard.profession.length <1) {
            setError(1)
            setLoading(false)
        } else {
            createCard(newCard);
        }
    }
        // transforming to element section to image
    const exportAsImage = async (element, imageFileName) => {
        const canvas = await html2canvas(element);
        const image = canvas.toDataURL("image/png", 1.0);
        downloadImage(image, imageFileName);
    };
        // downloading QR code image
    const downloadImage = (blob, fileName) => {
        const fakeLink = window.document.createElement("a");
        fakeLink.style = "display:none;";
        fakeLink.download = fileName;
        
        fakeLink.href = blob;
        
        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);
        
        fakeLink.remove();
    };

    // - - - AXIOS FUNCTIONS - - - - -
    const createCard = (body) =>{    
        axios.post(baseURL + 'card/generate', body)
        .then((response)=>setCard(response.data), (err) => console.log(err))
        .catch((error) => console.log(error));
    };

    // - - - RENDER - - - - - - - - - 
    return (
        <div className='flex md:flex-col justify-around pt-28 pb-12 w-full h-full text-center'>
            {/* load screen */}
            <div className={(loading?'':'hidden')+' fixed top-0 z-10 modal h-screen w-screen'}>
                <div className="loader mx-auto mt-[30%]"></div>
            </div>
            {/* error pop up */}
            <h1 className={((error===0)?'opacity-0':'opacity-100')+' fixed top-[15%] left-[calc((100%-600px)/2)] w-[600px]  md:left-[calc((100%-320px)/2)] md:w-80 text-center rounded py-4 md:py-2 text-xl bg-stone-800 text-stone-400 dark:bg-stone-400 dark:text-stone-800 transition-all duration-300 ease-in-out'}>The <span className='underline'> Name</span> and <span className='underline'>Job Tile</span> fields are mandatory!</h1>
            {/* creation form */}
            <div className='mx-auto w-1/2 max-w-[600px] md:w-full'>
                <h1 className='text-3xl font-bold'>Build Your Card!</h1>
                <form onSubmit={handleSubmit} className='w-full'>    
                    <div className={'field-container'+((error===1?' border-red-500 border-2':''))}>
                        <label className='form-label' htmlFor="Name">Name:</label>
                        <input className='form-input' type='text' name="name" placeholder='John'/>
                    </div>
                    <div className={'field-container'+((error===1?' border-red-500 border-2':''))}>
                        <label className='form-label' htmlFor="Profession">Job Title:</label>
                        <input className='form-input' type='text' name="profession" placeholder='Software Engineer'/>
                    </div>
                    <div className='field-container'>                        
                        <label className='form-label' htmlFor="Photo">Photo:</label>
                        <input className='form-input' type='text' name="photo" placeholder='https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg'/>
                    </div>
                    <div className='field-container'>
                        <label className='form-label' htmlFor="Github">Github:</label>
                        <input className='form-input' type='text' name="github" placeholder='https://github.com/'/>
                    </div>
                    <div className='field-container'>
                        <label className='form-label' htmlFor="linkedin">LinkedIn:</label>
                        <input className='form-input' type='text' name="linkedin" placeholder="https://www.linkedin.com/in/"/>
                    </div>
                    <div className='field-container'>
                        <input className='form-button' type='submit' value="Generate QR Code"/>
                    </div>   
                </form>  
            </div> 
            {/* QR code image preview / download / see page */}
            <div className='mx-auto bg-zinc-200 dark:bg-zinc-700 sm:w-11/12 px-10 sm:px-5 py-5 rounded-2xl'>
                <h1 className='text-lg mb-5 '>Image Template Preview</h1>
                <div id="domEl" ref={domEl} className='my-5'>
                    <h1 className='mt-5 mb-20 text-3xl'>{card.name}</h1>
                    <h2 className='mb-5 text-3xl'>Scan Me</h2>
                    <div className=''>
                        {qrcode}
                    </div>
                </div>
                <Link to={'/businessCard/'+card._id} className='text-red-500 dark:text-red-400 hover:text-red-700 underline text-xl'> See Card </Link>
                <br/>
                <button className='bg-red-500 text-zinc-50 font-bold text-2xl px-4 py-2 my-5 rounded-md shadow-md shadow-zinc-500 hover:bg-red-700 hover:scale-110 transition-all duration-500 ease-in-out ' onClick={() => exportAsImage(domEl.current, "Business-Card")}>Download as Image</button>
            </div>  
        </div>
    );
}

export default Generate;
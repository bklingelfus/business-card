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

const Card =(props)=>{
    // - - - VARIABLES - - - - - - - -
    // const baseURL = 'http://localhost:3000/';
    const baseURL = 'https://businesscard-backend.onrender.com/';

    let { cardId } = useParams();

    // - - - STATES - - - - - - - - - -
    const [card, setCard] = useState({
        _id: 0,
        name: '',
        photo: '',
        profession: '',
        github: '',
        linkedin: '',
    })
    // loading state while getting data
    const [loading, setLoading] = useState(true);

    // - - - USE EFFECT - - - - - - - - 
    useEffect(()=>{
        getCard(cardId);
        setLoading(false);
    }
    ,[]);

    // - - - FUNCTIONS - - - - - - - - 
    const getCard = (cardId) =>{    
        axios.get(baseURL + 'card/'+ cardId)
        .then((response)=>setCard(response.data[0]), (err) => console.log(err))
        .catch((error) => console.log(error));
    };
        // simple check for using appropriate article for job title
    const checkVowel =(letter)=> {
        let vowel = letter.toLowerCase();
        if (vowel==='a' ||vowel==='e' ||vowel==='i' ||vowel==='o' ||vowel==='u') {
            return true
        } else {
            return false
        }
    };

    // - - - RENDER - - - - - - - - - 
    return (
        <div className='pt-28 pb-12 w-full h-full text-center flex flex-col items-center'>
            <div className={(loading?'':'hidden')+' fixed top-0 z-10 modal h-screen w-screen'}>
                <div className="loader mx-auto mt-[30%]"></div>
            </div>
            <div className='w-full max-w-[900px] flex justify-around items-center sm:flex-col'>
                <div>
                    <h1 className='text-5xl text-left sm:text-center leading-[60px]'>Hello, my name is <span className='border-b-[3px] border-double border-b-zinc-700 dark:border-b-zinc-200'>{card.name}</span> </h1>
                    <h3 className='text-3xl text-left sm:text-center mt-3 sm:mt-3 sm:mb-7'>I am {(checkVowel(card.profession)?'an ':'a ')+ card.profession}</h3>
                </div>
                <img src={card.photo} alt='Profile Photo' className='w-36 h-36 object-cover rounded-md sm:mx-auto'></img>
            </div>
            <div className='w-full max-w-[900px] mt-10 pb-20 px-20 sm:px-8'>
                <h3 className='text-left text-2xl italic font-bold mt-10 mb-5'>My History</h3>
                <p className='text-lg text-justify'>Proin nec sapien ac libero elementum accumsan. Aenean ultricies, erat at tempor blandit, augue nisl fringilla ipsum, eget tempus odio velit nec quam. In sagittis velit quis ipsum molestie, eu hendrerit arcu bibendum. Ut ut placerat erat, vel blandit augue. Vivamus non pharetra augue. Aliquam fermentum enim quis metus suscipit, eu lacinia tortor feugiat. Sed non magna lectus. Duis eget purus eu massa bibendum ultrices.</p>
                <h3 className='text-left text-2xl italic font-bold mt-10 mb-5'>Experience</h3>
                <p className='text-lg text-justify'>Duis ac suscipit augue. Mauris viverra ligula venenatis tincidunt euismod. Integer sollicitudin in nisi sit amet eleifend. Integer et est mauris. Nunc consectetur venenatis sollicitudin. Etiam pulvinar pharetra neque, eleifend lobortis lorem dapibus nec. Nam sodales vel tellus in lacinia. Etiam dictum ex at posuere finibus. Suspendisse rutrum nisi sit amet finibus hendrerit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris vel volutpat risus. Donec dictum gravida metus.</p>
            </div>
            <div className='fixed top-[calc((100%-60px))] h-[60px] bg-zinc-100 dark:bg-zinc-800 w-full shadow-2xl shadow-zinc-800 dark:shadow-zinc-200 text-center'>
                <div className='h-full w-full max-w-[900px] mx-auto flex justify-around items-center'>
                    <a href={card.github} target='_blank' className='card-link-button'>Github</a>
                    <a href={card.linkedin} target='_blank' className='card-link-button'>LinkedIn</a>
                </div>
            </div>
        </div>
    );
}

export default Card;
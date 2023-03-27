import { useState, useEffect } from 'react'
import axios from 'axios';

function App() {
  // - - - VARIABLES - - - - - - - -
  const baseURL = 'http://localhost:3000/';
  // const baseURL = 'http://localhost:3000/';

  // - - - STATES - - - - - - - - - -
  const [string, setString] = useState();

  // - - - USE EFFECT - - - - - - - - 
  useEffect(()=>{
    getAPI();
  }
  ,[]);

  // - - - FUNCTIONS - - - - - - - - 
  const getAPI = () =>{    
    axios.get(baseURL + 'api')
    .then((response)=>setString(response.data.text), (err) => console.log(err))
    .catch((error) => console.log(error));
  };


  // - - - RENDER - - - - - - - - - 
  return (
    <div className="App">
      <h1>{string}</h1>
    </div>
  );
}

export default App;

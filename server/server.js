const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const cors = require('cors');
const app = express ();
const db = mongoose.connection;
const Card = require('./models/card.js');
require('dotenv').config()

// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
mongoose.connect(MONGODB_URI);
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));


// ----------------------------------
// - - - MIDDLEWARE - - - - - - - - - 
// ----------------------------------

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

app.use(cors());

// ----------------------------------
// - - - VARIABLES - - - - - - - - - 
// ----------------------------------
async function getCards(id){
    let Cards = {};
    if (id===null){
        Cards = await Card.find();

    } else {
        Cards = await Card.find({_id:id});

    }
    return Cards;
}

async function createCard(body){
    let card = await Card.create(body);
    return card;
}

// ----------------------------------
// - - - ROUTES - - - - - - - - - - - 
// ----------------------------------
//localhost:3000
app.get('/api' , (req, res) => {
    res.json({
    test: 'whatever'
    })
});
// Get All Cards
app.get('/card/all', (req, res)=>{
    getCards(null).then(function(FoundItems){
    
        res.json(FoundItems);
    
    });
});
// Get Specific Card
app.get('/card/:id', (req, res)=>{
    getCards(req.params.id).then(function(FoundItems){
    
        res.json(FoundItems);
    
    });
});
// Create Card
app.post('/generate', (req, res)=>{    
    createCard(req.body).then(function(newCard){
    
        res.json(newCard);
    
    });
});

// ----------------------------------
// - - - LISTENER - - - - - - - - - - 
// ----------------------------------

app.listen(PORT, () => console.log( 'Listening on port:', PORT));
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema ({
    name: {type: String, required:true},
    photo: String,
    profession: {type: String, required:true},
    github: String,
    linkedin: String,
});

const Card =mongoose.model('Card', cardSchema);
module.exports = Card;
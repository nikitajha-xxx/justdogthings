var mongoose = require("mongoose");

//SCHEMA SETUP
var dogSchema = new mongoose.Schema({
    name: String,
    image: String,
    caption: String
});

module.exports = mongoose.model("Dog", dogSchema);
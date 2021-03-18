var mongoose = require("mongoose");

//SCHEMA SETUP
var dogSchema = new mongoose.Schema({
    name: String,
    image: String,
    caption: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
    
});

module.exports = mongoose.model("Dog", dogSchema);
var mongoose = require("mongoose");

//SCHEMA SETUP
var dogSchema = new mongoose.Schema({
    title: String,
    image: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    caption: String,

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
    
});

module.exports = mongoose.model("Dog", dogSchema);
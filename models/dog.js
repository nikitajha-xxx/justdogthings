var mongoose = require("mongoose");

//SCHEMA SETUP
var dogSchema = new mongoose.Schema({
    title: String,
    image:
    {
        data: Buffer,
        contentType: String
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    caption: String,
    createdAt: { type: Date, default: Date.now },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
    
});

module.exports = mongoose.model("Dog", dogSchema);
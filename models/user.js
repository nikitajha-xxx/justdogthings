var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    joinedOn: { type: Date, default: Date.now },
    age: Number,
    location: String,
    about: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
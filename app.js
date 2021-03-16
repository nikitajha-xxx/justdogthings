var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/dogs", function(req, res){
    var dogs = [
        {name: "HunnyBun", image: ""},
        {name: "Susie", image: ""},
        {name: "Tommy", image: ""},

    ]
    res.send("This works");
});

var listener = app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Listening on port ' + listener.address().port);
});
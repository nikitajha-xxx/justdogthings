var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/dogs", function(req, res){
    var dogs = [
        {name: "HunnyBun", image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"},
        {name: "Susie", image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"},
        {name: "Tommy", image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"}

    ]
    res.render("dogs");
});

var listener = app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Listening on port ' + listener.address().port);
});
var express = require('express');
var app = express();

app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));
app.set("view engine", "ejs");

var dogs = [
    {name: "HunnyBun", image: "https://images.unsplash.com/photo-1546421845-6471bdcf3edf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nc3xlbnwwfDB8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"},
    {name: "Susie", image: "https://images.unsplash.com/photo-1546975490-e8b92a360b24?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGRvZ3N8ZW58MHwwfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"},
    {name: "Tommy", image: "https://images.unsplash.com/photo-1517443191895-202c31142ccd?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjR8fGRvZ3N8ZW58MHwwfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"}

]

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/dogs", function(req, res){
    res.render("dogs", {dogs: dogs});
});

app.post("/dogs", function(req, res){  //here we send a post request to create a dog post
    // get data from form and add it to the dogs array
    var name = req.body.name;
    var image = req.body.image;
    var newDog = {name: name, image: image};
    dogs.push(newDog);
    // redirect to the dogs page
    res.redirect("/dogs"); 

});

app.get("/dogs/new", function(req, res){
    res.render("new");
});


var listener = app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Listening on port ' + listener.address().port);
});


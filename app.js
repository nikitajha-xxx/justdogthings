var express     = require('express'),
    app         = express(),
    mongoose    = require("mongoose")


mongoose.connect("mongodb://localhost:27017/dog_blog", {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Connected"))
.catch(err => console.log(err));
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));
app.set("view engine", "ejs");

//SCHEMA SETUP
var dogSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Dog = mongoose.model("Dog", dogSchema);

// Dog.create({
//     name: "Susie", 
//     image: "https://images.unsplash.com/photo-1546975490-e8b92a360b24?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGRvZ3N8ZW58MHwwfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
// }, function(err, dog){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Newly created dog post");
//         console.log(dog);
//     }
// });




var dogs = [
    {name: "HunnyBun", image: "https://images.unsplash.com/photo-1546421845-6471bdcf3edf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nc3xlbnwwfDB8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"},
    {name: "Susie", image: "https://images.unsplash.com/photo-1546975490-e8b92a360b24?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGRvZ3N8ZW58MHwwfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"},
    {name: "Tommy", image: "https://images.unsplash.com/photo-1517443191895-202c31142ccd?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjR8fGRvZ3N8ZW58MHwwfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"}

]

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/dogs", function(req, res){
    //get all dog posts from DB
    Dog.find({}, function(err, alldogs){
        if(err){
            console.log(err);
        }
        else{
            res.render("dogs", {dogs: alldogs});
        }
    });
});

app.post("/dogs", function(req, res){  //here we send a post request to create a dog post
    // get data from form and add it to the dogs array
    var name = req.body.name;
    var image = req.body.image;
    var newDog = {name: name, image: image};
    // create a new dog post and save to db
    Dog.create(newDog, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            // redirect to the dogs page
            res.redirect("/dogs"); 
        }
    });
});

app.get("/dogs/new", function(req, res){
    res.render("new");
});


var listener = app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Listening on port ' + listener.address().port);
});


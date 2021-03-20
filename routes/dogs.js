var express = require("express");
var router = express.Router();
var Dog = require("../models/dog");

//INDEX - SHOW ALL DOG POSTS
router.get("/", function(req, res){
    //get all dog posts from DB
    Dog.find({}, function(err, alldogs){
        if(err){
            console.log(err);
        }
        else{
            res.render("dogs/index", {dogs: alldogs}); 
        }
    });
});

//CREATE - ADD NEW DOG TO DB
router.post("/", function(req, res){  //here we send a post request to create a dog post
    // get data from form and add it to the dogs array
    var name = req.body.name;
    var image = req.body.image;
    var title = req.body.title;
    var caption = req.body.caption;
    var newDog = {name: name, image: image, title: title, caption: caption};
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

//NEW - SHOW FORM TO CREATE NEW DOG POST
router.get("/new", function(req, res){
    res.render("dogs/new");
});

//SHOW - shows more info about one dog
router.get("/:id", function(req, res){
    //find the dog with provided ID
    Dog.findById(req.params.id).populate("comments").exec(function(err, foundDog){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundDog);
            //render show template with that dog
            res.render("dogs/show", {dog: foundDog});
        }
    });
    
});

module.exports = router;
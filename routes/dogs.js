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
router.post("/", isLoggedIn, function(req, res){  //here we send a post request to create a dog post
    // get data from form and add it to the dogs array
    var image = req.body.image;
    var title = req.body.title;
    var caption = req.body.caption;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newDog = {image: image, title: title, caption: caption, author: author};
    // create a new dog post and save to db
    Dog.create(newDog, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            // redirect to the dogs page
            console.log(newlyCreated.author.username);
            res.redirect("/dogs"); 
        }
    });
});

//NEW - SHOW FORM TO CREATE NEW DOG POST
router.get("/new", isLoggedIn, function(req, res){
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

//EDIT DOG ROUTE
router.get("/:id/edit", function(req, res){
    Dog.findById(req.params.id, function(err, foundDog){
        if(err){
            console.log(err);
            res.redirect("/dogs");
        } else{
            res.render("dogs/edit", {dog: foundDog});
        }
    });
});



//UPDATE DOG ROUTE
router.put("/:id", function(req, res){
    //find and update the correct dog
    Dog.findByIdAndUpdate(req.params.id, req.body.dog, function(err, updatedDog){
        if(err){
            res.redirect("/dogs");
        } else{
            res.redirect("/dogs/" + req.params.id);
        }
    });
    //redirect somewhere
});

//DESTROY DOG ROUTE
router.delete("/:id", function(req, res){
    Dog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/dogs");
        }
        else{
            res.redirect("/dogs");
        }
    });
});


//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
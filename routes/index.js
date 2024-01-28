var express = require("express");
var router = express.Router();
var passport = require("passport");
const dog = require("../models/dog");
var User = require("../models/user");
var Dog = require("../models/dog");
var middleware = require("../middleware");


router.get("/", function(req, res){
    res.render("landing");
});

// =============
//AUTH Routes
// =============
// shows register page
router.get("/register", function(req, res){
    res.render("register");
});

//handle register logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, 
                            age: req.body.age,
                            location: req.body.location,
                            about: req.body.about
                        });
    
    User.register(newUser, req.body.password, function(err, user){  //User.register is provided by passport local mongoose package
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Dog Blog :) " + user.username);
            res.redirect("/dogs")
        });
    }); 
});

//Show login form
router.get("/login", function(req, res){
    res.render("login");
});

//handle login logic
router.post("/login", passport.authenticate("local",     //passport.authenticate here is a middleware which means
                                                      //after post request to login it will authenticate if the user exists
                                                      //in the db later it is given to callback handler                                                  
    {
        successRedirect: "/dogs", 
        failureRedirect: "/login"
    }), function(req, res){
});

//logout route
router.get("/logout", function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash("success", "logged you out");
        res.redirect('/');
    });     
});

router.get("/users/:user_id", middleware.isLoggedIn, function(req, res){ 
    User.findById(req.params.user_id, function(err, foundUser){
        if(err){
            console.log(err);
        }
        else{
            Dog.find().where("author.id").equals(foundUser._id).exec(function(err, dogs) {
                if(err){
                    console.log(err);
                }
                else{
                    var i = 0;
                    dogs.forEach(function(dog){
                        i = i + 1;
                    });
                    console.log(foundUser);
                    console.log(i);
                    res.render("users/profile", {user: foundUser, dogs: dogs, count: i})
                }
            });
        }
    });
});

router.get("/about", function(req, res){
    res.render("about");
});

router.get("/contact", function(req, res){
    res.render("contact");
});

router.post("/contact", function(req, res){
    req.flash("success", "Thankyou for reaching out to us!!! We will surely get back to you with an answer.");
    res.redirect("/contact");
});

router.get("/users/:user_id/edit", middleware.checkUserOwnership, function(req, res){
    User.findById(req.params.user_id, function(err, foundUser){
            res.render("users/edit", {user: foundUser});
    });
});

router.put("/users/:user_id", middleware.checkUserOwnership, function(req, res){
    //find and update the correct dog
    User.findByIdAndUpdate(req.params.user_id, req.body.user, function(err, updatedUser){
        if(err){
            console.log(err);
        } else{
            console.log(updatedUser);
            Dog.find().where("author.id").equals(updatedUser._id).exec(function(err, dogs) {
                if(err){
                    console.log(err);
                }
                else{
                    console.log("This works");
                    dogs.forEach(function(dog){
                        dog.author.username= updatedUser.username;
                        dog.save();
                    })
                    
                }
            });

            req.flash("success", "Successfully updated your profile");
            res.redirect("/users/" + req.params.user_id);
        }
    });
    //redirect somewhere
});

module.exports = router;

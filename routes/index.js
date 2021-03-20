var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


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
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){  //User.register is provided by passport local mongoose package
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
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
    req.logout(); //this logout function comes from the packages
    res.redirect("/dogs")     
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;

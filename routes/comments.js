var express = require("express");
var router = express.Router({mergeParams: true}); 
//You must pass {mergeParams: true} to the child router if you want to access the params from the parent router.
//here the parent router is /dogs and child router is /comments
var Dog = require("../models/dog");
var Comment = require("../models/comment");

// ===================
// COMMENT ROUTES
// ===================

//comment form
router.get("/new", isLoggedIn, function(req, res){
    //find dog by id
    Dog.findById(req.params.id, function(err, dog){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {dog: dog});
        }
    });
    
});

//create comments
router.post("/", isLoggedIn, function(req, res){
    Dog.findById(req.params.id, function(err, dog){
        if(err){
            console.log(err);
            res.redirect("/dogs");
        }
        else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }
                else{
                    dog.comments.push(comment);
                    dog.save();
                    res.redirect("/dogs/" + dog._id);
                }
            });
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

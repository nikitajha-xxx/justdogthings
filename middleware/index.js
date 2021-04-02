//all the middleware goes here
var Dog = require("../models/dog");
var Comment = require("../models/comment");
const user = require("../models/user");
var middlewareObj = {};

middlewareObj.checkDogOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Dog.findById(req.params.id, function(err, foundDog){
            if(err){
                req.flash("error", "Dog not found");
                res.redirect("back");
            } else{
                //does user own the dog post
                if(foundDog.author.id.equals(req.user._id)){
                    next();
                } else{
                    req.flash("error", "You don't have the permission to do that!");
                    res.redirect("back");
                }
                
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else{
                //does user own the comment
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else{
                    req.flash("error", "You don't have the permission to do that!");
                    res.redirect("back");
                }
                
            }
        });
    }else{
        req.flash("error", "You need to be logged in that!");
        res.redirect("back");
    }
}

middlewareObj.checkUserOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        user.findById(req.params.user_id, function(err, foundUser){
            if(err){
                res.redirect("back");
            } else{
                //does user own the comment
                if(foundUser._id.equals(req.user._id)){
                    next();
                } else{
                    req.flash("error", "You don't have the permission to do that!");
                    res.redirect("/users/" + foundUser._id);
                }
                
            }
        });
    }else{
        req.flash("error", "You need to be logged in that!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}
    
module.exports = middlewareObj;
//all the middleware goes here
var Dog = require("../models/dog");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkDogOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Dog.findById(req.params.id, function(err, foundDog){
            if(err){
                res.redirect("back");
            } else{
                //does user own the dog post
                if(foundDog.author.id.equals(req.user._id)){
                    next();
                } else{
                    res.redirect("back");
                }
                
            }
        });
    }else{
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
                    res.redirect("back");
                }
                
            }
        });
    }else{
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
    
module.exports = middlewareObj
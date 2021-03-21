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
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    dog.comments.push(comment);
                    dog.save();
                    res.redirect("/dogs/" + dog._id);
                }
            });
        }
    });
});

//EDIT ROUTE
router.get("/:comment_id/edit", checkCommentOwnership , function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {dog_id: req.params.id, comment: foundComment});
        }
    });
    
});

//Update Comment
router.put("/:comment_id", checkCommentOwnership, function(req, res){
       //find and update the correct Comment
       Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/dogs/" + req.params.id);
        }
    });
    //redirect somewhere
});

//Comment Destroy Route
router.delete("/:comment_id", checkCommentOwnership,function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/dogs/" + req.params.id);
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

function checkCommentOwnership(req, res, next){
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


module.exports = router;

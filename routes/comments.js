var express = require("express");
var router = express.Router({mergeParams: true}); 
//You must pass {mergeParams: true} to the child router if you want to access the params from the parent router.
//here the parent router is /dogs and child router is /comments
var Dog = require("../models/dog");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// ===================
// COMMENT ROUTES
// ===================

//comment form
router.get("/new", middleware.isLoggedIn, function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
    Dog.findById(req.params.id, function(err, dog){
        if(err){
            console.log(err);
            res.redirect("/dogs");
        }
        else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("Error", "SOmething went wrong!");
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
                    req.flash("success", "Successfully added comment!");
                    res.redirect("/dogs/" + dog._id);
                }
            });
        }
    });
});

//EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership , function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {dog_id: req.params.id, comment: foundComment});
        }
    });
    
});

//Update Comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
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
router.delete("/:comment_id", middleware.checkCommentOwnership,function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else{
            req.flash("success", "Comment deleted");
            res.redirect("/dogs/" + req.params.id);
        }
        
    });
});

module.exports = router;

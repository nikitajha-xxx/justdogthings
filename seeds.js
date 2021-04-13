var mongoose = require("mongoose");
var Dog = require("./models/dog");
var Comment = require("./models/comment");
var User = require("./models/user");

var data = [
    {
        name: "HunnyBun", 
        image:"https://images.unsplash.com/photo-1546421845-6471bdcf3edf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nc3xlbnwwfDB8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        title: "A stroll at the park",
        caption: "Me and Saggy love to stroll around Greenville on a nice sunny Sunday afternoon. P.S. We have the most cool sunglasses"
    },
    {
        name: "Susie", 
        image: "https://images.unsplash.com/photo-1546975490-e8b92a360b24?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGRvZ3N8ZW58MHwwfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        title: "My New Happy Place",
        caption: "So happy today... Daddy made this white hut for me and I absolutely loved it:) Also thanks daddy for making this so comfortable and warm even from the inside..Luckiest Daughter:)"
    },
    {
        name: "Tommy", 
        image: "https://images.unsplash.com/photo-1517443191895-202c31142ccd?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjR8fGRvZ3N8ZW58MHwwfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        title: "My Brother Sam",
        caption: "Always have the best time with my broda Sam...."
    }
    
]

function seedDB(){
    // var id = "60733982dd4c47001524ffc3";
    // User.findByIdAndDelete(id, function(err, docs){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log("deleted ", docs);
    //     }
    // });
    //Remove all Dog Posts
    // User.deleteMany({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log("removed user");
        // add a few dog posts
        // data.forEach(function(seed){
        //     Dog.create(seed, function(err, dog){
        //         if(err){
        //             console.log(err);
        //         }
        //         else{
        //             console.log("added a dog");
        //             //create a comment
        //             Comment.create({
        //                 text: "So happy today... Daddy made this white hut for me and I absolutely loved it:) Also thanks daddy for making this so comfortable and warm even from the inside..Luckiest Daughter:)",
        //                 author: "Hermoine"
        //             }, function(err, comment){
        //                 if(err){
        //                     console.log(err);
        //                 }
        //                 else{
        //                     dog.comments.push(comment);
        //                     dog.save();
        //                     console.log("created a new comment");
        //                 }
        //             });
        //         }
        //     });
        // });
    // });
//     Dog.deleteMany({}, function(err){
//         if(err){
//             console.log(err)
//         }
//         else{
//             console.log("remove dog");
//         }
//     });
//     Comment.deleteMany({}, function(err){
//         if(err){
//             console.log(err)
//         }
//         else{
//             console.log("remove comment");
//         }
//     })
}

module.exports = seedDB;


var express     = require('express'),
    app         = express(),
    mongoose    = require("mongoose"),
    Dog         = require("./models/dog"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds")


mongoose.connect("mongodb://localhost:27017/dog_blog", {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Connected"))
.catch(err => console.log(err));
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - SHOW ALL DOG POSTS
app.get("/dogs", function(req, res){
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
app.post("/dogs", function(req, res){  //here we send a post request to create a dog post
    // get data from form and add it to the dogs array
    var name = req.body.name;
    var image = req.body.image;
    var caption = req.body.caption;
    var newDog = {name: name, image: image, caption: caption};
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
app.get("/dogs/new", function(req, res){
    res.render("dogs/new");
});

//SHOW - shows more info about one dog
app.get("/dogs/:id", function(req, res){
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

// ===================
// COMMENT ROUTES
// ===================
app.get("/dogs/:id/comments/new", function(req, res){
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

app.post("/dogs/:id/comments", function(req, res){
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
            })

            

        }
    })
});

var listener = app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Listening on port ' + listener.address().port);
});


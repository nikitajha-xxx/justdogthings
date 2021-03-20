var express                 = require('express'),
    app                     = express(),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    Dog                     = require("./models/dog"),
    Comment                 = require("./models/comment"),
    User                    = require("./models/user"),
    seedDB                  = require("./seeds")

//requiring routes
var commentRoutes   = require("./routes/comments"),
    dogRoutes       = require("./routes/dogs"),
    authRoutes      = require("./routes/index")


mongoose.connect("mongodb://localhost:27017/dog_blog", {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Connected"))
.catch(err => console.log(err));

app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// seedDB(); //seed the database

//Passport Configuration
app.use(require("express-session")({
    secret: "This is the best dog site",  //this secret will be use to encode and decode the information in one session
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //encoding the decoded info in session
passport.deserializeUser(User.deserializeUser()); //decoding the encoded info in one session

app.use(function(req, res, next){ //middleware which will run for every single route
    res.locals.currentUser = req.user; //req.user containes info about the current logged in user
    //since we need current user info on every page, we are defining it here so that all routes can use it
    next();
});

app.use("/", authRoutes);
app.use("/dogs/:id/comments",commentRoutes);
app.use("/dogs", dogRoutes);

var listener = app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Listening on port ' + listener.address().port);
});


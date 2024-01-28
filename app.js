if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

var express                 = require('express'),
    app                     = express(),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    flash                   = require("connect-flash"),
    LocalStrategy           = require("passport-local"),
    methodOverride          = require("method-override"),
    Dog                     = require("./models/dog"),
    Comment                 = require("./models/comment"),
    User                    = require("./models/user")  
    // seedDB                  = require("./seeds")

//requiring routes
var commentRoutes   = require("./routes/comments"),
    dogRoutes       = require("./routes/dogs"),
    authRoutes      = require("./routes/index")


// mongoose.connect("mongodb://localhost:27017/dog_blog", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => console.log("Connected"))
// .catch(err => console.log(err));

var db_url =process.env.DB_URL

//the below line returns a promise
mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,useCreateIndex:true}).then(() => console.log("Connected"))
.catch(err => console.log(err));




app.use(express.json({limit: '20mb'})); //for parsing incoming requests with JSON Payload

//we need to tell express explicitly how it should parse request bodies, if we dont by default it will give undefined for req.body
// so we need to tell express to parse form encoded infor from the request body
app.use(express.urlencoded({ extended: true})); //for parsing application/x-www-form-urlencod for incoming request Payload

app.set("view engine", "ejs"); //configure the application to use ejs as its viewing template
app.use(express.static(__dirname + "/public")); //this will load the files inside the public directory everytime a request is made to the express server
app.use(methodOverride("_method")); //Since a browser form does not supports a PUT or PATCH or any other request other than GET and POST request we use method-override package
// seedDB(); //seed the database
app.use(flash());


//Passport Configuration
app.use(require("express-session")({
    secret: "This is the best dog site",  //this secret will be use to encode and decode the information in one session
    resave: false,
    saveUninitialized: false
}));

app.locals.moment = require("moment");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //encoding the decoded info in session
passport.deserializeUser(User.deserializeUser()); //decoding the encoded info in one session

// anytime there is an incoming request on the running port opened by express, app.use function will run
app.use(function(req, res, next){ //middleware which will run for every single route
    res.locals.currentUser = req.user; //req.user containes info about the current logged in user
    //since we need current user info on every page, we are defining it here so that all routes can use it
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", authRoutes);
app.use("/dogs/:id/comments",commentRoutes);
app.use("/dogs", dogRoutes);

//app.listen opens up a port
var listener = app.listen(process.env.PORT, process.env.IP, function(){
    // callback function
    // do something when the server starts
    console.log('Listening on port ' + listener.address().port);
}); 


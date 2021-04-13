# justdogthings

* Add Landing Page
* Add Dogs Page that lists all dogs

Each Dog Post has:
* Name
* Image

# layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

# Creating New Dog Posts
* Setup new dog POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

# Style the dogs page
* Add a better header/title
* Make the dog posts display in a grid

# Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

# Add Mongoose
* Install and configure mongoose
* Setup dog model
* Use dog model inside of our routes!

# Show Page
* Review the RESTful routes 
* Add description to our dog model
* Show db.collection.drop()
* Add a show route/template

RESTful Routes

name        url         verb        desc.
============================================================
INDEX       /dogs       GET         Display a list of all dog post
NEW         /dgs/new    GET         Display a form to make a new dog post
CREATE      /dogs       POST        Add new dog to DB
SHOW        /dogs/:id   get         shows info about one dog

# Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

# Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

# Add the Comment model!
* Make our errors go away!
* Display comments on campground show page

# Comment New/Create
* Discuss nested routes
* Add the comment new and creates routes
* Add the new comment form

# Nested Routes for comments
NEW         dogs/:id/comments/new   GET
CREATE      dogs/:id/comments       POST

# Style show page
* Add sidebar to show page
* Display comments nicely

# Finish Styling Show Page
* Add public directory
* Add a custom stylesheet

# Authentication
 ## Intro to Auth
 * What tools are we using
    * Passport
    * Passport Local
    * Passport Local Mongoose
 * Walk through auth flow
 * Discuss sessions
    * Express-Session

# Add User Model
* Install all packages needed for auth
* define User Model

# Auth - Register
* Configure Passport
* Add register routes
* Add register template

# Auth - Login
* Add login routes
* Add login templates

# Auth - Logout/Navbar
* Add logout route
* Prevent user form adding a comment if not signed in
* Add links to navbar
* Show/hide auth links correctly

# Auth - Show/Hide Links
* Show/hide auth links in navbar correctly

# Refactor the routes
* Use Express router to reorganize all routes

# Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

# Users + Dogs
* Prevent an unauthenticated user from creating a dog
* Save username + id to newly created dog

# Editing Dogs
* Add Method-Override
* Add Edit Route for Dogs
* Add Link to Edit Page
* Add Update Route
* Fix $set problem

name        url               verb        desc.
============================================================
INDEX       /dogs             GET         Display a list of all dog post, Dog.find()
NEW         /dgs/new          GET         Display a form to make a new dog post
CREATE      /dogs             POST        Add new dog to DB, Dog.create()
SHOW        /dogs/:id         GET         shows info about one dog, Dog.findById()
Edit        /dogs/:id/edit    GET         Show edit form for one dog, Dog.findById()
Update      /dogs/:id         PUT         Update particular dog, then redirect somewhere,
                                          Dog.findByIdAndUpdate()
Destroy     /dogs/:id         DELETE      Delete a particular dog, then redirect somewhere,
                                          Dog.findByIdAndRemove()

# Deleting Dogs
* Add Destroy Route
* Add Delete button

# Authorization Part1: Dogs
* User can only edit his/her dog post
* User can only delete his/her dog post
* Hide/Show edit and delete buttons

# Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

# Delete Comments
* Add Destroy route
* Add Delete button

# Authorization Part2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/show edit and delete buttons
* Refactor middleware

Dog Destroy Route: /dogs/:id
Comment Destroy Route: /dogs/:id/comments/:comment_id

# Adding in Flash
* Demo working version
* Install and configure connect-flash
* Add bootstrap alerts to header
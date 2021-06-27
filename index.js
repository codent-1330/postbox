const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');           // DO NOT change order or require statements
require('./services/passport');


const cookieSession = require('cookie-session');
const passport = require('passport');
const connectionString = 'mongo "mongodb+srv://postbox:postbox@postbox.cux3t.mongodb.net/postbox"'
//"mongodb+srv://<username>:<password>@firstcluster.4rc4s.mongodb.net/<dbname>?retryWrites=true&w=majority";

// var User = require("./models/users");
var bodyParser = require("body-parser");
// LocalStrategy = require("passport-local");
try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      connectionString,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );
  
  } catch (e) {
    console.log("could not connect");
  }
//mongoose.connect(keys.mongoDb);




const app = express();

app.use(
  cookieSession({
    maxAge: 60 * 60 * 24 * 30 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

//  ****************************** DOCUMENTATION *************************************
/*
// Step 1: Get access to the Express lib
const express = require('express');
// Get access to Mongoose
const mongoose = require('mongoose');
const keys = require('./config/keys');
// MongoDB URI used to connect driver to MongoDB.  Found on mLab buckshot-dev db
  // replace <dbuser>:<dbpassword> with user and pw
mongoose.connect(keys.mongoDbURI);
// passport.js must be required in order for the code to run. Since it's not
  // returning anything, we don't assignt it to any const, only require
require('./services/passport');


// Step 2: Create an app within node representing a running Express app
const app = express();

// Require statement returns function module.exports from authRoutes that expects
  // app as arg. We immediately invoke the app.get functions with app, instantiated in this file
require('./routes/authRoutes')(app);


// Step 4: Store heroku's unique PORT environment variable to const PORT
  // of if app not deployed (working locally), set PORT to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT);
*/



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// // app.use(require("express-session")({
// //     secret: "Rusty is a dog",
// //     resave: false,
// //     saveUninitialized: false
// // }));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
  res.render("index");
});

// Showing secret page
app.get("/secret", isLoggedIn, function (req, res) {
  res.render("secret");
});

// Showing register form
app.get("/signup", function (req, res) {
  res.render("signup");
});

// Handling user signup
app.post("/signup", function (req, res) {
  var username = req.body.email
  var password = req.body.psw

  new_user = { "username": username, "password": password }
  console.log(new_user)
  console.log(db)
//   dbo.collection("signup").insertOne(new_user, function (res) {
    // if (err) throw err;
    // console.log("1 document inserted");

    User.register(new User({ username: username }),
      password, function (err, user) {
        if (err) {
          console.log(err);
          return res.render("signup");
        }

        passport.authenticate("local")(
          req, res, function () {
            res.render("secret");
          });
      });
  });

  //Showing login form
  app.get("/login", function (req, res) {
    res.render("login");
  });

  //Handling user login
  app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
  }), function (req, res) {
  });

  //Handling user logout
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
  }

  var port = process.env.PORT || 3000;
  app.listen(port, function () {
    console.log("Server Has Started!");
  });
 
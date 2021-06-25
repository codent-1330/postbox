const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');           // DO NOT change order or require statements
require('./services/passport');
const cookieSession = require('cookie-session');
const passport = require('passport');
const connectionString = 'mongo "mongodb+srv://<username>:<password>@postbox.cux3t.mongodb.net/postbox"'
//"mongodb+srv://<username>:<password>@firstcluster.4rc4s.mongodb.net/<dbname>?retryWrites=true&w=majority";

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

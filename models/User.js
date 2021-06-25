const mongoose = require('mongoose');
// The two lines of code below are identical.  We are using the destructured version
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String
});

// when mongoose.model is called with 2 args, we are creating a model/schema
mongoose.model('users', userSchema);

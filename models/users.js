const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);

// var mongoose = require('mongoose');
// // var bcrypt = require('bcrypt-nodejs');

// var UserSchema = mongoose.Schema({
//     email: {
//         type: String,
//         unique: true
//     },
//     password: String,
// });

// UserSchema.statics.createDefaultUsers = function createDefaultUsers(cb) {
//     return User.find({}).exec(function (err, collection) {
//         if (collection.length === 0) {
//             User.create({
//                 email: 'name@eemail.com',
//                 password: 'password0',
//             }, cb);
//         } else {
//             if (cb) {
//                 cb(err, collection);
//             }
//         }
//     });
// };

// var User = mongoose.model('User', UserSchema);
// module.exports = User;
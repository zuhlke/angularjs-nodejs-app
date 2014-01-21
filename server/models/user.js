'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(passportLocalMongoose) {

  var UserSchema = new Schema({

  name: String,

  username: {
    type: String,
    unique: true
  },

  email: String,

  salt: String,

  hashed_password: String,

  created : {
    type : Date,
    default : Date.now
  }

  });

  /**
  * Finds users by their email address
  * @param email
  * @returns {Promise|User}
  */
  UserSchema.statics.findByEmail = function(email) {
    return this.findOne({email: email}).exec();
  }

  // Enhance our schema with the passport functions for authenticating
  UserSchema.plugin(passportLocalMongoose);

  mongoose.model('User', UserSchema);
}

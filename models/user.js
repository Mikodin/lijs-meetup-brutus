const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Must use normal callback to not lose 'this'
UserSchema.pre('save', function (next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (saltErr, salt) => {
      if (saltErr) return next(saltErr);
      bcrypt.hash(user.password, salt, (hashErr, hash) => {
        if (hashErr) return next(hashErr);
        user.password = hash;
        next();
      });
    });
  }
});

UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
    return true;
  });
};

module.exports = mongoose.model('User', UserSchema);

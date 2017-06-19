const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
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
    bcrypt.genSalt(10)
      .then((salt) => {
        bcrypt.hash(user.password, salt)
          .then((hash) => {
            user.password = hash;
            next();
          })
          .catch(hashErr => next(hashErr));
      })
      .catch(saltErr => next(saltErr));
  }
});

UserSchema.methods.isProperPassword = function (clientPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(clientPassword, this.password)
      .then((res) => {
        resolve(res);
      })
      .catch((compareError) => {
        console.error(compareError);
        console.error('Error in bcryptCompare');
        reject(compareError);
      });
  });
};

module.exports = mongoose.model('User', UserSchema);

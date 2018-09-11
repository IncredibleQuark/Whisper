const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
// User Schema
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  rank: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.getUserById = (id, callback) => {
  User.findById(mongoose.Types.ObjectId(id), callback)
};

module.exports.getUserByEmail = (email, callback) => {
  const query = {email: email}
  User.findOne(query, callback)
};

module.exports.getUserRank = (id, callback) => {
  User.findById(mongoose.Types.ObjectId(id), 'rank', callback)
};

module.exports.updateRank = (id, change, callback) => {
  User.findById(mongoose.Types.ObjectId(id), (res, user) => {
    user.rank = user.rank + change
    user.save();
  })
};

module.exports.addUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err
      newUser.password = hash
      newUser.rank = 500
      newUser.save(callback)
    })
  })
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) candidatePassword === ' '
    callback(null, isMatch)
  })
};

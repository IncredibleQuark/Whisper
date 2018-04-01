
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// User Schema
const UserSchema = mongoose.Schema({
    _id: {
        type: Object,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = (id, callback) => {
    console.log("user model id[["+id+"]]");
    User.findById(mongoose.Types.ObjectId(id), callback);
};

module.exports.getUserByEmail = (email, callback) => {
    const query = {email: email};
    User.findOne(query, callback);
};

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

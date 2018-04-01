const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/database');
const User = require('../../models/user/user');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password
    });
    User.getUserByEmail(newUser.email, (err, user) => { // firstly check if email exists in database

        if (err) throw err;
        if (user) {
            return res.json({success: false, msg: 'Email taken'});
        }
        User.addUser(newUser, (err, user) => {
            if(err){
                res.json({success: false, msg:'Failed to register user'});
            } else {
                res.json({success: true, msg:'User registered'});
            }
        });

    });
});

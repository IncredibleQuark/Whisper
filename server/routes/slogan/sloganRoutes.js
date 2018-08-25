const express = require('express');
const router = express.Router();
const config = require('../../config/database')
const Slogan = require('../../models/slogan/slogan');


router.get('/getSlogans', (req, res, next) => {
  Slogan.getAllSlogans( (err, slogans) => {
    return res.json({success: true, slogans: slogans});
  }, (err) => {
    return res.json({success: false, err: err});
  })
});

module.exports = router;

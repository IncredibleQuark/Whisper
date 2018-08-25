const mongoose = require('mongoose');
const db = require('../config/database')

const SloganSchema = mongoose.Schema({
  slogan: {
    type: String,
    required: true,
    unique: true
  },
  validAnswers: {
    type: Array,
    required: true
  },
  almostValidAnswers: {
    type: Array,
    required: true
  }
});

const connection = mongoose.createConnection(db.database);
const Slogan = connection.model('Slogan', SloganSchema);

const slogansArray = [
  {
    slogan: 'xaffsaffffff',
    validAnswers: ['houses'],
    almostValidAnswers: ['home', 'place you live in']
  },
  {
    slogan: 'xasfffffffffssd',
    validAnswers: ['houses'],
    almostValidAnswers: ['home', 'place you live in']
  },
  {
    slogan: 'sssfffssssffffx',
    validAnswers: ['houses'],
    almostValidAnswers: ['home', 'place you live in']
  }
]

slogansArray.map( (slogan, index) => {

  const newSlogan = new Slogan(slogan);

  newSlogan.save( (err, res) => {
    if (err) {
      console.log(err);
    }

    if (index + 1 === slogansArray.length) {
      process.exit()
    }
  })
});


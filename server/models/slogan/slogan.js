const mongoose = require('mongoose');

const SloganSchema = mongoose.Schema({
  slogan: {
    type: String,
    required: true
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

const Slogan = module.exports = mongoose.model('Slogan', SloganSchema);

module.exports.getAllSlogans = (callback) => {
  Slogan.find({}, callback);
};

module.exports.getSloganById = (id, callback) => {
  Slogan.findById(mongoose.Types.ObjectId(id), callback);
};

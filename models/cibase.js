const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ciBaseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('servers', ciBaseSchema); //Тут название коллекции передаем

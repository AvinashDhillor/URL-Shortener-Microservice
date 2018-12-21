const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  shorturl: {
    type: String,
    required: true
  }
});

const Url = new mongoose.model('urls', urlSchema);

module.exports = {
  Url
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    fileName: String,
    link: String,
    content: String
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Post', postSchema);
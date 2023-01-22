const mongoose = require('mongoose');

const File = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  accessLink: {
    type: String
  },
  size: {
    type: Number,
    default: 0
  },
  path: {
    type: String,
    default: ''
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'file'
  },
  childs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'file'
  }],
})

module.exports = mongoose.model('file', File)
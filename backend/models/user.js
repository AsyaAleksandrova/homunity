const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => validator.isEmail(email),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  activationlink: {
    type: String,
  },
  refreshlink: {
    type: String,
  },
  avatar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'file'
  }
});

module.exports = mongoose.model('user', userSchema);
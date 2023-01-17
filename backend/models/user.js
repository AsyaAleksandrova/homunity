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
    select: false,
  },
  activationlink: {
    type: String,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
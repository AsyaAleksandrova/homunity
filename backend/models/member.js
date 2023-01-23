const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  photo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'file'
  },
  surname: {
    type: String,
    maxlength: 30,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  patronymic: {
    type: String,
    maxlength: 30,
  },
  yearsOfLifeStart: {
    strictDate: {type: Date},
    year: {type: Number}
  },
  yearsOfLifeEnd: {
    tillNow: {type: Boolean},
    strictDate: {type: Date},
    year: {type: Number}
  },
  description: {
    biography: {
      type: String,
      maxlength: 1500
    },
    hobby: {
      type: String,
      maxlength: 1500
    },
    achievements: {
      type: String,
      maxlength: 1500
    },
    rewards: {
      type: String,
      maxlength: 1500
    },
    trips: {
      type: String,
      maxlength: 1500
    },
    books: {
      type: String,
      maxlength: 1500
    },
    sport: {
      type: String,
      maxlength: 1500
    },
    music: {
      type: String,
      maxlength: 1500
    },
    cinema: {
      type: String,
      maxlength: 1500
    },
    games: {
      type: String,
      maxlength: 1500
    },
    schoolmates: {
      type: String,
      maxlength: 1500
    },
    firstlove: {
      type: String,
      maxlength: 1500
    },
    student: {
      type: String,
      maxlength: 1500
    },
    profession: {
      type: String,
      maxlength: 1500
    },
    home: {
      type: String,
      maxlength: 1500
    },
    recipe: {
      type: String,
      maxlength: 1500
    }
  }
})

module.exports = mongoose.model('member', memberSchema);
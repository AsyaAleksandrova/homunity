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
    minlength: 2,
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
    minlength: 2,
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
  }
})

module.exports = mongoose.model('member', memberSchema);


//       country: '', region: '',
//       biography: '', hobby: '', achievements: '', rewards: '', trips: '', books: '', sport: '', music: '',
//       cinema: '', games: '', schoolmates: '', firstlove: '', student: '', profession: '', home: '', recipe: ''
const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  director: {
    required: [true, 'Это поле должно быть заполнено'],
    type: String,
  },
  nameRU: {
    required: [true, 'Это поле должно быть заполнено'],
    type: String,
  },
  nameEN: {
    required: [true, 'Это поле должно быть заполнено'],
    type: String,
  },
  country: {
    required: [true, 'Это поле должно быть заполнено'],
    type: String,
  },
  duration: {
    required: [true, 'Это поле должно быть заполнено'],
    type: String,
  },
  description: {
    required: [true, 'Это поле должно быть заполнено'],
    type: String,
  },
  year: {
    required: [true, 'Это поле должно быть заполнено'],
    type: String,
  },
  trailerLink: {
    required: [true, 'Это поле должно быть заполнено'],
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  thumbnail: {
    required: [true, 'Это поле должно быть заполнено'],
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  image: {
    required: [true, 'Это поле должно быть заполнено'],
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  movieId: {
    required: true,
    type: Number,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);

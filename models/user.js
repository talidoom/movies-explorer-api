const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'NoName',
    minlength: [2, 'Минимальная длина поля 2 символа'],
    maxlength: [30, 'Максимальная длина поля 30 символов'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Это поле должно быть заполнено'],
    validate: {
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Это поле должно быть заполнено'],
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);

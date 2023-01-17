const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const User = require('../models/user');
const MailService = require('../services/MailService');
const { NODE_ENV, JWT_KEY, BACK_ORIGIN, FRONT_ORIGIN } = process.env;

const MONGO_DUPLICATE_ERROR_CODE = 11000;
const ConflictError = require('../errors/ConflictError');
const ValidationError = require('../errors/ValidationError');
const OtherServerError = require('../errors/OtherServerError');
const NotFoundError = require('../errors/NotFoundError');
const AuthError = require('../errors/AuthError');
const MESSAGE_AUTH = 'Неправильные почта или пароль';

module.exports.createUser = (req, res, next) => {
  const activationlink = uuid.v4();
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({ ...req.body, password: hash, activationlink: `${process.env.BACK_ORIGIN}/activate/${activationlink}` }))
    .then((user) => MailService.sendActivationMail(user))
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_KEY : 'dev-secret', { expiresIn: '1d' });
      res
        .status(201)
        //.cookie('refreshToken', token, { maxAge: 24 * 60 * 60 * 1000 })
        .send({
          user: { name: user.name, email: user.email, _id: user._id, confirmed: user.confirmed, token }
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Переданые некорректные данные при создании пользователя: ${err.message}`));
      } else if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
      } else {
        next(new OtherServerError(`Что-то пошло не так: ${err.message}`));
      }
    });
};

module.exports.confirmEmail = (req, res, next) => {
  const activationlink = `${BACK_ORIGIN}/activate/${req.params.link}`;
  User
    .findOneAndUpdate({activationlink}, {confirmed: true}, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.redirect(FRONT_ORIGIN);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Некорректная ссылка активации'));
      } else {
        next(new OtherServerError(`Что-то пошло не так: ${err.message}`));
      }
    });
}

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User
    .findOne({ email }).select('+password')
    .orFail()
    .then((user) => bcrypt.compare(password, user.password)
      .then((compare) => {
        if (!compare) {
          next(new AuthError(MESSAGE_AUTH));
        } else {
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_KEY : 'dev-secret', { expiresIn: '30d' });
          res
            .status(200)
            //.cookie('refreshToken', token, { maxAge: 30 * 24 * 60 * 60 * 1000 })
            .send({ name: user.name, email: user.email, _id: user._id, token });
        }
      }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new AuthError(MESSAGE_AUTH));
      } else {
        next(new OtherServerError(`Что-то пошло не так: ${err.message}`));
      }
    });
};
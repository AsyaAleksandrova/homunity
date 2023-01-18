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
const ForbiddenError = require('../errors/ForbiddenError');
const MESSAGE_AUTH = 'Неправильные почта или пароль';

module.exports.createUser = (req, res, next) => {
  const activationlink = uuid.v4();
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({ ...req.body, password: hash, activationlink: `${process.env.BACK_ORIGIN}/auth/activate/${activationlink}` }))
    .then((user) => MailService.sendActivationMail(user))
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_KEY : 'dev-secret', { expiresIn: '10d' });
      res
        .cookie('jwt', token, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true, SameSite: 'Lax', Secure: true })
        .status(201)
        .send({ user: { name: user.name, email: user.email, _id: user._id } });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Переданы некорректные данные при создании пользователя: ${err.message}`));
      } else if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
      } else {
        next(new OtherServerError(`Что-то пошло не так: ${err.message}`));
      }
    });
};

module.exports.confirmEmail = (req, res, next) => {
  const activationlink = `${BACK_ORIGIN}/auth/activate/${req.params.link}`;
  User
    .findOneAndUpdate({activationlink}, {confirmed: true}, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.status(200).redirect(`${FRONT_ORIGIN}/accept/${user._id}`)
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
          if (user.confirmed) {
            const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_KEY : 'dev-secret', { expiresIn: '30d' });
            res
              .status(200)
              .cookie('jwt', token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, SameSite: 'Lax', Secure: true })
              .send({user: user});
          }
          else {
            MailService.sendActivationMail(user);
            next(new ForbiddenError('Для продолжения перейдите по направленной ссылке для подтвеждения email. Мы отправили ссылку повторно.'));
          }
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

module.exports.logout = (req, res, next) => {
  User
    .findById(req.user._id)
    .then((user) => {
      res.clearCookie('jwt', { httpOnly: true })
      res.status(200).json({message: "OK"})
    })
    .catch((err) => {
      next(new OtherServerError(`Что-то пошло не так: ${err.message}`));
    });
};

module.exports.getMyUser = (req, res, next) => {
  User
    .findById(req.user._id)
    .then((user) => {
      if (user._id.toString() === req.params.id) {
        res.status(200).send({user: user });
      } else {
        next(new AuthError('Необходима авторизация'));
      }
    })
    .catch((err) => {
      next(new OtherServerError(`Что-то пошло не так: ${err.message}`));
    });
};

module.exports.refreshlink = (req, res, next) => {
  const { email } = req.body;
  const newlink = uuid.v4();
  User
    .findOneAndUpdate({ email }, { refreshlink: `${process.env.BACK_ORIGIN}/auth/refresh/pass/${newlink}` }, { new: true, runValidators: true })
    .orFail()
    .then((user) => MailService.sendRefreshPassMail(user))
    .then((user) => {
      res.status(200).json({message: "OK"})
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        next(new OtherServerError(`Что-то пошло не так: ${err.message}`));
      }
    });
}

module.exports.refreshpass = (req, res, next) => {

}

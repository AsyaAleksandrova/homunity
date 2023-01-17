const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const { NODE_ENV, JWT_KEY } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    next(new AuthError('Необходима авторизация 1'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_KEY : 'dev-secret');
  } catch (err) {
    next(new AuthError('Необходима авторизация 2'));
    return;
  }
  req.params.user = payload;
  next();
};
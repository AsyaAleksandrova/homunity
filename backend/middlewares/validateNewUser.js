const { celebrate, Joi } = require('celebrate');

const validateNewUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().regex(/\w+@\w+\.\w+/).required(),
    password: Joi.string().required(),
  }),
});

module.exports = validateNewUser;
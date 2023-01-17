const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const { errors } = require('celebrate');
const { login, createUser, confirmEmail, getMyUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const validateNewUser = require('./middlewares/validateNewUser');
const validateAuth = require('./middlewares/validateAuth');
const errorHandler = require('./middlewares/errorhandler');
const NotFoundError = require('./errors/NotFoundError');
const { PORT, FRONT_ORIGIN, MONGO_SERVER } = process.env;

const app = express();

app.use(cors({
  origin: [{FRONT_ORIGIN}],
  credentials: true,
  maxAge: 60
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_SERVER, {
  useNewUrlParser: true,
});

app.post('/signup', validateNewUser, createUser);
app.get('/activate/:link', confirmEmail)
app.post('/signin', validateAuth, login);
app.use('/users/me/:id', auth, getMyUser);

app.use((req, res, next) => {
  next(new NotFoundError('Не корректно задан адрес запроса'));
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})
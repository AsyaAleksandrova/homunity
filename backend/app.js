const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { errors } = require('celebrate');
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
app.use(fileUpload({}))

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_SERVER, {
  useNewUrlParser: true,
});

app.use('/auth', require('./routes/auth'));
app.use('/member', require('./routes/member'));
app.use('/file', require('./routes/file'));

app.use((req, res, next) => {
  next(new NotFoundError('Не корректно задан адрес запроса'));
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})
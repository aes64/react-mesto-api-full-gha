require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const mongoose = require('mongoose');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorName = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { NODE_ENV, MONGO_URL } = process.env;
const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);
mongoose.connect((NODE_ENV === 'production' && MONGO_URL) || 'mongodb://localhost:27017/mestodb');

app.use(express.json());


app.options('*', cors())


app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).pattern(errorName.REGEXPHTTP),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).pattern(errorName.REGEXPHTTP),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), createUser);
app.use(auth);
app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use(errorLogger);
app.use(errors());
app.use('/', require('./routes/notFound'));
app.use('/', require('./utils/error/CentralError'));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

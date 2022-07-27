/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ERR_NOT_FOUND } = require('./utils/errorNumber');

const { PORT = 3000 } = process.env;
const DB_URL = 'mongodb://127.0.0.1:27017/mestodb';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62e16e782d094f6321b39f0d', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use((req, res) => {
  res.status(ERR_NOT_FOUND).send({ message: 'Такой страницы не существует' });
});
mongoose.connect(DB_URL, () => {
  console.log(`Connected to db on ${DB_URL}`);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

/* async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
  console.log('Connected to db');

  await app.listen(PORT);
  console.log(`App listening on port ${PORT}`);
}

main(); */

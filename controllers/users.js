const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { errorMessage } = require('../utils/errorMessage');
const { NotFoundError } = require('../utils/errors/allErrors');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => errorMessage(err, req, res, next));
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь (ID) не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorMessage(err, req, res, next));
};
module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      ////////////
      res.status(200).send(user);
      /* res.send({ data: user }); */
    })
    .catch((err) => errorMessage(err, req, res, next));
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  /* User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorMessage(err, req, res)); */
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => res.send(user))
    .catch((err) => errorMessage(err, req, res, next));
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь (ID) не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorMessage(err, req, res, next));
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь (ID) не найден');
    })
    .then((user) => res.send({ data: user }))
    /* .then((user) => res.send(user)) */
    .catch((err) => errorMessage(err, req, res, next));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });
      res.send({ jwt: token });
    })
    .catch(next);
};

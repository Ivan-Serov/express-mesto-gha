const {
  ERR_BAD_REQUEST,
  ERR_NOT_FOUND,
  ERR_SERVER,
} = require('./errorNumber');

const errorMessage = (err, req, res) => {
  if (err.name === 'DocumentNotFoundError') {
    res.status(ERR_NOT_FOUND).send({
      message: 'Страница не найдена',
    });
    return;
  }
  if (err.name === 'CastError') {
    res.status(ERR_BAD_REQUEST).send({
      message: 'Переданы некорректные данные',
    });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(ERR_BAD_REQUEST).send({
      message: err.message,
    });
    return;
  }

  res.status(ERR_SERVER).send({
    message: 'На сервере произошла ошибка',
  });
};

module.exports = { errorMessage };

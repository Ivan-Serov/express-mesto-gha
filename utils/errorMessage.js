const errorMessage = (err, req, res) => {
  if (err.name === 'CastError') {
    res.status(400).send({
      message: 'Переданы некорректные данные',
    });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(400).send({
      message: 'Переданы некорректные данные при создании элемента',
    });
    return;
  }
  if (err.name === 'DocumentNotFoundError') {
    res.status(404).send({
      message: 'Страница не найдена',
    });
    return;
  }
  res.status(500).send({
    message: 'На сервере произошла ошибка',
  });
};

module.exports = { errorMessage };

function errorHandler(err, req, res, next) {

  if (err.message >= 400 || err.message <= 500) {
    res.status(err.message).json({
      message: "Please give required input"
    })
  }

  if (err.name == 'ValidationError') {
    res.status(400).json({
      error: err.message
    })
  }

  if (err.name == 'TypeError') {
    res.status(400).json({
      error: err.message
    })
  }

  res.send({ err });
}

module.exports = errorHandler;
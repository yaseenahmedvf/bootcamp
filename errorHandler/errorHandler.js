function errorHandler(err, req, res, next) {
    if (err.name == "CastError") {
        res.status(400).json({
            message: "Id format is not correct",
            err
        })
    }
    if (err.name == "ValidationError") {
        res.status(400).json({
            message: err.message
        })
    }
    res.send({ err: err.message })
}

module.exports = errorHandler;
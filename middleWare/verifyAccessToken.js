const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    verifyAccessToken: (req, res, next) => {
        const authorization = req.headers['authorization']; 
        if (!authorization) return next(createError.Unauthorized());
        const token = authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!user.email) {
            return next(createError.Unauthorized());
        }
        req.user = user;
        next();
    }
}
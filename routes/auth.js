const routes = require('express').Router();
const controller = require('../controllers/auth.controller');

routes.post('/signup', controller.createUsers);
routes.post('/login', controller.login);
routes.post('/change-password', controller.changePassword);
routes.post('/forgot-password', controller.forgotPassword);
routes.post('/reset-password', controller.resetPassword);

module.exports = routes;
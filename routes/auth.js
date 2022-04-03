const routes = require('express').Router();
const controller = require('../controllers/auth.controller');

routes.post('/signup', controller.createUsers);
routes.post('/login', controller.login);

module.exports = routes;
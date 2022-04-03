const routes = require('express').Router();
const controller = require('../controllers/bootcamp.controller');
const courseController = require('../controllers/course.controller')

routes.post('/create', controller.createBootcamp);
routes.get('/all', controller.getAllBootcamps);
routes.get('/:id', controller.getBootcampById);
routes.put('/:id', controller.updateBootcamp);
routes.delete('/:id', controller.deleteBootcamp);
//course routes
routes.post('/:id/courses', courseController.createBootcampCourse);
routes.get('/:id/courses', courseController.getBootcampCourses);
routes.get('/:id/courses/:courseId', courseController.getBootcampCourseById);
routes.put('/:id/courses/:courseId', courseController.updateBootcampCourseById);
routes.delete('/:id/courses/:courseId', courseController.deleteBootcampCourse);


module.exports = routes;
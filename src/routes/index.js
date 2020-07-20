const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');

// Controllers
const home = require('../controllers/home');
const image = require('../controllers/image');
const users = require('../controllers/users');
const catalogo = require('../controllers/catalogo');

module.exports = app => {

  router.get('/users/signin', users.signin);
  router.get('/users/signup', isAuthenticated, users.signup);
  router.get('/catalogo',  catalogo.catalogo);
  router.get('/', isAuthenticated, home.index);
  router.get('/images/:image_id', image.index);
  router.post('/images', isAuthenticated, image.create);
  router.post('/images/:image_id/like', isAuthenticated, image.like);
  router.post('/images/:image_id/comment', isAuthenticated, image.comment);
  router.delete('/images/:image_id', isAuthenticated, image.remove);
  

    app.use(router);
};
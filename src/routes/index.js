const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');

// Controllers
const home = require('../controllers/home');
const image = require('../controllers/image');

module.exports = app => {

  router.get('/', isAuthenticated, home.index);
  router.get('/images/:image_id', isAuthenticated, image.index);
  router.post('/images', isAuthenticated, image.create);
  router.post('/images/:image_id/like', isAuthenticated, image.like);
  router.post('/images/:image_id/comment', isAuthenticated, image.comment);
  router.delete('/images/:image_id', isAuthenticated, image.remove);
  

    app.use(router);
};
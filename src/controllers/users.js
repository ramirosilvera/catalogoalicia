const sidebar = require('../helpers/sidebar');
const { Image } = require('../models');

const ctrl = {};

ctrl.signin = async (req, res) => {
  const images = await Image
    .find()
    .sort({ timestamp: -1 });
  let viewModel = { images: [] };
  viewModel.images = images;
  viewModel = await sidebar(viewModel);
  res.render('users/signin',viewModel);
};

ctrl.signup = async (req, res) => {
    const images = await Image
      .find()
      .sort({ timestamp: -1 });
    let viewModel = { images: [] };
    viewModel.images = images;
    viewModel = await sidebar(viewModel);
    res.render('users/signup',viewModel);
  };

module.exports = ctrl;


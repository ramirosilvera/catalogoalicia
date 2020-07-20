const sidebar = require('../helpers/sidebar');
const { Image } = require('../models');

const ctrl = {};

ctrl.catalogo = async (req, res) => {
  const images = await Image
    .find()
    .sort({ timestamp: -1 });
  let viewModel = { images: [] };
  viewModel.images = images;
  viewModel = await sidebar(viewModel);
  res.render('catalogo',viewModel);
};

module.exports = ctrl;



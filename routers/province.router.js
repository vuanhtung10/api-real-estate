const provinceRouter = require('express').Router();
const provinceController = require('../controllers/province.controller');

provinceRouter.post('/', provinceController.add);
provinceRouter.get('/:id?', provinceController.lookup);
provinceRouter.delete('/:id?', provinceController.remove);

module.exports = provinceRouter;
const provinceRouter = require('express').Router();
const provinceController = require('../controllers/province.controller');

// provinceRouter.post('/', provinceController.addProvince);
// provinceRouter.post('/districts', provinceController.addDistrict);
// provinceRouter.post('/wards', provinceController.addWard);
provinceRouter.get('/', provinceController.getProvince);
provinceRouter.get('/:code', provinceController.getDistrict);
provinceRouter.get('/d/:code', provinceController.getWard);
module.exports = provinceRouter;
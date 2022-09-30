const housesRouter = require('express').Router();
const HousesController = require('../controllers/houses.controller');
const HousesValidate = require('../validates/houses.validate');
const AuthMiddleware = require('../middlewares/auth.middleware');
const {validate} = require('../validates/validate');

housesRouter.post('/', HousesValidate.field(), validate, HousesController.add);
housesRouter.put('/:id',HousesValidate.update(), validate, HousesController.update);
housesRouter.get('/:id?', AuthMiddleware.checkAuth, HousesController.lookup);
// housesRouter.post('/me', AuthMiddleware.checkAuth, HousesController.me);
housesRouter.delete('/:id',HousesValidate.remove(), validate, HousesController.remove);
housesRouter.post('/list-for-datatable', AuthMiddleware.checkAuth, HousesController.listForDataTable);
housesRouter.post('/listDirection', AuthMiddleware.checkAuth, HousesController.suggest);

module.exports = housesRouter;
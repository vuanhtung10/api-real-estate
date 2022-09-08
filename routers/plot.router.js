const plotRouter = require('express').Router();
const PlotController = require('../controllers/plot.controller');
const PlotValidate = require('../validates/plot.validate');
const AuthMiddleware = require('../middlewares/auth.middleware');
const {validate} = require('../validates/validate');

plotRouter.post('/', PlotValidate.field(), validate, PlotController.add);
plotRouter.put('/:id', PlotValidate.update(), validate, PlotController.edit);
plotRouter.delete('/:id', PlotValidate.remove(), validate, PlotController.remove);
plotRouter.get('/:id?', AuthMiddleware.checkAuth, validate, PlotController.lookup);
plotRouter.post('/list-for-datatable', AuthMiddleware.checkAuth, validate, PlotController.listForDataTable);
plotRouter.post('/select-list', AuthMiddleware.checkAuth, PlotController.suggest);

module.exports = plotRouter;
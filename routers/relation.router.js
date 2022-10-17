const relationRouter = require('express').Router();
const RelationController = require('../controllers/relation.controller');
const RelationValidate = require('../validates/relation.validate');
const AuthMiddleware = require('../middlewares/auth.middleware');
const {validate} = require('../validates/validate');

relationRouter.post('/', RelationValidate.field(), validate, RelationController.add);
relationRouter.put('/:id', RelationValidate.update(), validate, RelationController.edit);
relationRouter.delete('/:id', RelationValidate.remove(), validate, RelationController.remove);
relationRouter.post('/list-for-datatable', AuthMiddleware.checkAuth, validate, RelationController.listForDataTable);
relationRouter.post('/select-list', AuthMiddleware.checkAuth, RelationController.suggest);
relationRouter.get('/:id?', AuthMiddleware.checkAuth, RelationController.lookup);
relationRouter.post('/suggest', AuthMiddleware.checkAuth, RelationController.suggest);

module.exports = relationRouter;
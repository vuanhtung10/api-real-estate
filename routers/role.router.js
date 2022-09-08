const roleRouter = require('express').Router();
const RoleController = require('../controllers/role.controller');
const RoleValidate = require('../validates/role.validate');
const AuthMiddleware = require('../middlewares/auth.middleware');
const {validate} = require('../validates/validate');

roleRouter.post('/', RoleValidate.field(), validate, RoleController.add);
roleRouter.put('/:id', AuthMiddleware.checkAuth, RoleValidate.update(), validate, RoleController.edit);
roleRouter.delete('/:id', RoleValidate.remove(), validate, RoleController.remove);
roleRouter.get('/:id?',AuthMiddleware.checkAuth, validate, RoleController.lookup);
roleRouter.post('/list-for-datatable', AuthMiddleware.checkAuth, validate, RoleController.listForDataTable);
roleRouter.post('/suggest', AuthMiddleware.checkAuth, RoleController.suggest);

module.exports = roleRouter;
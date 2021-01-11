const roleRouter = require('express').Router();
const RoleController = require('../controllers/role.controller');
const RoleValidate = require('../validates/role.validate');
const AuthMiddleware = require('../middlewares/auth.middleware');
const {validate} = require('../validates/validate');

roleRouter.post('/add', RoleValidate.field(), validate, RoleController.add);
roleRouter.post('/edit', RoleController.edit);
roleRouter.post('/delete', RoleValidate.remove(), validate, RoleController.remove);
roleRouter.post('/list-for-datatable', AuthMiddleware.checkAuth, validate, RoleController.listForDataTable);
roleRouter.post('/suggest', AuthMiddleware.checkAuth, RoleController.suggest);

module.exports = roleRouter;
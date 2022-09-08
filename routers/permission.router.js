const permissionRouter = require('express').Router();
const PermissionController = require('../controllers/permission.controller');
const PermissionValidate = require('../validates/permission.validate');
const AuthMiddleware = require('../middlewares/auth.middleware');
const {validate} = require('../validates/validate');

permissionRouter.post('/', PermissionValidate.field(), validate, PermissionController.add);
permissionRouter.put('/:id', PermissionValidate.update(), validate, PermissionController.edit);
permissionRouter.delete('/:id', PermissionValidate.remove(), validate, PermissionController.remove);
permissionRouter.get('/:id?', AuthMiddleware.checkAuth, validate, PermissionController.lookup);
permissionRouter.post('/select-list', AuthMiddleware.checkAuth, PermissionController.suggest);
permissionRouter.post('/list-for-datatable', AuthMiddleware.checkAuth, validate, PermissionController.listForDataTable)

module.exports = permissionRouter;
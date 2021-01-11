const permissionRouter = require('express').Router();
const PermissionController = require('../controllers/permission.controller');
const PermissionValidate = require('../validates/permission.validate');
const AuthMiddleware = require('../middlewares/auth.middleware');
const {validate} = require('../validates/validate');

permissionRouter.post('/add', PermissionValidate.field(), validate, PermissionController.add);
permissionRouter.post('/edit', PermissionValidate.field(), validate, PermissionController.edit);
permissionRouter.post('/delete', PermissionValidate.remove(), validate, PermissionController.remove);
permissionRouter.post('/list-for-datatable', AuthMiddleware.checkAuth, validate, PermissionController.listForDataTable);
permissionRouter.post('/select-list', AuthMiddleware.checkAuth, PermissionController.suggest);

module.exports = permissionRouter;
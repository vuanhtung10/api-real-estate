const userRouter = require('express').Router();
const UserController = require('../controllers/user.controller');
const UserValidate = require('../validates/user.validate');
const AuthMiddleware = require('../middlewares/auth.middleware');
const {validate} = require('../validates/validate');

userRouter.post('/login', UserValidate.login(), validate, UserController.login);
userRouter.post('/logout', UserController.logout);
userRouter.post('/add', UserValidate.add(), validate, UserController.add);
userRouter.post('/update', AuthMiddleware.checkAuth, UserValidate.update(), validate, UserController.update);
userRouter.post('/me', AuthMiddleware.checkAuth, UserController.me);
userRouter.post('/list-for-datatable', AuthMiddleware.checkAuth, UserController.listForDataTable);

module.exports = userRouter;
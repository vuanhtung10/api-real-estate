const router = require('express').Router();
const userRouter = require('./user.router');
const roleRouter = require('./role.router');
const permissionRouter = require('./permission.router');

router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/permission', permissionRouter);

module.exports = router;
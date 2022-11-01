const router = require('express').Router();
const userRouter = require('./user.router');
const roleRouter = require('./role.router');
const permissionRouter = require('./permission.router');
const housesRouter = require('./houses.router');
const plotRouter = require('./plot.router');
const relationRouter = require('./relation.router');
const mediaRouter = require('./media.router');
router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/permission', permissionRouter);
router.use('/house', housesRouter);
router.use('/plot', plotRouter);
router.use('/relation', relationRouter)
router.use('/media', mediaRouter)
module.exports = router;
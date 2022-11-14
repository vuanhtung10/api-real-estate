const articleRouter = require('express').Router();
const ArticleController = require('../controllers/article.controller');
const ArticleValidate = require('../validates/article.validate');
const AuthMiddleware = require('../middlewares/auth.middleware');
const {validate} = require('../validates/validate');

articleRouter.post('/', ArticleValidate.field(), validate, ArticleController.add);
articleRouter.put('/:id',ArticleValidate.update(), validate, ArticleController.edit);
articleRouter.get('/:id?', AuthMiddleware.checkAuth, ArticleController.lookup);
articleRouter.delete('/:id',ArticleValidate.remove(), validate, ArticleController.remove);
articleRouter.post('/list-for-datatable', AuthMiddleware.checkAuth, ArticleController.listForDataTable);

module.exports = articleRouter;
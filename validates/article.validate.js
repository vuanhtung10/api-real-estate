const Article = require('../models/article.model');
const { body, param } = require('express-validator');

const {
    IS_REQUIRED, 
    ERROR_OBJECT_ID,
    IS_EXIST
} = require('../constants/message');

const field = () => {
    return [
      body('name', IS_REQUIRED).not().isEmpty()
      .custom(async (value, {req}) => {
        if(req.body._id) {
          const article = await Article.findById(req.body._id)
          if(article) {
            if(article.name !== value) {
              const article_exist = await Article.findOne({name: value})
              if (article_exist) {
                return Promise.reject(IS_EXIST);
              }
            }
          }
        } else {
          const article_exist = await Article.findOne({name: value})
          if (article_exist) {
            return Promise.reject(IS_EXIST);
          }
        }
      })
    ]
}

const remove = () => {
    return [
      param('id', ERROR_OBJECT_ID).isMongoId()
    ]
}

const update = () => {
  return [
    body('name', IS_REQUIRED).not().isEmpty(),
  ]
}

module.exports = {
    field, remove, update
}
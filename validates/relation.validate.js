const Relation = require('../models/relation.model');
const { body, param } = require('express-validator');

const {
    IS_REQUIRED,
    ERROR_OBJECT_ID,
    IS_EXIST
} = require('../constants/message');

const field = () => {
    return [
      body('user', IS_REQUIRED).not().isEmpty()
      .custom(async (value, {req}) => {
        if(req.body._id) {
          const relation = await Relation.findById(req.body._id)
          if(relation) {
            if(relation.user !== value) {
              const relation_exist = await Relation.findOne({name: value})
              if (relation_exist) {
                return Promise.reject(IS_EXIST);
              }
            }
          }
        } else {
          const relation_exist = await Relation.findOne({name: value})
          if (relation_exist) {
            return Promise.reject(IS_EXIST);
          }
        }
      })
    ,
      body('plot', IS_REQUIRED).not().isEmpty()
      .custom(async (value, {req}) => {
        if(req.body._id) {
          const relation = await Relation.findById(req.body._id)
          if(relation) {
            if(relation.plot !== value) {
              const relation_exist = await Relation.findOne({display_name: value})
              if (relation_exist) {
                return Promise.reject(IS_EXIST);
              }
            }
          }
        } else {
          const relation_exist = await Relation.findOne({display_name: value})
          if (relation_exist) {
            return Promise.reject(IS_EXIST);
          }
        }
      })
    ,
    body('price', IS_REQUIRED).not().isEmpty()
      .custom(async (value, {req}) => {
        if(req.body._id) {
          const relation = await Relation.findById(req.body._id)
          if(relation) {
            if(relation.price !== value) {
              const relation_exist = await Relation.findOne({display_name: value})
              if (relation_exist) {
                return Promise.reject(IS_EXIST);
              }
            }
          }
        } else {
          const relation_exist = await Relation.findOne({display_name: value})
          if (relation_exist) {
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
    body('plot', IS_REQUIRED).not().isEmpty(),
    body('user', IS_REQUIRED).not().isEmpty(),
    body('price', IS_REQUIRED).not().isEmpty(),
  ]
}

module.exports = {
    field, remove, update
}
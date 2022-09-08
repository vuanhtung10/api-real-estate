const Role = require('../models/role.model');
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
          const role = await Role.findById(req.body._id)
          if(role){
            if(role.name !== value) {
              const role_exist = await Role.findOne({name: value})
              if (role_exist) {
                return Promise.reject(IS_EXIST);
              }
            }
          }
        } else {
          const role_exist = await Role.findOne({name: value})
          if (role_exist) {
            return Promise.reject(IS_EXIST);
          }
        }
      })
    ,
      body('display_name', IS_REQUIRED).not().isEmpty()
      .custom(async (value, {req}) => {
        if(req.body._id) {
          const role = await Role.findById(req.body._id)
          if(role) {
            if(role.display_name !== value) {
              const role_exist = await Role.findOne({display_name: value})
              if (role_exist) {
                return Promise.reject(IS_EXIST);
              }
            }
          }
        } else {
          const role_exist = await Role.findOne({display_name: value})
          if (role_exist) {
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
    body('display_name', IS_REQUIRED).not().isEmpty(),
  ]
}

module.exports = {
    field, remove, update
}
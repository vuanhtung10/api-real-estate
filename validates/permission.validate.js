const Permission = require('../models/permission.model');
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
          const permission = await Permission.findById(req.body._id)
          if(permission) {
            if(permission.name !== value) {
              const permission_exist = await Permission.findOne({name: value})
              if (permission_exist) {
                return Promise.reject(IS_EXIST);
              }
            }
          }
        } else {
          const permission_exist = await Permission.findOne({name: value})
          if (permission_exist) {
            return Promise.reject(IS_EXIST);
          }
        }
      })
    ,
      body('display_name', IS_REQUIRED).not().isEmpty()
      .custom(async (value, {req}) => {
        if(req.body._id) {
          const permission = await Permission.findById(req.body._id)
          if(permission) {
            if(permission.display_name !== value) {
              const permission_exist = await Permission.findOne({display_name: value})
              if (permission_exist) {
                return Promise.reject(IS_EXIST);
              }
            }
          }
        } else {
          const permission_exist = await Permission.findOne({display_name: value})
          if (permission_exist) {
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
const Permission = require('../models/role.model');
const { body } = require('express-validator');

const {
    IS_REQUIRED, 
    ERROR_OBJECT_ID,
    IS_EXIST
} = require('../constants/message');

const field = () => {
    return [
      body('name', IS_REQUIRED).not().isEmpty()
      .custom(async value => {
        const permission = await Permission.findOne({name: value})
        if (permission) {
          return Promise.reject(IS_EXIST);
        }
      })
    ,
      body('display_name', IS_REQUIRED).not().isEmpty()
      .custom(async value => {
        const permission = await Permission.findOne({display_name: value})
        if (permission) {
          return Promise.reject(IS_EXIST);
        }
      })
    ]
}

const remove = () => {
    return [
      body('_id', ERROR_OBJECT_ID).isMongoId()
    ]
}

module.exports = {
    field, remove
}
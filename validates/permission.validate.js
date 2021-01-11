const Permission = require('../models/role.model');
const { body } = require('express-validator');

const {
    NAME_IS_REQUIRED, 
    DISPLAY_NAME_IS_REQUIRED, 
    ERROR_OBJECT_ID,
    NAME_IS_EXIST,
    DISPLAY_NAME_IS_EXIST
} = require('../constants/message');

const field = () => {
    return [
      body('name', NAME_IS_REQUIRED).not().isEmpty()
      .custom(async value => {
        const permission = await Permission.findOne({name: value})
        if (permission) {
          return Promise.reject(NAME_IS_EXIST);
        }
      })
    ,
      body('display_name', DISPLAY_NAME_IS_REQUIRED).not().isEmpty()
      .custom(async value => {
        const permission = await Permission.findOne({display_name: value})
        if (permission) {
          return Promise.reject(DISPLAY_NAME_IS_EXIST);
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
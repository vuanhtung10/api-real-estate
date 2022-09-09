const User = require('../models/user.model');
const { body } = require('express-validator')
const bcrypt = require('bcryptjs');

const {
    EMAIL_IS_REQUIRED, 
    EMAIL_FORMAT_ERROR, 
    EMAIL_IS_EXIST, 
    EMAIL_NOT_EXIST,
    PASSWORD_AT_LEAST,
    PASSWORD_IS_REQUIRED
  } = require('../constants/message');

const login = (req, res) => {
    return [
      body('email')
        .not().isEmpty().withMessage(EMAIL_IS_REQUIRED)
        .isEmail().withMessage(EMAIL_FORMAT_ERROR)
        .custom(async value => {
            let user = await User.findOne({email: value})
            if (!user) {
                throw new Error(EMAIL_NOT_EXIST);
            }
        })
      ,
      body('password', PASSWORD_IS_REQUIRED).not().isEmpty()
    ]
}

const add = () => {
    return [
      body('email')
        .not().isEmpty().withMessage(EMAIL_IS_REQUIRED)
        .isEmail().withMessage(EMAIL_FORMAT_ERROR)
        .custom(async value => {
          const user = await User.findOne({email: value})
          if (user) {
            throw new Error(EMAIL_IS_EXIST);
          }
        })
      ,
      body('password', PASSWORD_AT_LEAST).isLength({ min: 8 })
    ]
}

const update = () => {
    return [
      body('email')
        .not().isEmpty().withMessage(EMAIL_IS_REQUIRED)
        .isEmail().withMessage(EMAIL_FORMAT_ERROR)
      ,
      // body('password', PASSWORD_AT_LEAST).isLength({ min: 8 })
    ]
}

module.exports = {
    login,
    add,
    update
}
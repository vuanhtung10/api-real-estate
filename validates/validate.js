const { validationResult } = require('express-validator')
const _ = require('lodash');

const validate = (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(422).send(errors)
        }
        // console.log('errors', errors)
        // if (!errors.isEmpty()) {
        //   const extractedErrors = []
        //   errors.array().map(err => extractedErrors.push(err.msg))
        //   return res.status(422).send(extractedErrors)
        // }
        next();
    }
    catch (error) {
      return res.status(401).send(error)
    }
}

module.exports = {
    validate
}
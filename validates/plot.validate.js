const Plot = require('../models/plot.model');
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
          const plot = await Plot.findById(req.body._id)
          if(plot) {
            if(plot.name !== value) {
              const plot_exist = await Plot.findOne({name: value})
              if (plot_exist) {
                return Promise.reject(IS_EXIST);
              }
            }
          }
        } else {
          const plot_exist = await Plot.findOne({name: value})
          if (plot_exist) {
            return Promise.reject(IS_EXIST);
          }
        }
      })
    ,
      body('status', IS_REQUIRED).not().isEmpty()
      .custom(async (value, {req}) => {
        if(req.body._id) {
          const plot = await Plot.findById(req.body._id)
          if(plot) {
            if(plot.status !== value) {
              const plot_exist = await Plot.findOne({status: value})
              if (plot_exist) {
                return Promise.reject(IS_EXIST);
              }
            }
          }
        } else {
          const plot_exist = await Plot.findOne({status: value})
          if (plot_exist) {
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
    body('status', IS_REQUIRED).not().isEmpty(),
  ]
}

module.exports = {
    field, remove, update
}
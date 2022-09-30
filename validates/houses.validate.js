const Houses = require('../models/houses.model');
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
          const houses = await Houses.findById(req.body._id)
          if(houses) {
            if(houses.name !== value) {
              const houses_exist = await Houses.findOne({name: value})
              if (houses_exist) {
                return Promise.reject(IS_EXIST);
              }
            }
          }
        } else {
          const houses_exist = await Houses.findOne({name: value})
          if (houses_exist) {
            return Promise.reject(IS_EXIST);
          }
        }
      })
    ,
      body('area', IS_REQUIRED).not().isEmpty()
      // .custom(async (value, {req}) => {
      //   if(req.body._id) {
      //     const houses = await Houses.findById(req.body._id)
      //     if(houses) {
      //       if(houses.area !== value) {
      //         const houses_exist = await Houses.findOne({display_name: value})
      //         if (houses_exist) {
      //           return Promise.reject(IS_EXIST);
      //         }
      //       }
      //     }
      //   } else {
      //     const houses_exist = await Houses.findOne({display_name: value})
      //     if (houses_exist) {
      //       return Promise.reject(IS_EXIST);
      //     }
      //   }
      // })
    ,
      body('price', IS_REQUIRED).not().isEmpty()
      // .custom(async (value, {req}) => {
      //   if(req.body._id) {
      //     const houses = await Houses.findById(req.body._id)
      //     if(houses) {
      //       if(houses.price !== value) {
      //         const houses_exist = await Houses.findOne({display_name: value})
      //         if (houses_exist) {
      //           return Promise.reject(IS_EXIST);
      //         }
      //       }
      //     }
      //   } else {
      //     const houses_exist = await Houses.findOne({display_name: value})
      //     if (houses_exist) {
      //       return Promise.reject(IS_EXIST);
      //     }
      //   }
      // })
    ,
      // body('user', IS_REQUIRED).not().isEmpty()
      // .custom(async (value, {req}) => {
      //   if(req.body._id) {
      //     const houses = await Houses.findById(req.body._id)
      //     if(houses) {
      //       if(houses.user !== value) {
      //         const houses_exist = await Houses.findOne({display_name: value})
      //         if (houses_exist) {
      //           return Promise.reject(IS_EXIST);
      //         }
      //       }
      //     }
      //   } else {
      //     const houses_exist = await Houses.findOne({display_name: value})
      //     if (houses_exist) {
      //       return Promise.reject(IS_EXIST);
      //     }
      //   }
      // })
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
    body('area', IS_REQUIRED).not().isEmpty(),
    body('price', IS_REQUIRED).not().isEmpty(),
    body('user', IS_REQUIRED).not().isEmpty(),
  ]
}
module.exports = {
    field, remove, update
}
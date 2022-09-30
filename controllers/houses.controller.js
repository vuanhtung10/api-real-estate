const Houses = require('../models/houses.model');
const Token = require('../models/token.model');
// const JWTService = require('../utils/jwt');
const { getDataTableParams } = require('../utils/dataTable');

// const me = async function(req, res) {
//     try {
//         const user = req.user;
//         const permissions = []
//         let userUpdate = await User.findOne({ _id: user._id }).populate(
//           { 
//             path: 'role',
//             populate: [
//               {
//                 path: 'permissions'
//               }
//             ]    
//           })
//         if(userUpdate.role){
//           if(userUpdate.role.permissions){
//             userUpdate.role.permissions.forEach(element => {
//               permissions.push(element.name)
//             });
//             user.permissions = permissions
//           }
//         }
//         if (user) {
//             return res.status(200).send({user: user})
//         }
//     } catch (error) {
//         return res.status(401).send(error);
//     }
// };
  
const add = async function(req, res) {
    try {
        const { name, area, price, description, direction, city, district, adress, user, status, type, plot} = req.body;
        const houses = new Houses({
            name,  
            description,
            area,
            price, 
            direction,
            city,
            district,
            adress,
            user,
            status,
            type,
            plot,
        });
        const error = houses.validateSync();
        if(error) return res.status(422).send(error)
        await houses.save()
        return res.status(200).send(houses)
    }
    catch (error) {
        console.log('error', error)
        return res.status(401).send(error)
    }
}

// const update = async function(req, res) {
//     try {
//         const houses = req.body;
//         const { id } = req.params;
//         await Houses.updateOne({_id: house.id}, houses);
//         res.status(200).send(true)
//     }
//     catch (error) {
//         console.log('error', error)
//         return res.status(401).send(error)
//     }
// }

const update = async function(req, res) {
  try {
      const houses = req.body;
      await Houses.updateOne({_id: houses._id}, houses);
      return res.status(200).send(true)
  }
  catch (error) {
      return res.status(401).send(error)
  }
}

const listForDataTable = async (req, res) => {
    const datatableParams = getDataTableParams(req)
    const listObj = await list(
      false,
      datatableParams.keyword,
      datatableParams.start,
      datatableParams.length,
      datatableParams.orderBy,
      datatableParams.orderType,
    )
    const count = await list(true, datatableParams.keyword)
  
    return res.json({
      recordsTotal: count,
      data: listObj,
      draw: datatableParams.draw,
      recordsFiltered: count,
    })
}

const list = async (
    isCounting = false,
    keyword,
    start = 0,
    length = 10,
    sortBy = 'order',
    sortType = 'asc',
  ) => {
    try {
      let filter = {}
      if (keyword) {
        filter = { $or: [
          { full_name: { $regex: `.*${keyword}.*` } },
          { email: { $regex: `.*${keyword}.*` } }
        ]}
        // filter = { name: new RegExp(`.*${keyword}.*`, "i")}
      }

      if (isCounting) {
        const count = await Houses.countDocuments(filter)
        return count
      }

      const sortObj = {}
      sortObj[sortBy] = sortType
      if (length === -1) {
        const result = await Houses
          .find(filter)
          // .sort(sortObj)
          .populate('user')
          .lean()

        return result
      }
      const result = await Houses
        .find(filter)
        .populate('user')
      //   .populate({ path: 'role', match: { $or: [
      //     { display_name: { $regex: `.*${keyword}.*` }}
      // ] }})
        // .sort(sortObj)
        .limit(length)
        .skip(start)
        .lean()

      return result
    } catch (e) {
      console.log(e)
    }

    if (isCounting) {
      return 0
    }
    return []
}

const lookup = async function(req, res) {
  try{
      const { id } = req.params;
      const {user} = req.query;
      if(id){
          console.log(id)
          let houses = await Houses.findById(id).populate({ path: 'user',populate: {path: 'role',populate: {path: 'permission'}}});
          Houses.aggregate[{$match : { _id: id}}]
          res.status(200).send(houses)
      }else{
          const filter= {}
          if(role){
              filter.role = role
          }
          console.log(filter)
          const houses = await Houses.find(filter).populate({ path: 'user',populate: {path: 'role', populate: {path: 'permission'}}});
          res.status(200).send(houses)
      }
      return
  }
  catch (error) {
      console.log('error', error)
      return res.status(400).send(error)
  }
}

const remove = async function(req, res) {
  try {
      const _id = req.params.id;
      await Houses.deleteOne({_id: _id});
      return res.status(200).send(true)
  }
  catch (error) {
      return res.status(401).send({mess: "success"})
  }
}

const suggest = async function(req, res) {
  try {
      const {page, keyword} = req.body
      let filter = {}
      if (keyword) {
          filter = { $or: [
              { direction: { $regex: `.*${keyword}.*` } }
          ]}
      }
      const houses = await Houses.find(filter).lean()
      return res.status(200).send({data:houses})
  }
  catch (error) {
      return res.status(401).send(error)
  }
}
module.exports = {
    // me,
    add,
    update,
    list,
    listForDataTable,
    lookup,
    remove,
    suggest
}
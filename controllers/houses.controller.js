const Houses = require('../models/houses.model');
const Token = require('../models/token.model');
// const JWTService = require('../utils/jwt');
const { getDataTableParams } = require('../utils/dataTable');
const { genSlug } = require('../utils/slug');
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
        const { name, area, facade, furniture, price, priceUnit, numbersRoom, description, direction, city, district, adress, user, status, type, plot, images, cover} = req.body;
        const houses = new Houses({
            name,  
            description,
            area,
            facade,
            furniture,
            price,
            priceUnit,
            numbersRoom, 
            direction,
            city,
            district,
            adress,
            user,
            status,
            type,
            plot,
            images,
            cover
        });
        const slug = await genSlug(null, req.body.name, Houses);
        houses.slug = slug
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

const update = async function(req, res) {
  try {
      const houses = req.body;
      // const slug = await genSlug(null, req.body.name, Houses);
      // houses.slug = slug
      const { id } = req.params;
      console.log("id", id);
      await Houses.updateOne({_id: id}, houses);
      return res.status(200).send(true)
  }
  catch (error) {
    console.log("errỏ", error)
      return res.status(400).send(error)
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
          { plot: { $regex: `.*${keyword}.*` } }
        ]}
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
          .sort(sortObj)
          .populate('user').populate('plot')
          .lean()
          console.log("result", result)
        return result
      }
      const result = await Houses
        .find(filter)
        .limit(length)
        .skip(start)
        .sort({_id:-1})
        .populate('plot')
        .populate('user')
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
      // const {user} = req.query;
      const start = req.query.start ? parseInt(req.query.start) : 0;
      const limit = req.query.limit ? parseInt(req.query.limit) : 0;
      if(id){
          let houses = await Houses.findById(id)
            .populate({ path: 'user',populate: {path: 'role',populate: {path: 'permission'}}});
          res.status(200).send(houses)
      }else{
          const filter= {}
          const count = await Houses.countDocuments()
          const listHouses = await Houses.find(filter)
            .skip(start * limit)
            .limit(limit)
            .sort({ _id: -1 })
            .populate({ path: 'user',populate: {path: 'role', populate: {path: 'permission'}}});
          res.status(200).send({data: listHouses, total: count})
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

const findbyslug = async function(req, res) {
  try{
    const {slug} = req.params
      if(slug) {
        let house = await Houses.findOne({slug})
        res.status(200).send(house)
      // } else{
      //   const count = await Article.countDocuments()
      //   const listArticle = await Article.find()
      //   .skip(start * limit)
      //   .limit(limit)
      //   .sort({ _id: -1 });
      //   res.status(200).send({data: listArticle, total: count})
      }
      return
  }
  catch (error) {
      console.log('error', error)
      return res.status(400).send(error)
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
    suggest,
    findbyslug
}
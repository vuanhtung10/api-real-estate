const Permission = require('../models/permission.model');
const { getDataTableParams } = require('../utils/dataTable');

const add = async function(req, res) {
    try {
        const permission = new Permission(req.body);
        const error = permission.validateSync();
        if(error) return res.status(422).send(error)
        await permission.save();
        return res.status(200).send(permission)
    }
    catch (error) {
        return res.status(401).send(error)
    }
}

const edit = async function(req, res) {
    try {
        const permission = req.body;
        await Permission.updateOne({_id: permission._id}, permission);
        return res.status(200).send(true)
    }
    catch (error) {
        return res.status(401).send(error)
    }
}

const remove = async function(req, res) {
    try {
    //     const _id = req.body._id;
    //     const { id } = req.params;
    //     await Permission.deleteOne({_id:permission.id});
    //     return res.status(200).send(true)
    // }
    // catch (error) {
    //     return res.status(401).send({mess: "success"})
      const { id } = req.params;
      let permission = await Permission.findById(id)
      if(id){
          console.log(id)
          permission.deleteOne({_id:id});
          res.status(200).send(true)
          return
      }
      res.status(200).send(false)
  }
  catch (error) {
      console.log('error', error)
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
          { display_name: { $regex: `.*${keyword}.*` } }
        ]}
      }

      if (isCounting) {
        const count = await Permission.countDocuments(filter)
        return count
      }

      const sortObj = {}
      sortObj[sortBy] = sortType
      if (length === -1) {
        const result = await Permission
          .find(filter)
          .sort(sortObj)
          .lean()

        return result
      }
      const result = await Permission
        .find(filter)
        .limit(length)
        .skip(start)
        .lean()

      return result
    } catch (e) {
    }

    if (isCounting) {
      return 0
    }
    return []
}

const suggest = async function(req, res) {
    try {
        const {page, keyword} = req.body
        let filter = {}
        if (keyword) {
            filter = { $or: [
                { display_name: { $regex: `.*${keyword}.*` } }
            ]}
        }
        const permissions = await Permission.find(filter).lean()
        return res.status(200).send({data:permissions})
    }
    catch (error) {
        return res.status(401).send(error)
    }
}

const lookup = async function(req, res) {
  try{
      const { id } = req.params;
      if(id){
          console.log(id)
          let permission = await Permission.findById(id);
          Permission.aggregate[{$match : { _id: id}}]
          res.status(200).send(permission)
      }else{
          const permission = await Permission.find({});
          res.status(200).send(permission)
      }
      return
  }
  catch (error) {
      console.log('error', error)
      return res.status(400).send(error)
  }
}
module.exports = {
    add, edit, remove, suggest, listForDataTable, lookup
}
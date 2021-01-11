const Role = require('../models/role.model');
const { getDataTableParams } = require('../utils/dataTable');

const add = async function(req, res) {
    try {
        const role = new Role(req.body);
        const error = role.validateSync();
        if(error) return res.status(422).send(error)
        await role.save();
        return res.status(200).send(role)
    }
    catch (error) {
        return res.status(401).send(error)
    }
}

const edit = async function(req, res) {
    try {
        const role = req.body;
        const {permissionIdList} = req.body;
        role.permissions = permissionIdList
        await Role.updateOne({_id: role._id}, role);
        return res.status(200).send(true)
    }
    catch (error) {
        return res.status(401).send(error)
    }
}

const remove = async function(req, res) {
    try {
        const _id = req.body._id;
        await Role.deleteOne({_id: _id});
        return res.status(200).send(true)
    }
    catch (error) {
        return res.status(401).send({mess: "success"})
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
        const count = await Role.countDocuments(filter)
        return count
      }

      const sortObj = {}
      sortObj[sortBy] = sortType
      if (length === -1) {
        const result = await Role
          .find(filter)
          // .sort(sortObj)
          .populate('role')
          .lean()

        return result
      }
      const result = await Role
        .find(filter)
        .populate('role')
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

const suggest = async function(req, res) {
    try {
        const {page, keyword} = req.body
        let filter = {}
        if (keyword) {
            filter = { $or: [
                { display_name: { $regex: `.*${keyword}.*` } }
            ]}
        }
        const roles = await Role.find(filter).lean()
        return res.status(200).send({data:roles})
    }
    catch (error) {
        console.log(error)
        return res.status(401).send(error)
    }
}

module.exports = {
    add, edit, remove, suggest, listForDataTable
}
const Relation = require('../models/relation.model');
const { getDataTableParams } = require('../utils/dataTable');

const add = async function(req, res) {
    try {
        const relation = new Relation(req.body);
        const error = relation.validateSync();
        if(error) return res.status(422).send(error)
        await relation.save();
        return res.status(200).send(relation)
    }
    catch (error) {
        return res.status(401).send(error)
    }
}

const edit = async function(req, res) {
    try {
        const relation = req.body;
        await Relation.updateOne({_id: relation._id}, relation);
        return res.status(200).send(true)
    }
    catch (error) {
        return res.status(401).send(error)
    }
}

const remove = async function(req, res) {
    try {
        const _id = req.params.id;
        await Relation.deleteOne({_id: _id});
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
          { plot: { $regex: `.*${keyword}.*` } }
        ]}
      }

      if (isCounting) {
        const count = await Relation.countDocuments(filter)
        return count
      }

      const sortObj = {}
      sortObj[sortBy] = sortType
      if (length === -1) {
        const result = await Relation
          .find(filter)
          .sort(sortObj)
          .populate('user').polulate('plot')
          .lean()
          console.log("result", result)
        return result
      }

      const result = await Relation
        .find(filter)
        .limit(length)
        .skip(start)
        .populate('plot')
        .populate('user')
        .lean()
      console.log("result", result)
      return result
    }
     
    catch (e) {}
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
                { name: { $regex: `.*${keyword}.*` } }
            ]}
        }
        const relation = await Relation.find(filter).lean()
        return res.status(200).send({data:relation})
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
          let relation = await Relation.findById(id);
          Relation.aggregate[{$match : { _id: id}}]
          res.status(200).send(relation)
      }else{
          const relation = await Relation.find({});
          res.status(200).send(Relation)
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
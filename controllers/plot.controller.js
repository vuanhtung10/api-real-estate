const Plot = require('../models/plot.model');
const { getDataTableParams } = require('../utils/dataTable');

const add = async function(req, res) {
    try {
        const plot = new Plot(req.body);
        const error = plot.validateSync();
        if(error) return res.status(422).send(error)
        await plot.save();
        return res.status(200).send(plot)
    }
    catch (error) {
        return res.status(401).send(error)
    }
}

const edit = async function(req, res) {
    try {
        const plot = req.body;
        await Plot.updateOne({_id: plot._id}, plot);
        return res.status(200).send(true)
    }
    catch (error) {
        return res.status(401).send(error)
    }
}

const remove = async function(req, res) {
    try {
        const _id = req.params.id;
        await Plot.deleteOne({_id: _id});
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
        const count = await Plot.countDocuments(filter)
        return count
      }

      const sortObj = {}
      sortObj[sortBy] = sortType
      if (length === -1) {
        const result = await Plot
          .find(filter)
          .sort(sortObj)
          .lean()

        return result
      }
      const result = await Plot
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
                { name: { $regex: `.*${keyword}.*` } }
            ]}
        }
        const plot = await Plot.find(filter).lean()
        return res.status(200).send({data:plot})
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
          let plot = await Plot.findById(id);
          Plot.aggregate[{$match : { _id: id}}]
          res.status(200).send(plot)
      }else{
          const plot = await Plot.find({});
          res.status(200).send(plot)
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
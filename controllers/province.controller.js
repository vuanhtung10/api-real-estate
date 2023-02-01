const { response } = require('express');
const Province = require('../models/province.model');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { getDataTableParams } = require('../utils/dataTable');

const add = async function(req, res) {
    try {
        fetch('https://provinces.open-api.vn/api/?depth=3')
        .then((response) => response.json())
        .then((data) => {
            Province.insertMany(data)
            return res.status(200).send(data)
        });
    }
    catch (error) {
        console.log('error', error)
        return res.status(401).send(error)
    }
}

const remove = async function(req, res) {
    try {
        const {id} = req.params;
        if(id){
            console.log(id)
            let province = await Province.deleteOne({_id: _id});
            res.status(200).send(province)
        }else{
            const province = await Province.deleteMany({});
            res.status(200).send(province)
        }
    }
    catch (error) {
        return res.status(401).send({mess: "success"})
    }
}

const lookup = async (req, res) => {
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
        const count = await Province.countDocuments(filter)
        return count
      }

      const sortObj = {}
      sortObj[sortBy] = sortType
      if (length === -1) {
        const result = await Province
          .find(filter)
          .sort(sortObj)
          .lean()
          console.log("result", result)
        return result
      }

      const result = await Province
        .find(filter)
        .limit(length)
        .skip(start)
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
module.exports = {
    add,lookup, remove
}
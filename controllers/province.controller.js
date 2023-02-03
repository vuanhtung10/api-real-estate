const { response } = require('express');
const Province = require('../models/province.model');
const District = require('../models/district.model');
const Ward = require('../models/ward.model');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const addProvince = async function(req, res) {
    try {
        // await Province.deleteMany({})
        fetch('https://provinces.open-api.vn/api/?depth=3')
        .then((response) => response.json())
        .then((data) => {
            const provinces = data.map(item => {
              delete item.districts
              return item
            });
            Province.insertMany(provinces)
            return res.status(200).send(true)
        });
    }
    catch (error) {
        console.log('error', error)
        return res.status(401).send(error)
    }
}
const addDistrict = async function(req, res) {
  try {
      fetch('https://provinces.open-api.vn/api/?depth=3')
      .then((response) => response.json())
      .then((data) => {
          const provinces = data.map(province => {
            const districts = province.districts.map(district => {
              delete district.wards
              district.code_province = province.code
              return district
            });
            District.insertMany(districts)
            return province
          });
      });
      return res.status(200).send(true)
  }
  catch (error) {
      console.log('error', error)
      return res.status(401).send(error)
  }
}
const addWard = async function(req, res) {
  try {
      fetch('https://provinces.open-api.vn/api/?depth=3')
      .then((response) => response.json())
      .then((data) => {
          const provinces = data.map(province => {
            const districts = province.districts.map(district => {
              const wards = district.wards.map(ward => {
                ward.code_province = province.code
                ward.code_district = district.code
                return ward
              })
              Ward.insertMany(wards)
              return district
            });
            return province
          });
      });
      return res.status(200).send(true)
  }
  catch (error) {
      console.log('error', error)
      return res.status(401).send(error)
  }
}
const getProvince = async function(req, res) {
  try {
      let provinces = await Province.find()
      return res.status(200).send(provinces)
  }
  catch (error) {
      console.log('error', error)
      return res.status(401).send(error)
  }
}
const getDistrict = async function(req, res) {
  try {
    const { code } = req.params
    let districts = await District.find({code_province: code})
    return res.status(200).send(districts)
  }
  catch (error) {
      console.log('error', error)
      return res.status(401).send(error)
  }
}
const getWard = async function(req, res) {
  try {
    const { code } = req.params
    let wards = await Ward.find({code_district: code})
    return res.status(200).send(wards)
  }
  catch (error) {
      console.log('error', error)
      return res.status(401).send(error)
  }
}
module.exports = {
  addProvince,addDistrict, addWard, getProvince, getDistrict, getWard
}
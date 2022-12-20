const Article = require('../models/article.model');
const { getDataTableParams } = require('../utils/dataTable');
const {genSlug} = require('../utils/slug');

const add = async function(req, res) {
    try {
        const slug = await genSlug(null, req.body.name, Article);
        const article = new Article(req.body);
        article.slug = slug
        const error = article.validateSync();
        if(error) return res.status(422).send(error)
        await article.save();
        return res.status(200).send(article)
    }
    catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
}

const edit = async function(req, res) {
    try {
        const article = req.body;
        await Article.updateOne({_id: article._id}, article.name,);
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
      let article = await Article.findById(id)
      if(id){
        article.deleteOne({_id:id});
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
        const count = await Article.countDocuments(filter)
        return count
      }

      const sortObj = {}
      sortObj[sortBy] = sortType
      if (length === -1) {
        const result = await Article
          .find(filter)
          .sort(sortObj)
          .lean()

        return result
      }
      const result = await Article
        .find(filter)
        .limit(length)
        .skip(start)
        .sort({_id:-1})
        .lean()

      return result
    } catch (e) {
    }

    if (isCounting) {
      return 0
    }
    return []
}

const lookup = async function(req, res) {
  try{
      const { id } = req.params;
      const start = req.query.start ? parseInt(req.query.start) : 0;
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      if(id){
          let article = await Article.findById(id);
          res.status(200).send(article)
      }else{
          const count = await Article.countDocuments()
          const listArticle = await Article.find()
          .skip(start * limit)
          .limit(limit)
          .sort({ _id: -1 });
          res.status(200).send({data: listArticle, total: count})
      }
      return
  }
  catch (error) {
      console.log('error', error)
      return res.status(400).send(error)
  }
}
const findbyslug = async function(req, res) {
  try{
    const {slug} = req.params
      if(slug) {
        let article = await Article.findOne({slug})
        res.status(200).send(article)
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
    add, edit, remove, listForDataTable, lookup, findbyslug
}
const bcrypt = require('bcryptjs'); 
const User = require('../models/user.model');
const Token = require('../models/token.model');
const JWTService = require('../utils/jwt');
const { getDataTableParams } = require('../utils/dataTable');
const {USER_NOT_FOUND, PASSWORD_INCORRECT} = require('../constants/message');

const login = async function(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email }).populate(
        { 
          path: 'role',
          populate: [{path: 'permissions'}]    
        })
      if (user) {
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword) return res.status(401).send([PASSWORD_INCORRECT])
        const token = JWTService.generateTokenByUser(user);
        const active_token = new Token({
          token: token,
          user_id: user._id,
        });
        await active_token.save();
        return res.json({ "token":token, status: 200, expiresIn: 7776000, require_input_password: false});
      }
      return res.status(401).send(USER_NOT_FOUND)
    }
    catch (error) {
        return res.status(401).send(error)
    }
}

const logout = async function(req, res) {
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const bearerToken = authHeader.split('Bearer ');
      await Token.deleteOne({ token: bearerToken })
    }
    return res.send('logout success');
  }
  catch (error) {
      return res.status(401).send(error)
  }
}

const me = async function(req, res) {
    try {
        const user = req.user;
        const permissions = []
        let userUpdate = await User.findOne({ _id: user._id }).populate(
          { 
            path: 'role',
            populate: [
              {
                path: 'permissions'
              }
            ]    
          })
        if(userUpdate.role){
          if(userUpdate.role.permissions){
            userUpdate.role.permissions.forEach(element => {
              permissions.push(element.name)
            });
            user.permissions = permissions
          }
        }
        if (user) {
            return res.status(200).send({user: user})
        }
    } catch (error) {
        return res.status(401).send(error);
    }
};
  
const add = async function(req, res) {
    try {
        const { fullname, username, email, role, password, birthday, adress, phone } = req.body;
        const { USER_PASSWORD_SALT_ROUNDS: saltRounds = 10 } = process.env;
        const passwordHash = bcrypt.hashSync(password, +saltRounds);
        const user = new User({
            fullname,
            username, 
            email,
            role,
            password: passwordHash,
            birthday,
            adress,
            phone
        });
        const error = user.validateSync();
        if(error) return res.status(422).send(error)
        await user.save()
        return res.status(200).send(user)
    }
    catch (error) {
        console.log('error', error)
        return res.status(401).send(error)
    }
}

const update = async function(req, res) {
    try {
        const user = req.body;
        // const id = req.params.id;
        await User.updateOne({_id: user._id}, user);
        res.status(200).send(true)
    }
    catch (error) {
        console.log('error', error)
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
        const count = await User.countDocuments(filter)
        return count
      }

      const sortObj = {}
      sortObj[sortBy] = sortType
      if (length === -1) {
        const result = await User
          .find(filter)
          // .sort(sortObj)
          .populate('role')
          .lean()

        return result
      }
      const result = await User
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

const lookup = async function(req, res) {
  try{
      const { id } = req.params;
      const {role} = req.query;
      if(id){
          console.log(id)
          let user = await User.findById(id).populate({ path: 'role',populate: {path: 'permissions',}});
          // User.find({_id:id});
          User.aggregate[{$match : { _id: id}}]
          res.status(200).send(user)
      }else{
          const filter= {}
          if(role){
              filter.role = role
          }
          console.log(filter)
          const user = await User.find(filter).populate({ path: 'role',populate: {path: 'permissions',}});
          res.status(200).send(user)
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
      await User.deleteOne({_id: _id});
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
              { username: { $regex: `.*${keyword}.*` } }
          ]}
      }
      const users = await User.find(filter).lean()
      return res.status(200).send({data:users})
  }
  catch (error) {
      return res.status(401).send(error)
  }
}

module.exports = {
    login, 
    logout,
    me,
    add,
    update,
    list,
    listForDataTable,
    lookup,
    remove,
    suggest
}